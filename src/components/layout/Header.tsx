"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { siteSettings } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/collections/gan", label: "עוגות גן" },
  { href: "/collections/misparim", label: "עוגות מספרים" },
  { href: "/collections/meutzavot", label: "עוגות מעוצבות" },
  { href: "/shop", label: "הכל" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const totalUnits = useCartStore((s) => s.totalUnits());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-gold-1/25 bg-[#fffaf8]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            aria-label="תפריט"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2"
            data-magnetic
            data-cursor-label="HOME"
          >
            <Image
              src="/cakes/brand/logo.jpg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-gold-1/50 object-cover"
            />
            <span className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
              {siteSettings.brandName}
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-bold text-ink/80 transition-colors hover:text-gold-2"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/shop"
              className="btn-gold contact-shadow hidden h-10 items-center rounded-full px-4 text-sm font-semibold text-ink sm:inline-flex"
              data-magnetic
            >
              לראות את העוגות
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-white/70"
              aria-label="עגלה"
              data-magnetic
              data-cursor-label="BAG"
            >
              <ShoppingBag size={18} />
              {totalUnits > 0 && (
                <span className="absolute -top-1 -start-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-pink-soft">
                  <bdi>{totalUnits}</bdi>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-gold-1/20 bg-pink-soft lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-white/60"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
