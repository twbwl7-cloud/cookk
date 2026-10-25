"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/checkout")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-pink-soft/95 p-3 backdrop-blur-xl md:hidden">
      <Link
        href="/custom-cake"
        className="btn-gold contact-shadow flex h-12 w-full items-center justify-center rounded-full text-sm font-bold"
      >
        לבנות עוגה צעד־אחר־צעד
      </Link>
    </div>
  );
}
