"use server";

import { checkoutSchema, quoteCart } from "@/lib/pricing";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { guardAction } from "@/lib/request-guard";

export type CheckoutResult =
  | {
      ok: true;
      orderNumber: string;
      totalIls: number;
      whatsappUrl: string;
      paymentMethod: string;
    }
  | { ok: false; errors: string[] };

function addBusinessDays(from: Date, days: number): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 5 && day !== 6) left -= 1; // skip Fri/Sat for IL bakery MVP
  }
  return d;
}

export async function submitCheckout(
  raw: unknown,
): Promise<CheckoutResult> {
  const gate = await guardAction("checkout", 8, 60_000);
  if (!gate.ok) {
    return { ok: false, errors: [gate.error] };
  }

  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: ["בדקו שכל השדות מלאים ותקינים (כולל תאריך איסוף/משלוח)."],
    };
  }

  const data = parsed.data;
  if (data.company) {
    return { ok: false, errors: ["בקשה נדחתה."] };
  }

  const minDate = addBusinessDays(new Date(), 3);
  minDate.setHours(0, 0, 0, 0);
  const slot = new Date(`${data.slotDate}T12:00:00`);
  if (Number.isNaN(slot.getTime()) || slot < minDate) {
    return {
      ok: false,
      errors: ["יש לבחור תאריך לפחות 3 ימי עסקים מראש."],
    };
  }

  const quote = quoteCart(data.lines, data.couponCode);
  if (quote.errors.length || quote.lines.some((l) => !l.stockOk)) {
    return {
      ok: false,
      errors: quote.errors.length
        ? quote.errors
        : ["לא ניתן להשלים את ההזמנה כרגע."],
    };
  }

  const shippingIls =
    data.fulfillment === "pickup" ? 0 : quote.shippingIls;
  const totalIls =
    Math.max(0, quote.subtotalIls - quote.discountIls) + shippingIls;

  const orderNumber = `LB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const summary = [
    `הזמנה חדשה מ-LALIBAKERY!`,
    `אסמכתא: ${orderNumber}`,
    `שם הלקוח/ה: ${data.fullName}`,
    `טלפון: ${data.phone}`,
    `תאריך ושעת איסוף/משלוח: ${data.slotDate} ${data.slotWindow} (${data.fulfillment === "pickup" ? "איסוף נתניה" : "משלוח"})`,
    ...quote.lines.map(
      (l) =>
        `מפרט: ${l.title} (${l.variantLabel}) ×${l.quantity} — ₪${l.lineTotalIls}`,
    ),
    `סה"כ לתשלום: ₪${totalIls}`,
    `אמצעי: ${data.paymentMethod}`,
    data.fulfillment === "delivery" ? `${data.address}, ${data.city}` : data.city,
  ].join("\n");

  const whatsappUrl = whatsappLink(siteSettings.whatsapp, summary);

  return {
    ok: true,
    orderNumber,
    totalIls,
    whatsappUrl,
    paymentMethod: data.paymentMethod,
  };
}
