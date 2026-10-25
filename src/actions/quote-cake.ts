"use server";

import {
  formatHybridWhatsApp,
  quoteHybridCake,
} from "@/lib/cake-pricing";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

export async function quoteAndWhatsAppCake(raw: unknown) {
  const quote = quoteHybridCake(raw);
  if (!quote.ok) {
    return { ok: false as const, errors: quote.errors };
  }

  const message = formatHybridWhatsApp({ quote });
  const whatsappUrl = whatsappLink(siteSettings.whatsapp, message);

  return {
    ok: true as const,
    totalIls: quote.totalIls,
    breakdownHe: quote.breakdownHe,
    whatsappUrl,
    spec: quote.spec,
  };
}
