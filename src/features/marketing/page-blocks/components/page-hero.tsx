import type { ReactNode } from "react";
import { ButtonLink } from "@/shared/ui/button-link";
import type { PageHeroContent } from "../page-blocks.types";
import { HeroVisual } from "./hero-visual";

/**
 * Inner-page hero: left-aligned eyebrow, title, description, CTAs and an
 * optional stat row. Static background only (a soft brand wash), so it costs
 * nothing at idle. Top padding clears the fixed header.
 */
export function PageHero({
  content,
  aside,
}: {
  content: PageHeroContent;
  /** A bespoke visual for the right column; takes precedence over `content.visual`. */
  aside?: ReactNode;
}) {
  const visual =
    aside ?? (content.visual ? <HeroVisual content={content.visual} /> : null);
  return (
    <section
      aria-labelledby="page-title"
      className="relative overflow-hidden bg-[radial-gradient(70%_60%_at_50%_0%,#eef8ff_0%,rgb(255_255_255/0)_100%)] px-4 pt-32 pb-16 sm:pt-44 sm:pb-24"
    >
      <div className="mx-auto max-w-[80rem]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="w-fit rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-[13px] font-medium tracking-wide text-zinc-600">
              {content.eyebrow}
            </p>
            <h1
              id="page-title"
              className="mt-6 max-w-[16ch] text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[3.25rem] lg:text-[3.75rem]"
            >
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-7 text-pretty text-zinc-600">
              {content.description}
            </p>
            {content.primaryCta || content.secondaryCta ? (
              <div className="mt-8 flex flex-wrap gap-3">
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
            <div className="hidden md:block md:max-lg:mx-auto md:max-lg:w-full md:max-lg:max-w-lg">
              {visual}
            </div>
          ) : null}
        </div>
        {content.stats?.length ? (
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/80 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5">
                <dd className="text-3xl font-semibold tracking-tight text-ink">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-[15px] text-zinc-600">{stat.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
