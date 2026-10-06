"use client";

import { type ReactNode, useEffect, useRef } from "react";

const SECONDS_PER_LOOP = 60; // same pace as the CSS marquee from sm up
const RESUME_AFTER_MS = 1500;

/**
 * The Services marquee frame. From sm up it is the CSS marquee (the track's
 * `sm:animate-marquee`, paused on hover). On phones the frame is a native
 * horizontal scroller, so the cards can be dragged by hand with momentum,
 * and a rAF loop keeps it moving: it advances scrollLeft at the marquee's
 * pace, wraps by half the track (the list is rendered twice, so the jump is
 * invisible), pauses while a finger is down and for a moment after, and
 * sleeps while the row is off-screen. Reduced motion: no auto-scroll.
 */
export function ServicesMarquee({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let position = frame.scrollLeft;
    let holdUntil = 0;
    let visible = false;
    const half = () => frame.scrollWidth / 2;

    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (frame.scrollLeft >= h) frame.scrollLeft -= h;
      else if (frame.scrollLeft <= 0) frame.scrollLeft += h;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(now - last, 100) : 0;
      last = now;
      if (!visible || now < holdUntil) {
        position = frame.scrollLeft;
        return;
      }
      position += (half() / SECONDS_PER_LOOP) * (dt / 1000);
      if (position >= half()) position -= half();
      frame.scrollLeft = position;
    };

    const hold = () => {
      holdUntil = Number.POSITIVE_INFINITY;
    };
    const release = () => {
      holdUntil = performance.now() + RESUME_AFTER_MS;
    };
    const onScroll = () => {
      // Keep dragging seamless in both directions.
      if (holdUntil > performance.now()) wrap();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      last = 0;
    });
    observer.observe(frame);

    frame.addEventListener("touchstart", hold, { passive: true });
    frame.addEventListener("pointerdown", hold, { passive: true });
    frame.addEventListener("touchend", release, { passive: true });
    frame.addEventListener("touchcancel", release, { passive: true });
    frame.addEventListener("pointerup", release, { passive: true });
    frame.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      frame.removeEventListener("touchstart", hold);
      frame.removeEventListener("pointerdown", hold);
      frame.removeEventListener("touchend", release);
      frame.removeEventListener("touchcancel", release);
      frame.removeEventListener("pointerup", release);
      frame.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={frameRef} className={className}>
      {children}
    </div>
  );
}
