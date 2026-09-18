import type { CSSProperties } from "react";
import { ButtonLink } from "@/shared/ui/button-link";
import type { CtaContent } from "../cta.types";

// Concentric rings behind the band (px radii, centred on the content), each
// carrying two mirrored comets on the shared `animate-comet` cycle, like the
// hero. Comets climb from the bottom of a ring up both sides at once.
const RING_RADII = [260, 380, 500, 620, 740] as const;
const RINGS_BOX = 1600;
const COMET_TAIL = 140;
const COMET_STAGGER_S = 5.2;
const COMET_SIDES = ["left", "right"] as const;

function cometStyle(
  radius: number,
  index: number,
  side: (typeof COMET_SIDES)[number],
): CSSProperties & Record<`--${string}`, string> {
  const tail = (COMET_TAIL / radius) * (180 / Math.PI);
  const left = side === "left";
  return {
    width: `${((radius * 2) / RINGS_BOX) * 100}%`,
    backgroundImage: left
      ? `conic-gradient(from 180deg, transparent ${360 - tail}deg, #07a1fd ${360 - tail / 2}deg, #047efd 360deg)`
      : `conic-gradient(from 180deg, #047efd 0deg, #07a1fd ${tail / 2}deg, transparent ${tail}deg)`,
    "--comet-turn": left ? "180deg" : "-180deg",
    animationDelay: `${index * -COMET_STAGGER_S}s`,
  };
}

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

      {/* Rings + comets: a radial mask fades them towards the sides, and this
          wrapper's vertical mask fades the band's top and bottom edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]"
      >
        <div className="absolute top-1/2 left-1/2 aspect-square w-[100rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,#000_45%,transparent_100%)]">
          {RING_RADII.map((radius) => (
            <span
              key={radius}
              className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-200/80"
              style={{ width: `${((radius * 2) / RINGS_BOX) * 100}%` }}
            />
          ))}
          {RING_RADII.flatMap((radius, index) =>
            COMET_SIDES.map((side) => (
              <span
                key={`comet-${radius}-${side}`}
                className="absolute top-1/2 left-1/2 hidden aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full p-[1.5px] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] motion-safe:block motion-safe:animate-comet"
                style={cometStyle(radius, index, side)}
              />
            )),
          )}
        </div>
      </div>

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
