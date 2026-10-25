"use server";

import { z } from "zod";
import { guardAction } from "@/lib/request-guard";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(9).max(20),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(5).max(1000),
  /** Honeypot — must stay empty */
  company: z.string().optional().default(""),
});

export type ContactResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; error: string };

function stripHeaderInjection(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function submitContact(raw: unknown): Promise<ContactResult> {
  const gate = await guardAction("contact", 6, 60_000);
  if (!gate.ok) return { ok: false, error: gate.error };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "בדקו שהפרטים מלאים ותקינים." };
  }

  const data = parsed.data;
  if (data.company) {
    return { ok: false, error: "בקשה נדחתה." };
  }

  const name = stripHeaderInjection(data.name);
  const phone = stripHeaderInjection(data.phone);
  const email = stripHeaderInjection(data.email);
  const message = stripHeaderInjection(data.message);

  const whatsappUrl = whatsappLink(
    siteSettings.whatsapp,
    `פנייה מהאתר\n${name}\n${phone}\n${email}\n${message}`,
  );

  return { ok: true, whatsappUrl };
}
