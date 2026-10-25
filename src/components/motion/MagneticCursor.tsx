"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle gold cursor trail — no big “selection circle” labels.
 * Labels were confusing (and broke Hebrew reading). Keep a small ring only.
 */
export function MagneticCursor() {
  const core = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;
    let scale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-magnetic]",
      ) as HTMLElement | null;
      scale = target ? 1.65 : 1;
    };

    const loop = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;

      if (core.current) {
        core.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${1 + (scale - 1) * 0.35})`;
        ring.current.style.opacity = scale > 1.2 ? "0.35" : "0.7";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    document.body.classList.add("cursor-none");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden h-8 w-8 rounded-full border border-gold-1/40 md:block"
      />
      <div
        ref={core}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-2.5 w-2.5 rounded-full border border-gold-1/70 bg-gold-1/45 md:block"
      />
    </>
  );
}
