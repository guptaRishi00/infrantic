"use client";

import { ChevronRight } from "lucide-react";
import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/shared/lib/cn";

type WorkTab = { id: string; number: string; title: string; summary: string };

type WorkTabsProps = {
  tabs: readonly WorkTab[];
  /** Server-rendered panels, one per tab, in the same order. */
  panels: readonly ReactNode[];
};

/**
 * Case-study switcher: WAI-ARIA tabs with roving focus. A vertical list beside
 * the panel on large screens, a horizontal scroller above it on small ones.
 * Panels are server-rendered and all stay in the HTML; only visibility is state.
 */
export function WorkTabs({ tabs, panels }: WorkTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function focusTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    // Both axes: the list is vertical on desktop and horizontal on mobile.
    const moves: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      focusTab(moves[event.key]);
    }
  }

  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[18rem_1fr]">
      <div
        role="tablist"
        aria-label="Case studies"
        className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-0 lg:divide-y lg:divide-white/10 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-white/10"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "group relative flex w-64 shrink-0 snap-start flex-col rounded-2xl border border-white/10 p-5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-300 lg:w-auto lg:flex-1 lg:rounded-none lg:border-0 lg:p-6",
                selected ? "bg-white/[0.07]" : "hover:bg-white/[0.03]",
              )}
            >
              {/* Active marker: brand gradient bar on the leading edge. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-5 left-0 w-0.5 rounded-full bg-brand-gradient transition-opacity duration-200",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[13px]",
                  selected ? "text-brand-300" : "text-zinc-500",
                )}
              >
                {tab.number}
              </span>
              <span className="mt-4 flex items-end justify-between gap-3 lg:mt-auto lg:pt-10">
                <span>
                  <span
                    className={cn(
                      "block text-[17px] font-semibold tracking-tight text-balance",
                      selected ? "text-white" : "text-zinc-300",
                    )}
                  >
                    {tab.title}
                  </span>
                  <span className="mt-1.5 block text-[15px] text-zinc-300">
                    {tab.summary}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "size-4 shrink-0 transition-transform duration-200",
                    selected
                      ? "translate-x-0.5 text-white"
                      : "text-zinc-500 group-hover:translate-x-0.5",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>

      {/* Panels share one grid cell so the tallest sets the height and the
          page doesn't jump when switching tabs. `invisible` also removes the
          inactive ones from the accessibility tree and tab order. */}
      <div className="grid min-w-0">
        {panels.map((panel, index) => {
          const selected = index === active;
          return (
            <div
              key={tabs[index]?.id}
              id={`${baseId}-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${index}`}
              className={cn(
                "min-w-0 [grid-area:1/1]",
                selected ? "motion-safe:animate-rise" : "invisible",
              )}
            >
              {panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
