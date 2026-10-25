import "server-only";

import { z } from "zod";
import type { CakeCustomSpec } from "@/types/cake-builder";

const layerSchema = z.object({
  category: z.enum(["gan", "misparim", "meutzavot"]),
  frost: z.enum(["ivory", "blush", "gold", "sky", "choc"]),
  piping: z.enum(["smooth", "lambeth", "shell", "drip"]),
  accents: z.enum(["none", "bows", "goldLeaf", "florals", "figures"]),
  label: z.string().max(80),
});

export const cakeCustomSpecSchema = z.object({
  kind: z.enum(["hybrid", "single"]),
  hybridMode: z.boolean(),
  baseStyle: layerSchema,
  secondaryStyle: layerSchema,
  fusionRatio: z.number().min(0).max(1),
  plaqueText: z.string().max(25),
  numbersText: z.string().max(12),
  sugarSheet: z.boolean(),
  sugarNote: z.string().max(200),
  notes: z.string().max(800),
});

export type CakePriceQuote = {
  ok: true;
  spec: CakeCustomSpec;
  baseIls: number;
  secondaryIls: number;
  fusionIls: number;
  extrasIls: number;
  totalIls: number;
  breakdownHe: string[];
};

const BASE_BY_CAT = { gan: 250, misparim: 320, meutzavot: 420 } as const;
const PIPING_FEE = { smooth: 0, lambeth: 45, shell: 25, drip: 35 } as const;
const ACCENT_FEE = {
  none: 0,
  bows: 30,
  goldLeaf: 55,
  florals: 40,
  figures: 60,
} as const;

function layerPrice(layer: CakeCustomSpec["baseStyle"]) {
  return (
    BASE_BY_CAT[layer.category] +
    PIPING_FEE[layer.piping] +
    ACCENT_FEE[layer.accents]
  );
}

/** Server-side hybrid pricing — never trust client totals. */
export function quoteHybridCake(raw: unknown): CakePriceQuote | { ok: false; errors: string[] } {
  const parsed = cakeCustomSpecSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((i) => i.message),
    };
  }
  const spec = parsed.data as CakeCustomSpec;

  const baseIls = layerPrice(spec.baseStyle);
  const secondaryIls = spec.hybridMode ? layerPrice(spec.secondaryStyle) : 0;

  // Fusion craft fee scales with how mixed the styles are (peak at 0.5)
  const mix = spec.hybridMode
    ? 1 - Math.abs(spec.fusionRatio - 0.5) * 2
    : 0;
  const fusionIls = spec.hybridMode
    ? Math.round(80 + mix * 70 + spec.fusionRatio * secondaryIls * 0.35)
    : 0;

  let extrasIls = 0;
  if (spec.plaqueText.trim()) extrasIls += 25;
  if (spec.numbersText.trim()) extrasIls += 35;
  if (spec.sugarSheet) extrasIls += 55;

  const totalIls = baseIls + (spec.hybridMode ? fusionIls : 0) + extrasIls;

  const breakdownHe: string[] = [
    `בסיס ${spec.baseStyle.label || spec.baseStyle.category}: ₪${baseIls}`,
  ];
  if (spec.hybridMode) {
    breakdownHe.push(
      `שכבת קוטור ${spec.secondaryStyle.label || spec.secondaryStyle.category}: משקל ${(spec.fusionRatio * 100).toFixed(0)}%`,
    );
    breakdownHe.push(`עמלת שילוב Hybrid: ₪${fusionIls}`);
  }
  if (spec.plaqueText.trim())
    breakdownHe.push(`טקסט על העוגה «${spec.plaqueText}»: ₪25`);
  if (spec.numbersText.trim())
    breakdownHe.push(`מספרים «${spec.numbersText}»: ₪35`);
  if (spec.sugarSheet) breakdownHe.push(`דף סוכר: ₪55`);
  breakdownHe.push(`סה״כ: ₪${totalIls}`);

  return {
    ok: true,
    spec,
    baseIls,
    secondaryIls,
    fusionIls,
    extrasIls,
    totalIls,
    breakdownHe,
  };
}

export function formatHybridWhatsApp(opts: {
  phoneName?: string;
  quote: CakePriceQuote;
}): string {
  const { quote } = opts;
  const s = quote.spec;
  const lines = [
    `היי LALIBAKERY! הזמנת עוגה אחת משולבת · גן × מעוצבת`,
    ``,
    s.hybridMode
      ? `★ מוצר אחד: עוגה אחת מחוברת (בסיס גן + אלמנט קוטור)`
      : `מצב: עוגה יחידה`,
    `בסיס: ${s.baseStyle.category} · ${s.baseStyle.frost} · ${s.baseStyle.piping} · ${s.baseStyle.accents}`,
  ];
  if (s.hybridMode) {
    lines.push(
      `קוטור משולב: ${s.secondaryStyle.category} · ${s.secondaryStyle.frost} · ${s.secondaryStyle.piping} · ${s.secondaryStyle.accents}`,
      `יחס שילוב: ${(s.fusionRatio * 100).toFixed(0)}%`,
    );
  }
  if (s.plaqueText) lines.push(`טקסט: ${s.plaqueText}`);
  if (s.numbersText) lines.push(`מספרים: ${s.numbersText}`);
  if (s.sugarSheet)
    lines.push(`דף סוכר: כן${s.sugarNote ? ` — ${s.sugarNote}` : ""}`);
  if (s.notes) lines.push(`הערות: ${s.notes}`);
  lines.push(``, ...quote.breakdownHe);
  return lines.join("\n");
}
