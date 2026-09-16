import { ButtonLink } from "@/shared/ui/button-link";
import type { HeroContent } from "../hero.types";
import { ActivityStack } from "./activity-stack";
import { HeroRatings } from "./hero-ratings";
import { OrbitBackdrop } from "./orbit-backdrop";
import { TrustedBy } from "./trusted-by";

/** Presentational hero. Content is injected so it can come from any source. */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-4 pt-32 pb-16 sm:pt-40 lg:pb-20"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="motion-safe:animate-rise">
          <HeroRatings ratings={content.ratings} />
        </div>
        <h1
          id="hero-title"
          className="mt-7 max-w-[15ch] text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-zinc-950 sm:text-wrap motion-safe:animate-rise motion-safe:[animation-delay:80ms] sm:text-5xl lg:text-[3.6rem]"
        >
          {content.title}
        </h1>
        <p className="mt-5 max-w-[29rem] text-base leading-7 text-pretty text-zinc-600 motion-safe:animate-rise motion-safe:[animation-delay:160ms] sm:text-[17px]">
          {content.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
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
      <div className="relative mx-auto mt-12 w-full max-w-[22.5rem]">
        <OrbitBackdrop integrations={content.integrations} />
        <div className="motion-safe:animate-rise motion-safe:[animation-delay:320ms]">
          <ActivityStack activity={content.activity} />
        </div>
      </div>

      <div className="mt-24 sm:mt-32">
        <TrustedBy trustedBy={content.trustedBy} />
      </div>
    </section>
  );
}
