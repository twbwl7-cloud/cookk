import {
  ADDONS,
  BASES,
  CAKE_COLORS,
  CATEGORIES,
  COATINGS,
  CREAMS,
  EXCLUSIONS,
  FILLINGS,
  THEMES,
  byId,
  categoryOf,
  type CakeKindId,
} from "@/data/custom-cake";
import type { CustomCakeState } from "@/store/custom-cake";

type Snapshot = Pick<
  CustomCakeState,
  | "category"
  | "figure"
  | "sizeId"
  | "baseId"
  | "creamId"
  | "fillingId"
  | "coatingId"
  | "colors"
  | "themeId"
  | "addons"
  | "exclusions"
  | "allergy"
  | "message"
  | "notes"
  | "date"
>;

export function estimateCustomCakeIls(s: Snapshot): number {
  const cat = categoryOf(s.category);
  const size = cat?.sizes.find((x) => x.id === s.sizeId);
  if (!size) return 0;
  let total = size.priceFromIls;
  if (size.perFigure) {
    const n = Math.max(1, s.figure.replace(/\s/g, "").length);
    total = size.priceFromIls * n;
  }
  total += s.addons.length * 25;
  if (s.colors.length > 1) total += (s.colors.length - 1) * 15;
  if (s.addons.includes("ediblePrint") || s.addons.includes("sugarFigure")) total += 40;
  if (s.category === "hybrid") total += 0; // already priced as one cake
  return total;
}

export function servingsLabel(s: Snapshot): string | null {
  const cat = categoryOf(s.category);
  const size = cat?.sizes.find((x) => x.id === s.sizeId);
  if (!size) return null;
  let [min, max] = size.servings;
  if (size.perFigure) {
    const n = Math.max(1, s.figure.replace(/\s/g, "").length);
    min *= n;
    max *= n;
  }
  return min === max ? `${min} מנות` : `כ־${min}–${max} מנות`;
}

export function buildCustomCakeLines(s: Snapshot): { label: string; text: string; step: number }[] {
  const lines: { label: string; text: string; step: number }[] = [];
  const cat = categoryOf(s.category as CakeKindId | null);
  if (cat) lines.push({ label: "סוג", text: cat.title, step: 1 });
  if (cat?.figure && s.figure.trim())
    lines.push({ label: "ספרה / אות", text: s.figure.trim(), step: 1 });
  const size = cat?.sizes.find((x) => x.id === s.sizeId);
  if (size) lines.push({ label: "גודל", text: size.detail ? `${size.label} · ${size.detail}` : size.label, step: 2 });
  const base = byId(BASES, s.baseId);
  if (base) lines.push({ label: "בסיס", text: base.label, step: 2 });
  const cream = byId(CREAMS, s.creamId);
  if (cream) lines.push({ label: "קרם", text: cream.label, step: 3 });
  const filling = byId(FILLINGS, s.fillingId);
  if (filling) lines.push({ label: "מילוי", text: filling.label, step: 3 });
  const coating = byId(COATINGS, s.coatingId);
  if (coating) lines.push({ label: "ציפוי", text: coating.label, step: 3 });
  if (s.colors.length) {
    const names = s.colors
      .map((id) => CAKE_COLORS.find((c) => c.id === id)?.label ?? id)
      .join(", ");
    lines.push({ label: "צבעים", text: names, step: 3 });
  }
  const theme = THEMES.find((t) => t.id === s.themeId);
  if (theme) lines.push({ label: "נושא", text: theme.label, step: 3 });
  if (s.addons.length) {
    lines.push({
      label: "תוספות",
      text: s.addons.map((id) => ADDONS.find((a) => a.id === id)?.label ?? id).join(", "),
      step: 3,
    });
  }
  if (s.message.trim()) lines.push({ label: "כיתוב", text: s.message.trim(), step: 4 });
  if (s.exclusions.length) {
    lines.push({
      label: "הסרות",
      text: s.exclusions.map((id) => EXCLUSIONS.find((e) => e.id === id)?.label ?? id).join(", "),
      step: 4,
    });
  }
  if (s.allergy) lines.push({ label: "אלרגיה", text: "כן — לפרט בוואטסאפ", step: 4 });
  if (s.notes.trim()) lines.push({ label: "מה להוסיף/להוריד/לשנות", text: s.notes.trim(), step: 4 });
  if (s.date) {
    const [y, m, d] = s.date.split("-");
    lines.push({ label: "תאריך", text: d && m && y ? `${d}.${m}.${y}` : s.date, step: 4 });
  }
  return lines;
}

export function buildWhatsAppMessage(s: Snapshot, totalIls: number): string {
  const cat = categoryOf(s.category);
  const lines = buildCustomCakeLines(s);
  const servings = servingsLabel(s);
  return [
    `היי LALIBAKERY! הזמנת עוגה בהתאמה אישית`,
    cat?.id === "hybrid" ? `★ מוצר אחד: עוגה אחת משולבת · גן × מעוצבת` : ``,
    ``,
    ...lines.map((l) => `${l.label}: ${l.text}`),
    servings ? `מנות: ${servings}` : "",
    `מחיר משוער מהאתר: ₪${totalIls}`,
    ``,
    `לפני האפייה נאשר יחד בוואטסאפ בדיוק מה ייצא.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function isCatalogReady() {
  return CATEGORIES.length > 0;
}
