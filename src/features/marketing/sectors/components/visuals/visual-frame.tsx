import type { ReactNode } from "react";
import { FlowPacket } from "@/shared/ui/flow-line";

/**
 * Shared shell for the sector hero illustrations: a frameless 5:4 stage whose
 * drawing is an SVG on a 500×400 viewBox, so a point (x, y) sits at
 * (x/5 %, y/4 %) for the HTML overlays that carry the motion. One image to
 * assistive tech, described by `label`; everything inside is decorative.
 *
 * Motion rules (see the map): transform/opacity only, long iterations, and no
 * rounded `overflow-hidden` around anything that moves.
 */
export function VisualFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div role="img" aria-label={label}>
      {/* Short phones: 85% width, so the 5:4 drawing fits the one-screen
          hero under the copy. */}
      <div
        aria-hidden="true"
        className="relative aspect-[5/4] select-none [@media(max-height:760px)]:max-sm:mx-auto [@media(max-height:760px)]:max-sm:w-[85%]"
      >
        {children}
      </div>
    </div>
  );
}

export const X = (x: number) => `${x / 5}%`;
export const Y = (y: number) => `${y / 4}%`;

type Point = readonly [number, number];

/** A glowing packet travelling a straight (horizontal or vertical) segment. */
export function Packet({
  from,
  to,
  delay = 0,
}: {
  from: Point;
  to: Point;
  delay?: number;
}) {
  const horizontal = from[1] === to[1];
  const reverse = horizontal ? to[0] < from[0] : to[1] < from[1];
  return (
    <FlowPacket
      horizontal={horizontal}
      reverse={reverse}
      delay={delay}
      style={
        horizontal
          ? {
              left: X(Math.min(from[0], to[0])),
              top: Y(from[1]),
              width: X(Math.abs(to[0] - from[0])),
            }
          : {
              left: X(from[0]),
              top: Y(Math.min(from[1], to[1])),
              height: Y(Math.abs(to[1] - from[1])),
            }
      }
      dotClassName="size-2 shadow-[0_0_10px_3px_rgb(7_161_253/0.55)]"
    />
  );
}

/** Brand gradient for strokes; ids are per illustration (one per page). */
export function StrokeGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#07a1fd" />
        <stop offset="1" stopColor="#047efd" />
      </linearGradient>
    </defs>
  );
}
