"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { useCartStore } from "@/store/cart";
import { estimateCart } from "@/lib/client-pricing";
import { formatIls } from "@/lib/utils";
import { submitCheckout } from "@/actions/checkout";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteSettings } from "@/data/site";

const methods = [
  {
    id: "whatsapp" as const,
    label: "קישור בוואטסאפ",
    note: "סיכום הזמנה + המשך תשלום בצ׳אט",
  },
  {
    id: "card" as const,
    label: "אשראי מאובטח",
    note: "Tranzila — יחובר עם מפתחות Production",
  },
];

const windows = ["09:00-12:00", "12:00-15:00", "15:00-18:00"] as const;

function minSlotDate(): string {
  const d = new Date();
  let left = 3;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 5 && day !== 6) left -= 1;
  }
  return d.toISOString().slice(0, 10);
}

export function CheckoutForm() {
  const lines = useCartStore((s) => s.lines);
  const couponDraft = useCartStore((s) => s.couponDraft);
  const clearCart = useCartStore((s) => s.clearCart);
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">(
    "pickup",
  );
  const quote = useMemo(() => {
    const base = estimateCart(lines, couponDraft);
    if (fulfillment === "pickup") {
      return {
        ...base,
        shippingIls: 0,
        totalIls: Math.max(0, base.subtotalIls - base.discountIls),
      };
    }
    return base;
  }, [lines, couponDraft, fulfillment]);
  const [pending, startTransition] = useTransition();
  const [paymentMethod, setPaymentMethod] =
    useState<(typeof methods)[number]["id"]>("whatsapp");
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<{
    orderNumber: string;
    whatsappUrl: string;
    totalIls: number;
  } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      city: String(fd.get("city") ?? ""),
      address: String(fd.get("address") ?? ""),
      notes: String(fd.get("notes") ?? "") || undefined,
      couponCode: couponDraft || undefined,
      paymentMethod,
      fulfillment,
      slotDate: String(fd.get("slotDate") ?? ""),
      slotWindow: String(fd.get("slotWindow") ?? ""),
      company: String(fd.get("company") ?? ""),
      lines,
    };

    startTransition(async () => {
      const result = await submitCheckout(payload);
      if (!result.ok) {
        setErrors(result.errors);
        setSuccess(null);
        return;
      }
      setErrors([]);
      setSuccess({
        orderNumber: result.orderNumber,
        whatsappUrl: result.whatsappUrl,
        totalIls: result.totalIls,
      });
      const { pushLocalOrder } = await import("@/lib/local-orders");
      pushLocalOrder({
        orderNumber: result.orderNumber,
        totalIls: result.totalIls,
        createdAt: new Date().toISOString(),
        lines: [...lines],
      });
      clearCart();
    });
  }

  if (success) {
    return (
      <div className="rounded-[1.5rem] bg-white/70 p-8 contact-shadow">
        <p className="font-display text-3xl">ההזמנה התקבלה</p>
        <p className="mt-3 text-ink-muted">
          מספר אסמכתא{" "}
          <bdi className="font-bold text-ink">{success.orderNumber}</bdi>
          {" · "}
          סה״כ <bdi>{formatIls(success.totalIls)}</bdi>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          תשלום כאורחת — בלי חשבון. המאפייה תקבל את המפרט בוואטסאפ.
        </p>
        <a
          href={success.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold contact-shadow mt-6 inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-bold"
        >
          המשך בוואטסאפ
        </a>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-[1.5rem] bg-white/70 p-8 text-center contact-shadow">
        <p className="font-display text-2xl">אין פריטים לתשלום</p>
        <a href="/builder" className="mt-4 inline-block text-sm font-semibold underline">
          להרכבת עוגה
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4 rounded-[1.5rem] bg-white/70 p-6 contact-shadow">
        <h1 className="font-display text-3xl">תשלום כאורחת</h1>
        <p className="text-sm text-ink-muted">
          לא צריך להתחבר כדי לשלם. חובה לבחור תאריך ושעה לפני אישור.
        </p>

        {/* Honeypot */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">חברה</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">איסוף או משלוח</legend>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-ink/10 p-3">
            <input
              type="radio"
              checked={fulfillment === "pickup"}
              onChange={() => setFulfillment("pickup")}
            />
            <span className="text-sm font-medium">איסוף נתניה · חינם</span>
          </label>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-ink/10 p-3">
            <input
              type="radio"
              checked={fulfillment === "delivery"}
              onChange={() => setFulfillment("delivery")}
            />
            <span className="text-sm font-medium">
              משלוח שרון/מרכז · <bdi>₪{siteSettings.shippingFlatIls}</bdi> (חינם
              מעל <bdi>₪{siteSettings.freeShippingFromIls}</bdi>)
            </span>
          </label>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs" htmlFor="slotDate">
              תאריך (מינימום 3 ימי עסקים)
            </label>
            <Input
              id="slotDate"
              name="slotDate"
              type="date"
              required
              min={minSlotDate()}
              dir="ltr"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs" htmlFor="slotWindow">
              חלון שעות
            </label>
            <select
              id="slotWindow"
              name="slotWindow"
              required
              className="flex h-12 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 text-base"
              defaultValue="12:00-15:00"
            >
              {windows.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs" htmlFor="fullName">
              שם מלא
            </label>
            <Input id="fullName" name="fullName" required autoComplete="name" />
          </div>
          <div>
            <label className="mb-1 block text-xs" htmlFor="phone">
              טלפון
            </label>
            <Input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs" htmlFor="email">
              אימייל
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              dir="ltr"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs" htmlFor="city">
              עיר
            </label>
            <Input id="city" name="city" required autoComplete="address-level2" />
          </div>
          <div>
            <label className="mb-1 block text-xs" htmlFor="address">
              {fulfillment === "pickup" ? "כתובת (לאישור)" : "כתובת למשלוח"}
            </label>
            <Input
              id="address"
              name="address"
              required
              autoComplete="street-address"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs" htmlFor="notes">
              הערות (אופציונלי)
            </label>
            <Textarea id="notes" name="notes" />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">אמצעי תשלום</legend>
          {methods.map((m) => (
            <label
              key={m.id}
              className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 bg-white/60 p-3"
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === m.id}
                onChange={() => setPaymentMethod(m.id)}
                className="mt-1"
              />
              <span>
                <span className="block text-sm font-medium">{m.label}</span>
                <span className="block text-xs text-ink-muted">{m.note}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {errors.length > 0 && (
          <ul className="rounded-2xl bg-red-50 p-3 text-sm text-red-800">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending
            ? "מאמת מחיר וסלוט…"
            : `אישור הזמנה · ${formatIls(quote.totalIls)}`}
        </Button>
        <p className="text-xs text-ink-muted">
          המחירים כוללים מע״מ · קופון <bdi>{siteSettings.launchCouponCode}</bdi>{" "}
          בעגלה
        </p>
      </div>

      <aside className="h-fit space-y-3 rounded-[1.5rem] bg-ink p-6 text-pink-soft">
        <p className="font-display text-2xl">סיכום</p>
        {quote.detailed.map((l) => (
          <div
            key={`${l.productId}-${l.variantId}`}
            className="flex justify-between gap-3 text-sm"
          >
            <span>
              {l.title} ×<bdi>{l.quantity}</bdi>
            </span>
            <bdi>{formatIls(l.lineTotalIls)}</bdi>
          </div>
        ))}
        {quote.discountIls > 0 && (
          <div className="flex justify-between text-sm text-gold-2">
            <span>הנחה</span>
            <bdi>−{formatIls(quote.discountIls)}</bdi>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span>משלוח</span>
          <bdi>
            {quote.shippingIls === 0 ? "חינם" : formatIls(quote.shippingIls)}
          </bdi>
        </div>
        <div className="flex justify-between border-t border-white/15 pt-3 font-extrabold">
          <span>סה״כ</span>
          <bdi>{formatIls(quote.totalIls)}</bdi>
        </div>
      </aside>
    </form>
  );
}
