"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Flush under fixed header on immersive routes; pad elsewhere so titles clear the bar. */
export function MainShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const flush = path === "/" || path === "/builder";

  return (
    <main
      id="main-content"
      className={cn(!flush && "pt-16 lg:pt-[4.5rem]")}
    >
      {children}
    </main>
  );
}
