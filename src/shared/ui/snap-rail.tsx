"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";

// Phones (below sm): the list becomes a native scroll-snap rail, cards at 85%
// width so the next one peeks in, edge to edge inside the section gutter, with
// SoftexEdge-style dots under it (blue pill = current card). From sm up the
// list keeps exactly the grid classes it is given and the dots are hidden.
// The rail is `relative` so absolutely positioned descendants (an `sr-only`
// label, say) are contained and clipped by it; otherwise their containing
// block is the page and their off-screen position widens the document.
const RAIL =
  "max-sm:relative max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:scroll-px-4 max-sm:px-4 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden max-sm:[&>li]:w-[85%] max-sm:[&>li]:shrink-0 max-sm:[&>li]:snap-start";

export function SnapRail({
  as: List = "ul",
  className,
  label,
  tone = "light",
  children,
}: {
  /** List element; ordered content (steps, ranked items) passes "ol". */
  as?: "ul" | "ol";
  /** The list's own classes (grid, gap, spacing); they still apply from sm. */
  className?: string;
  /** Prefixes each dot's accessible name, e.g. the section title. */
  label: string;
  tone?: "light" | "dark";
  children: ReactNode;
}) {
  const railRef = useRef<HTMLUListElement & HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const items = [...rail.children];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target));
        }
      },
      { root: rail, threshold: 0.6 },
    );
    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const rail = railRef.current;
    const item = rail?.children[index];
    if (!rail || !(item instanceof HTMLElement)) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    rail.scrollTo({
      left:
        item.offsetLeft - Number.parseFloat(getComputedStyle(rail).paddingLeft),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const dark = tone === "dark";
  return (
    <>
      <List ref={railRef} className={cn(className, RAIL)}>
        {children}
      </List>
      {count > 1 ? (
        <div className="mt-5 flex items-center gap-1 sm:hidden">
          {Array.from({ length: count }, (_, index) => (
            // 44px-tall hit area around a 6px dot; the padding is cancelled
            // by negative margins so the row stays compact.
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
              key={index}
              type="button"
              aria-label={`${label}: show card ${index + 1} of ${count}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
              className="-my-[19px] grid h-11 place-items-center px-1"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                  index === active
                    ? "w-6 bg-brand-gradient"
                    : dark
                      ? "w-1.5 bg-white/30"
                      : "w-1.5 bg-zinc-300",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
