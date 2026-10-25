import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/products";

export const metadata: Metadata = {
  title: "קטגוריות",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">הקטגוריות שלנו</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        עוגות מספרים · מעוצבות · יום הולדת — כולן מצילומים אמיתיים מהסטודיו.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {collections.map((c) => (
          <Link key={c.id} href={`/collections/${c.slug}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] contact-shadow">
              <Image
                src={c.coverImage}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
              <div className="absolute bottom-0 p-5 text-pink-soft">
                <h2 className="font-display text-2xl">{c.title}</h2>
                <p className="mt-1 text-sm text-pink-soft/80">{c.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
