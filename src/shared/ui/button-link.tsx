import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const variants = {
  primary:
    "bg-black text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(0_0_0/0.2)] hover:bg-brand",
  secondary:
    "border border-zinc-200 bg-white text-zinc-800 shadow-[0_1px_2px_rgb(0_0_0/0.04)] hover:border-brand-200 hover:bg-brand-50",
  muted:
    "border border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-brand-200 hover:bg-brand-50",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-4.5 text-[15px]",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
