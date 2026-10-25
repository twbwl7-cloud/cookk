"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Soft rising steam wisps — warmth cue over fresh pastry imagery. */
export function RisingSteam({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-[30%] top-[8%] flex justify-center gap-3 ${className ?? ""}`}
    >
      {[0, 0.45, 0.9].map((delay) => (
        <motion.div
          key={delay}
          animate={{ y: [0, -48], opacity: [0, 0.55, 0], scale: [1, 1.6] }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            delay,
            ease: "easeOut",
          }}
          className="h-8 w-6 rounded-full bg-white/50 blur-md"
        />
      ))}
    </div>
  );
}
