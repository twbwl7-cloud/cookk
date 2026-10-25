"use client";

import { PageTransition } from "@/components/motion/PageTransition";

/** Route template — curtain opens on every navigation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
