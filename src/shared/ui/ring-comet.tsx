import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";

type RingCometProps = {
  /** Ring radius and tail length, in multiples of `unit`. */
  radius: number;
  tail: number;
  /** One design unit as a CSS length, e.g. "1px" or "calc(var(--orbit-scale) * 1px)". */
  unit: string;
  side: "left" | "right";
  /** Extra transparency, e.g. to match a ring that fades with distance. */
  alpha?: number;
  /** Negative seconds into the shared `animate-comet` cycle. */
  delay: number;
};

/**
 * A comet that climbs one side of a ring, from the bottom to the top.
 *
 * It is a small window (tail-length wide, a few px tall) at the bottom of the
 * ring that clips a ring-sized bordered circle, so the streak has the ring's
 * exact curvature, and the window rotates about the ring centre. The animated
 * layer is only the window (~130×20px); rotating a ring-sized masked box
 * instead costs a multi-megapixel layer per comet.
 *
 * Place it in a box centred on the ring centre.
 */
export function RingComet({
  radius,
  tail,
  unit,
  side,
  alpha = 1,
  delay,
}: RingCometProps) {
  const left = side === "left";
  // Window height: how far the ring rises over the tail's length, plus stroke.
  const height = Math.ceil((tail * tail) / (2 * radius)) + 4;
  const len = (n: number) => `calc(${n} * ${unit})`;

  const windowStyle: CSSProperties & Record<`--${string}`, string> = {
    left: left ? "50%" : `calc(50% - ${len(tail)})`,
    top: `calc(50% + ${len(radius - height)})`,
    width: len(tail),
    height: len(height),
    // The ring centre, relative to this window.
    transformOrigin: `${left ? "0" : "100%"} ${len(-(radius - height))}`,
    // Head (at the ring's bottom point) opaque, tail fading out.
    maskImage: `linear-gradient(to ${left ? "right" : "left"}, #000, transparent)`,
    "--comet-turn": left ? "180deg" : "-180deg",
    animationDelay: `${delay}s`,
  };

  return (
    <span
      className={cn(
        "absolute hidden overflow-hidden motion-safe:block motion-safe:animate-comet",
      )}
      style={windowStyle}
    >
      <span
        className="absolute rounded-full border-[1.5px]"
        style={{
          width: len(radius * 2),
          height: len(radius * 2),
          top: len(-(radius * 2 - height)),
          left: len(left ? -radius : tail - radius),
          borderColor: `rgb(4 126 253 / ${alpha})`,
        }}
      />
    </span>
  );
}

/**
 * Opacity a concentric `radial-gradient(closest-side, #000 <solid>, transparent)`
 * mask would give a ring of this radius. Because ring and mask share a centre,
 * a constant per-ring alpha is exactly equivalent, with no mask to composite.
 */
export function ringFadeAlpha(
  radius: number,
  boxRadius: number,
  solid: number,
) {
  const t = (radius / boxRadius - solid) / (1 - solid);
  return Math.round((1 - Math.min(1, Math.max(0, t))) * 1000) / 1000;
}
