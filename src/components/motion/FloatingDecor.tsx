"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Floater = {
  src: string;
  className: string;
  delay?: number;
  duration?: number;
};

const FLOATERS: Floater[] = [
  {
    src: "/cakes/meutzavot/gold-crown-king.jpg",
    className: "start-[6%] top-[18%] h-14 w-14 sm:h-16 sm:w-16",
    delay: 0,
    duration: 5.2,
  },
  {
    src: "/cakes/misparim/number-40-fruit.jpg",
    className: "end-[8%] top-[28%] h-12 w-12 sm:h-14 sm:w-14",
    delay: 0.8,
    duration: 4.6,
  },
  {
    src: "/cakes/gan/photo-libby-8.jpg",
    className: "start-[12%] bottom-[22%] h-11 w-11 sm:h-13 sm:w-13",
    delay: 1.4,
    duration: 5.8,
  },
  {
    src: "/cakes/meutzavot/hello-kitty-3.jpg",
    className: "end-[14%] bottom-[18%] h-12 w-12 sm:h-14 sm:w-14",
    delay: 0.4,
    duration: 4.9,
  },
];

/** Soft floating cake vignettes — appetite without clutter (P04 once, quiet). */
export function FloatingDecor() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {FLOATERS.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute overflow-hidden rounded-full border border-white/70 shadow-[0_12px_28px_-16px_rgb(13_13_13_/_0.35)] ${f.className}`}
          animate={{ y: [0, -18, 0], rotate: [0, 6, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: f.duration ?? 5,
            delay: f.delay ?? 0,
            ease: "easeInOut",
          }}
          style={{ opacity: 0.55 }}
        >
          <Image
            src={f.src}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* Gold leaf flecks */}
      {[
        { top: "22%", start: "22%", delay: 0.2 },
        { top: "48%", end: "20%", delay: 1.1 },
        { top: "70%", start: "40%", delay: 0.6 },
      ].map((d, i) => (
        <motion.span
          key={`gold-${i}`}
          className="absolute h-2 w-2 rounded-[1px] bg-gradient-to-br from-gold-1 to-gold-3"
          style={{ top: d.top, ...(d.start ? { insetInlineStart: d.start } : { insetInlineEnd: (d as { end: string }).end }) }}
          animate={{ y: [0, -14, 0], opacity: [0.35, 0.85, 0.35], rotate: [0, 25, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.8 + i,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
