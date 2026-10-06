import { ArrowRight } from "lucide-react";
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
 * Every line but the last is set in a softer grey, so the payoff line leads.
 */
function HeadlineWords({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => (
    <span
      key={line}
      className={lineIndex < lines.length - 1 ? "block text-zinc-500" : "block"}
    >
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
      className="relative isolate overflow-hidden px-4 pt-16 pb-12 sm:pt-36 sm:pb-28"
    >
      <HeroMotion />
      {/* Phones: headline + cards fill the first screen exactly (100dvh is
          zoomed with the page; 4rem is the section's top padding, the phone
          header's height), so the industries marquee starts below the fold.
          The copy block dissolves into this box (display: contents). The
          subtitle → CTAs and CTAs → cards gaps are one fixed, height-scaled
          gap (the cards' margin subtracts their own pt-6), and the free
          space is shared by auto margins above the pill and below the cards,
          so the group stays centred; py-6 keeps those two ends symmetric.
          From sm up this box is display: contents, so the layout is
          unchanged; it adds no transform or z-index, so the orbit's stacking
          is unaffected. */}
      <div className="max-sm:flex max-sm:min-h-[calc(100dvh/var(--phone-zoom)-4rem)] max-sm:flex-col max-sm:items-center max-sm:py-6 sm:contents">
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center lg:mt-0 mt-16 lg:py-0 py-4 max-sm:contents">
          <div data-hero-eyebrow="" className="max-sm:mt-auto">
            <p className="rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 max-sm:bg-white max-sm:text-[13px]">
              {content.eyebrow}
            </p>
          </div>
          {/* Phones: two lines. The font follows the column width (the longest
            line, "Your systems shouldn't be.", is 11.79em; /12.2 leaves ~3%
            slack), capped at 2.25rem. */}
          <h1
            id="hero-title"
            className="mt-[clamp(1rem,3dvh,1.75rem)] text-[2.25rem] max-sm:text-[length:min(2.25rem,calc((100vw_/_var(--phone-zoom)_-_2rem)_/_12.2))] sm:mt-7 leading-[1.02] font-medium tracking-[-0.035em] text-balance text-ink sm:text-[3rem] lg:text-[3.5rem]"
          >
            <HeadlineWords text={content.title} />
          </h1>
          <p
            data-hero-sub=""
            className="mt-[clamp(0.875rem,2.5dvh,1.5rem)] max-w-[34rem] text-base sm:text-[15px] leading-[1.45] text-pretty text-zinc-600 sm:mt-6 sm:text-[17px] sm:leading-[1.5]"
          >
            {content.subtitle}
          </p>
          <div
            data-hero-cta=""
            className="mt-[clamp(1.5rem,4.5dvh,2.5rem)] flex flex-wrap justify-center gap-3 max-sm:mt-[clamp(2.5rem,6.5dvh,3.5rem)] sm:mt-9"
          >
            <ButtonLink href={content.primaryCta.href}>
              {content.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={content.secondaryCta.href}
              variant="secondary"
              className="group"
            >
              {content.secondaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-4 text-zinc-500 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </ButtonLink>
          </div>
        </div>

        {/* No transform/opacity on this wrapper: the orbit's -z-10 must resolve
          against the section, not a local stacking context above the text. */}
        <div className="relative mx-auto mt-4 w-full max-w-[25.5rem] origin-top max-sm:mt-[calc(clamp(2.5rem,6.5dvh,3.5rem)-1.5rem)] max-sm:mb-auto sm:mt-6 sm:scale-100">
          <OrbitBackdrop integrations={content.integrations} />
          {/* Top padding (not margin on the wrapper) moves the cards without moving the orbit anchor. */}
          <HeroCards>
            <ActivityStack activity={content.activity} />
          </HeroCards>
        </div>
      </div>

      {/* Soft top fade so the rings dissolve under the header. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,#fff_15%,rgb(255_255_255/0))] sm:h-40"
      />

      <div className="relative mt-8 sm:mt-24">
        {/* White ground under the logo row. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 -top-32 -bottom-16 -z-10 bg-[linear-gradient(to_bottom,rgb(255_255_255/0),#fff_55%)] sm:-bottom-28"
        />
        <IndustriesMarquee industries={content.industries} />
      </div>
    </section>
  );
}
