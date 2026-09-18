import { ButtonLink } from "@/shared/ui/button-link";
import { RingComet, ringFadeAlpha } from "@/shared/ui/ring-comet";
import type { CtaContent } from "../cta.types";

// Concentric rings behind the band (px radii, centred on the content), each
// carrying two mirrored comets on the shared `animate-comet` cycle, like the
// hero. Rings fade out from 45% of the box radius to its edge; they share a
// centre with that fade, so it is a constant per-ring alpha rather than a mask.
const RING_RADII = [260, 380, 500, 620, 740] as const;
const RINGS_BOX = 1600;
const COMET_TAIL = 140;
const COMET_STAGGER_S = 5.2;
const COMET_SIDES = ["left", "right"] as const;
const ringAlpha = (radius: number) =>
  ringFadeAlpha(radius, RINGS_BOX / 2, 0.45);

export function CtaBand({ content }: { content: CtaContent }) {
  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#eef8ff_16%,#d9efff_48%,#f5fbff_82%,#fff_100%)] px-4 py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(60%_60%_at_50%_0%,rgb(255_255_255/0.7),transparent)]"
      />

      {/* Rings + comets, in a box centred on the content. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[100rem] -translate-x-1/2 -translate-y-1/2"
      >
        {RING_RADII.map((radius) => (
          <span
            key={radius}
            className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${((radius * 2) / RINGS_BOX) * 100}%`,
              // brand-200 at 80%, faded with distance.
              borderColor: `rgb(176 220 255 / ${0.8 * ringAlpha(radius)})`,
            }}
          />
        ))}
        {RING_RADII.flatMap((radius, index) =>
          COMET_SIDES.map((side) => (
            <RingComet
              key={`comet-${radius}-${side}`}
              radius={radius}
              tail={COMET_TAIL}
              unit="0.0625rem"
              side={side}
              alpha={ringAlpha(radius)}
              delay={index * -COMET_STAGGER_S}
            />
          )),
        )}
      </div>
      {/* White fades at the band's top and bottom edges, over the rings and
          comets (static overlays instead of a mask around animated content). */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-1/5 bg-[linear-gradient(to_bottom,#fff,rgb(255_255_255/0))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/5 bg-[linear-gradient(to_top,#fff,rgb(255_255_255/0))]"
      />

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[13px] font-medium text-ink backdrop-blur">
          {content.eyebrow}
        </p>

        <h2
          id="cta-title"
          className="mt-6 max-w-[18ch] text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-ink sm:text-5xl"
        >
          {content.title}
        </h2>
        <p className="mt-5 max-w-md text-base leading-6 text-pretty text-zinc-600">
          {content.description}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-[13px] font-medium text-zinc-700">
          {content.commitments.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-brand-gradient"
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
