import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ink" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  gold: "btn-gold contact-shadow font-semibold",
  ink: "bg-ink text-pink-soft hover:bg-ink/90",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  outline:
    "bg-transparent text-ink gold-border hover:bg-white/50 contact-shadow",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", ...props }, ref) => {
    const sizes = {
      sm: "h-9 px-3 text-sm rounded-full",
      md: "h-11 px-5 text-sm rounded-full",
      lg: "h-13 px-7 text-base rounded-full min-h-12",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-[transform,filter,background-color] duration-200 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
