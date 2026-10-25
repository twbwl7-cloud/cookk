"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Product } from "@/types/commerce";
import { formatIls } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { siteSettings } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { CakeCustomizeModal } from "@/components/shop/CakeCustomizeModal";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [customizeMode, setCustomizeMode] = useState<"inspire" | "cart" | null>(
    null,
  );
  const rememberViewed = useCartStore((s) => s.rememberViewed);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  useEffect(() => {
    rememberViewed(product.slug);
  }, [product.slug, rememberViewed]);

  const wa = whatsappLink(
    siteSettings.whatsapp,
    `היי ${siteSettings.brandName}, מתעניינת ב-${product.title} (${variant?.label ?? ""})`,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-pink-base/50 contact-shadow">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 50vw"
        />
        {product.imageCredit === "mockup" && (
          <span className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-xs text-pink-soft">
            הדמיה — עד צילום אמיתי
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-gold-3">
          {product.category === "gan" && "עוגות גן"}
          {product.category === "misparim" && "עוגות מספרים"}
          {product.category === "meutzavot" && "עוגות מעוצבות"}
          {" · "}
          {product.tags.join(" · ")}
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{product.title}</h1>
        <p className="mt-4 text-lg text-ink-muted">{product.shortDescription}</p>
        <p className="mt-6 text-3xl font-bold">
          <bdi>{formatIls(variant?.priceIls ?? 0)}</bdi>
          {variant?.compareAtIls && variant.compareAtIls > (variant?.priceIls ?? 0) && (
            <s className="mr-3 text-lg font-normal text-ink-muted">
              <bdi>{formatIls(variant.compareAtIls)}</bdi>
            </s>
          )}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          מלאי זמין: <bdi>{variant?.stock ?? 0}</bdi> · מחיר כולל מע״מ
        </p>

        {product.variants.length > 1 && (
          <div className="mt-6">
            <p className="text-sm font-semibold">בחירת וריאציה</p>
            <p className="text-xs text-ink-muted">בחירה אחת במסלול הרכישה.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    variantId === v.id
                      ? "bg-ink text-pink-soft"
                      : "gold-border bg-white/50"
                  }`}
                >
                  {v.label} · <bdi>{formatIls(v.priceIls)}</bdi>
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-6 text-sm leading-relaxed text-ink-muted">
          {product.description}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="btn-gold contact-shadow inline-flex h-13 w-full items-center justify-center rounded-full text-sm font-extrabold text-ink disabled:opacity-50"
            data-magnetic
            data-cursor-label="הוספה"
            disabled={!variant || variant.stock < 1}
            onClick={() => setCustomizeMode("cart")}
          >
            הוספה לעגלה · טקסט / מספרים / דף סוכר
          </button>
          <button
            type="button"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-gold-1/40 bg-white/70 text-sm font-bold text-ink disabled:opacity-50"
            data-magnetic
            data-cursor-label="השראה"
            disabled={!variant || variant.stock < 1}
            onClick={() => setCustomizeMode("inspire")}
          >
            <Sparkles size={16} className="text-gold-2" />
            לקחתי השראה · עוגה אחת משולבת
          </button>
          <p className="text-center text-[11px] font-bold text-ink/45">
            עוגה אחת מחוברת · גן × מעוצבת · מחיר אחד
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[#25D366] bg-[#25D366]/10 text-sm font-semibold text-ink"
          >
            שאלה בוואטסאפ
          </a>
        </div>

        {customizeMode && (
          <CakeCustomizeModal
            product={product}
            mode={customizeMode}
            open
            onClose={() => setCustomizeMode(null)}
          />
        )}

        <ul className="mt-8 space-y-2 text-sm text-ink-muted">
          <li>צילום אמיתי מהסטודיו · עיצוב לפי הזמנה</li>
          <li>תיאום טקסט, צבעים וטופרים בוואטסאפ</li>
          <li>
            משלוח / איסוף בתיאום ·{" "}
            <bdi>{siteSettings.phone}</bdi>
          </li>
        </ul>
      </div>
    </div>
  );
}
