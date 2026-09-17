import { ButtonLink } from "@/shared/ui/button-link";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { CtaContent } from "../cta.types";

export function CtaBand({ content }: { content: CtaContent }) {
  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#eef8ff_0%,#d9efff_45%,#f5fbff_80%,#fff_100%)] px-4 py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(60%_60%_at_50%_0%,rgb(255_255_255/0.7),transparent)]"
      />

      <ul aria-hidden="true" className="hidden md:block">
        {content.badges.map((badge, index) => (
          <li
            key={badge.id}
            className="absolute -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${badge.x}%`, top: `${badge.y}%` }}
          >
            <span
              className="grid size-12 place-items-center rounded-full bg-white/90 shadow-[0_12px_28px_-12px_rgb(2_28_55/0.25)] ring-1 ring-white motion-safe:animate-float"
              style={{ animationDelay: `${index * -1.1}s` }}
            >
              <IntegrationLogo
                id={badge.id}
                className="block size-6 [&>svg]:size-full"
              />
            </span>
          </li>
        ))}
      </ul>

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
          {content.eyebrow}
        </p>

        <h2
          id="cta-title"
          className="mt-6 max-w-[18ch] text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-ink sm:text-5xl"
        >
          {content.title}
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-6 text-pretty text-zinc-600">
          {content.description}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs font-medium text-zinc-700">
          {content.commitments.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-brand"
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={content.primaryCta.href}>
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
