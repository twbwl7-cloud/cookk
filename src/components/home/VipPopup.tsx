"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { siteSettings } from "@/data/site";

/**
 * Soft atelier welcome — real coupon only (no fake countdown).
 * Waits for scroll OR a long idle so it never blocks the first hero CTA.
 */
export function VipPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("lb-vip-popup");
    if (seen) return;

    let armed = false;
    const show = () => {
      if (armed) return;
      armed = true;
      setOpen(true);
    };

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.55) show();
    };

    const idle = window.setTimeout(show, 16000);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem("lb-vip-popup", "1");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#14100e]/45 backdrop-blur-[2px]"
        aria-label="סגור"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vip-title"
        className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-gold-1/30 bg-[#fffaf8] p-6 contact-shadow"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold-1/70 to-transparent"
        />
        <button
          type="button"
          className="absolute top-3 left-3 rounded-full p-2 text-ink/55 hover:bg-ink/5 hover:text-ink"
          onClick={close}
          aria-label="סגור"
        >
          <X size={16} />
        </button>
        <p className="text-[10px] font-extrabold tracking-[0.28em] text-gold-2">
          ATELIER · FIRST ORDER
        </p>
        <h2 id="vip-title" className="mt-2 font-display text-2xl font-bold text-ink">
          קוד השקה ללקוחות חדשים
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          קוד אמיתי להזמנה ראשונה:{" "}
          <bdi className="font-extrabold text-ink">
            {siteSettings.launchCouponCode}
          </bdi>{" "}
          — {siteSettings.launchCouponPercent}% הנחה. בלי ספירה לאחור מזויפת.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="btn-gold contact-shadow inline-flex h-11 flex-1 items-center justify-center rounded-full text-sm font-extrabold"
            onClick={() => {
              navigator.clipboard?.writeText(siteSettings.launchCouponCode);
              close();
            }}
          >
            העתקת קוד
          </button>
          <Link
            href="/custom-cake"
            onClick={close}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-ink/12 bg-white/80 text-sm font-bold text-ink"
          >
            לבנות עוגה
          </Link>
        </div>
      </div>
    </div>
  );
}
