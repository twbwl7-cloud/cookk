"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Awwwards-style line mask: each line rises from overflow hidden.
 * Animate transform/opacity only · reduced-motion → final state.
 */
export function TextRevealMask({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <Tag className={cn("font-display tracking-[-0.02em] text-balance", className)}>
      {lines.map((line, i) => (
        <span
          key={`${i}-${line.slice(0, 12)}`}
          className="block overflow-hidden"
        >
          <motion.span
            className={cn("block will-change-transform", lineClassName)}
            initial={reduce ? false : { y: "110%", opacity: 0.35 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 0.85,
              delay: reduce ? 0 : delay + i * 0.08,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
