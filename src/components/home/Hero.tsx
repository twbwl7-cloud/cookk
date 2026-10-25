"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Full-bleed psych hero — cake edge-to-edge · free text on RIGHT · NO card.
 *
 * Book (מיליונים):
 * P01 first frame COMPLETE (never opacity-0 empty) · P02 beauty · P03 one CTA
 * P05 curiosity · P06 ink fluency on soft wash · P14 proof · P17 numbers
 * P19 effort · P24 IKEA pride · P25 scarcity · P35 large CTA · N05 cakes
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
      {/* FULL-BLEED — absolute inset-0, covers entire hero */}
      <div className="absolute inset-0" data-hero-visual>
        <Image
          src={SRC}
          alt="עוגת couture לבנה עם סרטים ורודים ועלי זהב — צילום סטודיו"
          fill
          priority
          quality={94}
          sizes="100vw"
          className="scale-[1.02] object-cover object-[46%_40%] sm:object-[44%_38%] lg:object-[40%_36%]"
        />
      </div>

      {/* Soft RIGHT wash only — no border, no radius, no shadow card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, transparent 38%, rgba(255,250,248,0.55) 62%, rgba(255,250,248,0.88) 78%, rgba(255,250,248,0.95) 100%)",
        }}
      />

      {/*
        Copy block — physical RIGHT, freestanding (P01: visible on first paint).
        No rounded frame. No dark panel.
      */}
      <div className="relative z-10 mx-auto min-h-[92svh] max-w-6xl px-5 pt-28 sm:min-h-[94svh] sm:px-8 lg:pt-24">
        <div className="absolute bottom-16 right-5 w-[min(100%-2.5rem,36rem)] text-right sm:right-8 sm:bottom-20 lg:bottom-auto lg:top-1/2 lg:w-[min(34rem,46%)] lg:-translate-y-1/2">
          {/* P25 + P14 */}
          <p className="text-[11px] font-extrabold tracking-wide text-ink">
            <span className="me-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c45c6a] align-middle" />
            נשארו 2 מקומות לסופ״ש
            <span className="mx-2 font-bold text-ink/40">·</span>
            <span className="font-bold text-ink/55">
              ★ 4.9 · אימהות מנתניה והסביבה
            </span>
          </p>

          <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.28em] text-gold-2">
            Haute Pâtisserie · Netanya
          </p>

          <p className="mt-3 font-display text-[clamp(2.1rem,4.8vw,3rem)] font-bold leading-none tracking-[-0.03em] text-ink drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
            {siteSettings.brandName}
          </p>

          {/* P01 + P05 + P24 */}
          <h1 className="mt-4 font-display text-balance text-[clamp(2.1rem,5.6vw,3.65rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink drop-shadow-[0_1px_0_rgba(255,255,255,0.65)]">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-bottom pe-[0.14em] last:pe-0"
              >
                <motion.span
                  className="inline-block text-ink"
                  initial={reduce ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + i * 0.05,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* P17 */}
          <p className="ml-auto mt-4 max-w-md text-[clamp(0.95rem,1.5vw,1.12rem)] font-semibold leading-snug text-ink/78 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
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

          {/* P03 + P35 + P36 */}
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
