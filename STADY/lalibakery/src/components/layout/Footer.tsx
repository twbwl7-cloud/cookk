"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { siteSettings } from "@/data/site";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { cn } from "@/lib/utils";

const CORE_LINKS = [
  { href: "/collections/misparim", label: "עוגות מספרים" },
  { href: "/collections/meutzavot", label: "עוגות מעוצבות" },
  { href: "/collections/yom_huledet", label: "עוגות יום הולדת" },
  { href: "/builder", label: "Cake Builder חי" },
  { href: "/shop", label: "כל הקטלוג" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
] as const;

const LEGAL_LINKS = [
  { href: "/terms", label: "תקנון" },
  { href: "/privacy", label: "פרטיות" },
  { href: "/accessibility", label: "נגישות" },
] as const;

function AccordionGroup({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `footer-${title.replace(/\s+/g, "-")}`;

  return (
    <div className="border-b border-ink/10 md:border-0">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between py-3 text-start text-sm font-semibold text-gold-2 md:pointer-events-none md:cursor-default md:py-0 md:text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          size={18}
          className={cn(
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:!grid-rows-[1fr]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4 md:pb-0 md:pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { y: 48, opacity: 0.55 },
        {
          y: 0,
          opacity: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 92%",
            end: "top 55%",
            scrub: 0.6,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduce]);

  const waHref = `https://wa.me/${siteSettings.whatsapp}`;

  return (
    <footer
      ref={rootRef}
      className="relative mt-24 overflow-hidden border-t border-gold-1/25 bg-gradient-to-b from-pink-soft to-pink-baby text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-1/60 to-transparent"
      />

      {/* Mini-Hero CTA — Script 1.2 Footer Engine */}
      <section className="border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-display text-3xl tracking-[-0.02em] text-balance text-ink sm:text-4xl">
              רוצות לראות את העוגה לפני שמשלמות?
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
              מרכיבות ב־3D עם זילוף וגווני קצפת בלייב, ואיסוף בנתניה או משלוח
              לשרון והמרכז — מינימום 3 ימי עסקים.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto">
            <Link
              href="/builder"
              data-magnetic
              data-cursor-label="BUILD"
              className="btn-gold contact-shadow inline-flex h-13 min-h-12 items-center justify-center rounded-full px-7 text-base font-semibold tracking-[-0.02em]"
            >
              להרכבת עוגה ב-3D
            </Link>
            <p className="text-center text-xs text-ink/50 sm:text-start">
              בלי התחייבות · אפשר לשמור ולהמשיך בוואטסאפ
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-2 px-4 py-12 sm:px-6 md:grid-cols-12 md:gap-10 md:py-16">
        <div className="md:col-span-4">
          <p className="font-display text-2xl tracking-[-0.02em] text-ink">
            {siteSettings.brandName}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/65">
            {siteSettings.tagline} — Haute Pâtisserie לפי הזמנה. מספרים,
            מעוצבות ויום הולדת.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex min-h-12 items-center text-sm font-semibold text-gold-2 transition-colors hover:text-gold-1"
            >
              וואטסאפ · <bdi className="ms-1">{siteSettings.phone}</bdi>
            </a>
            {siteSettings.instagramUrl ? (
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                aria-label="אינסטגרם LALIBAKERY"
                className="inline-flex min-h-12 items-center text-sm font-semibold text-ink/70 transition-colors hover:text-gold-2"
              >
                אינסטגרם
              </a>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-3">
          <AccordionGroup title="ניווט" defaultOpen>
            <ul className="flex flex-col gap-1">
              {CORE_LINKS.map((l) => (
                <li key={l.href}>
                  <MagneticLink
                    href={l.href}
                    className="text-ink/75 hover:text-gold-2"
                  >
                    {l.label}
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </AccordionGroup>
        </div>

        <div className="md:col-span-3">
          <AccordionGroup title="פרטי עסק" defaultOpen>
            <ul className="space-y-3 text-sm text-ink/70">
              <li>
                {siteSettings.legalName}
                <br />
                ע.מ <bdi>{siteSettings.businessId}</bdi>
              </li>
              <li>{siteSettings.address}</li>
              <li>{siteSettings.hours}</li>
              <li>
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="hover:text-gold-1"
                  data-magnetic
                >
                  <bdi>{siteSettings.phone}</bdi>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover:text-gold-1"
                  dir="ltr"
                  data-magnetic
                >
                  {siteSettings.email}
                </a>
              </li>
            </ul>
          </AccordionGroup>
        </div>

        <div className="md:col-span-2">
          <AccordionGroup title="משפטי">
            <ul className="flex flex-col gap-1">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <MagneticLink
                    href={l.href}
                    className="text-ink/75 hover:text-gold-2"
                  >
                    {l.label}
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </AccordionGroup>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteSettings.brandName} · NAP זהה
            ל־Google Business
          </p>
          <p className="tracking-wide">
            מחירים כולל מע״מ · קופון השקה{" "}
            <bdi>{siteSettings.launchCouponCode}</bdi>
          </p>
        </div>
      </div>
    </footer>
  );
}
