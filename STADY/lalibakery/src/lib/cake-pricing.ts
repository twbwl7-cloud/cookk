export type CakeFlavor = "velvet_rose" | "belgian_chocolate" | "vanilla_gold";

export type CreamTone =
  | "pearl_white"
  | "baby_blush"
  | "champagne"
  | "soft_lilac"
  | "pistachio"
  | "cocoa_dust"
  | "midnight_noir";

export type PipingStyle =
  | "smooth_buttercream"
  | "classic_ruffles"
  | "shell_border"
  | "rosette_garden"
  | "drip_ganache"
  | "vertical_ribbons"
  | "swiss_dots"
  | "lambeth_lace";

export type CakeDecor =
  | "sugar_flowers"
  | "gold_leaf"
  | "macaron_crown"
  | "name_topper"
  | "sugar_sheet"
  | "fresh_berries"
  | "chocolate_shards";

export const BASE_CAKE_ILS = 250;
export const PLAQUE_MAX = 25;

const TIER_ADD: Record<1 | 2 | 3, number> = { 1: 0, 2: 180, 3: 350 };
const FLAVOR_ADD: Record<CakeFlavor, number> = {
  velvet_rose: 0,
  belgian_chocolate: 30,
  vanilla_gold: 40,
};
const CREAM_ADD: Record<CreamTone, number> = {
  pearl_white: 0,
  baby_blush: 0,
  champagne: 15,
  soft_lilac: 20,
  pistachio: 20,
  cocoa_dust: 25,
  midnight_noir: 30,
};
const PIPING_ADD: Record<PipingStyle, number> = {
  smooth_buttercream: 0,
  classic_ruffles: 45,
  shell_border: 35,
  rosette_garden: 70,
  drip_ganache: 55,
  vertical_ribbons: 50,
  swiss_dots: 40,
  lambeth_lace: 95,
};
const DECOR_ADD: Record<CakeDecor, number> = {
  sugar_flowers: 50,
  gold_leaf: 80,
  macaron_crown: 70,
  name_topper: 45,
  sugar_sheet: 65,
  fresh_berries: 55,
  chocolate_shards: 40,
};

export const CREAM_HEX: Record<CreamTone, string> = {
  pearl_white: "#FFF8F5",
  baby_blush: "#F2C4CE",
  champagne: "#E8D5C4",
  soft_lilac: "#D9CBE8",
  pistachio: "#C9D9C0",
  cocoa_dust: "#6B4E3D",
  midnight_noir: "#1A1A1A",
};

export function quoteCustomCake(input: {
  tiers: 1 | 2 | 3;
  flavor: CakeFlavor;
  creamTone?: CreamTone;
  piping?: PipingStyle;
  decors: CakeDecor[];
}): number {
  const cream = input.creamTone ?? "pearl_white";
  const piping = input.piping ?? "smooth_buttercream";
  const decorSum = input.decors.reduce((s, d) => s + DECOR_ADD[d], 0);
  return (
    BASE_CAKE_ILS +
    TIER_ADD[input.tiers] +
    FLAVOR_ADD[input.flavor] +
    CREAM_ADD[cream] +
    PIPING_ADD[piping] +
    decorSum
  );
}
