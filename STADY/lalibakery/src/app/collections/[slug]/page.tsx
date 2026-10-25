import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  collections,
  getCollectionBySlug,
  getProductsByCategory,
} from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import type { CakeCategory } from "@/types/commerce";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  return { title: c?.title ?? "קטגוריה" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const items = getProductsByCategory(collection.slug as CakeCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">{collection.title}</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">{collection.description}</p>
      <p className="mt-2 text-sm text-ink-muted">
        <bdi>{items.length}</bdi> עוגות בקטגוריה
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
