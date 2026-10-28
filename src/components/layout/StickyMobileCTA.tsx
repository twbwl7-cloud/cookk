"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Landing sticky CTA (DOKS · דף נחיתה): always available on mobile,
 * never blocks reading on the builder itself, micro-reassurance under primary.
 */
export function StickyMobileCTA() {
  const pathname = usePathname();
  const hide =
    pathname?.startsWith("/checkout") ||
    pathname?.startsWith("/custom-cake") ||
    pathname?.startsWith("/builder") ||
    pathname?.startsWith("/z");

  if (hide) return null;

  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}! רוצה ייעוץ קצר לפני בניית העוגה`,
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-1/25 bg-[#fffaf8]/94 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-2xl md:hidden"
      style={{
        boxShadow: "0 -12px 40px -24px rgba(13,13,13,0.28)",
      }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <Link
          href="/custom-cake"
          className="btn-gold contact-shadow flex h-12 min-w-0 flex-1 items-center justify-center rounded-full text-[13px] font-extrabold tracking-wide"
        >
          לבנות את היצירה
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-white/80 px-3.5 text-[12px] font-bold text-ink"
          aria-label="וואטסאפ"
        >
          ייעוץ
        </a>
      </div>
      <p className="mt-1.5 text-center text-[10px] font-semibold text-ink/45">
        בלי התחייבות · מחיר על המסך · <bdi>{siteSettings.phone}</bdi>
      </p>
    </div>
  );
}
