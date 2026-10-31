"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Desktop: cake LEFT · cream copy RIGHT (same as before).
 * Mobile: same idea stacked — cake band on top, cream copy panel below.
 * No text over the cake.
 */
const HERO_BG = "/cakes/hero/hero-3d-logo-cake.jpg";
const HERO_BG_MOBILE = "/cakes/hero/hero-3d-logo-cake-mobile.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 28, filter: "blur(5px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.35 + i * 0.07, duration: 0.8, ease },
  }),
};

function HeroCopy({
  wa,
  compact = false,
}: {
  wa: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative text-right ${compact ? "pe-1 ps-4" : "pe-2 ps-5 sm:ps-7"}`}>
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
        className={`${compact ? "mt-3" : "mt-4 sm:mt-5"} text-[11px] font-extrabold tracking-[0.18em] text-gold-2`}
      >
        אפייה מהלב · נתניה
      </motion.p>

      <motion.h1
        custom={2}
        variants={rise}
        initial="hidden"
        animate="show"
        className={`${compact ? "mt-2" : "mt-2 sm:mt-3"} font-display text-[clamp(2.35rem,8vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.045em] text-ink`}
      >
        {siteSettings.brandName}
      </motion.h1>

      <motion.span
        aria-hidden
        custom={3}
        variants={rise}
        initial="hidden"
        animate="show"
        className={`${compact ? "mt-4" : "mt-5 sm:mt-6"} ms-auto block h-px w-28 bg-gradient-to-l from-gold-1 via-gold-2/80 to-transparent`}
      />

      <motion.p
        custom={4}
        variants={rise}
        initial="hidden"
        animate="show"
        className={`${compact ? "mt-4" : "mt-5 sm:mt-6"} font-display text-balance text-[clamp(1.45rem,4.2vw,2.55rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink`}
      >
        אתם מתארים.
        <br />
        <span className="text-ink/75">אנחנו אופים.</span>
      </motion.p>

      <motion.p
        custom={5}
        variants={rise}
        initial="hidden"
        animate="show"
        className={`ml-auto ${compact ? "mt-3" : "mt-4"} max-w-md text-[14px] font-medium leading-relaxed text-ink/68 sm:text-[15px]`}
      >
        עוגות בעיצוב אישי לימי הולדת, לבר מצווה ולאירועים. מעצבים איתכם על המסך,
        אופים רק אחרי שאישרתם. מחיר מ־
        <bdi className="font-extrabold text-ink">₪220</bdi>
        . עד 5 עוגות מורכבות ביום · מינימום 3 ימי עסקים.
      </motion.p>

      <motion.p
        custom={6}
        variants={rise}
        initial="hidden"
        animate="show"
        className="mt-3 text-[11px] font-bold text-ink/45"
      >
        גן · מספרים · מעוצבות עם דף סוכר
      </motion.p>

      <motion.div
        custom={7}
        variants={rise}
        initial="hidden"
        animate="show"
        className={`${compact ? "mt-6" : "mt-7 sm:mt-8"} flex flex-col items-end gap-3`}
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
          <span className="relative tracking-wide">לעיצוב העוגה</span>
        </Link>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-ink/55 underline decoration-gold-1/45 underline-offset-[6px] transition hover:text-ink"
        >
          וואטסאפ · <bdi>{siteSettings.phone}</bdi>
        </a>

        <p className="max-w-[17rem] text-[10px] font-semibold leading-relaxed text-ink/38">
          קופון <bdi>{siteSettings.launchCouponCode}</bdi> ללקוחות חדשים · 10% ·
          מינימום 3 ימי עסקים
        </p>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! ראיתי את האתר — רוצה לעצב עוגה`,
  );

  return (
    <>
      {/* ——— MOBILE / TABLET: stacked like desktop split ——— */}
      <section
        className="relative overflow-hidden bg-[#14100e] lg:hidden"
        aria-label={`${siteSettings.brandName} — עוגות בעיצוב אישי`}
      >
        {/* Cake band — image only, no copy on top */}
        <div className="relative h-[46svh] min-h-[280px] w-full sm:h-[48svh]">
          <Image
            src={HERO_BG_MOBILE}
            alt="עוגה מעוצבת עם לוגו LALIBAKERY תלת־ממד"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[42%_35%] brightness-[1.08] contrast-[1.02]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(20,12,10,0.35) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,246,238,0.16) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Cream copy panel — same language as desktop right side */}
        <div
          className="relative z-10 px-5 pb-[5.75rem] pt-7 sm:px-8 sm:pb-24 sm:pt-9"
          style={{
            background:
              "linear-gradient(180deg, #fffaf8 0%, #fff8f5 55%, #fdeef1 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-1/55 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 end-0 h-40 w-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(242,196,206,0.45) 0%, transparent 70%)",
            }}
          />
          <HeroCopy wa={wa} compact />
        </div>
      </section>

      {/* ——— DESKTOP: cake LEFT · cream RIGHT ——— */}
      <section
        className="relative hidden min-h-[100svh] overflow-hidden bg-[#14100e] lg:block"
        aria-label={`${siteSettings.brandName} — עוגות בעיצוב אישי`}
      >
        <div className="absolute inset-0" data-hero-visual>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05, opacity: 0.75 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease, delay: 0.15 }}
          >
            <Image
              src={HERO_BG}
              alt="עוגה מעוצבת עם לוגו LALIBAKERY תלת־ממד"
              fill
              priority
              quality={94}
              sizes="100vw"
              className="object-cover object-[4%_42%] brightness-[1.06] contrast-[1.03] saturate-[0.98]"
            />
          </motion.div>

          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,246,238,0.2) 0%, rgba(255,246,238,0.06) 24%, transparent 42%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(75% 85% at 16% 46%, transparent 0%, rgba(12,8,6,0.08) 68%, rgba(12,8,6,0.24) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(270deg, rgba(255,250,248,0.98) 0%, rgba(255,250,248,0.94) 26%, rgba(255,250,248,0.55) 42%, rgba(255,250,248,0.1) 56%, transparent 68%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[52%]"
            style={{
              background:
                "radial-gradient(560px 400px at 80% 70%, rgba(242,196,206,0.32) 0%, transparent 70%)",
            }}
          />
        </div>

        <motion.span
          aria-hidden
          className="pointer-events-none absolute right-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-gold-1/70 blur-[0.5px]"
          animate={{ y: [0, -10, 0], opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-8">
          <div className="absolute right-8 top-1/2 w-[min(32rem,42%)] -translate-y-1/2">
            <HeroCopy wa={wa} />
          </div>
        </div>
      </section>
    </>
  );
}
