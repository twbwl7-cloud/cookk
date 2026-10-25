"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/checkout") || pathname?.startsWith("/builder")) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/15 bg-black-deep/95 p-3 backdrop-blur-xl md:hidden">
      <Link
        href="/builder"
        className="btn-gold contact-shadow flex h-12 w-full items-center justify-center rounded-full text-sm font-bold text-ink"
        data-magnetic
        data-cursor-label="BUILD"
      >
        הרכיבו עוגה אישית ב-3D
      </Link>
    </div>
  );
}
