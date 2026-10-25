"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * PSYCH × HAUTE hero — rebuilt from zero.
 *
 * Layout: cake PHYSICAL RIGHT (dimmed luxury) · copy PHYSICAL LEFT.
 * Book levers: P01 first frame · P03 one CTA · P05 curiosity · P06 fluency
 * P14 proof · P17 numbers · P19 effort · P24 IKEA · P25 soft scarcity · brand-first.
 * Attracts with cream/blush/champagne — expensive, never a black void.
 */
const SRC = "/cakes/hero/hero-atelier-blush-gold.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.95 + i * 0.09, duration: 0.9, ease },
  }),
};

export function Hero() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! ראיתי את האתר — רוצה לסגור יצירה Sur Mesure`,
  );

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#14100e]"
      aria-label="LALIBAKERY · Maison hero"
    >
      {/* ——— CAKE: physical RIGHT, muted couture ——— */}
      <div className="absolute inset-0" data-hero-visual>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.35 }}
        >
          <Image
            src={SRC}
            alt="יצירת couture לבנה עם פרחי blush ועלי זהב — סטודיו נתניה"
            fill
            priority
            quality={94}
            sizes="100vw"
            className="object-cover object-[88%_40%] sm:object-[86%_38%] lg:object-[84%_36%] brightness-[0.72] contrast-[1.08] saturate-[0.88]"
          />
        </motion.div>

        {/* Expensive dim on the cake plane */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(18,12,10,0.55) 0%, rgba(18,12,10,0.28) 22%, rgba(18,12,10,0.08) 40%, transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 80% at 82% 42%, transparent 0%, rgba(12,8,6,0.25) 55%, rgba(12,8,6,0.5) 100%)",
          }}
        />

        {/* Cream editorial plane — PHYSICAL LEFT for copy */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,250,248,0.98) 0%, rgba(255,250,248,0.94) 28%, rgba(255,250,248,0.72) 42%, rgba(255,250,248,0.22) 56%, transparent 68%)",
          }}
        />
        {/* Warm blush kiss under copy */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[55%]"
          style={{
            background:
              "radial-gradient(600px 420px at 18% 70%, rgba(242,196,206,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating gold dust — presence, not noise */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[22%] hidden h-1.5 w-1.5 rounded-full bg-gold-1/70 blur-[0.5px] lg:block"
        animate={{ y: [0, -10, 0], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-[28%] top-[58%] hidden h-1 w-1 rounded-full bg-gold-2/60 lg:block"
        animate={{ y: [0, 8, 0], opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <div className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-5 sm:px-8">
        {/* ——— COPY: physical LEFT ——— */}
        <div className="absolute bottom-16 left-5 w-[min(100%-2.5rem,34rem)] text-right sm:bottom-20 sm:left-8 lg:bottom-auto lg:top-1/2 lg:w-[min(32rem,44%)] lg:-translate-y-1/2">
          {/* Gold geometry frame — expensive signal */}
          <div className="relative pe-2 ps-5 sm:ps-7">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-2 start-0 w-px bg-gradient-to-b from-transparent via-gold-1/70 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute start-0 top-2 h-px w-10 bg-gradient-to-l from-gold-1/80 to-transparent"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-2 start-0 h-px w-10 bg-gradient-to-l from-gold-1/80 to-transparent"
            />

            {/* Soft scarcity + proof — whisper, not alarm */}
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="text-[11px] font-bold tracking-wide text-ink/55"
            >
              ★ 4.9 · אימהות מנתניה והסביבה
              <span className="mx-2 text-gold-2/80">·</span>
              נשארו 2 מקומות לסופ״ש
            </motion.p>

            <motion.p
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.4em] text-gold-2"
            >
              Maison · Sur Mesure · Atelier Privé
            </motion.p>

            {/* Brand = hero signal */}
            <motion.h1
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-3 font-display text-[clamp(2.8rem,7vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.045em] text-ink"
            >
              {siteSettings.brandName}
            </motion.h1>

            <motion.p
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-3 text-[11px] font-bold tracking-[0.2em] text-ink/40"
            >
              Haute Pâtisserie · Netanya
            </motion.p>

            <motion.span
              aria-hidden
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 ms-auto block h-px w-28 bg-gradient-to-l from-gold-1 via-gold-2/80 to-transparent"
            />

            {/* P05 + P24 — curiosity + IKEA */}
            <motion.p
              custom={5}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 font-display text-balance text-[clamp(1.7rem,3.8vw,2.55rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink"
            >
              קודם מעצבות את היצירה.
              <br />
              <span className="text-ink/75">אחר כך משלמות.</span>
            </motion.p>

            {/* P17 + P19 — concrete + effort */}
            <motion.p
              custom={6}
              variants={rise}
              initial="hidden"
              animate="show"
              className="ml-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed text-ink/68"
            >
              מחיר שקוף על המסך מבסיס{" "}
              <bdi className="font-extrabold text-ink">₪250</bdi>
              . סטודיו פרטי בנתניה. עד{" "}
              <span className="font-extrabold text-ink">5 עוגות couture</span>{" "}
              ביום — כל אחת Sur Mesure, 72 שעות מהקמח עד הקופסה.
            </motion.p>

            <motion.p
              custom={7}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-4 text-[10px] font-extrabold tracking-[0.18em] text-gold-2"
            >
              PREMIUM · BY APPOINTMENT · LIMITED DAILY
            </motion.p>

            {/* P03 — one CTA */}
            <motion.div
              custom={8}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-col items-end gap-3"
            >
              <Link
                href="/custom-cake"
                className="group relative inline-flex h-[3.15rem] min-w-[15rem] items-center justify-center overflow-hidden rounded-full px-9 text-sm font-extrabold text-ink"
                style={{
                  background:
                    "linear-gradient(135deg, #f0d78a 0%, #d4af37 40%, #b8923e 78%, #e8c872 100%)",
                  boxShadow:
                    "0 20px 44px -18px rgba(184,146,62,0.7), inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
                <span className="relative tracking-wide">לבנות את היצירה שלי</span>
              </Link>

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-ink/55 underline decoration-gold-1/45 underline-offset-[6px] transition hover:text-ink"
              >
                שיחה פרטית עם הסטודיו · <bdi>{siteSettings.phone}</bdi>
              </a>

              <p className="max-w-[17rem] text-[10px] font-semibold leading-relaxed text-ink/38">
                Private checkout · קופון Atelier{" "}
                <bdi>{siteSettings.launchCouponCode}</bdi> · מינימום 3 ימי עסקים
              </p>
            </motion.div>
          </div>
        </div>

        {/* Tiny right-edge atelier mark on the cake side */}
        <motion.p
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-6 hidden text-[9px] font-extrabold tracking-[0.35em] text-white/35 sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          ATELIER
        </motion.p>
      </div>
    </section>
  );
}
