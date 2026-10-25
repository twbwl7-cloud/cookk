"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { estimateCart } from "@/lib/client-pricing";
import { formatIls } from "@/lib/utils";
import { siteSettings } from "@/data/site";
import { products } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const couponDraft = useCartStore((s) => s.couponDraft);
  const setCouponDraft = useCartStore((s) => s.setCouponDraft);
  const reduce = useReducedMotion();

  const quote = estimateCart(lines, couponDraft);

  const upsells = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.productId));
    return products
      .filter((p) => p.featured && !inCart.has(p.id) && p.variants[0])
      .slice(0, 2);
  }, [lines]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    const lenis = (
      window as unknown as { __lenis?: { stop: () => void; start: () => void } }
    ).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen ? (
    <div key="cart-drawer" className="fixed inset-0 z-[60]">
      <motion.button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="סגור עגלה"
        onClick={closeCart}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="עגלת קניות"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-pink-soft text-ink contact-shadow"
        initial={reduce ? false : { x: "110%" }}
        animate={{ x: 0 }}
        exit={reduce ? undefined : { x: "110%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-xl tracking-[-0.02em]">העגלה שלי</h2>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full hover:bg-ink/5"
            aria-label="סגור"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {quote.detailed.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl tracking-[-0.02em]">
                אין עדיין עוגה בעגלה
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                מרכיבות ב־3D או בוחרות מהקטלוג — המחיר מתעדכן לפני התשלום.
              </p>
              <Link
                href="/builder"
                onClick={closeCart}
                className="btn-gold contact-shadow mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
              >
                להרכבת עוגה
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {quote.detailed.map((line) => (
                <li
                  key={`${line.productId}-${line.variantId}`}
                  className="flex gap-3 border-b border-ink/8 pb-4"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-pink-base/60">
                    <Image
                      src={line.image}
                      alt={line.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{line.title}</p>
                    <p className="text-xs text-ink-muted">{line.variantLabel}</p>
                    <p className="mt-1 text-sm font-semibold">
                      <bdi>{formatIls(line.lineTotalIls)}</bdi>
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full border border-ink/15"
                        onClick={() =>
                          setQuantity(
                            line.productId,
                            line.variantId,
                            line.quantity - 1,
                          )
                        }
                      >
                        −
                      </button>
                      <bdi className="w-6 text-center text-sm">{line.quantity}</bdi>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full border border-ink/15"
                        onClick={() =>
                          setQuantity(
                            line.productId,
                            line.variantId,
                            line.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="mr-auto text-xs text-ink-muted underline"
                        onClick={() =>
                          removeItem(line.productId, line.variantId)
                        }
                      >
                        הסרה
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {quote.detailed.length > 0 && upsells.length > 0 ? (
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-wide text-ink/55">
                משלימים את ההזמנה
              </p>
              <ul className="mt-3 space-y-3">
                {upsells.map((p) => {
                  const v = p.variants[0]!;
                  return (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white/50 p-2"
                    >
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.title}</p>
                        <p className="text-xs text-ink/60">
                          <bdi>{formatIls(v.priceIls)}</bdi>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="min-h-11 shrink-0 rounded-full bg-ink px-3 text-xs font-semibold text-pink-soft transition hover:bg-ink/90"
                        onClick={() => addItem(p.id, v.id, 1)}
                      >
                        הוספה
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>

        {quote.detailed.length > 0 && (
          <div className="space-y-3 border-t border-ink/10 px-5 py-4">
            <div>
              <label className="text-xs text-ink-muted" htmlFor="coupon">
                קוד קופון
              </label>
              <input
                id="coupon"
                value={couponDraft}
                onChange={(e) => setCouponDraft(e.target.value.toUpperCase())}
                placeholder={siteSettings.launchCouponCode}
                className="mt-1 h-11 w-full rounded-2xl border border-ink/10 bg-white/70 px-3 text-sm"
              />
              {couponDraft && !quote.couponValid && (
                <p className="mt-1 text-xs text-red-700">קוד לא תקין</p>
              )}
              {quote.couponValid && (
                <p className="mt-1 text-xs text-ink">
                  הנחת השקה {siteSettings.launchCouponPercent}% הופעלה
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-ink/70">
                {quote.subtotalIls - quote.discountIls >=
                siteSettings.freeShippingFromIls
                  ? "משלוח חינם בהזמנה הזו"
                  : `עוד ${formatIls(Math.max(0, siteSettings.freeShippingFromIls - (quote.subtotalIls - quote.discountIls)))} למשלוח חינם`}
              </p>
              <div
                className="h-2 overflow-hidden rounded-full bg-ink/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={siteSettings.freeShippingFromIls}
                aria-valuenow={Math.min(
                  siteSettings.freeShippingFromIls,
                  Math.max(0, quote.subtotalIls - quote.discountIls),
                )}
              >
                <div
                  className="h-full rounded-full bg-gold-luxury transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-right"
                  style={{
                    transform: `scaleX(${Math.min(1, Math.max(0, quote.subtotalIls - quote.discountIls) / siteSettings.freeShippingFromIls)})`,
                  }}
                />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>ביניים</span>
                <bdi>{formatIls(quote.subtotalIls)}</bdi>
              </div>
              {quote.discountIls > 0 && (
                <div className="flex justify-between text-ink">
                  <span>הנחה</span>
                  <bdi>−{formatIls(quote.discountIls)}</bdi>
                </div>
              )}
              <div className="flex justify-between">
                <span>משלוח</span>
                <bdi>
                  {quote.shippingIls === 0
                    ? "חינם"
                    : formatIls(quote.shippingIls)}
                </bdi>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-bold">
                <span>לתשלום</span>
                <bdi>{formatIls(quote.totalIls)}</bdi>
              </div>
            </div>
            <p className="text-[11px] text-ink-muted">
              המחיר הסופי מאומת בשרת מול המלאי. משלוח חינם מעל{" "}
              <bdi>{formatIls(siteSettings.freeShippingFromIls)}</bdi>.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-gold contact-shadow flex h-12 w-full items-center justify-center rounded-full text-sm font-bold"
            >
              לתשלום מאובטח
            </Link>
          </div>
        )}
      </motion.aside>
    </div>
      ) : null}
    </AnimatePresence>
  );
}
