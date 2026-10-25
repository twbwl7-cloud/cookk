"use client";

import Image from "next/image";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { JellyButton } from "@/components/motion/JellyButton";

/**
 * Full-bleed psych hero — cake edge-to-edge · free text RIGHT · NO card.
 *
 * Book: P01 complete first frame · P03 one CTA · P05 curiosity · P06 fluency
 * P14 proof · P17 numbers · P19 effort · P24 IKEA · P25 scarcity · N05
 */
const H1 = "את מעצבת את העוגה — לפני שמשלמים שקל";
const H2 =
  "מחיר שקוף על המסך · בסיס מ־₪250 · איסוף מסטודיו נתניה · בלי הפתעות בקופה.";
const SRC = "/cakes/hero/hero-atelier-blush-gold.jpg";

export function Hero() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! רציתי לסגור עוגה לאירוע — ראיתי את האתר`,
  );

  return (
    <section
      className="relative min-h-[92svh] overflow-hidden bg-[#fff5f7] sm:min-h-[94svh]"
      aria-label="פתח · LALIBAKERY"
    >
      {/* FULL-BLEED cake — entire hero */}
      <div className="absolute inset-0" data-hero-visual>
        <Image
          src={SRC}
          alt="עוגת couture לבנה עם סרטים ורודים ועלי זהב — צילום סטודיו"
          fill
          priority
          quality={94}
          sizes="100vw"
          /* Pan so cake sits center-left; RIGHT stays open for freestanding copy */
          className="object-cover object-[72%_40%] sm:object-[70%_38%] lg:object-[68%_36%]"
        />
      </div>

      {/* Soft RIGHT wash — atmosphere only, NOT a card/frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, transparent 42%, rgba(255,250,248,0.45) 58%, rgba(255,250,248,0.82) 74%, rgba(255,250,248,0.94) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto min-h-[92svh] max-w-6xl px-5 pt-28 sm:min-h-[94svh] sm:px-8 lg:pt-24">
        {/* Physical RIGHT — freestanding typography */}
        <div className="absolute bottom-16 right-5 w-[min(100%-2.5rem,36rem)] text-right sm:right-8 sm:bottom-20 lg:bottom-auto lg:top-[48%] lg:w-[min(34rem,46%)] lg:-translate-y-1/2">
          {/* P25 + P14 */}
          <p className="text-[11px] font-extrabold tracking-wide text-ink">
            <span className="me-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c45c6a] align-middle" />
            נשארו 2 מקומות לסופ״ש
            <span className="mx-2 text-ink/35">·</span>
            <span className="font-bold text-ink/55">
              ★ 4.9 · אימהות מנתניה והסביבה
            </span>
          </p>

          <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-2">
            Haute Pâtisserie · Netanya
          </p>

          <p className="mt-3 font-display text-[clamp(2.1rem,4.8vw,3rem)] font-bold leading-none tracking-[-0.03em] text-ink">
            {siteSettings.brandName}
          </p>

          {/* P01 + P05 + P24 — always fully visible */}
          <h1 className="mt-4 font-display text-balance text-[clamp(2.05rem,5.4vw,3.45rem)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
            {H1}
          </h1>

          {/* P17 */}
          <p className="ml-auto mt-4 max-w-md text-[clamp(0.95rem,1.5vw,1.12rem)] font-semibold leading-snug text-ink/78">
            {H2.split("₪250").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <bdi className="font-extrabold text-ink">₪250</bdi>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </p>

          {/* P19 */}
          <p className="mt-3 text-xs font-bold text-ink/50">
            72 שעות מהקמח עד הקופסה · עד 5 עוגות מורכבות ביום
          </p>

          {/* P03 + P35 — jelly dough CTA */}
          <div className="mt-8 flex flex-col items-end gap-3">
            <JellyButton href="/shop" magneticLabel="שלי">
              לבחור את העוגה שלי
            </JellyButton>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor-label="וואטסאפ"
              className="text-sm font-bold text-ink/70 underline decoration-gold-1/70 underline-offset-4 hover:text-ink"
            >
              או וואטסאפ אנושי · <bdi>{siteSettings.phone}</bdi>
            </a>
            <p className="text-[11px] font-semibold text-ink/45">
              Guest checkout · קופון <bdi>{siteSettings.launchCouponCode}</bdi> ·
              מינימום 3 ימי עסקים
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
