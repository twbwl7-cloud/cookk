"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Collection } from "@/types/commerce";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Three circular category portals — isolation of choice, not a card grid. */
export function CategoryCircle({ collections }: { collections: Collection[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 lg:gap-14">
      {collections.map((c, i) => (
        <motion.div
          key={c.id}
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, delay: i * 0.1, ease: EASE }}
          className="w-[min(42vw,11.5rem)] text-center sm:w-[13.5rem]"
        >
          <Link
            href={`/collections/${c.slug}`}
            className="group relative mx-auto block aspect-square w-full"
            data-magnetic
            data-cursor-label="OPEN"
          >
            <span
              aria-hidden
              className="absolute -inset-2 rounded-full bg-gradient-to-br from-white/80 via-pink-baby/30 to-gold-1/25 opacity-80 blur-[2px] transition duration-500 group-hover:opacity-100 group-hover:blur-[1px]"
            />
            <span className="glass-liquid absolute inset-0 overflow-hidden rounded-full p-[3px]">
              <span className="relative block h-full w-full overflow-hidden rounded-full">
                <Image
                  src={c.coverImage}
                  alt={c.title}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-white/10" />
              </span>
            </span>
            <span className="absolute inset-x-3 bottom-4 z-10 font-display text-lg font-black tracking-[-0.02em] text-white drop-shadow sm:text-xl">
              {c.title}
            </span>
          </Link>
          <p className="mt-4 text-xs font-semibold leading-relaxed text-ink/60 sm:text-sm">
            {c.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
