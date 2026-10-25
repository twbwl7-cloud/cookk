"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  magneticLabel?: string;
  external?: boolean;
};

/** Soft dough-like spring CTA — bakery jelly feel (A11 / P03). */
export function JellyButton({
  href,
  children,
  className,
  magneticLabel,
  external,
}: Props) {
  const reduce = useReducedMotion();
  const classes = cn(
    "btn-gold contact-shadow inline-flex h-14 min-h-12 min-w-[220px] items-center justify-center rounded-full px-9 text-base font-extrabold tracking-[-0.02em] text-ink",
    className,
  );

  const motionProps = reduce
    ? {}
    : {
        whileHover: { scaleX: 1.05, scaleY: 0.96 },
        whileTap: { scaleX: 0.96, scaleY: 1.06 },
        transition: { type: "spring" as const, stiffness: 320, damping: 12 },
      };

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-magnetic
        data-cursor-label={magneticLabel}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps} className="inline-flex">
      <Link
        href={href}
        data-magnetic
        data-cursor-label={magneticLabel}
        className={classes}
      >
        {children}
      </Link>
    </motion.div>
  );
}
