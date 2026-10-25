"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Theatre curtain entrance — dual silk panels + soft veil.
 * Prestige reveal without a black void that scares boutique buyers.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Left curtain */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-[80] w-1/2 origin-left"
        style={{
          background:
            "linear-gradient(90deg, #1a1410 0%, #2a221c 55%, #3d3228 100%)",
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      />
      {/* Right curtain */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 z-[80] w-1/2 origin-right"
        style={{
          background:
            "linear-gradient(270deg, #1a1410 0%, #2a221c 55%, #3d3228 100%)",
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      />
      {/* Gold seam flash as curtains part */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-1/2 z-[81] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"
        initial={{ opacity: 1, scaleY: 1 }}
        animate={{ opacity: 0, scaleY: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      />
      {/* Soft cream veil (user’s scaleY pattern — luxury blush, not void) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[79] origin-bottom"
        style={{
          background:
            "linear-gradient(180deg, #fffaf8 0%, #f7d6de 48%, #fff5e8 100%)",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
      {/* Brand whisper on veil */}
      <motion.p
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-1/2 z-[82] -translate-y-1/2 text-center font-display text-[clamp(1.2rem,3vw,1.8rem)] font-bold tracking-[0.35em] text-[#d4af37]"
        initial={{ opacity: 1, letterSpacing: "0.45em" }}
        animate={{ opacity: 0, letterSpacing: "0.55em" }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
      >
        LALIBAKERY
      </motion.p>
      {children}
    </>
  );
}

export default PageTransition;
