"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import type { Stat } from "../page-blocks.types";

const DURATION = 1600;

/** "18%" → number 18, suffix "%"; "24/7" → 24, "/7". Values are numeric only. */
function parse(value: string) {
  const match = value.match(/^(\D*?)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
}

/**
 * Counts a numeric value up from 0 the first time it scrolls into view
 * (ease-out, 1.6s), like SoftexEdge's agency stats. Reduced motion jumps to
 * the final value; assistive tech and crawlers always get it (sr-only copy).
 */
function StatValue({ value }: { value: string }) {
  const parsed = parse(value);
  const target = parsed?.target;
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at 0 like SoftexEdge (no flash of the final value before the
  // count); the sr-only copy carries the real value for AT and crawlers.
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (target === undefined || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          setCount(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (!parsed) return <span>{value}</span>;
  const figure = (n: number) => (
    <>
      {parsed.prefix}
      {n}
      {parsed.suffix ? (
        <span className="ml-0.5 bg-brand-gradient bg-clip-text text-transparent">
          {parsed.suffix}
        </span>
      ) : null}
    </>
  );
  return (
    <>
      <span className="sr-only">{value}</span>
      {/* The invisible final value holds the width, so the row doesn't
          shift as the count gains digits (0 → 100). */}
      <span ref={ref} aria-hidden="true" className="inline-grid tabular-nums">
        <span className="invisible [grid-area:1/1]">
          {figure(parsed.target)}
        </span>
        <span className="[grid-area:1/1]">{figure(count)}</span>
      </span>
    </>
  );
}

/**
 * Hero stat row in the SoftexEdge "agency stats" style: no box, large figures
 * centred in columns split by hairlines, small uppercase tracked labels.
 * Figures are numbers only; refined after the Stripe spec (awesome-design-md):
 * a lighter display weight (400, not 600) with negative tracking, tabular
 * figures, and a short brand hairline tying each figure to its label.
 */
// Phones: stats become cards in a two-column grid (figure on top, label
// below, centred both ways, no brand hairline); with three stats the third spans the full
// width, four make a 2x2 grid.
// Hairlines for four stats (from sm): 2x2 from sm, one row from lg.
const FOUR_UP_BORDERS = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
] as const;

export function HeroStats({
  stats,
  tone = "light",
  className = "mt-6 sm:mt-20",
}: {
  stats: readonly Stat[];
  /** "dark" for ink sections (About "At a glance"). */
  tone?: "light" | "dark";
  /** Spacing above the row; replaces the hero default. */
  className?: string;
}) {
  const fourUp = stats.length === 4;
  const dark = tone === "dark";
  return (
    <dl
      className={cn(
        "grid motion-safe:animate-rise max-sm:grid-cols-2 max-sm:gap-3",
        fourUp ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col-reverse items-center justify-end gap-3 p-4 text-center max-sm:justify-center max-sm:rounded-2xl max-sm:border sm:gap-0 sm:px-4 lg:px-8",
            fourUp ? "sm:py-6 lg:py-4" : "sm:py-4",
            dark
              ? "border-white/10 max-sm:bg-white/[0.03]"
              : "border-zinc-200/80 max-sm:bg-white",
            !fourUp && index === 2 && "max-sm:col-span-2",
            fourUp
              ? FOUR_UP_BORDERS[index]
              : index > 0 && "border-t sm:border-t-0 sm:border-l",
          )}
        >
          <dt
            className={cn(
              "max-w-[24ch] text-[12px] leading-5 max-sm:text-[11px] font-semibold tracking-[0.16em] text-balance uppercase sm:mt-4",
              dark ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            {stat.label}
          </dt>
          <dd
            className={cn(
              "flex shrink-0 flex-col items-center text-[2rem] leading-none font-normal tracking-[-0.02em] sm:w-auto sm:items-center sm:text-[2.75rem] lg:text-[4.25rem]",
              dark ? "text-white" : "text-ink",
            )}
          >
            <StatValue value={stat.value} />
            <span
              aria-hidden="true"
              className="mt-3 h-px w-8 bg-brand-gradient opacity-80 max-sm:hidden sm:mt-5"
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
