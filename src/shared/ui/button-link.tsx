import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

const variants = {
  // Phones have no hover, so below md every variant shows its hover look at
  // rest (primary/onDark: brand gradient; secondary/muted: brand tint).
  primary:
    "bg-black text-white hover:bg-brand-gradient max-md:bg-brand-gradient",
  secondary:
    "border border-zinc-200 bg-white text-zinc-800 hover:border-brand-200 hover:bg-brand-50 max-md:border-brand-200 max-md:bg-brand-50",
  muted:
    "border border-zinc-200 bg-zinc-50 text-zinc-800 hover:border-brand-200 hover:bg-brand-50 max-md:border-brand-200 max-md:bg-brand-50",
  // White button for ink sections; fills with the brand gradient on hover. The
  // border stays transparent so the gradient reaches the edge.
  onDark:
    "border border-transparent bg-white text-ink hover:bg-brand-gradient hover:text-white max-md:bg-brand-gradient max-md:text-white",
} as const;

// The same hover looks, driven by hovering anywhere on a `group/card` parent
// (used with `stretched`). Literal classes so Tailwind can see them.
const cardHover = {
  primary: "group-hover/card:bg-brand-gradient",
  secondary: "group-hover/card:border-brand-200 group-hover/card:bg-brand-50",
  muted: "group-hover/card:border-brand-200 group-hover/card:bg-brand-50",
  onDark: "group-hover/card:bg-brand-gradient group-hover/card:text-white",
} as const;

/**
 * Stretched link: an empty ::after covers the nearest positioned ancestor (the
 * card, which needs `relative group/card`), so the whole card follows the link
 * while it stays one focusable link. Keep other links/buttons out of such cards.
 */
const stretchedClass = "after:absolute after:inset-0 after:content-['']";

// Phones (below sm) use one button size everywhere: sm grows to md there.
const sizes = {
  sm: "h-9 px-3.5 text-sm max-sm:h-11 max-sm:px-4.5 max-sm:text-[15px]",
  md: "h-11 px-4.5 text-[15px]",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Make the whole `relative group/card` parent clickable and hover-linked. */
  stretched?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  stretched = false,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        variants[variant],
        sizes[size],
        stretched && stretchedClass,
        stretched && cardHover[variant],
        className,
      )}
      {...props}
    />
  );
}
