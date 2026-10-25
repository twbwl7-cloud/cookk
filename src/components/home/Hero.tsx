"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import Link from "next/link";

/**
 * Luxury full-bleed hero — Maison / Sur Mesure.
 * One composition: brand → premium line → headline → one sentence → one CTA.
 * Attracts with cream/blush/gold atelier light — never a dark void.
 */
const SRC = "/cakes/hero/hero-atelier-blush-gold.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.85 + i * 0.1,
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! רציתי לסגור עוגה Sur Mesure לאירוע`,
  );

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#fff5f7]"
      aria-label="Maison LALIBAKERY"
    >
      {/* Full-bleed couture cake */}
      <div className="absolute inset-0" data-hero-visual>
        <Image
          src={SRC}
          alt="עוגת couture לבנה עם פרחי blush ועלי זהב — סטודיו נתניה"
          fill
          priority
          quality={94}
          sizes="100vw"
          className="object-cover object-[78%_42%] sm:object-[74%_40%] lg:object-[70%_38%] scale-[1.02]"
        />
        {/* Soft cinematic grain of light — not a card */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 78% 40%, transparent 0%, rgba(255,250,248,0.08) 45%, rgba(255,250,248,0.55) 72%, rgba(255,250,248,0.92) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 38%, rgba(255,250,248,0.35) 58%, rgba(255,250,248,0.88) 78%, rgba(255,250,248,0.97) 100%)",
          }}
        />
      </div>

      {/* Fine gold rail — atelier signature */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-[12%] right-[min(46%,34rem)] hidden w-px bg-gradient-to-b from-transparent via-gold-1/55 to-transparent lg:block"
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 sm:px-8">
        <div className="ms-auto w-full max-w-[36rem] pb-16 pt-28 text-right sm:pb-20 lg:pt-16">
          {/* Premium maison line */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-[10px] font-extrabold uppercase tracking-[0.42em] text-gold-2"
          >
            Maison · Sur Mesure · Atelier Privé
          </motion.p>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 font-display text-[clamp(2.6rem,6.5vw,4.25rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink"
          >
            {siteSettings.brandName}
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 text-[11px] font-bold tracking-[0.22em] text-ink/45"
          >
            Haute Pâtisserie · Netanya
          </motion.p>

          {/* Hairline */}
          <motion.span
            aria-hidden
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 ms-auto block h-px w-24 bg-gradient-to-l from-gold-1 to-transparent"
          />

          <motion.h1
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-balance text-[clamp(1.85rem,4.2vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.03em] text-ink"
          >
            יצירה couture — לפני שמשלמים שקל
          </motion.h1>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="ml-auto mt-4 max-w-md text-[15px] font-medium leading-relaxed text-ink/70"
          >
            סטודיו פרטי בנתניה. מחיר שקוף על המסך מבסיס{" "}
            <bdi className="font-extrabold text-ink">₪250</bdi>
            . עד חמש עוגות מורכבות ביום — כל אחת Sur Mesure.
          </motion.p>

          <motion.p
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 text-[11px] font-extrabold tracking-[0.14em] text-gold-2/90"
          >
            PREMIUM · BY APPOINTMENT · 72H ATELIER
          </motion.p>

          <motion.div
            custom={7}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-col items-end gap-3"
          >
            <Link
              href="/custom-cake"
              className="group relative inline-flex h-12 min-w-[14rem] items-center justify-center overflow-hidden rounded-full px-8 text-sm font-extrabold text-ink"
              style={{
                background:
                  "linear-gradient(135deg, #e8c872 0%, #d4af37 42%, #c5a059 78%, #e8c872 100%)",
                boxShadow:
                  "0 18px 40px -18px rgba(197,160,89,0.75), inset 0 1px 0 rgba(255,255,255,0.45)",
              }}
            >
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-l from-transparent via-white/35 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
              <span className="relative">לבנות את העוגה שלי</span>
            </Link>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-ink/60 underline decoration-gold-1/50 underline-offset-[5px] transition hover:text-ink"
            >
              שיחה פרטית בוואטסאפ · <bdi>{siteSettings.phone}</bdi>
            </a>

            <p className="max-w-xs text-[10px] font-semibold leading-relaxed tracking-wide text-ink/40">
              Private checkout · קופון Atelier{" "}
              <bdi>{siteSettings.launchCouponCode}</bdi> · מינימום 3 ימי עסקים
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
