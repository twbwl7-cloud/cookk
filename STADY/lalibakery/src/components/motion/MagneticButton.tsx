"use client";

import Link from "next/link";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Common = {
  className?: string;
  cursorLabel?: string;
  children: ReactNode;
};

type AsButton = Common &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: undefined;
  };

type AsLink = Common &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className"> & {
    href: string;
  };

/**
 * Soft magnetic pull on fine pointers — transform only, reduced-motion safe.
 */
export const MagneticButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AsButton | AsLink
>(function MagneticButton(props, ref) {
  const reduce = useReducedMotion();
  const inner = useRef<HTMLSpanElement>(null);
  const { className, cursorLabel, children, ...rest } = props;
  void ref;

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce || !inner.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    inner.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
  };

  const onLeave = () => {
    if (inner.current) {
      inner.current.style.transform = "translate3d(0,0,0)";
    }
  };

  const shared = {
    "data-magnetic": true,
    "data-cursor-label": cursorLabel,
    className: cn(
      "inline-flex items-center justify-center overflow-visible",
      className,
    ),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  } as const;

  const label = (
    <span
      ref={inner}
      className="inline-flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
    >
      {children}
    </span>
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as AsLink;
    return (
      <Link href={href} {...linkRest} {...shared}>
        {label}
      </Link>
    );
  }

  const buttonRest = rest as AsButton;
  return (
    <button type="button" {...buttonRest} {...shared}>
      {label}
    </button>
  );
});
