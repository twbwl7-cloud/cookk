"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<typeof Link> & {
  underline?: boolean;
};

/**
 * Footer / nav link with magnetic cursor hook + physics underline
 * (transform-origin: right for RTL — expands from the start of Hebrew text).
 */
export function MagneticLink({
  className,
  children,
  underline = true,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      data-magnetic
      className={cn(
        "group relative inline-flex min-h-12 items-center text-sm transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
    >
      <span>{children}</span>
      {underline ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-2 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      ) : null}
    </Link>
  );
}
