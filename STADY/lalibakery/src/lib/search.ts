import { z } from "zod";
import { products } from "@/data/products";
import type { Product } from "@/types/commerce";

export const searchQuerySchema = z
  .string()
  .trim()
  .max(64)
  .transform((s) => s.replace(/[<>"'`]/g, ""));

export const POPULAR_TERMS = [
  "עוגת גן",
  "מספרים",
  "כתר זהב",
  "תמונה",
  "Roblox",
] as const;

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Cheap typo tolerance for Hebrew/Latin MVP (no Algolia yet). */
function fuzzyIncludes(hay: string, needle: string): boolean {
  if (!needle) return true;
  if (hay.includes(needle)) return true;
  if (needle.length < 3) return false;
  // Allow one-char skip / transposition window
  const tokens = hay.split(" ");
  return tokens.some((token) => {
    if (Math.abs(token.length - needle.length) > 2) return false;
    let misses = 0;
    let i = 0;
    let j = 0;
    while (i < token.length && j < needle.length) {
      if (token[i] === needle[j]) {
        i += 1;
        j += 1;
        continue;
      }
      misses += 1;
      if (misses > 1) return false;
      if (token.length > needle.length) i += 1;
      else if (needle.length > token.length) j += 1;
      else {
        i += 1;
        j += 1;
      }
    }
    return misses + (token.length - i) + (needle.length - j) <= 1;
  });
}

export type SearchHit = {
  product: Product;
  priceIls: number;
};

export function searchProducts(rawQuery: string, limit = 8): SearchHit[] {
  const parsed = searchQuerySchema.safeParse(rawQuery);
  if (!parsed.success) return [];
  const q = normalize(parsed.data);
  if (!q) return [];

  const hits: SearchHit[] = [];
  for (const product of products) {
    const blob = normalize(
      `${product.title} ${product.shortDescription} ${product.tags.join(" ")} ${product.category}`,
    );
    if (fuzzyIncludes(blob, q) || blob.split(" ").some((t) => fuzzyIncludes(t, q))) {
      hits.push({
        product,
        priceIls: product.variants[0]?.priceIls ?? 0,
      });
      if (hits.length >= limit) break;
    }
  }
  return hits;
}
