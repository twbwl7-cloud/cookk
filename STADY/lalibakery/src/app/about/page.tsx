import type { Metadata } from "next";
import Image from "next/image";
import { siteSettings } from "@/data/site";

export const metadata: Metadata = {
  title: "אודות",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-4">
        <Image
          src="/cakes/brand/logo.jpg"
          alt={siteSettings.brandName}
          width={72}
          height={72}
          className="h-18 w-18 rounded-full object-cover contact-shadow"
        />
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">{siteSettings.brandName}</h1>
          <p className="mt-1 text-ink-muted">{siteSettings.tagline}</p>
        </div>
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted">
        <p>
          אנחנו אופים עוגות שמסתכלות טוב על השולחן — ומתפרקות טוב בצלחת.
          עוגות גן עם דף אכיל, עוגות מספרים עמוסות, ועוגות מעוצבות עם כתרים
          וטופרים — הכל לפי הזמנה.
        </p>
        <p>
          רוצים תמונה של הילד על העוגה? דמות אהובה? מספר מדויק ליום הולדת?
          שולחים בוואטסאפ — ומתחילים לעצב.
        </p>
        <p>
          הזמנות:{" "}
          <a className="font-semibold text-ink underline" href={`tel:${siteSettings.phone}`}>
            <bdi>{siteSettings.phone}</bdi>
          </a>
          {" · "}
          {siteSettings.hours}
        </p>
      </div>
      <div className="relative mt-10 aspect-[4/5] max-w-md overflow-hidden rounded-[1.5rem] contact-shadow">
        <Image
          src="/cakes/hero/round-gold-crown.jpg"
          alt="עוגה מעוצבת עם כתר זהב"
          fill
          className="object-cover"
          sizes="400px"
        />
      </div>
    </div>
  );
}
