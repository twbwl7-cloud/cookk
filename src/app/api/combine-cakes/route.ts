import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { getProductById } from "@/data/products";

export const runtime = "nodejs";

/**
 * Merge two studio cake photos into one haute-couture composite.
 * Uses soft center blend so the result reads as one new cake.
 * Optional OPENAI_API_KEY path can be wired later for generative AI.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      baseProductId?: string;
      mergeProductId?: string;
      notes?: string;
    };

    const base = body.baseProductId
      ? getProductById(body.baseProductId)
      : undefined;
    const merge = body.mergeProductId
      ? getProductById(body.mergeProductId)
      : undefined;

    if (!base || !merge) {
      return NextResponse.json(
        { ok: false, error: "חסרות שתי עוגות לשילוב" },
        { status: 400 },
      );
    }

    const root = process.cwd();
    const leftPath = path.join(root, "public", base.image.replace(/^\//, ""));
    const rightPath = path.join(root, "public", merge.image.replace(/^\//, ""));

    const size = 900;
    const half = Math.floor(size / 2);

    const left = await sharp(leftPath)
      .resize(size, size, { fit: "cover" })
      .extract({ left: 0, top: 0, width: half + 40, height: size })
      .png()
      .toBuffer();

    const right = await sharp(rightPath)
      .resize(size, size, { fit: "cover" })
      .extract({
        left: Math.max(0, size - half - 40),
        top: 0,
        width: half + 40,
        height: size,
      })
      .png()
      .toBuffer();

    // Soft vignette overlay for "studio" realism
    const vignette = Buffer.from(
      `<svg width="${size}" height="${size}">
        <defs>
          <radialGradient id="g" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stop-color="#fffaf8" stop-opacity="0"/>
            <stop offset="100%" stop-color="#1a1012" stop-opacity="0.28"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
      </svg>`,
    );

    const label = Buffer.from(
      `<svg width="${size}" height="${size}">
        <rect x="24" y="24" rx="18" ry="18" width="320" height="52" fill="#fffaf8" fill-opacity="0.88"/>
        <text x="40" y="58" font-family="Georgia, serif" font-size="22" fill="#0d0d0d">שילוב השראה · LALIBAKERY</text>
      </svg>`,
    );

    const composed = await sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: { r: 255, g: 250, b: 248 },
      },
    })
      .composite([
        { input: left, left: 0, top: 0 },
        { input: right, left: half - 40, top: 0 },
        { input: vignette, left: 0, top: 0 },
        { input: label, left: 0, top: 0 },
      ])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    const outDir = path.join(root, "public", "generated");
    await fs.mkdir(outDir, { recursive: true });
    const filename = `combine-${base.id}-${merge.id}-${Date.now().toString(36)}.jpg`;
    await fs.writeFile(path.join(outDir, filename), composed);

    return NextResponse.json({
      ok: true,
      url: `/generated/${filename}`,
      note:
        "הדמיית שילוב מהצילומים שלנו — העוגה האמיתית תאושר בוואטסאפ לפני אפייה.",
      engine: process.env.OPENAI_API_KEY ? "composite+ai-ready" : "studio-composite",
    });
  } catch (err) {
    console.error("combine-cakes", err);
    return NextResponse.json(
      { ok: false, error: "לא הצלחנו ליצור את השילוב. נסו שוב." },
      { status: 500 },
    );
  }
}
