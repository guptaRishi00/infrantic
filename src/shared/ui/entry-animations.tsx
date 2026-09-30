"use client";

import { animate } from "framer-motion";
import { useEffect } from "react";

// Entry animations for every section (SoftexEdge-style): as a section scrolls
// into view its container ("the whole div") rises and fades in, and the
// elements inside it (headings, text, cards, list items, stats, visuals,
// buttons, forms) fade up in staggered batches as each one enters.
//
// One client component instead of editing every section: it runs from the
// marketing template, so it covers every page and replays on navigation.
// Transform/opacity only (framer uses WAAPI, so it runs on the compositor), a
// one-shot per element, inline styles cleared afterwards so hover transforms
// and sticky/fixed children behave normally. Skipped under reduced motion,
// and nothing is hidden without JavaScript (styles are applied at runtime).

/** What counts as one animated element; only the outermost match is used. */
const ITEM =
  "h1,h2,h3,h4,p,ul>li,ol>li,dl>div,article,figure,form,table,[role=img],[role=tablist],a,button";
const EASE = [0.22, 1, 0.36, 1] as const;

function hasOwnCssAnimation(el: Element, stop: Element) {
  // Leave anything that already moves (hero rise, marquee track, pulses...)
  // and everything inside it alone, to avoid doubled motion.
  for (
    let node: Element | null = el;
    node && node !== stop;
    node = node.parentElement
  ) {
    if (getComputedStyle(node).animationName !== "none") return true;
  }
  return false;
}

function clear(el: HTMLElement) {
  el.style.removeProperty("opacity");
  el.style.removeProperty("transform");
}

function byDomOrder(a: Element, b: Element) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

export function EntryAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector("[data-page-enter]");
    if (!root) return;

    const sections = [
      ...[...root.querySelectorAll("section")].filter(
        // Top-level sections only, and not ones with their own choreography
        // (the home hero runs a GSAP intro: data-entry-skip).
        (s) =>
          !s.parentElement?.closest("section") &&
          !s.hasAttribute("data-entry-skip"),
      ),
      ...document.querySelectorAll("body > footer, main ~ footer"),
    ];

    const containers: HTMLElement[] = [];
    const items: HTMLElement[] = [];
    for (const section of sections) {
      for (const child of section.children) {
        if (
          child instanceof HTMLElement &&
          !hasOwnCssAnimation(child, section)
        ) {
          containers.push(child);
        }
      }
      for (const el of section.querySelectorAll<HTMLElement>(ITEM)) {
        const outer = el.parentElement?.closest(ITEM);
        if (outer && section.contains(outer)) continue; // nested in an item
        if (el.getClientRects().length === 0) continue; // display: none
        // Collapsed FAQ answers can never scroll into view while closed, so
        // hiding them would leave an opened answer blank. Leave them alone.
        if (el.closest("details:not([open])")) continue;
        if (hasOwnCssAnimation(el, section)) continue;
        items.push(el);
      }
    }

    // Hidden start state (runtime only, so no-JS pages stay visible).
    for (const el of containers) {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
    }
    for (const el of items) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
    }

    const reveal = (
      targets: HTMLElement[],
      y: number,
      duration: number,
      step: number,
    ) => {
      targets.sort(byDomOrder);
      const controls = animate(
        targets,
        { opacity: [0, 1], y: [y, 0] },
        {
          duration,
          ease: EASE,
          delay: (index: number) => Math.min(index * step, 0.5),
        },
      );
      controls.then(() => {
        for (const el of targets) clear(el);
      });
    };

    const watch = (
      targets: HTMLElement[],
      y: number,
      duration: number,
      step: number,
    ) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entering = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target as HTMLElement);
          if (entering.length === 0) return;
          for (const el of entering) observer.unobserve(el);
          reveal(entering, y, duration, step);
        },
        { rootMargin: "0px" },
      );
      for (const el of targets) observer.observe(el);
      return observer;
    };

    const observers = [
      watch(containers, 24, 0.7, 0),
      watch(items, 18, 0.6, 0.07),
    ];

    return () => {
      for (const observer of observers) observer.disconnect();
      for (const el of [...containers, ...items]) clear(el);
    };
  }, []);

  return null;
}
