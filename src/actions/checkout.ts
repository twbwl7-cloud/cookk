"use server";

import { checkoutSchema, quoteCart } from "@/lib/pricing";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { absoluteUrl } from "@/lib/site-url";
import { getProductById } from "@/data/products";

export type CheckoutResult =
  | {
      ok: true;
      orderNumber: string;
      totalIls: number;
      whatsappUrl: string;
      paymentMethod: string;
    }
  | { ok: false; errors: string[] };

export async function submitCheckout(
  raw: unknown,
): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((i) => i.message),
    };
  }

  const data = parsed.data;
  const cartLines = data.lines.map((l, i) => ({
    ...l,
    lineId: l.lineId ?? `chk_${i}`,
  }));
  const quote = quoteCart(cartLines, data.couponCode);
  if (quote.errors.length || quote.lines.some((l) => !l.stockOk)) {
    return { ok: false, errors: quote.errors.length ? quote.errors : ["מלאי לא מספיק"] };
  }

  const orderNumber = `LG-${Date.now().toString(36).toUpperCase()}`;

  // Stub: wire to Tranzila/Meshulam/Stripe + iCount + Sheets + SMS later.
  const summary = [
    `הזמנה חדשה ${orderNumber}`,
    `${data.fullName} · ${data.phone}`,
    ...data.lines.map((raw, i) => {
      const priced = quote.lines[i];
      const c = raw.customization;
      const product = getProductById(raw.productId);
      const cakeImage = absoluteUrl(
        c?.mergePreviewUrl || product?.image || "/cakes/brand/logo.jpg",
      );
      const bits = [
        `• ${priced?.title ?? raw.productId} (${priced?.variantLabel ?? ""}) ×${raw.quantity} — ₪${priced?.lineTotalIls ?? "?"}`,
        `  📷 תמונת העוגה במצורף להזמנה:\n  ${cakeImage}`,
      ];
      if (c?.mode === "inspire" || c?.hybridSpec) {
        bits.push("  ★ מוצר אחד: עוגה אחת משולבת · גן × מעוצבת");
      }
      if (c?.inspireNotes)
        bits.push(`  מה להוסיף/להוריד/לשנות: ${c.inspireNotes}`);
      if (c?.hybridSpec) {
        bits.push(
          `  מפרט מחובר: ${c.hybridSpec.baseStyle.label} + ${c.hybridSpec.secondaryStyle.label} (יחס ${(c.hybridSpec.fusionRatio * 100).toFixed(0)}%)`,
        );
      }
      if (c?.plaqueText) bits.push(`  טקסט על העוגה: ${c.plaqueText}`);
      if (c?.numbersText) bits.push(`  מספרים: ${c.numbersText}`);
      if (c?.sugarSheet === "wanted")
        bits.push(`  דף סוכר: כן${c.sugarNote ? ` — ${c.sugarNote}` : ""}`);
      return bits.join("\n");
    }),
    `סה״כ לתשלום: ₪${quote.totalIls}`,
    `אמצעי: ${data.paymentMethod}`,
    data.address,
    data.city,
  ].join("\n");

  const whatsappUrl = whatsappLink(siteSettings.whatsapp, summary);

  return {
    ok: true,
    orderNumber,
    totalIls: quote.totalIls,
    whatsappUrl,
    paymentMethod: data.paymentMethod,
  };
}
