import Link from "next/link";
import { products } from "@/data/products";
import { siteSettings } from "@/data/site";
import { formatIls } from "@/lib/utils";

/** Real capacity messaging — daily slot policy (max 5 complex), not fake countdown. */
export function PsychStrip() {
  const fromPrice = Math.min(
    ...products.map((p) => p.variants[0]?.priceIls ?? 999),
  );

  return (
    <section className="border-y-2 border-ink bg-ink text-pink-soft">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-2xl text-pink-soft">
            צילומים מהסטודיו בלבד
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-pink-soft/75">
            כל עוגה באתר צולמה אחרי אפייה. בלי תמונות סטוק ובלי ביקורות מומצאות.
          </p>
        </div>
        <div>
          <p className="font-display text-2xl text-pink-soft">
            ממחיר <bdi>{formatIls(fromPrice)}</bdi>
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-pink-soft/75">
            Builder מבסיס <bdi>₪250</bdi> · המחיר מתעדכן בלייב לפי קומות וקישוט.
          </p>
        </div>
        <div>
          <p className="font-display text-2xl text-pink-soft">
            עד <bdi>5</bdi> עוגות מורכבות ביום
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-pink-soft/75">
            מכסת אפייה אמיתית לשמירה על גימור.{" "}
            <Link href="/builder" className="font-bold underline">
              לשריון סלוט ב-Builder
            </Link>
            {" · "}
            <bdi className="font-bold text-gold-2">{siteSettings.phone}</bdi>
          </p>
        </div>
      </div>
    </section>
  );
}
