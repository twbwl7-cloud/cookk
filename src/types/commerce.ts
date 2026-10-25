export type CakeCategory = "gan" | "misparim" | "meutzavot";

export type ProductTag = "new" | "bestseller" | "kids" | "luxury" | "custom";

export type ProductVariant = {
  id: string;
  label: string;
  sku: string;
  priceIls: number;
  compareAtIls?: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CakeCategory;
  tags: ProductTag[];
  image: string;
  imageCredit: "real" | "mockup";
  featured: boolean;
  shape: "round" | "sheet" | "number" | "shaped";
  variants: ProductVariant[];
};

export type Collection = {
  id: string;
  slug: CakeCategory;
  title: string;
  description: string;
  productIds: string[];
  coverImage: string;
};

export type Review = {
  id: string;
  author: string;
  city: string;
  rating: number;
  body: string;
  productSlug?: string;
  source: "whatsapp" | "site";
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type SiteSettings = {
  brandName: string;
  legalName: string;
  businessId: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  tagline: string;
  shippingFlatIls: number;
  freeShippingFromIls: number;
  launchCouponCode: string;
  launchCouponPercent: number;
};

export type CakeHybridSpec = {
  kind: "hybrid";
  hybridMode: true;
  baseStyle: {
    category: CakeCategory;
    frost: string;
    piping: string;
    accents: string;
    label: string;
  };
  secondaryStyle: {
    category: CakeCategory;
    frost: string;
    piping: string;
    accents: string;
    label: string;
  };
  fusionRatio: number;
};

export type CakeCustomization = {
  mode: "standard" | "inspire";
  /** Text/numbers to pipe on the cake */
  plaqueText?: string;
  numbersText?: string;
  sugarSheet: "none" | "wanted";
  sugarNote?: string;
  /** Inspiration notes — add / remove / change */
  inspireNotes?: string;
  /** Second cake to merge with (inspire mode) */
  mergeProductId?: string;
  /** Generated / composite preview URL (image reference for order) */
  mergePreviewUrl?: string;
  /** Structured hybrid fusion for order_lines.custom_spec */
  hybridSpec?: CakeHybridSpec;
};

export type CartLine = {
  /** Stable unique id so two custom cakes of same SKU stay separate */
  lineId: string;
  productId: string;
  variantId: string;
  quantity: number;
  customization?: CakeCustomization;
};
