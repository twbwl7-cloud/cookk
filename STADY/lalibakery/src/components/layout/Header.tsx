"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { siteSettings } from "@/data/site";
import { cn } from "@/lib/utils";

/** Script 1.2 — Premium Header Engine: max 4 desktop links + single CTA */
const NAV_LINKS = [
  { href: "/collections/misparim", label: "עוגות מספרים" },
  { href: "/collections/meutzavot", label: "עוגות מעוצבות" },
  { href: "/collections/yom_huledet", label: "יום הולדת" },
  { href: "/builder", label: "Builder חי" },
] as const;

/** Account stays out of the 4-link desktop strip (cognitive load) — cart + overlay only. */

const CTA = {
  href: "/builder",
  label: "להרכבת עוגה ב-3D",
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

type ScrollMode = "top" | "hidden" | "frosted";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ScrollMode>("top");
  const reduce = useReducedMotion();
  const totalUnits = useCartStore((s) => s.totalUnits());
  const openCart = useCartStore((s) => s.openCart);
  const overlayId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const lastY = useRef(0);

  const closeOverlay = useCallback(() => setOpen(false), []);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const apply = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (reduce) {
        setMode(y < 24 ? "top" : "frosted");
        ticking = false;
        return;
      }

      if (y < 24) {
        setMode("top");
      } else if (delta > 6 && y > 80) {
        setMode("hidden");
      } else if (delta < -4) {
        setMode("frosted");
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  useEffect(() => {
    if (!open) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeOverlay();
        return;
      }
      if (e.key !== "Tab") return;
      const root = document.getElementById(overlayId);
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      lastFocusRef.current?.focus?.();
    };
  }, [open, overlayId, closeOverlay]);

  const barTone =
    mode === "top"
      ? "bg-transparent text-ink"
      : "bg-white/75 text-ink backdrop-blur-xl border-b border-gold-1/25 shadow-[0_12px_40px_-24px_rgb(13_13_13_/_0.28)]";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mode === "hidden" && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className={cn("transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", barTone)}>
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[4.5rem]">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full md:hidden"
              aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
              aria-expanded={open}
              aria-controls={overlayId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 tracking-[-0.02em]"
              data-magnetic
              data-cursor-label="HOME"
            >
              <Image
                src="/cakes/brand/logo.jpg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-gold-1/50 object-cover"
                priority
              />
              <span className="font-display text-lg font-bold sm:text-xl">
                {siteSettings.brandName}
              </span>
            </Link>

            <nav
              className="hidden items-center gap-6 lg:flex"
              aria-label="ניווט ראשי"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-magnetic
                  className="text-sm font-semibold text-current/85 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-gold-1"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={CTA.href}
                data-magnetic
                data-cursor-label="BUILD"
                className="btn-gold contact-shadow hidden h-11 items-center rounded-full px-5 text-sm font-semibold tracking-[-0.02em] md:inline-flex"
              >
                {CTA.label}
              </Link>
              <button
                type="button"
                onClick={openCart}
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-current/25 bg-white/5"
                aria-label="עגלה"
                data-magnetic
                data-cursor-label="BAG"
              >
                <ShoppingBag size={18} />
                {totalUnits > 0 && (
                  <span className="absolute -top-1 -start-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-1 px-1 text-[10px] font-bold text-ink">
                    <bdi>{totalUnits}</bdi>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={overlayId}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט"
            className="fixed inset-0 z-[60] flex flex-col bg-pink-soft text-ink md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <span className="font-display text-lg tracking-[-0.02em]">
                {siteSettings.brandName}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                aria-label="סגירת תפריט"
                onClick={closeOverlay}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-8">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: reduce ? 0 : 0.08 + i * 0.08,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={closeOverlay}
                    className="block py-3 font-display text-3xl tracking-[-0.02em] text-ink transition-colors hover:text-gold-2"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="border-t border-white/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : 0.08 + NAV_LINKS.length * 0.08,
                ease: EASE,
              }}
            >
              <Link
                href={CTA.href}
                onClick={closeOverlay}
                className="btn-gold contact-shadow flex h-14 w-full items-center justify-center rounded-full text-base font-semibold"
              >
                {CTA.label}
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
