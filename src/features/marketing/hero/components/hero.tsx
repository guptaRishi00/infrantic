import { Fragment } from "react";
import { ButtonLink } from "@/shared/ui/button-link";
import type { HeroContent } from "../hero.types";
import { ActivityStack } from "./activity-stack";
import { HeroCards } from "./hero-cards";
import { HeroMotion } from "./hero-motion";
import { IndustriesMarquee } from "./industries-marquee";
import { OrbitBackdrop } from "./orbit-backdrop";

/**
 * The headline split into lines and words, server-rendered, so GSAP can reveal
 * it word by word while crawlers, screen readers and no-JS visitors get the
 * plain sentence. Each word sits in its own clip (padded so descenders show).
 */
function HeadlineWords({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => (
    <span key={line} className="block">
      {line.split(" ").map((word, index, words) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static copy, never reordered
        <Fragment key={index}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span data-hero-word="" className="inline-block">
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
      {/* A real space between lines, so the text reads "complex. Your" to
          screen readers and crawlers (the block layout hides it visually). */}
      {lineIndex < lines.length - 1 ? " " : null}
    </span>
  ));
}

/**
 * Presentational hero. Content is injected so it can come from any source.
 * Motion: a GSAP intro + badge parallax (hero-motion.tsx) and a Framer Motion
 * spring on the cards (hero-cards.tsx); the site-wide entry animation skips it.
 */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      data-hero=""
      data-entry-skip=""
      className="relative isolate overflow-hidden px-4 pt-28 pb-16 sm:pt-36 sm:pb-28"
    >
      <HeroMotion />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div data-hero-eyebrow="">
          <p className="rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-medium tracking-wide text-zinc-600">
            {content.eyebrow}
          </p>
        </div>
        <h1
          id="hero-title"
          className="mt-7 text-[2.2rem] leading-[1] font-medium tracking-[-0.035em] text-balance text-ink sm:text-[2.75rem] lg:text-[3.1rem]"
        >
          <HeadlineWords text={content.title} />
        </h1>
        <p
          data-hero-sub=""
          className="mt-5 max-w-[32rem] text-[15px] leading-[1.4] text-pretty text-zinc-600 sm:text-base sm:leading-[1.45]"
        >
          {content.subtitle}
        </p>
        <div
          data-hero-cta=""
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <ButtonLink href={content.primaryCta.href}>
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>

      {/* No transform/opacity on this wrapper: the orbit's -z-10 must resolve
          against the section, not a local stacking context above the text. */}
      <div className="relative mx-auto mt-6 w-full max-w-[25.5rem]">
        <OrbitBackdrop integrations={content.integrations} />
        {/* Top padding (not margin on the wrapper) moves the cards without moving the orbit anchor. */}
        <HeroCards>
          <ActivityStack activity={content.activity} />
        </HeroCards>
      </div>

      {/* Soft top fade so the rings dissolve under the header. Later in DOM
          order than the orbit, so it paints over the rings; it ends above the
          highest badge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,#fff_15%,rgb(255_255_255/0))] sm:h-40"
      />

      <div className="relative mt-20 sm:mt-24">
        {/* White ground under the logo row. The top of the gradient is transparent,
            so the rings fade into it. Same -z-10 as the orbit but later in DOM
            order, so it paints over the rings and under the logos. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 -top-32 -bottom-16 -z-10 bg-[linear-gradient(to_bottom,rgb(255_255_255/0),#fff_55%)] sm:-bottom-28"
        />
        <IndustriesMarquee industries={content.industries} />
      </div>
    </section>
  );
}
