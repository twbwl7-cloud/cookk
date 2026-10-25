import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { PsychStrip } from "@/components/home/PsychStrip";
import { CategoryCircle } from "@/components/home/CategoryCircle";
import { PsychGarden } from "@/components/home/PsychGarden";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import {
  collections,
  getProductsByCategory,
} from "@/data/products";
import { reviews, siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/** Landing page — glass atelier · circles · psych garden · marquee. */
export default function HomePage() {
  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! ראיתי את דף הנחיתה ואשמח להזמין`,
  );
  const garden = getProductsByCategory("gan").slice(0, 3);
  const numbers = getProductsByCategory("misparim").slice(0, 3);
  const designed = getProductsByCategory("meutzavot").slice(0, 3);

  return (
    <>
      <Hero />
      <TrustMarquee />
      <PsychStrip />

      {/* Decision gate — three circles only */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-liquid rounded-[2rem] px-5 py-12 sm:px-10">
          <Reveal>
            <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-2">
              Choose one path
            </p>
            <h2 className="mt-3 text-center font-display text-[clamp(1.85rem,4vw,2.85rem)] font-black tracking-[-0.03em] text-ink">
              איזו עוגה סוגרת את האירוע?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm font-semibold text-ink/65">
              שלוש קטגוריות בעיגול — פחות עומס, יותר החלטה.
            </p>
          </Reveal>
          <div className="mt-10">
            <CategoryCircle collections={collections} />
          </div>
        </div>
      </section>

      <PsychGarden products={garden} />

      {/* Numbers — glass runway of three */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal>
          <div className="glass-chip mb-8 flex flex-wrap items-end justify-between gap-4 rounded-2xl px-5 py-4">
            <div>
              <h2 className="font-display text-3xl font-black text-ink">
                עוגות מספרים
              </h2>
              <p className="mt-1 text-sm font-medium text-ink/65">
                ספרות עם קרם, פירות, שוקולדים ופלאקים בעברית
              </p>
            </div>
            <Link
              href="/collections/misparim"
              className="text-sm font-extrabold text-gold-2 underline"
            >
              הכל
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {numbers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Designed */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal>
          <div className="glass-chip mb-8 flex flex-wrap items-end justify-between gap-4 rounded-2xl px-5 py-4">
            <div>
              <h2 className="font-display text-3xl font-black text-ink">
                עוגות מעוצבות
              </h2>
              <p className="mt-1 text-sm font-medium text-ink/65">
                שכבות עם טופרים, כתרים ועיצוב תלת־ממדי
              </p>
            </div>
            <Link
              href="/collections/meutzavot"
              className="text-sm font-extrabold text-gold-2 underline"
            >
              הכל
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {designed.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Glass CTA band */}
      <section className="relative px-4 py-16 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_50%,rgb(242_196_206_/_0.5),transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 glass-liquid rounded-[2rem] p-8 sm:p-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] contact-shadow">
              <Image
                src="/cakes/meutzavot/gold-crown-king.jpg"
                alt="עוגה מעוצבת עם כתר זהב"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold-2">
              Peak–end · סגירה
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-black tracking-[-0.03em] text-ink">
              שולחים תמונה — מקבלים עוגה שסוגרת
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-ink/70">
              בלי מלאי מזויף. בלי ספירה לאחור. Guest checkout · משלוח חינם מ־
              <bdi>₪{siteSettings.freeShippingFromIls}</bdi>
              {" · "}
              קופון <bdi>{siteSettings.launchCouponCode}</bdi>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="btn-gold contact-shadow inline-flex h-13 items-center justify-center rounded-full px-8 text-sm font-extrabold"
                data-magnetic
                data-cursor-label="SHOP"
              >
                לפתוח את הקטלוג
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-chip inline-flex h-13 items-center justify-center rounded-full px-7 text-sm font-bold text-ink"
                data-magnetic
              >
                וואטסאפ · <bdi className="ms-1">{siteSettings.phone}</bdi>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-black text-ink sm:text-4xl">
            מה כותבות אחרי האירוע
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviews.slice(0, 4).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05}>
              <blockquote className="glass-liquid rounded-[1.25rem] p-5">
                <p className="text-sm font-medium leading-relaxed text-ink">
                  “{r.body}”
                </p>
                <footer className="mt-4 text-xs font-bold text-gold-2">
                  {r.author} · {r.city} · {"★".repeat(r.rating)}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
