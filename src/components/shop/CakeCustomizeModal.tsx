"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { X, Sparkles, ShoppingBag } from "lucide-react";
import type { CakeCustomization, Product } from "@/types/commerce";
import { products } from "@/data/products";
import { formatIls } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

type Mode = "inspire" | "cart";

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

  // Lock page scroll; modal uses clean native/finger scroll (no fat bar)
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
    const customization: CakeCustomization =
      mode === "inspire"
        ? {
            mode: "inspire",
            inspireNotes: inspireNotes.trim() || undefined,
            mergeProductId: mergeId || undefined,
            mergePreviewUrl: mergePreview || undefined,
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
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
      data-lenis-prevent
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-label="סגור"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="modal-scroll-clean relative z-10 max-h-[92svh] w-full max-w-lg rounded-t-[1.75rem] border border-white/70 bg-[#fffaf8] p-5 shadow-[0_30px_80px_-24px_rgba(13,13,13,0.4)] sm:rounded-[1.75rem] sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-2">
              {mode === "inspire" ? "לקחתי השראה" : "התאמה לפני עגלה"}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">
              {product.title}
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink/60">
              <bdi>{formatIls(variant.priceIls)}</bdi>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/10 p-2 hover:bg-pink-soft/50"
            aria-label="סגור"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative mt-4 aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-pink-soft/40">
          <Image
            src={mergePreview || product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="480px"
          />
          {mergePreview && (
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold text-ink">
              עוגה אחת משולבת
              {pairLabel ? ` · ${pairLabel}` : ""} · סטודיו
            </span>
          )}
        </div>

        {mode === "inspire" && (
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-extrabold text-ink" htmlFor="inspire-notes">
                מה להוסיף / להוריד / לשנות?
              </label>
              <textarea
                id="inspire-notes"
                value={inspireNotes}
                onChange={(e) => setInspireNotes(e.target.value)}
                rows={3}
                maxLength={800}
                placeholder="לדוגמה: סרטים ורודים במקום ירוקים, להוריד את השם תמר, להוסיף פרחים זהב…"
                className="mt-1.5 w-full rounded-2xl border border-ink/10 bg-white/80 px-3 py-2.5 text-sm text-ink outline-none focus:border-gold-1/50"
              />
            </div>

            <div>
              <p className="text-xs font-extrabold text-ink">
                לשלב עם עוגה שנייה · גן × מעוצבת / מספרים / אותו סוג — עוגה אחת
              </p>
              {(
                [
                  { key: "gan", label: "עוגות גן" },
                  { key: "meutzavot", label: "מעוצבות" },
                  { key: "misparim", label: "מספרים" },
                ] as const
              ).map((group) => {
                const list = others.filter((p) => p.category === group.key);
                if (list.length === 0) return null;
                return (
                  <div key={group.key} className="mt-3">
                    <p className="mb-1.5 text-[10px] font-extrabold tracking-wide text-gold-2">
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
                          className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                            mergeId === p.id
                              ? "border-gold-1"
                              : "border-transparent opacity-80"
                          }`}
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="80px"
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
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-gold-1/40 bg-white/80 text-sm font-extrabold text-ink disabled:opacity-50"
                data-magnetic
                data-cursor-label="שילוב"
              >
                <Sparkles size={16} className="text-gold-2" />
                {mergeBusy
                  ? "אורגים עוגה אחת…"
                  : "צרי שילוב אמיתי · עוגה אחת"}
              </button>
              {mergeError && (
                <p className="mt-2 text-xs font-bold text-red-700">{mergeError}</p>
              )}
            </div>
          </div>
        )}

        {/* Shared plaque / numbers / sugar — always for cart, also optional on inspire */}
        <div className="mt-5 space-y-3 border-t border-ink/8 pt-4">
          <p className="text-xs font-extrabold text-ink">
            {mode === "cart"
              ? "מה לכתוב על העוגה?"
              : "טקסט ומספרים (אופציונלי)"}
          </p>
          <div>
            <label className="text-[11px] font-bold text-ink/55" htmlFor="plaque">
              טקסט / שם על העוגה
            </label>
            <input
              id="plaque"
              value={plaqueText}
              onChange={(e) => setPlaqueText(e.target.value.slice(0, 25))}
              maxLength={25}
              placeholder="למשל: מזל טוב תמר"
              className="mt-1 h-11 w-full rounded-2xl border border-ink/10 bg-white/80 px-3 text-sm"
            />
            <p className="mt-1 text-[10px] text-ink/40">
              עד 25 תווים · <bdi>{plaqueText.length}</bdi>/25
            </p>
          </div>
          <div>
            <label className="text-[11px] font-bold text-ink/55" htmlFor="nums">
              מספרים על העוגה
            </label>
            <input
              id="nums"
              value={numbersText}
              onChange={(e) => setNumbersText(e.target.value.slice(0, 12))}
              maxLength={12}
              placeholder="למשל: 18"
              className="mt-1 h-11 w-full rounded-2xl border border-ink/10 bg-white/80 px-3 text-sm"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold text-ink/55">דף סוכר</p>
            <div className="mt-1.5 flex gap-2">
              <button
                type="button"
                onClick={() => setSugarSheet("none")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  sugarSheet === "none"
                    ? "bg-ink text-pink-soft"
                    : "bg-pink-soft/70 text-ink"
                }`}
              >
                בלי
              </button>
              <button
                type="button"
                onClick={() => setSugarSheet("wanted")}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  sugarSheet === "wanted"
                    ? "bg-ink text-pink-soft"
                    : "bg-pink-soft/70 text-ink"
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
                placeholder="תארו את התמונה / דמות — או שלחו קובץ בוואטסאפ אחרי ההזמנה"
                className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/80 px-3 py-2 text-sm"
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={submit}
            className="btn-gold contact-shadow inline-flex h-13 w-full items-center justify-center gap-2 rounded-full text-sm font-extrabold text-ink"
            data-magnetic
            data-cursor-label="עגלה"
          >
            <ShoppingBag size={16} />
            {mode === "inspire" ? "שמירה לעגלה עם ההשראה" : "הוספה לעגלה"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 text-sm font-bold text-ink/50 underline"
          >
            ביטול
          </button>
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
