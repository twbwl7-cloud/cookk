import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { getProductById } from "@/data/products";
import { seamlessCakeBlend } from "@/lib/cake-blend";

export const runtime = "nodejs";

/**
 * Seamless one-cake fusion (not a split screen).
 * Structure from base + couture accents from merge, category-aware weights.
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

    if (base.id === merge.id) {
      return NextResponse.json(
        { ok: false, error: "בחרי עוגה שנייה שונה לשילוב" },
        { status: 400 },
      );
    }

    const root = process.cwd();
    const basePath = path.join(root, "public", base.image.replace(/^\//, ""));
    const stylePath = path.join(root, "public", merge.image.replace(/^\//, ""));

    const composed = await seamlessCakeBlend(basePath, stylePath, {
      baseCategory: base.category,
      styleCategory: merge.category,
    });

    const outDir = path.join(root, "public", "generated");
    await fs.mkdir(outDir, { recursive: true });
    const filename = `fusion-${base.category}-${merge.category}-${base.id}-${merge.id}-${Date.now().toString(36)}.jpg`;
    await fs.writeFile(path.join(outDir, filename), composed);

    const pairLabel = `${categoryHe(base.category)} × ${categoryHe(merge.category)}`;

    return NextResponse.json({
      ok: true,
      url: `/generated/${filename}`,
      pair: pairLabel,
      note: `עוגה אחת משולבת (${pairLabel}) — ההדמיה מהצילומים שלנו; העוגה האמיתית תאושר בוואטסאפ.`,
      engine: "seamless-fusion",
    });
  } catch (err) {
    console.error("combine-cakes", err);
    return NextResponse.json(
      { ok: false, error: "לא הצלחנו ליצור את השילוב. נסו שוב." },
      { status: 500 },
    );
  }
}

function categoryHe(c: string) {
  if (c === "gan") return "גן";
  if (c === "misparim") return "מספרים";
  return "מעוצבת";
}
