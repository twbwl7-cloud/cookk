"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Cake/plate springs up into view on scroll — soft bounce, once. */
export function PlatePopUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        bounce: 0.38,
        duration: 1,
        delay,
      }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
