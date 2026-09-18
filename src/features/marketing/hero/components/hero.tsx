import { ButtonLink } from "@/shared/ui/button-link";
import type { HeroContent } from "../hero.types";
import { ActivityStack } from "./activity-stack";
import { IndustriesMarquee } from "./industries-marquee";
import { OrbitBackdrop } from "./orbit-backdrop";

/** Presentational hero. Content is injected so it can come from any source. */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-4 pt-28 pb-24 sm:pt-36 sm:pb-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="motion-safe:animate-rise">
          <p className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 backdrop-blur">
            {content.eyebrow}
          </p>
        </div>
        <h1
          id="hero-title"
          className="mt-7 text-[2.2rem] leading-[1] font-semibold tracking-[-0.04em] text-balance whitespace-pre-line text-ink motion-safe:animate-rise motion-safe:[animation-delay:80ms] sm:text-[2.75rem] lg:text-[3.1rem]"
        >
          {content.title}
        </h1>
        <p className="mt-5 max-w-[32rem] text-[15px] leading-[1.4] text-pretty text-zinc-600 motion-safe:animate-rise motion-safe:[animation-delay:160ms] sm:text-base sm:leading-[1.45]">
          {content.subtitle}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
          <ButtonLink href={content.primaryCta.href} size="sm">
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={content.secondaryCta.href}
            variant="secondary"
            size="sm"
          >
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>

      {/* No transform/opacity on this wrapper: the orbit's -z-10 must resolve
          against the section, not a local stacking context above the text. */}
      <div className="relative mx-auto mt-6 w-full max-w-[25.5rem]">
        <OrbitBackdrop integrations={content.integrations} />
        {/* Top padding (not margin on the wrapper) moves the cards without moving the orbit anchor. */}
        <div className="pt-6 motion-safe:animate-rise motion-safe:[animation-delay:320ms]">
          <ActivityStack activity={content.activity} />
        </div>
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
          className="pointer-events-none absolute -inset-x-4 -top-32 -bottom-24 -z-10 bg-[linear-gradient(to_bottom,rgb(255_255_255/0),#fff_55%)] sm:-bottom-28"
        />
        <IndustriesMarquee industries={content.industries} />
      </div>
    </section>
  );
}
