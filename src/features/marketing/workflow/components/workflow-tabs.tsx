"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/shared/lib/cn";

type WorkflowTabsProps = {
  labels: readonly string[];
  /** Server-rendered panels, one per label, in the same order. */
  panels: readonly ReactNode[];
};

/**
 * WAI-ARIA tabs with roving focus. Panels are rendered on the server and all
 * stay in the HTML; only visibility is client state.
 */
export function WorkflowTabs({ labels, panels }: WorkflowTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function focusTab(index: number) {
    const next = (index + labels.length) % labels.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: labels.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      focusTab(moves[event.key]);
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Workflow steps"
        className="mx-auto flex max-w-4xl snap-x gap-1 overflow-x-auto border-b border-zinc-200 [scrollbar-width:none]"
      >
        {labels.map((label, index) => {
          const selected = index === active;
          return (
            <button
              key={label}
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
                "relative flex-1 shrink-0 snap-start px-4 pt-2 pb-3.5 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink",
                selected
                  ? "font-medium text-ink"
                  : "text-zinc-400 hover:text-zinc-700",
              )}
            >
              {label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-ink transition-opacity duration-200",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {panels.map((panel, index) => (
        <div
          key={labels[index]}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          className="mt-8 motion-safe:animate-rise"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
