import Image from "next/image";
import { siteConfig } from "@/config/site";

// Master wordmark in /public/brand. Intrinsic size comes from its viewBox. Callers
// size it with either `h-* w-auto` or `w-full h-auto` (no default, since cn() does
// not merge conflicting utilities).
const LOGO = {
  src: "/brand/logo-svg.svg",
  width: 1278,
  height: 168,
} as const;

export function BrandLogo({
  className,
  priority = false,
  decorative = false,
}: {
  className?: string;
  /** Preload when the logo is above the fold (header). */
  priority?: boolean;
  /** Hide from assistive tech when the brand name is already announced nearby. */
  decorative?: boolean;
}) {
  return (
    <Image
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt={decorative ? "" : siteConfig.name}
      priority={priority}
      className={className}
    />
  );
}
