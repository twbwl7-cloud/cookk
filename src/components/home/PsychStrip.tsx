import Link from "next/link";
import { products } from "@/data/products";
import { siteSettings } from "@/data/site";
import { formatIls } from "@/lib/utils";

/** Soft blush trust strip — white/pink/gold/black, no dark panels. */
export function PsychStrip() {
  const fromPrice = Math.min(
    ...products.map((p) => p.variants[0]?.priceIls ?? 999),
  );

  return (
    <section className="relative border-b border-white/40 bg-transparent">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:gap-8 sm:px-6 sm:py-12">
        <div className="glass-chip rounded-2xl p-5">
          <p className="font-display text-2xl tracking-[-0.02em] text-ink">
            צילומים מהסטודיו
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-ink/65">
            כל עוגה באתר צולמה אחרי אפייה. בלי סטוק ובלי הבטחות ריקות.
          </p>
        </div>
        <div className="glass-chip rounded-2xl p-5">
          <p className="font-display text-2xl tracking-[-0.02em] text-ink">
            ממחיר <bdi>{formatIls(fromPrice)}</bdi>
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-ink/65">
            בניית עוגה מבסיס <bdi>₪250</bdi> — רואות מחיר על המסך לפני שמשלמות.
          </p>
        </div>
        <div className="glass-chip rounded-2xl p-5">
          <p className="font-display text-2xl tracking-[-0.02em] text-ink">
            עד 5 עוגות מורכבות ביום
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-ink/65">
            מכסה אמיתית לגימור מושלם.{" "}
            <Link href="/custom-cake" className="font-bold text-gold-2 underline">
              להתחיל לבנות
            </Link>
            {" · "}
            <bdi className="font-bold text-gold-2">{siteSettings.phone}</bdi>
          </p>
        </div>
      </div>
    </section>
  );
}
