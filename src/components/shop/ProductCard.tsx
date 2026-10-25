"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/commerce";
import { formatIls } from "@/lib/utils";
import { ProductActionBar } from "@/components/shop/CakeCustomizeModal";

export function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0];
  const price = variant?.priceIls ?? 0;

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/product/${product.slug}`} className="block flex-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-pink-base/50 contact-shadow">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          {product.imageCredit === "mockup" && (
            <span className="absolute top-3 right-3 rounded-full bg-ink/80 px-2 py-1 text-[10px] font-medium text-pink-soft">
              הדמיה
            </span>
          )}
          {product.category === "gan" && (
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-ink">
              גן
            </span>
          )}
          {product.category === "misparim" && (
            <span className="absolute top-3 left-3 rounded-full gold-gradient px-2 py-1 text-[10px] font-bold text-ink">
              מספרים
            </span>
          )}
          {product.category === "meutzavot" && (
            <span className="absolute top-3 left-3 rounded-full bg-ink/85 px-2 py-1 text-[10px] font-bold text-gold-2">
              מעוצבת
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1 px-1">
          <h3 className="font-display text-lg font-bold leading-tight text-ink">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm font-medium text-ink/70">
            {product.shortDescription}
          </p>
          <p className="pt-1 text-base font-extrabold text-ink">
            <bdi>{formatIls(price)}</bdi>
            {variant?.compareAtIls && variant.compareAtIls > price && (
              <s className="mr-2 text-sm font-normal text-ink-muted">
                <bdi>{formatIls(variant.compareAtIls)}</bdi>
              </s>
            )}
          </p>
        </div>
      </Link>
      <ProductActionBar product={product} />
    </article>
  );
}
