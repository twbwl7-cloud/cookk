import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { PsychStrip } from "@/components/home/PsychStrip";
import { CategoryCircle } from "@/components/home/CategoryCircle";
import { PsychGarden } from "@/components/home/PsychGarden";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { FloatingDecor } from "@/components/motion/FloatingDecor";
import { JellyButton } from "@/components/motion/JellyButton";
import { PlatePopUp } from "@/components/motion/PlatePopUp";
import {
  StaggerReveal,
  StaggerItem,
} from "@/components/motion/StaggerReveal";
import {
  collections,
  getProductsByCategory,
} from "@/data/products";
import { faqs, reviews, siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/** Landing — cream atelier · Hebrew cursor · luxury bakery motion. */
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

      {/* Decision gate — three circles + floating decor */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-16 sm:px-6">
        <FloatingDecor />
        <div className="glass-liquid relative z-[2] rounded-[2rem] px-5 py-12 sm:px-10">
          <Reveal>
            <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-2">
              בחירה אחת
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

      {/* Numbers — staggered spring gallery */}
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
        <StaggerReveal className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {numbers.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerReveal>
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
        <StaggerReveal className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {designed.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* Close band — one primary CTA: build */}
      <section className="relative px-4 py-16 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_50%,rgb(242_196_206_/_0.5),transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 glass-liquid rounded-[2rem] p-8 sm:p-12 lg:grid-cols-2">
          <PlatePopUp>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] contact-shadow">
              <Image
                src="/cakes/meutzavot/gold-crown-king.jpg"
                alt="עוגה מעוצבת עם כתר זהב"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </PlatePopUp>
          <Reveal delay={0.08}>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold-2">
              שיא וסיום · סגירה
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-black tracking-[-0.03em] text-ink">
              קודם מעצבות. אחר כך משלמות.
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-ink/70">
              בלי מלאי מזויף. בלי ספירה לאחור. בונות צעד־אחר־צעד, רואות מחיר על
              המסך, שולחות לוואטסאפ עם כרטיס הזמנה. משלוח חינם מ־
              <bdi>₪{siteSettings.freeShippingFromIls}</bdi>
              {" · "}
              קופון <bdi>{siteSettings.launchCouponCode}</bdi>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <JellyButton
                href="/custom-cake"
                magneticLabel="בנייה"
                className="h-13 min-w-[180px] px-8 text-sm"
              >
                לבנות את היצירה שלי
              </JellyButton>
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
            <p className="mt-4 text-[11px] font-semibold text-ink/40">
              בלי התחייבות · מינימום 3 ימי עסקים · עד 5 couture ביום
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-black text-ink sm:text-4xl">
            מה כותבות אחרי האירוע
          </h2>
        </Reveal>
        <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-2">
          {reviews.slice(0, 4).map((r) => (
            <StaggerItem key={r.id}>
              <blockquote className="glass-liquid rounded-[1.25rem] p-5">
                <p className="text-sm font-medium leading-relaxed text-ink">
                  “{r.body}”
                </p>
                <footer className="mt-4 text-xs font-bold text-gold-2">
                  {r.author} · {r.city} · {"★".repeat(r.rating)}
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* Trust FAQ — friction down before sticky CTA (P17) */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold-2">
                שקיפות
              </p>
              <h2 className="mt-2 font-display text-3xl font-black text-ink">
                שאלות לפני שסוגרים
              </h2>
            </div>
            <Link
              href="/faq"
              className="text-sm font-extrabold text-gold-2 underline"
            >
              לכל השאלות
            </Link>
          </div>
        </Reveal>
        <StaggerReveal className="mt-8 grid gap-3 md:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <StaggerItem key={f.id}>
              <details className="group rounded-[1.25rem] border border-ink/8 bg-white/50 px-5 py-4 open:bg-white/80">
                <summary className="cursor-pointer list-none font-display text-lg font-bold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {f.question}
                    <span className="text-gold-2 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm font-medium leading-relaxed text-ink/65">
                  {f.answer}
                </p>
              </details>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>
    </>
  );
}
