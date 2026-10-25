"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteSettings } from "@/data/site";

const H1 = "עוגה ב־3D — בלי הפתעות במחיר";
const H2 =
  "Builder חי · מחיר לפני תשלום · בסיס מ־₪250 · איסוף מסטודיו נתניה";
const SRC = "/cakes/hero/hero-atelier-blush-gold.jpg";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Static full-bleed hero — no 3D / no orbit.
 * Editorial blush cake + black type on a soft cream wash (HAZWA atelier).
 */
export function Hero() {
  const reduce = useReducedMotion();
  const words = H1.split(" ");

  return (
    <section
      className="relative min-h-[72svh] overflow-hidden bg-pink-soft sm:min-h-[78svh] lg:min-h-[82svh]"
      aria-label="פתח · LALIBAKERY"
    >
      {/* Static full-bleed — does not move */}
      <div className="absolute inset-0" data-hero-visual>
        <Image
          src={SRC}
          alt="עוגת couture לבנה עם סרטים ורודים ועלי זהב — צילום סטודיו"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[62%_42%] sm:object-[58%_40%]"
        />
      </div>

      {/* Soft cream/blush veil so black type stays crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#fffaf8]/95 via-[#fffaf8]/55 to-transparent lg:from-[#fffaf8]/92 lg:via-[#fffaf8]/35 lg:to-[#fffaf8]/05"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-pink-soft/90 to-transparent"
      />

      <div className="relative z-10 mx-auto min-h-[72svh] max-w-6xl px-5 pb-16 pt-24 sm:min-h-[78svh] sm:px-8 sm:pb-20 lg:min-h-[82svh] lg:pt-28">
        <div className="absolute bottom-16 right-5 w-[min(100%-2.5rem,34rem)] text-right sm:right-8 sm:bottom-20 lg:bottom-auto lg:top-1/2 lg:w-[min(28rem,42%)] lg:-translate-y-1/2">
          <motion.p
            className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold-2"
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Haute Pâtisserie · Netanya
          </motion.p>

          <motion.p
            className="mt-4 font-display text-[clamp(1.55rem,3.2vw,2.15rem)] font-black tracking-[-0.03em] text-black"
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: EASE }}
          >
            {siteSettings.brandName}
          </motion.p>

          <h1 className="mt-3 font-display text-balance text-[clamp(2.2rem,5.8vw,3.85rem)] font-black leading-[0.96] tracking-[-0.04em] text-black">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-bottom pe-[0.12em] last:pe-0"
              >
                <motion.span
                  className="inline-block text-black"
                  initial={reduce ? false : { x: -32, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="ml-auto mt-4 max-w-md text-[clamp(0.98rem,1.5vw,1.1rem)] font-extrabold leading-snug text-black/75"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: EASE }}
          >
            {H2.split("₪250").map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <bdi>₪250</bdi>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-end gap-3"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.52, ease: EASE }}
          >
            <Link
              href="/shop"
              data-magnetic
              data-cursor-label="SHOP"
              className="btn-gold contact-shadow inline-flex h-13 min-h-12 min-w-[220px] items-center justify-center rounded-full px-8 text-base font-black tracking-[-0.02em] text-ink"
            >
              לראות את העוגות
            </Link>
            <p className="text-xs font-extrabold text-black/60">
              איסוף נתניה · עד 5 עוגות מורכבות ביום ·{" "}
              <bdi className="text-black">{siteSettings.phone}</bdi>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
