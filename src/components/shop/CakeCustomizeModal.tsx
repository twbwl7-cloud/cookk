"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, Sparkles, ShoppingBag } from "lucide-react";
import type { CakeCustomization, Product } from "@/types/commerce";
import { products } from "@/data/products";
import { formatIls } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

type Mode = "inspire" | "cart";

const UNIFIED_TAG = "עוגה אחת משולבת · גן × מעוצבת · סטודיו";
const NOTES_PLACEHOLDER =
  "לדוגמה: סרטים ורודים במקום ירוקים, להוריד את השם תמר, להוסיף פרחים זהב…";

function catHe(c: Product["category"]) {
  if (c === "gan") return "גן";
  if (c === "misparim") return "מספרים";
  return "מעוצבת";
}

/**
 * CRITICAL: This modal sells ONE physical hybrid cake —
 * garden foundation + couture accents as a single connected product.
 * Never two cart lines. Never a split “two cakes” UI.
 */
export function CakeCustomizeModal({
  product,
  mode,
  open,
  onClose,
}: {
  product: Product;
  mode: Mode;
  open: boolean;
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const variant = product.variants[0];

  const [inspireNotes, setInspireNotes] = useState("");
  const [styleId, setStyleId] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [plaqueText, setPlaqueText] = useState("");
  const [numbersText, setNumbersText] = useState("");
  const [sugarSheet, setSugarSheet] = useState<"none" | "wanted">("none");
  const [sugarNote, setSugarNote] = useState("");

  /** Couture / style references only — NOT a second product to purchase */
  const styleRefs = useMemo(() => {
    const preferred =
      product.category === "gan"
        ? products.filter((p) => p.category === "meutzavot" && p.id !== product.id)
        : product.category === "meutzavot"
          ? products.filter((p) => p.category === "gan" && p.id !== product.id)
          : products.filter((p) => p.id !== product.id);
    const rest = products.filter(
      (p) => p.id !== product.id && !preferred.some((x) => x.id === p.id),
    );
    return [...preferred, ...rest].slice(0, 12);
  }, [product.id, product.category]);

  const styleProduct = useMemo(
    () => products.find((p) => p.id === styleId),
    [styleId],
  );

  const badge = useMemo(() => {
    if (styleProduct) {
      return `עוגה אחת משולבת · ${catHe(product.category)} × ${catHe(styleProduct.category)} · סטודיו`;
    }
    return mode === "inspire" ? UNIFIED_TAG : null;
  }, [styleProduct, product.category, mode]);

  const displayTitle =
    mode === "inspire"
      ? styleProduct
        ? `עוגה אחת משולבת · ${product.title}`
        : product.title
      : product.title;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !variant) return null;

  const weaveOneCake = async () => {
    if (!styleId) {
      setError("בחרי סגנון קוטור להטמעה בעוגה האחת");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/combine-cakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseProductId: product.id,
          mergeProductId: styleId,
          notes: inspireNotes,
          unified: true,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        url?: string;
        error?: string;
      };
      if (!data.ok || !data.url) {
        setError(data.error || "לא הצלחנו לארוג את העוגה האחת");
        return;
      }
      setPreviewUrl(data.url);
    } catch {
      setError("הרשת נכשלה — נסי שוב");
    } finally {
      setBusy(false);
    }
  };

  /** Always ONE cart line — unified hybrid product */
  const submitOneCake = () => {
    const hybridSpec: CakeCustomization["hybridSpec"] = styleProduct
      ? {
          kind: "hybrid",
          hybridMode: true,
          baseStyle: {
            category: product.category,
            frost: "ivory",
            piping: "shell",
            accents: "none",
            label: `בסיס · ${product.title}`,
          },
          secondaryStyle: {
            category: styleProduct.category,
            frost: "blush",
            piping: "lambeth",
            accents: "goldLeaf",
            label: `קוטור משולב · ${styleProduct.title}`,
          },
          fusionRatio: 0.55,
        }
      : mode === "inspire"
        ? {
            kind: "hybrid",
            hybridMode: true,
            baseStyle: {
              category: product.category === "meutzavot" ? "gan" : product.category,
              frost: "sky",
              piping: "shell",
              accents: "none",
              label: "בסיס עוגת גן",
            },
            secondaryStyle: {
              category: "meutzavot",
              frost: "ivory",
              piping: "lambeth",
              accents: "goldLeaf",
              label: "אלמנט קוטור מעוצב",
            },
            fusionRatio: 0.55,
          }
        : undefined;

    const customization: CakeCustomization =
      mode === "inspire"
        ? {
            mode: "inspire",
            inspireNotes: inspireNotes.trim() || undefined,
            mergeProductId: styleId || undefined,
            mergePreviewUrl: previewUrl || undefined,
            hybridSpec,
            plaqueText: plaqueText.trim() || undefined,
            numbersText: numbersText.trim() || undefined,
            sugarSheet,
            sugarNote: sugarNote.trim() || undefined,
          }
        : {
            mode: "standard",
            plaqueText: plaqueText.trim() || undefined,
            numbersText: numbersText.trim() || undefined,
            sugarSheet,
            sugarNote: sugarNote.trim() || undefined,
          };

    // ONE line only — never add styleProduct as a second item
    addItem(product.id, variant.id, 1, customization);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
      data-lenis-prevent
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="סגור"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="modal-scroll-clean relative z-10 max-h-[94svh] w-full max-w-[440px] overflow-y-auto rounded-t-[1.75rem] border border-black/5 bg-white shadow-[0_28px_80px_-28px_rgba(13,13,13,0.45)] sm:rounded-[1.75rem]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-6 start-0 w-px bg-gradient-to-b from-transparent via-gold-2/70 to-transparent"
        />

        <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white"
              aria-label="סגור"
            >
              <X size={18} strokeWidth={2.25} />
            </button>
            <div className="min-w-0 flex-1 text-right">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-gold-2">
                {mode === "inspire" ? "לקחתי השראה" : "התאמה לפני עגלה"}
              </p>
              <h2 className="mt-1.5 font-display text-[clamp(1.3rem,4.2vw,1.7rem)] font-bold leading-tight text-ink">
                {displayTitle}
              </h2>
              <p className="mt-1.5 text-[15px] font-semibold text-ink/70">
                <bdi>{formatIls(variant.priceIls)}</bdi>
                <span className="ms-2 text-[11px] font-bold text-ink/40">
                  · מחיר עוגה אחת
                </span>
              </p>
            </div>
          </div>

          {/* One-cake preview */}
          <div className="relative mt-5 aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[#f7f2f0]">
            <Image
              src={previewUrl || product.image}
              alt="עוגה אחת משולבת"
              fill
              className="object-cover"
              sizes="440px"
              priority
            />
            {badge && (
              <span className="absolute bottom-3 right-3 max-w-[92%] truncate rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-extrabold text-ink shadow-sm">
                {badge}
              </span>
            )}
          </div>

          {mode === "inspire" && (
            <p className="mt-3 text-center text-[11px] font-bold leading-snug text-ink/50">
              זו עוגה אחת מחוברת — בסיס גן + אלמנט קוטור מעוצב.
              <br />
              לא שתי הזמנות. לא פיצול מסך.
            </p>
          )}

          {/* Notes — front and center */}
          {mode === "inspire" ? (
            <div className="mt-5">
              <label
                htmlFor="inspire-notes"
                className="block text-right text-[15px] font-extrabold text-ink"
              >
                מה להוסיף / להוריד / לשנות?
              </label>
              <textarea
                id="inspire-notes"
                value={inspireNotes}
                onChange={(e) => setInspireNotes(e.target.value)}
                rows={3}
                maxLength={800}
                placeholder={NOTES_PLACEHOLDER}
                className="mt-2.5 w-full resize-y rounded-[1rem] border border-ink/12 bg-white px-4 py-3 text-right text-sm leading-relaxed text-ink outline-none placeholder:text-ink/35 focus:border-gold-1/45 focus:ring-2 focus:ring-gold-1/15"
              />
            </div>
          ) : (
            <div className="mt-5">
              <label
                htmlFor="plaque"
                className="block text-right text-[15px] font-extrabold text-ink"
              >
                מה לכתוב על העוגה?
              </label>
              <input
                id="plaque"
                value={plaqueText}
                onChange={(e) => setPlaqueText(e.target.value.slice(0, 25))}
                maxLength={25}
                placeholder="למשל: מזל טוב תמר"
                className="mt-2.5 h-12 w-full rounded-[1rem] border border-ink/12 bg-white px-4 text-right text-sm outline-none focus:border-gold-1/45"
              />
            </div>
          )}

          {/* Style weave — reference only */}
          {mode === "inspire" && (
            <div className="mt-6 border-t border-ink/8 pt-5">
              <p className="text-right text-sm font-extrabold text-ink">
                סגנון קוטור להטמעה בעוגה האחת
              </p>
              <p className="mt-1 text-right text-[11px] font-medium text-ink/45">
                בוחרים השראה ויזואלית — לא מוסיפים עוגה שנייה לעגלה
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {styleRefs.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setStyleId(p.id);
                      setPreviewUrl(null);
                    }}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                      styleId === p.id
                        ? "border-gold-1"
                        : "border-transparent opacity-85"
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={weaveOneCake}
                disabled={busy || !styleId}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-gold-1/40 bg-[#fffaf8] text-sm font-extrabold text-ink disabled:opacity-50"
                data-magnetic
                data-cursor-label="אריגה"
              >
                <Sparkles size={16} className="text-gold-2" />
                {busy ? "אורגים עוגה אחת…" : "ארוג לעוגה אחת מחוברת"}
              </button>
              {error && (
                <p className="mt-2 text-right text-xs font-bold text-red-700">
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Optional extras on the SAME cake */}
          <div className="mt-5 space-y-3 border-t border-ink/8 pt-5">
            <p className="text-right text-xs font-extrabold text-ink/55">
              על אותה עוגה · טקסט / מספרים / דף סוכר
            </p>
            {mode === "inspire" && (
              <input
                value={plaqueText}
                onChange={(e) => setPlaqueText(e.target.value.slice(0, 25))}
                maxLength={25}
                placeholder="טקסט על העוגה"
                className="h-11 w-full rounded-[1rem] border border-ink/12 px-3 text-right text-sm"
              />
            )}
            <input
              value={numbersText}
              onChange={(e) => setNumbersText(e.target.value.slice(0, 12))}
              maxLength={12}
              placeholder="מספרים (למשל 18)"
              className="h-11 w-full rounded-[1rem] border border-ink/12 px-3 text-right text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSugarSheet("none")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  sugarSheet === "none"
                    ? "bg-ink text-pink-soft"
                    : "bg-[#fff5f7] text-ink"
                }`}
              >
                בלי דף סוכר
              </button>
              <button
                type="button"
                onClick={() => setSugarSheet("wanted")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  sugarSheet === "wanted"
                    ? "bg-ink text-pink-soft"
                    : "bg-[#fff5f7] text-ink"
                }`}
              >
                רוצה דף סוכר
              </button>
            </div>
            {sugarSheet === "wanted" && (
              <textarea
                value={sugarNote}
                onChange={(e) => setSugarNote(e.target.value)}
                rows={2}
                placeholder="תיאור תמונה לדף הסוכר"
                className="w-full rounded-[1rem] border border-ink/12 px-3 py-2 text-right text-sm"
              />
            )}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={submitOneCake}
              className="btn-gold contact-shadow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-extrabold text-ink"
              data-magnetic
              data-cursor-label="עגלה"
            >
              <ShoppingBag size={16} />
              {mode === "inspire"
                ? "הוספת העוגה האחת לעגלה"
                : "הוספה לעגלה"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-10 text-sm font-bold text-ink/45 underline"
            >
              ביטול
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductActionBar({ product }: { product: Product }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const variant = product.variants[0];

  return (
    <>
      <div className="mt-3 flex flex-col gap-2 px-1">
        <button
          type="button"
          disabled={!variant || variant.stock < 1}
          onClick={() => setMode("cart")}
          className="btn-gold contact-shadow inline-flex h-10 w-full items-center justify-center rounded-full text-sm font-extrabold text-ink disabled:opacity-50"
          data-magnetic
          data-cursor-label="הוספה"
        >
          הוספה לעגלה
        </button>
        <button
          type="button"
          disabled={!variant || variant.stock < 1}
          onClick={() => setMode("inspire")}
          className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-gold-1/35 bg-white/70 text-sm font-bold text-ink"
          data-magnetic
          data-cursor-label="השראה"
        >
          <Sparkles size={14} className="text-gold-2" />
          לקחתי השראה · עוגה אחת
        </button>
      </div>
      {mode && (
        <CakeCustomizeModal
          product={product}
          mode={mode}
          open
          onClose={() => setMode(null)}
        />
      )}
    </>
  );
}
