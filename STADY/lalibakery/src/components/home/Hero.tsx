"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { siteSettings } from "@/data/site";
import type { HeroCakeHandle } from "@/components/immersive/HeroCake3D";
import { MagneticButton } from "@/components/motion/MagneticButton";

const HeroCake3D = dynamic(() => import("@/components/immersive/HeroCake3D"), {
  ssr: false,
  loading: () => (
    <div className="relative mx-auto flex h-[min(42vh,380px)] w-full items-center justify-center sm:h-[480px]">
      <div className="relative aspect-square w-[86%] overflow-hidden rounded-full border border-gold-luxury/50">
        <Image
          src="/cakes/hero/round-gold-crown.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="480px"
        />
      </div>
    </div>
  ),
});

const H1 = "בונות את העוגה — רואות את המחיר";
const H2 =
  "מספרים · מעוצבות · יום הולדת · זילוף וקצפת בשידור חי · בסיס מ־₪250";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cakeRef = useRef<HeroCakeHandle>(null);
  const words = H1.split(" ");

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=55%",
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => {
          cakeRef.current?.setZoom(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="hero-blush relative min-h-[100svh] overflow-hidden"
      aria-label="פתח · LALIBAKERY"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-4 px-4 pb-24 pt-6 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 lg:pb-16 lg:pt-8">
        {/* Visual — dominant plane */}
        <div className="order-1 lg:order-2" data-hero-visual>
          <HeroCake3D ref={cakeRef} />
        </div>

        {/* Copy — single CTA */}
        <div className="order-2 text-center lg:order-1 lg:text-right">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-gold-1/45 bg-white/70 px-3 py-2 backdrop-blur-md contact-shadow">
            <Image
              src="/cakes/brand/logo.jpg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-1/50"
              priority
            />
            <div className="text-right leading-tight">
              <p className="font-display text-lg text-ink">
                {siteSettings.brandName}
              </p>
              <p className="text-[11px] font-bold text-gold-2">
                {siteSettings.tagline} · HAUTE PÂTISSERIE
              </p>
            </div>
          </div>

          {/* H1 in DOM immediately — kinetic is enhancement only */}
          <h1 className="font-display text-balance text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-ink">
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                  {i < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mx-auto mt-5 max-w-md text-[clamp(0.95rem,1.6vw,1.125rem)] font-bold leading-relaxed text-ink/70 lg:mx-0"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
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
            className="mt-8 flex justify-center lg:justify-start"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MagneticButton
              href="/builder"
              cursorLabel="BUILD"
              className="btn-gold contact-shadow inline-flex h-13 min-h-12 min-w-[240px] items-center justify-center rounded-full px-8 text-sm font-extrabold text-ink"
            >
              להרכבת עוגה ב-3D
            </MagneticButton>
          </motion.div>

          <motion.p
            className="mt-5 text-xs font-semibold leading-relaxed text-ink/55"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            איסוף נתניה · צילומי סטודיו אמיתיים · וואטסאפ{" "}
            <bdi className="font-extrabold text-gold-2">
              {siteSettings.phone}
            </bdi>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
