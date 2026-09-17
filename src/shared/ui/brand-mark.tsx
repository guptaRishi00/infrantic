import Image from "next/image";
import { cn } from "@/shared/lib/cn";

// The "I" glyph at the left of the master wordmark (/brand/logo-svg.svg,
// 1278×168; the glyph is the first 43.4 units). The file is cropped with CSS, so
// there is a single source of truth for the brand artwork.
const LOGO_SRC = "/brand/logo-svg.svg";
const GLYPH_ASPECT = "43.4 / 168";

/**
 * Compact brand mark for square tiles. Size it with `size-*` on `className`.
 * `tone="white"` renders it knocked out in white for dark or brand surfaces.
 */
export function BrandMark({
  className,
  tone = "white",
}: {
  className?: string;
  tone?: "white" | "color";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        className="relative h-full overflow-hidden"
        style={{ aspectRatio: GLYPH_ASPECT }}
      >
        <Image
          src={LOGO_SRC}
          alt=""
          width={1278}
          height={168}
          className={cn(
            "absolute top-0 left-0 h-full w-auto max-w-none",
            tone === "white" && "brightness-0 invert",
          )}
        />
      </span>
    </span>
  );
}
