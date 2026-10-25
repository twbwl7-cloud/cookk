import { ImageResponse } from "next/og";
import {
  BASES,
  CAKE_COLORS,
  COATINGS,
  CREAMS,
  FILLINGS,
  THEMES,
  byId,
  categoryOf,
} from "@/data/custom-cake";
import { decodeOrderPayload, fromOrderPayload } from "@/lib/order-payload";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

/**
 * Satori (next/og) does not layout Hebrew RTL correctly — characters appear
 * reversed. Pre-reverse logical Hebrew so the rendered bitmap reads right-to-left.
 */
function he(text: string): string {
  if (!text) return "";
  // Keep Latin / digits / currency stable; reverse the full visual line for Satori
  return Array.from(text).reverse().join("");
}

async function loadFont() {
  const urls = [
    "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansHebrew/NotoSansHebrew-Bold.ttf",
    "https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansHebrew/NotoSansHebrew-Bold.ttf",
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.arrayBuffer();
    } catch {
      /* try next */
    }
  }
  return null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("p") || "";
  const payload = decodeOrderPayload(raw);
  if (!payload?.c) {
    return new Response("Missing order", { status: 400 });
  }

  const snap = fromOrderPayload(payload);
  const cat = categoryOf(snap.category);
  const site = getSiteUrl();
  const cakeSrc = cat?.image
    ? cat.image.startsWith("http")
      ? cat.image
      : `${site}${cat.image}`
    : `${site}/cakes/brand/logo.jpg`;

  const rows: string[] = [];
  if (cat) rows.push(`סוג: ${cat.title}`);
  if (snap.figure) rows.push(`ספרה/אות: ${snap.figure}`);
  const size = cat?.sizes.find((x) => x.id === snap.sizeId);
  if (size) rows.push(`גודל: ${size.label}`);
  const base = byId(BASES, snap.baseId);
  if (base) rows.push(`בסיס: ${base.label}`);
  const cream = byId(CREAMS, snap.creamId);
  if (cream) rows.push(`קרם: ${cream.label}`);
  const filling = byId(FILLINGS, snap.fillingId);
  if (filling) rows.push(`מילוי: ${filling.label}`);
  const coating = byId(COATINGS, snap.coatingId);
  if (coating) rows.push(`ציפוי: ${coating.label}`);
  if (snap.colors.length) {
    rows.push(
      `צבעים: ${snap.colors.map((id) => CAKE_COLORS.find((c) => c.id === id)?.label ?? id).join(", ")}`,
    );
  }
  const theme = THEMES.find((t) => t.id === snap.themeId);
  if (theme) rows.push(`נושא: ${theme.label}`);
  if (snap.message) rows.push(`כיתוב: ${snap.message}`);
  if (snap.notes) rows.push(`בקשות: ${snap.notes.slice(0, 90)}`);
  if (payload.p) rows.push(`מחיר משוער: ₪${payload.p}`);

  const fontData = await loadFont();
  const fonts = fontData
    ? [
        {
          name: "He",
          data: fontData,
          style: "normal" as const,
          weight: 700 as const,
        },
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          background: "linear-gradient(135deg, #fffaf8 0%, #f7d6de 55%, #fff7f9 100%)",
          fontFamily: fonts.length ? "He" : "sans-serif",
        }}
      >
        {/* Cake photo — no badges / no selection circles */}
        <div
          style={{
            width: "52%",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cakeSrc}
            alt=""
            width={624}
            height={630}
            style={{
              width: "112%",
              height: "112%",
              objectFit: "cover",
              objectPosition: "50% 42%",
              marginTop: "-4%",
              marginRight: "-4%",
            }}
          />
          {/* Cover studio sticker / selection circle on cake boards */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 120,
              height: 120,
              background:
                "radial-gradient(circle at 30% 70%, rgba(255,250,248,0.96) 0%, rgba(255,250,248,0) 70%)",
              display: "flex",
            }}
          />
        </div>

        <div
          style={{
            width: "48%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "36px 34px",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 18,
                letterSpacing: 3,
                color: "#c5a059",
                fontWeight: 700,
                display: "flex",
              }}
            >
              LALIBAKERY
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 36,
                fontWeight: 700,
                color: "#0d0d0d",
                lineHeight: 1.15,
                display: "flex",
                textAlign: "right",
              }}
            >
              {he("הזמנה לאופה")}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 20,
                color: "#2a2a2a",
                opacity: 0.7,
                display: "flex",
                textAlign: "right",
              }}
            >
              {he("מה שהלקוח בחר — במבט אחד")}
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              {rows.slice(0, 9).map((line) => (
                <div
                  key={line}
                  style={{
                    fontSize: 22,
                    color: "#0d0d0d",
                    fontWeight: 700,
                    display: "flex",
                    lineHeight: 1.25,
                    textAlign: "right",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  {he(line)}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(13,13,13,0.12)",
              paddingTop: 18,
              width: "100%",
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: "#2a2a2a",
                display: "flex",
                textAlign: "right",
              }}
            >
              {he("לאשר בוואטסאפ לפני אפייה")}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#c5a059",
                display: "flex",
              }}
            >
              {he("סטודיו")}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    },
  );
}
