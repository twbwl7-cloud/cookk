"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { estimateCart } from "@/lib/client-pricing";
import { formatIls } from "@/lib/utils";
import { siteSettings } from "@/data/site";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const couponDraft = useCartStore((s) => s.couponDraft);
  const setCouponDraft = useCartStore((s) => s.setCouponDraft);

  const quote = estimateCart(lines, couponDraft);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" data-lenis-prevent>
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="סגור עגלה"
        onClick={closeCart}
      />
      <aside
        data-lenis-prevent
        className="modal-scroll-clean absolute inset-y-0 left-0 flex w-full max-w-md flex-col overflow-y-auto bg-surface contact-shadow sm:left-auto sm:right-0"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-xl">העגלה שלי</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-ink/5"
            aria-label="סגור"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {quote.detailed.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl">העגלה ריקה</p>
              <p className="mt-2 text-sm text-ink-muted">
                בחרי עוגה — או ״לקחתי השראה״ לעוגה אחת משולבת.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-gold contact-shadow mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
              >
                לחנות
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {quote.detailed.map((line) => (
                <li
                  key={line.lineId}
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
                    {line.customSummary && (
                      <p className="mt-1 text-[11px] font-bold leading-snug text-gold-2">
                        {line.customSummary}
                      </p>
                    )}
                    {line.inspireNotes && (
                      <p className="mt-1 line-clamp-2 text-[11px] text-ink/55">
                        {line.inspireNotes}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold">
                      <bdi>{formatIls(line.lineTotalIls)}</bdi>
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full border border-ink/15"
                        onClick={() =>
                          setQuantity(line.lineId, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <bdi className="w-6 text-center text-sm">{line.quantity}</bdi>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full border border-ink/15"
                        onClick={() =>
                          setQuantity(line.lineId, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="mr-auto text-xs text-ink-muted underline"
                        onClick={() => removeLine(line.lineId)}
                      >
                        הסרה
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
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
              התאמות אישיות ושילובי AI מאושרים בוואטסאפ לפני אפייה.
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
      </aside>
    </div>
  );
}
