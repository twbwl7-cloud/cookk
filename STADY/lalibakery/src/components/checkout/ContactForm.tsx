"use client";

import { FormEvent, useState, useTransition } from "react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/actions/contact";

export function ContactForm() {
  const [pending, start] = useTransition();
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
    };

    start(async () => {
      const result = await submitContact(payload);
      if (!result.ok) {
        setError(result.error);
        setOk(false);
        return;
      }
      setOk(true);
      setError(null);
      window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  if (ok) {
    return (
      <div className="rounded-[1.5rem] bg-white/70 p-8 contact-shadow">
        <p className="font-display text-2xl">הפנייה נשלחה</p>
        <p className="mt-2 text-sm text-ink-muted">
          נפתח וואטסאפ עם הסיכום. נחזור אליכן בהקדם בשעות הפעילות.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-3 rounded-[1.5rem] bg-white/70 p-6 contact-shadow"
    >
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">חברה</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="mb-1 block text-xs" htmlFor="name">
          שם
        </label>
        <Input id="name" name="name" required maxLength={80} />
      </div>
      <div>
        <label className="mb-1 block text-xs" htmlFor="phone">
          טלפון
        </label>
        <Input
          id="phone"
          name="phone"
          required
          dir="ltr"
          inputMode="tel"
          maxLength={20}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs" htmlFor="email">
          אימייל
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          dir="ltr"
          maxLength={120}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs" htmlFor="message">
          הודעה
        </label>
        <Textarea id="message" name="message" required maxLength={1000} />
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "שולחים…" : "שליחה בוואטסאפ"}
      </Button>
      <p className="text-[11px] leading-relaxed text-ink/55">
        בלחיצה אתן מאשרות שנשתמש בפרטים ליצירת קשר לגבי ההזמנה בלבד. אין דיוור
        שיווקי בלי הסכמה נפרדת.
      </p>
    </form>
  );
}
