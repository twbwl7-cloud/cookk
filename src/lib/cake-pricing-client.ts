import type { CakeCustomSpec, HybridLayerStyle } from "@/types/cake-builder";

const BASE_BY_CAT = { gan: 250, misparim: 320, meutzavot: 420 } as const;
const PIPING_FEE = { smooth: 0, lambeth: 45, shell: 25, drip: 35 } as const;
const ACCENT_FEE = {
  none: 0,
  bows: 30,
  goldLeaf: 55,
  florals: 40,
  figures: 60,
} as const;

function layerPrice(layer: HybridLayerStyle) {
  return (
    BASE_BY_CAT[layer.category] +
    PIPING_FEE[layer.piping] +
    ACCENT_FEE[layer.accents]
  );
}

/** Display-only estimate — server quoteHybridCake is the source of truth. */
export function estimateHybridClient(spec: CakeCustomSpec) {
  const baseIls = layerPrice(spec.baseStyle);
  const mix = spec.hybridMode
    ? 1 - Math.abs(spec.fusionRatio - 0.5) * 2
    : 0;
  const fusionIls = spec.hybridMode
    ? Math.round(
        80 +
          mix * 70 +
          spec.fusionRatio * layerPrice(spec.secondaryStyle) * 0.35,
      )
    : 0;
  let extrasIls = 0;
  if (spec.plaqueText.trim()) extrasIls += 25;
  if (spec.numbersText.trim()) extrasIls += 35;
  if (spec.sugarSheet) extrasIls += 55;
  return {
    baseIls,
    fusionIls,
    extrasIls,
    totalIls: baseIls + fusionIls + extrasIls,
  };
}
