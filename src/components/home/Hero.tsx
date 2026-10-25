"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Attraction hero — book stack:
 * P01 first 50ms impression · P02 beauty = ease · P03 CTA isolation
 * P06 processing fluency (ink on cream) · P14 social proof · P17 specificity
 * P19 effort · P24 IKEA path · P25 real scarcity · P35 large CTA
 * N05 cakes: pride + pastels + one gold contrast · NO dark void · NO white-on-cake
 */
const H1 = "העוגה שסוגרת את המסיבה";
const H2 =
  "את בוחרת עיצוב — אנחנו מציגים מחיר שקוף לפני התשלום. בסיס מ־₪250 · איסוף מסטודיו נתניה.";
const SRC = "/cakes/hero/hero-atelier-blush-gold.jpg";
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const words = H1.split(" ");
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! ראיתי את ההירו ואשמח להזמין עוגה`,
  );

  return (
    <section
      className="relative min-h-[88svh] overflow-hidden bg-[#fff5f7] sm:min-h-[90svh]"
      aria-label="פתח · LALIBAKERY"
    >
      {/* Soft atelier atmosphere — never flat white, never black void */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 18% 42%, #f2c4ce66 0%, transparent 58%), radial-gradient(ellipse 45% 40% at 88% 12%, #d4af3722 0%, transparent 50%), linear-gradient(165deg, #fffaf8 0%, #ffe9f0 48%, #f7d6de 100%)",
        }}
      />

      {/* Full-bleed appetite photo — static, studio, left-weighted */}
      <div className="absolute inset-y-0 start-0 w-full lg:w-[62%]" data-hero-visual>
        <Image
          src={SRC}
          alt="עוגת couture לבנה עם סרטים ורודים ועלי זהב — צילום סטודיו אמיתי"
          fill
          priority
          quality={92}
          sizes="(max-width:1024px) 100vw, 62vw"
          className="object-cover object-[58%_40%] sm:object-[52%_38%]"
        />
        {/* Soft blush veil so the cake still reads premium, not clinical */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-l from-[#fff5f7] via-[#fff5f7]/35 to-transparent lg:from-[#fff5f7]/95 lg:via-[#fff5f7]/25 lg:to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fff5f7] to-transparent lg:hidden"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl items-end px-4 pb-14 pt-24 sm:min-h-[90svh] sm:px-6 sm:pb-16 lg:items-center lg:pt-20">
        {/* Cream liquid-glass copy panel — P06 fluency, never white-on-cake */}
        <motion.div
          className="ms-auto w-full max-w-xl rounded-[1.75rem] border border-white/70 bg-[#fffaf8]/92 p-6 shadow-[0_24px_80px_-28px_rgba(13,13,13,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:p-8 lg:max-w-[28.5rem]"
          initial={reduce ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          {/* P25 real scarcity + P14 social proof */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-1/40 bg-pink-soft/80 px-3 py-1 text-[11px] font-extrabold tracking-wide text-ink">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c45c6a]" />
              נשארו 2 מקומות לסופ״ש
            </span>
            <span className="text-[11px] font-bold text-ink/55">
              ★ 4.9 · אימהות מנתניה והסביבה
            </span>
          </div>

          <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-2">
            Haute Pâtisserie · Netanya
          </p>

          {/* Brand first — hero-level signal */}
          <p className="mt-3 font-display text-[clamp(1.85rem,4vw,2.45rem)] font-bold leading-none tracking-[-0.03em] text-ink">
            {siteSettings.brandName}
          </p>

          {/* P01 concrete headline — ink, not white */}
          <h1 className="mt-4 font-display text-balance text-[clamp(2.15rem,5.2vw,3.35rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-bottom pe-[0.14em] last:pe-0"
              >
                <motion.span
                  className="inline-block text-ink"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.12 + i * 0.07,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* P17 specificity */}
          <p className="mt-4 text-[0.98rem] font-semibold leading-relaxed text-ink/72">
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

          {/* P19 effort cue */}
          <p className="mt-3 text-xs font-bold text-ink/50">
            72 שעות עבודה מהקמח עד הקופסה · עד 5 עוגות מורכבות ביום
          </p>

          {/* P03 isolation — one gold CTA + soft secondary */}
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/shop"
              data-magnetic
              data-cursor-label="CAKES"
              className="btn-gold contact-shadow inline-flex h-13 min-h-12 min-w-[200px] items-center justify-center rounded-full px-8 text-base font-extrabold tracking-[-0.02em] text-ink"
            >
              לבחור את העוגה שלי
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 bg-white/70 px-6 text-sm font-bold text-ink backdrop-blur-md transition hover:border-gold-1/50 hover:bg-white"
            >
              וואטסאפ · <bdi className="ms-1">{siteSettings.phone}</bdi>
            </a>
          </div>

          <p className="mt-4 text-[11px] font-semibold text-ink/45">
            Guest checkout · קופון <bdi>{siteSettings.launchCouponCode}</bdi> · מינימום 3 ימי עסקים
          </p>
        </motion.div>
      </div>
    </section>
  );
}
