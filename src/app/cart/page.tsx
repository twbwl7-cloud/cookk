"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { estimateCart } from "@/lib/client-pricing";
import { formatIls } from "@/lib/utils";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const couponDraft = useCartStore((s) => s.couponDraft);
  const quote = estimateCart(lines, couponDraft);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">העגלה</h1>
      {quote.detailed.length === 0 ? (
        <div className="mt-10 rounded-[1.5rem] bg-white/70 p-10 text-center contact-shadow">
          <p className="font-display text-2xl">העגלה ריקה</p>
          <Link
            href="/shop"
            className="btn-gold contact-shadow mt-6 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold"
          >
            לחנות
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <ul className="space-y-4">
            {quote.detailed.map((line) => (
              <li
                key={line.lineId}
                className="flex gap-4 rounded-[1.25rem] bg-white/70 p-4 contact-shadow"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-pink-base/50">
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
                    <p className="mt-1 text-[11px] font-bold text-gold-2">
                      {line.customSummary}
                    </p>
                  )}
                  {line.inspireNotes && (
                    <p className="mt-1 line-clamp-2 text-[11px] text-ink/55">
                      {line.inspireNotes}
                    </p>
                  )}
                  <p className="mt-1 font-semibold">
                    <bdi>{formatIls(line.lineTotalIls)}</bdi>
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border border-ink/15"
                      onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                    >
                      −
                    </button>
                    <bdi>{line.quantity}</bdi>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full border border-ink/15"
                      onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="mr-auto text-xs underline"
                      onClick={() => removeLine(line.lineId)}
                    >
                      הסרה
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="glass-liquid rounded-[1.25rem] p-5">
            <div className="flex justify-between text-lg font-bold text-ink">
              <span>לתשלום</span>
              <bdi>{formatIls(quote.totalIls)}</bdi>
            </div>
            <Link
              href="/checkout"
              className="btn-gold contact-shadow mt-4 flex h-12 items-center justify-center rounded-full text-sm font-bold text-ink"
            >
              לתשלום מאובטח
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
