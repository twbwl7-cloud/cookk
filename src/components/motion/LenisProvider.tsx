"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll — but NEVER steal wheel/touch from modals/drawers.
 * Any ancestor with [data-lenis-prevent] keeps native overflow scrolling.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Critical: allow native scroll inside dialogs / drawers
      prevent: (node) =>
        !!node.closest?.(
          "[data-lenis-prevent], [data-lenis-prevent-wheel], [role='dialog'], aside",
        ),
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
