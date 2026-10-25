import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { decodeOrderPayload, fromOrderPayload } from "@/lib/order-payload";
import {
  buildCustomCakeLines,
  estimateCustomCakeIls,
  servingsLabel,
} from "@/lib/custom-cake-summary";
import { categoryOf } from "@/data/custom-cake";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import { formatIls } from "@/lib/utils";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "כרטיס הזמנה לאופה · LALIBAKERY",
  robots: { index: false, follow: false },
};

export default async function BakerOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const payload = p ? decodeOrderPayload(p) : null;
  if (!payload?.c) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">כרטיס הזמנה לא נמצא</h1>
        <Link href="/custom-cake" className="mt-6 inline-block text-gold-2 underline">
          חזרה לבניית עוגה
        </Link>
      </div>
    );
  }

  const snap = fromOrderPayload(payload);
  const cat = categoryOf(snap.category);
  const total = payload.p ?? estimateCustomCakeIls(snap);
  const lines = buildCustomCakeLines(snap);
  const servings = servingsLabel(snap);
  const cardUrl = absoluteUrl(`/api/order-card?p=${encodeURIComponent(p!)}`);
  const cakeImg = cat?.image ?? "/cakes/brand/logo.jpg";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[11px] font-extrabold tracking-[0.2em] text-gold-2">
        כרטיס לאופה · {siteSettings.brandName}
      </p>
      <h1 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold text-ink">
        מה שהלקוח בחר לעוגה
      </h1>
      <p className="mt-2 text-sm font-medium text-ink/55">
        תמונה + מפרט — לפני האפייה. מקור: {getSiteUrl()}
      </p>

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-ink/8 bg-white shadow-[0_24px_60px_-36px_rgba(13,13,13,0.35)]">
        <div className="relative aspect-[16/10] bg-[#f7f2f0]">
          <Image src={cakeImg} alt="תמונת העוגה שנבחרה" fill className="object-cover" priority />
          {snap.category === "hybrid" && (
            <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold">
              עוגה אחת משולבת · גן × מעוצבת
            </span>
          )}
        </div>
        <div className="border-t border-ink/8 bg-[#fffaf8] p-3">
          {/* Full OG card for baker screenshot / forward */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cardUrl}
            alt="כרטיס הזמנה מעוצב"
            className="w-full rounded-[1rem] border border-ink/8"
          />
        </div>
        <ul className="divide-y divide-ink/8 px-5 py-2">
          {lines.map((l) => (
            <li
              key={l.label + l.text}
              className="flex items-start justify-between gap-4 py-3 text-sm"
            >
              <span className="font-bold text-ink/45">{l.label}</span>
              <span className="max-w-[70%] text-left font-extrabold text-ink">
                {l.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-ink/8 px-5 py-4">
          <div>
            <p className="text-xs font-bold text-ink/45">מחיר משוער</p>
            <p className="font-display text-2xl font-bold">{formatIls(total)}</p>
            {servings && (
              <p className="text-xs font-medium text-ink/50">{servings}</p>
            )}
          </div>
          <a
            href={cardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold-1/40 bg-[#fffaf8] px-4 py-2 text-xs font-extrabold"
          >
            פתיחת תמונת הכרטיס
          </a>
        </div>
      </div>
    </div>
  );
}
