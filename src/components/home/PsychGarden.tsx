"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/types/commerce";
import { formatIls } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Book psychology for garden cakes (mental simulation + peak moment):
 * three circular “moments” — not a boring product grid.
 */
const BEATS = [
  {
    eyebrow: "01 · לפני החיתוך",
    line: "הילדים מצלמים לפני שנוגעים",
  },
  {
    eyebrow: "02 · הדמות שלהם",
    line: "תמונה / דמות / קולאז׳ — על דף אכיל",
  },
  {
    eyebrow: "03 · חיתוך קל",
    line: "מלבנית לכיתה — בלי דרמה על השולחן",
  },
] as const;

export function PsychGarden({ products }: { products: Product[] }) {
  const reduce = useReducedMotion();
  const trio = products.slice(0, 3);

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_380px_at_80%_20%,rgb(242_196_206_/_0.45),transparent_60%),radial-gradient(600px_320px_at_10%_80%,rgb(212_175_55_/_0.12),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="glass-liquid rounded-[2rem] p-6 sm:p-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-2">
            Mental simulation · עוגות גן
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.85rem,4.5vw,3rem)] font-black tracking-[-0.03em] text-ink">
            שלוש תמונות — רגע אחד בראש
          </h2>
          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-ink/65">
            לא גריד משעמם. שלושה מעגלים שמפעילים את הסרט בראש: צילום → דמות →
            חיתוך. אחר כך סוגרות הזמנה.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {trio.map((p, i) => {
              const beat = BEATS[i] ?? BEATS[0];
              const price = p.variants[0]?.priceIls;
              return (
                <motion.div
                  key={p.id}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                  className="text-center"
                >
                  <p className="text-[10px] font-extrabold tracking-[0.18em] text-gold-2">
                    {beat.eyebrow}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-ink sm:text-xl">
                    {beat.line}
                  </p>
                  <Link
                    href={`/product/${p.slug}`}
                    className="group relative mx-auto mt-5 block aspect-square w-[min(100%,16rem)]"
                    data-magnetic
                    data-cursor-label="VIEW"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-1/35 via-pink-baby/40 to-white blur-md transition group-hover:blur-sm" />
                    <span className="relative block h-full w-full overflow-hidden rounded-full border border-white/70 shadow-[0_20px_40px_-20px_rgb(13_13_13_/_0.35)]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="256px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </span>
                  </Link>
                  <p className="mt-4 text-sm font-extrabold text-ink">{p.title}</p>
                  {price != null ? (
                    <p className="mt-1 text-sm font-bold text-gold-2">
                      מ־<bdi>{formatIls(price)}</bdi>
                    </p>
                  ) : null}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/collections/gan"
              className="btn-gold contact-shadow inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-extrabold"
              data-magnetic
              data-cursor-label="GAN"
            >
              לכל עוגות הגן
            </Link>
            <p className="text-xs font-bold text-ink/50">
              מחיר גלוי · בלי טיימר מזויף · עד 5 עוגות מורכבות ביום
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
