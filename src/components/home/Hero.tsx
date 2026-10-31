"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Previous hero restored — cake + 3D logo still LEFT · copy RIGHT.
 * Turntable removed only. Cake further left · in-image logo larger · stand lighter.
 */
const HERO_BG = "/cakes/hero/hero-3d-logo-cake.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.45 + i * 0.08, duration: 0.85, ease },
  }),
};

export function Hero() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! ראיתי את האתר — רוצה לעצב עוגה`,
  );

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[#14100e]"
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
            className="object-cover object-[0%_32%] brightness-[1.06] contrast-[1.03] saturate-[0.98] sm:object-[0%_38%] lg:object-[0%_42%]"
          />
        </motion.div>

        {/* Very light left veil — stand stays readable */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,246,238,0.14) 0%, transparent 32%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 85% at 18% 48%, transparent 0%, rgba(12,8,6,0.1) 65%, rgba(12,8,6,0.28) 100%)",
          }}
        />

        {/* Desktop cream — physical RIGHT only */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(270deg, rgba(255,250,248,0.98) 0%, rgba(255,250,248,0.94) 26%, rgba(255,250,248,0.55) 42%, rgba(255,250,248,0.1) 56%, transparent 68%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-[52%] lg:block"
          style={{
            background:
              "radial-gradient(560px 400px at 80% 70%, rgba(242,196,206,0.32) 0%, transparent 70%)",
          }}
        />

        {/* Mobile: cake open on top · cream only under copy */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 42%, rgba(255,250,248,0.4) 58%, rgba(255,250,248,0.94) 72%, rgba(255,250,248,0.99) 100%)",
          }}
        />
      </div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-[22%] hidden h-1.5 w-1.5 rounded-full bg-gold-1/70 blur-[0.5px] lg:block"
        animate={{ y: [0, -10, 0], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-[5.5rem] pt-[46svh] sm:px-8 sm:pb-24 sm:pt-[42svh] lg:block lg:pb-0 lg:pt-0">
        <div className="relative w-full text-right lg:absolute lg:right-8 lg:top-1/2 lg:w-[min(32rem,42%)] lg:-translate-y-1/2">
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
              className="mt-4 text-[11px] font-extrabold tracking-[0.18em] text-gold-2 sm:mt-5"
            >
              אפייה מהלב · נתניה
            </motion.p>

            <motion.h1
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-2 font-display text-[clamp(2.5rem,7vw,4.6rem)] font-bold leading-[0.9] tracking-[-0.045em] text-ink sm:mt-3"
            >
              {siteSettings.brandName}
            </motion.h1>

            <motion.span
              aria-hidden
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-5 ms-auto block h-px w-28 bg-gradient-to-l from-gold-1 via-gold-2/80 to-transparent sm:mt-6"
            />

            <motion.p
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-5 font-display text-balance text-[clamp(1.5rem,3.5vw,2.55rem)] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:mt-6"
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
              className="ml-auto mt-4 max-w-md text-[14px] font-medium leading-relaxed text-ink/68 sm:text-[15px]"
            >
              עוגות בעיצוב אישי לימי הולדת, לבר מצווה ולאירועים. מעצבים איתכם על
              המסך, אופים רק אחרי שאישרתם. מחיר מ־
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
              className="mt-7 flex flex-col items-end gap-3 sm:mt-8"
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
                קופון <bdi>{siteSettings.launchCouponCode}</bdi> ללקוחות חדשים ·
                10% · מינימום 3 ימי עסקים
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
