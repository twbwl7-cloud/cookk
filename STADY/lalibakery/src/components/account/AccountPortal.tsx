"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readLocalOrders, type LocalOrder } from "@/lib/local-orders";
import { useCartStore } from "@/store/cart";
import { formatIls } from "@/lib/utils";
import { siteSettings } from "@/data/site";

export function AccountPortal() {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const addItem = useCartStore((s) => s.addItem);
  const addCustomCake = useCartStore((s) => s.addCustomCake);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    setOrders(readLocalOrders());
  }, []);

  const reorder = (order: LocalOrder) => {
    for (const line of order.lines) {
      if (line.lineType === "custom_cake" && line.customSpec) {
        addCustomCake(line.customSpec);
      } else {
        addItem(line.productId, line.variantId, line.quantity);
      }
    }
    openCart();
  };

  if (orders.length === 0) {
    return (
      <div className="mt-10 rounded-[1.5rem] border border-ink/10 bg-white/70 p-8 text-center">
        <p className="font-display text-2xl text-ink">אין עדיין הזמנות במכשיר</p>
        <p className="mt-2 text-sm text-ink/60">
          אחרי Checkout מוצלח — האסמכתא תופיע כאן ל־Reorder מהיר.
        </p>
        <Link
          href="/builder"
          className="btn-gold contact-shadow mt-6 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold"
        >
          להתחיל ב־Builder
        </Link>
      </div>
    );
  }

  return (
    <ul className="mt-10 space-y-4">
      {orders.map((order) => (
        <li
          key={order.orderNumber}
          className="rounded-[1.25rem] border border-ink/10 bg-white/75 p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-xl text-ink">
              הזמנה <bdi>{order.orderNumber}</bdi>
            </p>
            <p className="text-sm font-semibold text-ink">
              <bdi>{formatIls(order.totalIls)}</bdi>
            </p>
          </div>
          <p className="mt-1 text-xs text-ink/55">
            <bdi>{new Date(order.createdAt).toLocaleString("he-IL")}</bdi> ·{" "}
            {order.lines.length} פריטים
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => reorder(order)}
              className="btn-gold contact-shadow inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold"
            >
              הזמנה מחדש
            </button>
            <a
              href={`https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(`היי, לגבי הזמנה ${order.orderNumber}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-ink/15 px-5 text-sm font-semibold text-ink"
            >
              וואטסאפ על ההזמנה
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
