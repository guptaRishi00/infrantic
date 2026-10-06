import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import type { PageHeroContent } from "../page-blocks.types";
import { HeroStats } from "./hero-stats";
import { HeroVisual } from "./hero-visual";

/**
 * Inner-page hero: left-aligned eyebrow, title, description, CTAs and an
 * optional stat row. Static background only (a soft brand wash), so it costs
 * nothing at idle. The copy + visual block fills the first screen (header
 * clearance included) with its content centred, so the stat row or the next
 * section starts below the fold; it grows past the viewport rather than clip.
 * Below lg the visual stacks under the copy (zoomed down on phones).
 */
export function PageHero({
  content,
  aside,
  padBottom,
}: {
  content: PageHeroContent;
  /** A bespoke visual for the right column; takes precedence over `content.visual`. */
  aside?: ReactNode;
  /** Bottom padding override for one page (e.g. "pb-10 sm:pb-14"). */
  padBottom?: string;
}) {
  const visual =
    aside ?? (content.visual ? <HeroVisual content={content.visual} /> : null);
  // Phone zoom for the visual: the flow diagrams and sector illustrations are
  // full-width boxes, so 0.85 only scales their nodes and labels up to a
  // readable size; the orbit is a fixed 28rem canvas, so 0.75 (0.64 under
  // 368px) is the most a phone column fits.
  const visualZoom =
    !aside && content.visual?.kind === "orbit"
      ? "max-[368px]:[zoom:0.64] min-[368px]:max-sm:[zoom:0.75]"
      : "max-sm:[zoom:0.85]";
  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative overflow-hidden bg-[radial-gradient(70%_60%_at_50%_0%,#eef8ff_0%,rgb(255_255_255/0)_100%)] px-4",
        // A stat row brings its own cell padding, so the section closes tighter.
        padBottom ??
          (content.stats?.length ? "pb-4 sm:pb-6" : "pb-16 sm:pb-24"),
      )}
    >
      <div className="mx-auto max-w-[80rem]">
        {/* Phones: exactly one screen tall (100dvh is zoomed with the page).
            The copy (drawn at 90%) sits at the top, ~6% of the screen height
            under the 4rem phone header, and the visual takes the remaining height, centred in it,
            so there are no empty bands above the copy or around a small
            floating visual. */}
        <div className="grid min-h-[100dvh] content-center items-center gap-12 pt-32 pb-8 max-sm:flex max-sm:pt-[calc(4rem+7dvh)] max-sm:min-h-[calc(100dvh/var(--phone-zoom))] max-sm:flex-col max-sm:items-stretch max-sm:gap-6 sm:pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="max-sm:[zoom:0.9]">
            <p className="w-fit rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-[13px] font-medium tracking-wide text-zinc-600 max-sm:text-[14px]">
              {content.eyebrow}
            </p>
            <h1
              id="page-title"
              className="mt-6 max-w-[16ch] text-[2.5rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-ink sm:text-[3.25rem] lg:text-[3.75rem]"
            >
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-7 text-pretty text-zinc-600">
              {content.description}
            </p>
            {content.primaryCta || content.secondaryCta ? (
              // Phones: the row cancels the copy's 0.9 zoom so the buttons
              // match every other button (its margin is 2rem x 0.9).
              <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-[1.8rem] max-sm:[zoom:1.1111]">
                {content.primaryCta ? (
                  <ButtonLink href={content.primaryCta.href}>
                    {content.primaryCta.label}
                  </ButtonLink>
                ) : null}
                {content.secondaryCta ? (
                  <ButtonLink
                    href={content.secondaryCta.href}
                    variant="secondary"
                  >
                    {content.secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
          {visual ? (
            // Phones show the visual under the copy, zoomed as a whole (text,
            // rem-sized comets and all). This box takes the height left under
            // the copy (flex-1, min 14rem); flex columns carry that height down
            // to a flow canvas, and other visuals are centred in it.
            <div
              className={cn(
                "max-lg:mx-auto max-lg:w-full max-lg:max-w-lg max-sm:flex max-sm:min-h-56 max-sm:flex-1 max-sm:flex-col max-sm:justify-center",
                visualZoom,
              )}
            >
              {visual}
            </div>
          ) : null}
        </div>
        {content.stats?.length ? <HeroStats stats={content.stats} /> : null}
      </div>
    </section>
  );
}
