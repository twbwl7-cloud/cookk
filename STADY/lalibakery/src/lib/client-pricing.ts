import { getProductById } from "@/data/products";
import { siteSettings } from "@/data/site";
import { quoteCustomCake } from "@/lib/cake-pricing";
import type { CartLine } from "@/types/commerce";

/** Display-only estimate. Final totals always recalculated on the server. */
export function estimateCart(lines: CartLine[], couponCode?: string) {
  let subtotalIls = 0;
  const detailed = lines.map((line) => {
    if (line.lineType === "custom_cake" && line.customSpec) {
      const unit = quoteCustomCake(line.customSpec);
      const lineTotal = unit * line.quantity;
      subtotalIls += lineTotal;
      return {
        ...line,
        title: `עוגה מותאמת · ${line.customSpec.tiers} קומות`,
        variantLabel: line.customSpec.flavor,
        unitPriceIls: unit,
        lineTotalIls: lineTotal,
        image: "/cakes/hero/round-gold-crown.jpg",
        stock: 99,
      };
    }

    const product = getProductById(line.productId);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    const unit = variant?.priceIls ?? 0;
    const lineTotal = unit * line.quantity;
    subtotalIls += lineTotal;
    return {
      ...line,
      title: product?.title ?? "מוצר",
      variantLabel: variant?.label ?? "",
      unitPriceIls: unit,
      lineTotalIls: lineTotal,
      image: product?.image ?? "",
      stock: variant?.stock ?? 0,
    };
  });

  let discountIls = 0;
  const normalized = couponCode?.trim().toUpperCase() ?? "";
  if (normalized === siteSettings.launchCouponCode) {
    discountIls = Math.round(
      (subtotalIls * siteSettings.launchCouponPercent) / 100,
    );
  }

  const after = Math.max(0, subtotalIls - discountIls);
  const shippingIls =
    after >= siteSettings.freeShippingFromIls || after === 0
      ? 0
      : siteSettings.shippingFlatIls;

  return {
    detailed,
    subtotalIls,
    discountIls,
    shippingIls,
    totalIls: after + shippingIls,
    couponValid: normalized === siteSettings.launchCouponCode,
  };
}
