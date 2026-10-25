"use client";

import { useEffect, useRef, useState } from "react";

/** Dual-ring gold cursor — trail + magnetic scale on interactive targets. */
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
    let label = "";
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-magnetic]",
      ) as HTMLElement | null;
      if (target) {
        scale = 2.8;
        label = target.dataset.cursorLabel ?? "";
      } else {
        scale = 1;
        label = "";
      }
    };

    const loop = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;

      if (core.current) {
        core.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
        core.current.setAttribute("data-has-label", label ? "true" : "false");
        const span = core.current.querySelector("span");
        if (span) span.textContent = label;
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
        className="pointer-events-none fixed top-0 left-0 z-[99] hidden h-10 w-10 rounded-full border border-gold-1/50 md:block"
      />
      <div
        ref={core}
        aria-hidden
        data-has-label="false"
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-3 w-3 rounded-full border border-gold-1/80 bg-gold-1/50 shadow-[0_0_20px_rgb(212_175_55_/_0.45)] backdrop-blur-sm transition-[width,height] duration-200 md:block data-[has-label=true]:h-14 data-[has-label=true]:w-14 data-[has-label=true]:bg-gold-1/30"
      >
        <span className="absolute inset-0 hidden items-center justify-center px-1 text-center text-[10px] font-extrabold leading-tight tracking-wide text-ink [[data-has-label=true]_&]:flex" />
      </div>
    </>
  );
}
