import "server-only";

import { getProductById } from "@/data/products";
import { siteSettings } from "@/data/site";
import type { CartLine } from "@/types/commerce";
import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().min(9).max(20),
  email: z.string().email(),
  city: z.string().min(2).max(60),
  address: z.string().min(5).max(120),
  notes: z.string().max(500).optional(),
  couponCode: z.string().max(32).optional(),
  paymentMethod: z.enum(["card", "bit", "paybox", "whatsapp"]),
  lines: z
    .array(
      z.object({
        lineId: z.string().optional(),
        productId: z.string().min(1),
        variantId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
        customization: z
          .object({
            mode: z.enum(["standard", "inspire"]),
            plaqueText: z.string().max(40).optional(),
            numbersText: z.string().max(20).optional(),
            sugarSheet: z.enum(["none", "wanted"]),
            sugarNote: z.string().max(200).optional(),
            inspireNotes: z.string().max(800).optional(),
            mergeProductId: z.string().optional(),
            mergePreviewUrl: z.string().max(500).optional(),
            hybridSpec: z
              .object({
                kind: z.literal("hybrid"),
                hybridMode: z.literal(true),
                baseStyle: z.object({
                  category: z.enum(["gan", "misparim", "meutzavot"]),
                  frost: z.string(),
                  piping: z.string(),
                  accents: z.string(),
                  label: z.string(),
                }),
                secondaryStyle: z.object({
                  category: z.enum(["gan", "misparim", "meutzavot"]),
                  frost: z.string(),
                  piping: z.string(),
                  accents: z.string(),
                  label: z.string(),
                }),
                fusionRatio: z.number().min(0).max(1),
              })
              .optional(),
          })
          .optional(),
      }),
    )
    .min(1)
    .max(30),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type PricedLine = {
  productId: string;
  variantId: string;
  title: string;
  variantLabel: string;
  unitPriceIls: number;
  quantity: number;
  lineTotalIls: number;
  stockOk: boolean;
};

export type PriceQuote = {
  lines: PricedLine[];
  subtotalIls: number;
  discountIls: number;
  shippingIls: number;
  totalIls: number;
  couponApplied: string | null;
  errors: string[];
};

/** Server-side truth: prices & stock always from catalog, never from client. */
export function quoteCart(
  lines: CartLine[],
  couponCode?: string | null,
): PriceQuote {
  const errors: string[] = [];
  const priced: PricedLine[] = [];

  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product) {
      errors.push(`מוצר לא נמצא: ${line.productId}`);
      continue;
    }
    const variant = product.variants.find((v) => v.id === line.variantId);
    if (!variant) {
      errors.push(`וריאציה לא נמצאה עבור ${product.title}`);
      continue;
    }
    const qty = Math.min(Math.max(1, line.quantity), 20);
    const stockOk = variant.stock >= qty;
    if (!stockOk) {
      errors.push(`מלאי חסר: ${product.title} (${variant.label})`);
    }
    priced.push({
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      variantLabel: variant.label,
      unitPriceIls: variant.priceIls,
      quantity: qty,
      lineTotalIls: variant.priceIls * qty,
      stockOk,
    });
  }

  const subtotalIls = priced.reduce((sum, l) => sum + l.lineTotalIls, 0);
  let discountIls = 0;
  let couponApplied: string | null = null;
  const normalized = couponCode?.trim().toUpperCase() ?? "";
  if (normalized) {
    if (normalized === siteSettings.launchCouponCode) {
      discountIls = Math.round(
        (subtotalIls * siteSettings.launchCouponPercent) / 100,
      );
      couponApplied = siteSettings.launchCouponCode;
    } else {
      errors.push("קוד קופון לא תקין");
    }
  }

  const afterDiscount = Math.max(0, subtotalIls - discountIls);
  const shippingIls =
    afterDiscount >= siteSettings.freeShippingFromIls || afterDiscount === 0
      ? 0
      : siteSettings.shippingFlatIls;

  return {
    lines: priced,
    subtotalIls,
    discountIls,
    shippingIls,
    totalIls: afterDiscount + shippingIls,
    couponApplied,
    errors,
  };
}
