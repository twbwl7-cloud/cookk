import { getProductById } from "@/data/products";
import { siteSettings } from "@/data/site";
import type { CartLine } from "@/types/commerce";

/** Display-only estimate. Final totals always recalculated on the server. */
export function estimateCart(lines: CartLine[], couponCode?: string) {
  let subtotalIls = 0;
  const detailed = lines.map((line) => {
    const product = getProductById(line.productId);
    const variant = product?.variants.find((v) => v.id === line.variantId);
    const unit = variant?.priceIls ?? 0;
    const lineTotal = unit * line.quantity;
    subtotalIls += lineTotal;
    const customBits: string[] = [];
    const c = line.customization;
    if (c?.mode === "inspire" || c?.hybridSpec)
      customBits.push("עוגה אחת משולבת · גן × מעוצבת");
    if (c?.plaqueText) customBits.push(`טקסט: ${c.plaqueText}`);
    if (c?.numbersText) customBits.push(`מספרים: ${c.numbersText}`);
    if (c?.sugarSheet === "wanted") customBits.push("דף סוכר");
    if (c?.inspireNotes) customBits.push("הערות התאמה");

    return {
      ...line,
      title: product?.title ?? "מוצר",
      variantLabel: variant?.label ?? "",
      customSummary: customBits.join(" · "),
      inspireNotes: c?.inspireNotes,
      unitPriceIls: unit,
      lineTotalIls: lineTotal,
      image: c?.mergePreviewUrl || product?.image || "",
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
