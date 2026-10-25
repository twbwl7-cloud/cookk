"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { PredictiveSearch } from "@/components/shop/PredictiveSearch";
import { searchProducts } from "@/lib/search";
import type { CakeCategory } from "@/types/commerce";

const categories: { id: "all" | CakeCategory; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "misparim", label: "עוגות מספרים" },
  { id: "meutzavot", label: "עוגות מעוצבות" },
  { id: "yom_huledet", label: "עוגות יום הולדת" },
];

export function ShopCatalog({
  highlight,
  initialCategory = "all",
}: {
  highlight?: string;
  initialCategory?: "all" | CakeCategory;
}) {
  const [category, setCategory] = useState<"all" | CakeCategory>(initialCategory);
  const [maxPrice, setMaxPrice] = useState(600);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const base = q.trim()
      ? searchProducts(q, 50).map((h) => h.product)
      : products;
    return base.filter((p) => {
      const price = p.variants[0]?.priceIls ?? 0;
      if (category !== "all" && p.category !== category) return false;
      if (price > maxPrice) return false;
      return true;
    });
  }, [category, maxPrice, q]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit space-y-5 rounded-[1.25rem] bg-white/60 p-4 contact-shadow lg:sticky lg:top-24">
        <PredictiveSearch value={q} onQueryChange={setQ} />
        <div>
          <p className="text-xs font-semibold">קטגוריה</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  category === c.id
                    ? "bg-ink text-pink-soft"
                    : "bg-pink-base/40 text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold" htmlFor="price">
            עד מחיר <bdi>₪{maxPrice}</bdi>
          </label>
          <input
            id="price"
            type="range"
            min={200}
            max={600}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 w-full accent-[#D4AF37]"
          />
        </div>
      </aside>

      <div>
        <p className="mb-4 text-sm text-ink-muted">
          מציג <bdi>{filtered.length}</bdi> מתוך <bdi>{products.length}</bdi> עוגות
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-[1.25rem] bg-white/60 p-10 text-center contact-shadow">
            <p className="font-display text-2xl">אין תוצאות</p>
            <p className="mt-2 text-sm text-ink-muted">נסו להרחיב את הסינון.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className={
                  highlight === p.slug
                    ? "rounded-[1.4rem] ring-2 ring-gold-1 ring-offset-4 ring-offset-pink-soft"
                    : undefined
                }
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
