"use client";

import gsap from "gsap";
import { useLayoutEffect } from "react";

/**
 * GSAP layer for the home hero (renders nothing):
 * - an intro timeline: eyebrow, then the headline word by word (each word
 *   rises out of its own clip), then the subtitle and the buttons;
 * - a pointer parallax on the orbit badges (desktop pointers only).
 *
 * Transform/opacity only, and only under `prefers-reduced-motion:
 * no-preference` (gsap.matchMedia reverts everything otherwise and on
 * unmount). The markup is server-rendered, so without JavaScript the hero is
 * simply static. The site-wide entry animation skips this section
 * (`data-entry-skip`) so the two never compete.
 */
export function HeroMotion() {
  useLayoutEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(hero.querySelector("[data-hero-eyebrow]"), {
          y: 12,
          autoAlpha: 0,
          duration: 0.6,
          clearProps: "all",
        })
        .from(
          hero.querySelectorAll("[data-hero-word]"),
          {
            yPercent: 115,
            duration: 0.95,
            ease: "expo.out",
            stagger: 0.06,
            clearProps: "transform",
          },
          "-=0.3",
        )
        .from(
          hero.querySelector("[data-hero-sub]"),
          { y: 18, autoAlpha: 0, duration: 0.7, clearProps: "all" },
          "-=0.65",
        )
        .from(
          hero.querySelectorAll("[data-hero-cta] > *"),
          {
            y: 14,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.08,
            clearProps: "all",
          },
          "-=0.5",
        );
    });

    mm.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        // The badge list is a zero-size box at the orbit's origin, so moving
        // it shifts every badge together without changing their layout.
        const badges = hero.querySelector<HTMLElement>("[data-orbit-badges]");
        if (!badges) return;
        const toX = gsap.quickTo(badges, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const toY = gsap.quickTo(badges, "y", {
          duration: 0.9,
          ease: "power3.out",
        });
        const move = (event: PointerEvent) => {
          const box = hero.getBoundingClientRect();
          toX(((event.clientX - box.left) / box.width - 0.5) * 28);
          toY(((event.clientY - box.top) / box.height - 0.5) * 18);
        };
        const leave = () => {
          toX(0);
          toY(0);
        };
        hero.addEventListener("pointermove", move);
        hero.addEventListener("pointerleave", leave);
        return () => {
          hero.removeEventListener("pointermove", move);
          hero.removeEventListener("pointerleave", leave);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
