"use client";

import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppFloat() {
  const href = whatsappLink(
    siteSettings.whatsapp,
    `שלום ${siteSettings.brandName}! אשמח לעזרה עם הזמנת עוגה / Cake Builder`,
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[5.75rem] left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white contact-shadow transition-transform hover:scale-105 md:bottom-6 md:left-6"
      aria-label="וואטסאפ"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3a9 9 0 1 1 7.9 4.5zm5-6.7c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.6-.7-2.7-1.3-3.7-2.9-.2-.3 0-.4.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.1-1.3-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
