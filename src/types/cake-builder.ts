import type { CakeCategory } from "@/types/commerce";

/** Frosting / accent tokens for the 3D builder */
export type FrostTone = "ivory" | "blush" | "gold" | "sky" | "choc";
export type PipingStyle = "smooth" | "lambeth" | "shell" | "drip";
export type AccentSet = "none" | "bows" | "goldLeaf" | "florals" | "figures";

export type HybridLayerStyle = {
  category: CakeCategory;
  frost: FrostTone;
  piping: PipingStyle;
  accents: AccentSet;
  label: string;
};

/**
 * custom_spec shape stored on order_lines (Supabase JSON / WhatsApp).
 * Hybrid = garden base + couture upper (or reverse) as one cake.
 */
export type CakeCustomSpec = {
  kind: "hybrid" | "single";
  hybridMode: boolean;
  baseStyle: HybridLayerStyle;
  secondaryStyle: HybridLayerStyle;
  /** 0 = all base, 1 = all secondary; sweet spot ~0.45–0.65 */
  fusionRatio: number;
  plaqueText: string;
  numbersText: string;
  sugarSheet: boolean;
  sugarNote: string;
  notes: string;
};

export const FROST_HEX: Record<FrostTone, string> = {
  ivory: "#fff8f0",
  blush: "#f2c4ce",
  gold: "#d4af37",
  sky: "#b8d4e8",
  choc: "#5c4033",
};

export const FROST_LABEL: Record<FrostTone, string> = {
  ivory: "שנהב",
  blush: "בייבי פינק",
  gold: "זהב",
  sky: "תכלת",
  choc: "שוקולד",
};

export const PIPING_LABEL: Record<PipingStyle, string> = {
  smooth: "חלק",
  lambeth: "למבת׳",
  shell: "צדפות",
  drip: "דריפ",
};

export const ACCENT_LABEL: Record<AccentSet, string> = {
  none: "בלי",
  bows: "סרטים",
  goldLeaf: "עלי זהב",
  florals: "פרחים",
  figures: "דמויות",
};

export const CATEGORY_LABEL: Record<CakeCategory, string> = {
  gan: "עוגת גן (בסיס)",
  meutzavot: "מעוצבת (קוטור)",
  misparim: "מספרים",
};
