import type { Metadata } from "next";
import { reviews } from "@/data/site";

export const metadata: Metadata = {
  title: "המלצות",
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">המלצות</h1>
      <p className="mt-3 text-ink-muted">
        צילומי מסך וטקסטים מלקוחות — לא ביקורות מומצאות.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {reviews.map((r) => (
          <blockquote
            key={r.id}
            className="rounded-[1.25rem] bg-white/70 p-6 contact-shadow"
          >
            <p className="text-sm leading-relaxed">“{r.body}”</p>
            <footer className="mt-4 text-xs text-ink-muted">
              {r.author} · {r.city} · מקור:{" "}
              {r.source === "whatsapp" ? "וואטסאפ" : "אתר"} · {"★".repeat(r.rating)}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
