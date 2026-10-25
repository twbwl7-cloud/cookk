"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Full-bleed appetite hero — NO card / NO frame / NO dark void.
 *
 * Book stack (ספר מיליונים):
 * P01 50ms soft impression · P02 beauty=ease · P03 one gold CTA
 * P05 curiosity gap · P06 fluency (ink on blush wash, never white-on-cake)
 * P14 social proof · P17 specificity · P19 effort · P21 product to hand
 * P24 IKEA pride · P25 real scarcity · P35/P36 large CTA at peak motivation
 * N05 cakes: excitement+pride · pastels · soft display · one gold contrast
 */
const H1 = "את מעצבת את העוגה — לפני שמשלמים שקל";
const H2 =
  "מחיר שקוף על המסך · בסיס מ־₪250 · איסוף מסטודיו נתניה · בלי הפתעות בקופה.";
const SRC = "/cakes/hero/hero-atelier-blush-gold.jpg";
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const words = H1.split(" ");
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! רציתי לסגור עוגה לאירוע — ראיתי את האתר`,
  );

  return (
    <section
      className="relative min-h-[92svh] overflow-hidden bg-[#fff5f7] sm:min-h-[94svh]"
      aria-label="פתח · LALIBAKERY"
    >
      {/* FULL-BLEED cake — edge to edge, static studio photo */}
      <div className="absolute inset-0" data-hero-visual>
        <Image
          src={SRC}
          alt="עוגת couture לבנה עם סרטים ורודים ועלי זהב — צילום סטודיו"
          fill
          priority
          quality={94}
          sizes="100vw"
          className="object-cover object-[48%_42%] sm:object-[46%_40%] lg:object-[42%_38%]"
        />
      </div>

      {/*
        Soft blush wash on the RIGHT only — readability (P06), not a card.
        No border, no radius, no shadow box. Text floats on atmosphere.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(255,250,248,0.94) 0%, rgba(255,245,247,0.82) 28%, rgba(255,245,247,0.35) 52%, rgba(255,245,247,0.05) 72%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
        style={{
          background:
            "linear-gradient(to top, rgba(247,214,222,0.55) 0%, transparent 100%)",
        }}
      />

      {/* Copy — physical RIGHT, no frame */}
      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl items-end px-5 pb-16 pt-28 sm:min-h-[94svh] sm:px-8 sm:pb-20 lg:items-center lg:pt-24">
        <motion.div
          className="absolute bottom-16 right-5 w-[min(100%-2.5rem,34rem)] text-right sm:right-8 sm:bottom-20 lg:bottom-auto lg:top-[48%] lg:w-[min(32rem,44%)] lg:-translate-y-1/2"
          initial={reduce ? false : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* P25 scarcity + P14 proof — floating chips, not a box */}
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-wide text-ink">
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

          {/* Brand first — hero-level (brand test) */}
          <p
            className="mt-3 font-display text-[clamp(2rem,4.5vw,2.85rem)] font-bold leading-none tracking-[-0.03em] text-ink"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.65)" }}
          >
            {siteSettings.brandName}
          </p>

          {/* P01 + P05 + P24 — concrete pride headline */}
          <h1
            className="mt-4 font-display text-balance text-[clamp(2.05rem,5.4vw,3.55rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.55)" }}
          >
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-bottom pe-[0.14em] last:pe-0"
              >
                <motion.span
                  className="inline-block text-ink"
                  initial={reduce ? false : { y: "108%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.1 + i * 0.055,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* P17 specificity */}
          <p
            className="ml-auto mt-4 max-w-md text-[clamp(0.95rem,1.45vw,1.12rem)] font-semibold leading-snug text-ink/75"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}
          >
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

          {/* P19 effort — quality as proof */}
          <p className="mt-3 text-xs font-bold text-ink/50">
            72 שעות מהקמח עד הקופסה · עד 5 עוגות מורכבות ביום
          </p>

          {/* P03 isolation + P35 size + P36 trigger at motivation peak */}
          <div className="mt-8 flex flex-col items-end gap-3">
            <Link
              href="/shop"
              data-magnetic
              data-cursor-label="MINE"
              className="btn-gold contact-shadow inline-flex h-14 min-h-12 min-w-[240px] items-center justify-center rounded-full px-9 text-base font-extrabold tracking-[-0.02em] text-ink"
            >
              לבחור את העוגה שלי
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="text-sm font-bold text-ink/70 underline decoration-gold-1/60 underline-offset-4 transition hover:text-ink"
            >
              או וואטסאפ אנושי · <bdi>{siteSettings.phone}</bdi>
            </a>
            <p className="text-[11px] font-semibold text-ink/45">
              Guest checkout · קופון <bdi>{siteSettings.launchCouponCode}</bdi> ·
              מינימום 3 ימי עסקים
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
