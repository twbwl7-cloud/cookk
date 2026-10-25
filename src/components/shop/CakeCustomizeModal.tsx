"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, Sparkles, ShoppingBag } from "lucide-react";
import type { CakeCustomization, Product } from "@/types/commerce";
import { products } from "@/data/products";
import { formatIls } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
type Mode = "inspire" | "cart";

const NOTES_PLACEHOLDER =
  "לדוגמה: סרטים ורודים במקום ירוקים, להוריד את השם תמר, להוסיף פרחים זהב…";

function catHe(c: Product["category"]) {
  if (c === "gan") return "גן";
  if (c === "misparim") return "מספרים";
  return "מעוצבת";
}

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
  const [mergeId, setMergeId] = useState("");
  const [mergePreview, setMergePreview] = useState<string | null>(null);
  const [mergeBusy, setMergeBusy] = useState(false);
  const [mergeError, setMergeError] = useState<string | null>(null);
  const [pairLabel, setPairLabel] = useState<string | null>(null);

  const [plaqueText, setPlaqueText] = useState("");
  const [numbersText, setNumbersText] = useState("");
  const [sugarSheet, setSugarSheet] = useState<"none" | "wanted">("none");
  const [sugarNote, setSugarNote] = useState("");

  const others = useMemo(
    () => products.filter((p) => p.id !== product.id),
    [product.id],
  );

  const mergeProduct = useMemo(
    () => products.find((p) => p.id === mergeId),
    [mergeId],
  );

  const badgeText = useMemo(() => {
    if (pairLabel) return `עוגה אחת משולבת · ${pairLabel} · סטודיו`;
    if (mergeProduct) {
      return `עוגה אחת משולבת · ${catHe(product.category)} × ${catHe(mergeProduct.category)} · סטודיו`;
    }
    if (mode === "inspire") {
      return "עוגה אחת משולבת · גן × מעוצבת · סטודיו";
    }
    return null;
  }, [pairLabel, mergeProduct, product.category, mode]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !variant) return null;

  const runCombine = async () => {
    if (!mergeId) {
      setMergeError("בחרי עוגה שנייה לשילוב");
      return;
    }
    setMergeBusy(true);
    setMergeError(null);
    try {
      const res = await fetch("/api/combine-cakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseProductId: product.id,
          mergeProductId: mergeId,
          notes: inspireNotes,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        url?: string;
        pair?: string;
        error?: string;
      };
      if (!data.ok || !data.url) {
        setMergeError(data.error || "שגיאה ביצירת השילוב");
        return;
      }
      setMergePreview(data.url);
      setPairLabel(data.pair ?? null);
    } catch {
      setMergeError("הרשת נכשלה — נסי שוב");
    } finally {
      setMergeBusy(false);
    }
  };

  const submit = () => {
    const hybridSpec =
      mode === "inspire" && mergeProduct
        ? {
            kind: "hybrid" as const,
            hybridMode: true,
            baseStyle: {
              category: product.category,
              frost: "ivory" as const,
              piping: "shell" as const,
              accents: "none" as const,
              label: product.title,
            },
            secondaryStyle: {
              category: mergeProduct.category,
              frost: "blush" as const,
              piping: "lambeth" as const,
              accents: "goldLeaf" as const,
              label: mergeProduct.title,
            },
            fusionRatio: 0.55,
          }
        : undefined;

    const customization: CakeCustomization =
      mode === "inspire"
        ? {
            mode: "inspire",
            inspireNotes: inspireNotes.trim() || undefined,
            mergeProductId: mergeId || undefined,
            mergePreviewUrl: mergePreview || undefined,
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

    addItem(product.id, variant.id, 1, customization);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
      data-lenis-prevent
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="סגור"
        onClick={onClose}
      />

      {/* Reference layout card */}
      <div
        role="dialog"
        aria-modal
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="modal-scroll-clean relative z-10 flex max-h-[94svh] w-full max-w-[440px] flex-col overflow-y-auto rounded-t-[1.75rem] border border-black/5 bg-white shadow-[0_28px_80px_-28px_rgba(13,13,13,0.45)] sm:rounded-[1.75rem]"
      >
        {/* Gold accent edge (matches reference left hairline) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-6 start-0 w-px bg-gradient-to-b from-transparent via-gold-2/70 to-transparent"
        />

        <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
          {/* 1. Header — X left, tag/title/price right */}
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white text-ink transition hover:bg-[#fffaf8]"
              aria-label="סגור"
            >
              <X size={18} strokeWidth={2.25} />
            </button>

            <div className="min-w-0 flex-1 text-right">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-gold-2">
                {mode === "inspire" ? "לקחתי השראה" : "התאמה לפני עגלה"}
              </p>
              <h2 className="mt-1.5 font-display text-[clamp(1.35rem,4.5vw,1.75rem)] font-bold leading-tight tracking-[-0.02em] text-ink">
                {product.title}
              </h2>
              <p className="mt-1.5 text-[15px] font-semibold text-ink/70">
                <bdi>{formatIls(variant.priceIls)}</bdi>
              </p>
            </div>
          </div>

          {/* 2. Image + pill badge bottom-right */}
          <div className="relative mt-5 aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-[#f7f2f0]">
            <Image
              src={mergePreview || product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="440px"
              priority
            />
            {badgeText && (
              <span className="absolute bottom-3 right-3 max-w-[90%] truncate rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-extrabold tracking-wide text-ink shadow-sm">
                {badgeText}
              </span>
            )}
          </div>

          {/* 3. Notes — exact prompt from reference (inspire primary) */}
          {mode === "inspire" ? (
            <div className="mt-6">
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
            <div className="mt-6">
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

          {/* Hybrid second-cake picker — below the clean hero of the modal */}
          {mode === "inspire" && (
            <div className="mt-6 border-t border-ink/8 pt-5">
              <p className="text-right text-sm font-extrabold text-ink">
                לשלב עם עוגה שנייה — עוגה אחת
              </p>
              <p className="mt-1 text-right text-[11px] font-medium text-ink/45">
                גן × מעוצבת · מספרים · או אותו סוג
              </p>

              {(
                [
                  { key: "gan" as const, label: "עוגות גן" },
                  { key: "meutzavot" as const, label: "מעוצבות" },
                  { key: "misparim" as const, label: "מספרים" },
                ] as const
              ).map((group) => {
                const list = others.filter((p) => p.category === group.key);
                if (!list.length) return null;
                return (
                  <div key={group.key} className="mt-3">
                    <p className="mb-1.5 text-right text-[10px] font-extrabold tracking-wide text-gold-2">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {list.slice(0, 8).map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setMergeId(p.id);
                            setMergePreview(null);
                            setPairLabel(null);
                          }}
                          className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                            mergeId === p.id
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
                  </div>
                );
              })}

              <button
                type="button"
                onClick={runCombine}
                disabled={mergeBusy || !mergeId}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-gold-1/40 bg-[#fffaf8] text-sm font-extrabold text-ink disabled:opacity-50"
                data-magnetic
                data-cursor-label="שילוב"
              >
                <Sparkles size={16} className="text-gold-2" />
                {mergeBusy ? "אורגים עוגה אחת…" : "צרי שילוב · עוגה אחת"}
              </button>
              {mergeError && (
                <p className="mt-2 text-right text-xs font-bold text-red-700">
                  {mergeError}
                </p>
              )}
            </div>
          )}

          {/* Plaque / numbers / sugar — cart mode full; inspire optional */}
          <div className="mt-5 space-y-3 border-t border-ink/8 pt-5">
            {mode === "inspire" && (
              <>
                <p className="text-right text-xs font-extrabold text-ink/55">
                  טקסט · מספרים · דף סוכר (אופציונלי)
                </p>
                <input
                  value={plaqueText}
                  onChange={(e) => setPlaqueText(e.target.value.slice(0, 25))}
                  maxLength={25}
                  placeholder="טקסט על העוגה"
                  className="h-11 w-full rounded-[1rem] border border-ink/12 bg-white px-3 text-right text-sm"
                />
              </>
            )}
            <input
              value={numbersText}
              onChange={(e) => setNumbersText(e.target.value.slice(0, 12))}
              maxLength={12}
              placeholder="מספרים (למשל 18)"
              className="h-11 w-full rounded-[1rem] border border-ink/12 bg-white px-3 text-right text-sm"
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
                placeholder="תיאור / קישור לתמונה לדף הסוכר — או שליחה בוואטסאפ"
                className="w-full rounded-[1rem] border border-ink/12 bg-white px-3 py-2 text-right text-sm"
              />
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={submit}
              className="btn-gold contact-shadow inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-extrabold text-ink"
              data-magnetic
              data-cursor-label="עגלה"
            >
              <ShoppingBag size={16} />
              {mode === "inspire" ? "שמירה לעגלה עם ההשראה" : "הוספה לעגלה"}
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

/** Dual CTA pair under product cards */
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
          className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-gold-1/35 bg-white/70 text-sm font-bold text-ink backdrop-blur-sm disabled:opacity-50"
          data-magnetic
          data-cursor-label="השראה"
        >
          <Sparkles size={14} className="text-gold-2" />
          לקחתי השראה
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
