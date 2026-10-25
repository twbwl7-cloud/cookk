import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 text-base text-ink outline-none transition-[box-shadow,border-color] placeholder:text-ink-muted/60 focus:border-gold-1/60 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--gold-1)_25%,transparent)]",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-28 w-full rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-base text-ink outline-none transition-[box-shadow,border-color] placeholder:text-ink-muted/60 focus:border-gold-1/60 focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--gold-1)_25%,transparent)]",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
