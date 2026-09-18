import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";

// Marching dashes and travelling packets, compositor-only: the dashes are a
// strip 8px longer than its (clipping) line that slides by one 8px period, and
// the packet rides a track that translates by its own length. Nothing here
// animates layout or paint, so the main thread stays idle.

type FlowLineProps = {
  horizontal: boolean;
  /** Flow runs right→left or bottom→top. */
  reverse?: boolean;
  /** Dash colour (any CSS colour). */
  color: string;
  /** Painted part of each 8px dash period, in px. */
  dash?: number;
  /** Seconds per dash period. */
  duration?: number;
  animated?: boolean;
  /** Positioning (`absolute`, or `relative block` in flow), length and thickness. */
  className?: string;
  style?: CSSProperties;
};

export function FlowLine({
  horizontal,
  reverse = false,
  color,
  dash = 4,
  duration,
  animated = true,
  className,
  style,
}: FlowLineProps) {
  return (
    <span className={cn("overflow-hidden", className)} style={style}>
      <span
        className={cn(
          "absolute",
          horizontal
            ? "inset-y-0 right-0 -left-2"
            : "inset-x-0 -top-2 bottom-0",
          animated &&
            (horizontal
              ? "motion-safe:animate-flow-x"
              : "motion-safe:animate-flow-y"),
        )}
        style={{
          backgroundImage: `repeating-linear-gradient(${horizontal ? "90deg" : "180deg"}, ${color} 0 ${dash}px, transparent ${dash}px 8px)`,
          animationDirection: reverse ? "reverse" : undefined,
          animationDuration: duration ? `${duration}s` : undefined,
        }}
      />
    </span>
  );
}

type FlowPacketProps = {
  horizontal: boolean;
  reverse?: boolean;
  /** Seconds before this packet starts, to sequence packets along a route. */
  delay?: number;
  /** Same position and length as the line it travels (no thickness). */
  style?: CSSProperties;
  /** Dot styling (size, colour, glow). */
  dotClassName?: string;
};

export function FlowPacket({
  horizontal,
  reverse = false,
  delay = 0,
  style,
  dotClassName,
}: FlowPacketProps) {
  return (
    <span
      className={cn(
        "absolute hidden motion-safe:block",
        horizontal
          ? "h-0 motion-safe:animate-packet-x"
          : "w-0 motion-safe:animate-packet-y",
      )}
      style={{
        ...style,
        animationDelay: `${delay}s`,
        animationDirection: reverse ? "reverse" : undefined,
      }}
    >
      <span
        className={cn(
          "absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-to",
          dotClassName,
        )}
      />
    </span>
  );
}
