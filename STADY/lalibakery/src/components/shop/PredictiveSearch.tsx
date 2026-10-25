"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, useTransition } from "react";
import { POPULAR_TERMS, searchProducts } from "@/lib/search";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 180;

export function PredictiveSearch({
  className,
  onPick,
  value,
  onQueryChange,
}: {
  className?: string;
  onPick?: () => void;
  value?: string;
  onQueryChange?: (q: string) => void;
}) {
  const inputId = useId();
  const listId = useId();
  const [internal, setInternal] = useState("");
  const q = value ?? internal;
  const setQ = (next: string) => {
    if (value === undefined) setInternal(next);
    onQueryChange?.(next);
  };
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const setLastSearch = useCartStore((s) => s.setLastSearch);
  const lastSearch = useCartStore((s) => s.lastSearch);

  useEffect(() => {
    const t = window.setTimeout(() => {
      startTransition(() => setDebounced(q));
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const hits = useMemo(() => searchProducts(debounced, 6), [debounced]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <label className="text-xs font-semibold text-ink" htmlFor={inputId}>
        חיפוש חכם
      </label>
      <div className="relative mt-1">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 start-3 -translate-y-1/2 text-ink/45"
          aria-hidden
        />
        <input
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          maxLength={64}
          value={q}
          placeholder={lastSearch || "מיקי, מספרים, כתר…"}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            const next = e.target.value.slice(0, 64);
            setQ(next);
            setLastSearch(next);
            setOpen(true);
          }}
          className="h-11 w-full rounded-full border border-ink/15 bg-white/80 pe-4 ps-10 text-sm outline-none ring-gold-1/40 transition focus:ring-2"
        />
      </div>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+0.4rem)] z-40 overflow-hidden rounded-2xl border border-ink/10 bg-white/95 shadow-[0_24px_48px_-28px_rgb(13_13_13_/_0.45)] backdrop-blur-xl"
        >
          {!debounced ? (
            <div className="p-3">
              <p className="px-2 text-[11px] font-semibold tracking-wide text-ink/50">
                מונחים פופולריים
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 px-1">
                {POPULAR_TERMS.map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      className="min-h-10 rounded-full bg-pink-soft/50 px-3 text-xs font-semibold text-ink transition hover:bg-pink-soft"
                      onClick={() => {
                        setQ(term);
                        setLastSearch(term);
                      }}
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : hits.length === 0 ? (
            <p className="p-4 text-sm text-ink/60">אין התאמה — נסו «גן» או «מספרים»</p>
          ) : (
            <ul className="max-h-80 overflow-auto py-1">
              {hits.map(({ product, priceIls }) => (
                <li key={product.id} role="option" aria-selected={false}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      setOpen(false);
                      onPick?.();
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-pink-soft/35"
                    data-magnetic
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink/10">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">
                        {product.title}
                      </span>
                      <span className="block truncate text-xs text-ink/55">
                        {product.shortDescription}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold text-ink">
                      ₪<bdi>{priceIls}</bdi>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
