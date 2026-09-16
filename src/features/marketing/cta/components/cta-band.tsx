import { ButtonLink } from "@/shared/ui/button-link";
import { StarIcon } from "@/shared/ui/icons";
import { InitialsAvatar } from "@/shared/ui/initials-avatar";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { CtaContent } from "../cta.types";

export function CtaBand({ content }: { content: CtaContent }) {
  const { socialProof } = content;

  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ede9fe_0%,#ddd6fe_45%,#f5f3ff_80%,#fff_100%)] px-4 pt-24 pb-36 sm:pt-28 sm:pb-44"
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
              className="grid size-12 place-items-center rounded-full bg-white/90 shadow-[0_12px_28px_-12px_rgb(76_29_149/0.35)] ring-1 ring-white motion-safe:animate-float"
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
        <div className="flex items-center gap-3">
          <span className="flex -space-x-2">
            {socialProof.people.map((person) => (
              <InitialsAvatar
                key={person.name}
                person={person}
                className="size-7 text-[10px] ring-2 ring-violet-100"
              />
            ))}
          </span>
          <span className="text-left text-xs leading-4 text-zinc-600">
            <span className="flex items-center gap-1 font-semibold text-zinc-900">
              {socialProof.value}
              <span className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="size-3" />
                ))}
              </span>
            </span>
            {socialProof.label}
          </span>
        </div>

        <h2
          id="cta-title"
          className="mt-6 max-w-[15ch] text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl"
        >
          {content.title}
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-6 text-pretty text-zinc-600">
          {content.description}
        </p>
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
