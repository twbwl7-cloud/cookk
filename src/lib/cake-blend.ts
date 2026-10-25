import sharp from "sharp";
import type { CakeCategory } from "@/types/commerce";

const SIZE = 960;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * True one-cake blend — no hard half/half seam.
 * Structure from `base`, couture accents from `style`, soft radial+vertical weights.
 * Works gan↔designed, gan↔gan, designed↔designed, numbers↔anything.
 */
export async function seamlessCakeBlend(
  basePath: string,
  stylePath: string,
  opts: {
    baseCategory: CakeCategory;
    styleCategory: CakeCategory;
  },
): Promise<Buffer> {
  const base = await sharp(basePath)
    .resize(SIZE, SIZE, { fit: "cover", position: "centre" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const style = await sharp(stylePath)
    .resize(SIZE, SIZE, { fit: "cover", position: "centre" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: A, info } = base;
  const { data: B } = style;
  const out = Buffer.alloc(A.length);

  const cx = SIZE * 0.5;
  // Bias blend focus: toppings live upper-center on cakes
  const cy =
    opts.baseCategory === "gan" && opts.styleCategory !== "gan"
      ? SIZE * 0.38
      : opts.baseCategory !== "gan" && opts.styleCategory === "gan"
        ? SIZE * 0.42
        : SIZE * 0.4;
  const maxR = Math.hypot(SIZE * 0.55, SIZE * 0.55);

  // How strongly style paints into the center
  let peak =
    opts.baseCategory === opts.styleCategory
      ? 0.62
      : opts.baseCategory === "gan"
        ? 0.72 // designed/numbers accents onto garden body
        : opts.styleCategory === "gan"
          ? 0.55 // garden print into round couture
          : 0.68;

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 3;
      const dx = x - cx;
      const dy = y - cy;
      const r = Math.hypot(dx, dy) / maxR;

      // Soft radial — style strongest at focus, fades to base at edges
      let w = peak * (1 - smoothstep(0.08, 0.92, r));

      // Vertical: a bit more style on the top third (piping / toppers / sugar sheet)
      const topBias = 1 - smoothstep(0.15, 0.75, y / SIZE);
      w *= 0.55 + 0.45 * topBias;

      // Keep corners almost pure base so it still reads as one physical cake on a stand
      const edge = Math.min(x, y, SIZE - 1 - x, SIZE - 1 - y) / (SIZE * 0.12);
      w *= smoothstep(0, 1, edge);

      w = Math.min(0.85, Math.max(0, w));

      out[i] = Math.round(A[i] * (1 - w) + B[i] * w);
      out[i + 1] = Math.round(A[i + 1] * (1 - w) + B[i + 1] * w);
      out[i + 2] = Math.round(A[i + 2] * (1 - w) + B[i + 2] * w);
    }
  }

  // Soft frost polish — dimmed grain so TypeScript OverlayOptions stays happy
  const grain = await sharp(stylePath)
    .resize(SIZE, SIZE, { fit: "cover" })
    .modulate({ brightness: 1.04, saturation: 0.92 })
    .blur(1.2)
    .linear(0.35, 160)
    .png()
    .toBuffer();

  const vignette = Buffer.from(`<svg width="${SIZE}" height="${SIZE}">
    <defs>
      <radialGradient id="v" cx="50%" cy="40%" r="70%">
        <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#1a1014" stop-opacity="0.22"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#v)"/>
  </svg>`);

  const badge = Buffer.from(`<svg width="${SIZE}" height="${SIZE}">
    <rect x="28" y="28" rx="20" ry="20" width="360" height="56" fill="#fffaf8" fill-opacity="0.9"/>
    <text x="48" y="64" font-family="Georgia, serif" font-size="24" fill="#0d0d0d">שילוב אחד · LALIBAKERY</text>
  </svg>`);

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .png()
    .composite([
      { input: grain, blend: "soft-light" },
      { input: vignette, blend: "over" },
      { input: badge, blend: "over" },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
}
