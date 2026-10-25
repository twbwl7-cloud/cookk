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

async function loadFont() {
  const res = await fetch(
    "https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSansHebrew/NotoSansHebrew-Bold.ttf",
  );
  if (!res.ok) {
    // Fallback: Assistant from fonts.gstatic
    const fallback = await fetch(
      "https://fonts.gstatic.com/s/notosanshebrew/v46/or3XQ35RN1Xe7xk02FrkaA.ttf",
    );
    if (!fallback.ok) return null;
    return fallback.arrayBuffer();
  }
  return res.arrayBuffer();
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
          flexDirection: "row",
          background: "linear-gradient(135deg, #fffaf8 0%, #f7d6de 55%, #fff7f9 100%)",
          fontFamily: fonts.length ? "He" : "sans-serif",
          direction: "rtl",
        }}
      >
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
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              background: "rgba(255,255,255,0.94)",
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 22,
              fontWeight: 700,
              color: "#0d0d0d",
              display: "flex",
            }}
          >
            תמונת העוגה להזמנה
          </div>
        </div>

        <div
          style={{
            width: "48%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "36px 34px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
              }}
            >
              הזמנה לאופה
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 20,
                color: "#2a2a2a",
                opacity: 0.7,
                display: "flex",
              }}
            >
              מה שהלקוח בחר — במבט אחד
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                flexDirection: "column",
                gap: 10,
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
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(13,13,13,0.12)",
              paddingTop: 18,
            }}
          >
            <div style={{ fontSize: 18, color: "#2a2a2a", display: "flex" }}>
              לאשר בוואטסאפ לפני אפייה
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#c5a059",
                display: "flex",
              }}
            >
              ★ סטודיו
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
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}
