"use client";

import { useEffect, useRef, useState } from "react";

export function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);
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
    let scale = 1;
    let label = "";
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-magnetic]",
      ) as HTMLElement | null;
      // Cursor scales only — do not translate targets (keeps hit-targets stable at 60FPS).
      if (target) {
        scale = 2.4;
        label = target.dataset.cursorLabel ?? "";
      } else {
        scale = 1;
        label = "";
      }
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
        dot.current.dataset.label = label;
        dot.current.setAttribute("data-has-label", label ? "true" : "false");
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
    <div
      ref={dot}
      aria-hidden
      data-has-label="false"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-3 w-3 rounded-full border border-ink/40 bg-gold-2/40 mix-blend-multiply backdrop-blur-sm transition-[width,height] duration-200 md:block data-[has-label=true]:h-12 data-[has-label=true]:w-12 data-[has-label=true]:border-gold-1"
    >
      <span className="absolute inset-0 hidden items-center justify-center text-[9px] font-bold tracking-wide text-ink [[data-has-label=true]_&]:flex">
        {/* filled via CSS attr fallback text from parent dataset visually */}
      </span>
    </div>
  );
}
