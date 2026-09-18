"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Travel one direction must accumulate before the bar hides or re-shows, so the
// jitter of a momentum fling can't flap it; a deliberate swipe clears it at once.
const DIRECTION_THRESHOLD = 8;
// Never hide while the bar still sits over the top of the page.
const HIDE_AFTER = 120;

/**
 * Fixed header shell that slides away while scrolling down and returns on any
 * scroll up. The children stay server-rendered; this only owns the listener.
 * Hiding is a data attribute + CSS transition (no React state per scroll), and
 * it's skipped while a menu inside is open. Keyboard focus always reveals it.
 */
export function AutoHideHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastScroll = 0;
    let hidden = false;
    // Where the current run of travel in one direction started.
    let anchor = 0;
    let direction = 0;

    const onScroll = () => {
      // Clamped: iOS reports negative scrollY while rubber-banding at the top.
      const latest = Math.max(0, window.scrollY);
      const next =
        latest > lastScroll ? 1 : latest < lastScroll ? -1 : direction;
      if (next !== direction) {
        direction = next;
        anchor = lastScroll;
      }
      lastScroll = latest;

      if (Math.abs(latest - anchor) < DIRECTION_THRESHOLD) return;

      const menuOpen = el.querySelector('[aria-expanded="true"]') !== null;
      const shouldHide = direction === 1 && latest > HIDE_AFTER && !menuOpen;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        el.dataset.hidden = String(hidden);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 transition-[translate] duration-300 ease-out motion-reduce:transition-none data-[hidden=true]:not-focus-within:-translate-y-[120px]"
    >
      {children}
    </header>
  );
}
