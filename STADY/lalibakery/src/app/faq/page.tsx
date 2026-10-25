import type { Metadata } from "next";
import { faqs } from "@/data/site";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <FaqJsonLd />
      <h1 className="font-display text-4xl sm:text-5xl">שאלות נפוצות</h1>
      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.id}
            className="group rounded-[1.25rem] bg-white/70 p-5 contact-shadow open:bg-white"
          >
            <summary className="cursor-pointer list-none font-semibold marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {f.question}
                <span className="text-gold-3 transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
