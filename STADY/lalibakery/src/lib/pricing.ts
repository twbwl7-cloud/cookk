import "server-only";

import { getProductById } from "@/data/products";
import { siteSettings } from "@/data/site";
import { quoteCustomCake } from "@/lib/cake-pricing";
import type { CartLine, CustomCakeSpec } from "@/types/commerce";
import { z } from "zod";

const customSpecSchema = z.object({
  tiers: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  flavor: z.enum(["velvet_rose", "belgian_chocolate", "vanilla_gold"]),
  creamTone: z.enum([
    "pearl_white",
    "baby_blush",
    "champagne",
    "soft_lilac",
    "pistachio",
    "cocoa_dust",
    "midnight_noir",
  ]),
  piping: z.enum([
    "smooth_buttercream",
    "classic_ruffles",
    "shell_border",
    "rosette_garden",
    "drip_ganache",
    "vertical_ribbons",
    "swiss_dots",
    "lambeth_lace",
  ]),
  decors: z.array(
    z.enum([
      "sugar_flowers",
      "gold_leaf",
      "macaron_crown",
      "name_topper",
      "sugar_sheet",
      "fresh_berries",
      "chocolate_shards",
    ]),
  ),
  plaqueText: z.string().max(25),
  allergies: z.array(z.enum(["gluten_free", "vegan", "sugar_free"])),
  notes: z.string().max(500),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(2).max(80),
  phone: z.string().min(9).max(20),
  email: z.string().email().max(120),
  city: z.string().min(2).max(60),
  address: z.string().min(5).max(120),
  notes: z.string().max(500).optional(),
  couponCode: z.string().max(32).optional(),
  paymentMethod: z.enum(["card", "whatsapp"]),
  fulfillment: z.enum(["pickup", "delivery"]),
  slotDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slotWindow: z.enum(["09:00-12:00", "12:00-15:00", "15:00-18:00"]),
  /** Honeypot — must stay empty */
  company: z.string().max(80).optional(),
  lines: z
    .array(
      z.object({
        lineType: z.enum(["catalog", "custom_cake"]).optional(),
        productId: z.string().min(1),
        variantId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
        customSpec: customSpecSchema.optional(),
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
  lineType: "catalog" | "custom_cake";
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

function serverQuoteCustom(spec: CustomCakeSpec): number {
  return quoteCustomCake(spec);
}

/** Server-side truth: prices & stock always from catalog / locked matrix. */
export function quoteCart(
  lines: CartLine[],
  couponCode?: string | null,
): PriceQuote {
  const errors: string[] = [];
  const priced: PricedLine[] = [];

  for (const line of lines) {
    const qty = Math.min(Math.max(1, line.quantity), 20);

    if (line.lineType === "custom_cake" || line.productId === "custom_cake") {
      if (!line.customSpec) {
        errors.push("מפרט עוגה מותאמת חסר");
        continue;
      }
      const parsed = customSpecSchema.safeParse(line.customSpec);
      if (!parsed.success) {
        errors.push("מפרט עוגה מותאמת לא תקין");
        continue;
      }
      if (parsed.data.plaqueText.length > 25) {
        errors.push("טקסט הפלאק ארוך מ־25 תווים");
        continue;
      }
      const unit = serverQuoteCustom(parsed.data);
      priced.push({
        productId: "custom_cake",
        variantId: line.variantId,
        title: `עוגה מותאמת · ${parsed.data.tiers} קומות`,
        variantLabel: parsed.data.flavor,
        unitPriceIls: unit,
        quantity: qty,
        lineTotalIls: unit * qty,
        stockOk: true,
        lineType: "custom_cake",
      });
      continue;
    }

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
      lineType: "catalog",
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
