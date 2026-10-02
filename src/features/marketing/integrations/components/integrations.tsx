import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import { BrandMark } from "@/shared/ui/brand-mark";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { IntegrationsContent } from "../integrations.types";

// Orbit rings as % of the square diagram, and how long each takes to turn
// once (alternating direction).
const RINGS = [
  { size: 38, seconds: 40, reverse: false },
  { size: 66, seconds: 60, reverse: true },
  { size: 94, seconds: 80, reverse: false },
] as const;

export function Integrations({ content }: { content: IntegrationsContent }) {
  return (
    <section
      id="technology"
      aria-labelledby="integrations-title"
      className="scroll-mt-24 overflow-hidden px-4 pt-16 pb-16 sm:pt-20 sm:pb-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-[13px] tracking-[0.08em] uppercase text-brand-700">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="integrations-title"
            title={content.title}
            description={content.description}
            className="mt-3"
          />
        </div>

        {/* A size container, so logo orbits can use cqw for the ring radius.
            Phones: wider than the column by half of (640px - viewport), so the
            rings run past the screen edges on small phones and the extra
            tapers to 0 at sm; the section's overflow-hidden clips them. */}
        <div
          aria-hidden="true"
          className="@container relative mx-auto mt-10 aspect-square max-w-[50rem] max-sm:ml-[calc((100vw_-_640px)_/_4)] max-sm:w-[calc(100%_+_(640px_-_100vw)_/_2)] max-sm:max-w-none"
        >
          {RINGS.map((ring) => (
            <span
              key={ring.size}
              className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200"
              style={{ width: `${ring.size}%` }}
            />
          ))}

          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-[linear-gradient(145deg,#07a1fd,#047efd_30%,#021c37)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_24px_48px_-16px_rgb(7_150_254/0.45)] sm:size-24">
            <BrandMark className="size-10 sm:size-12" />
          </span>

          {/* Each logo sits at the centre and is carried out to its ring by
              nested transforms: start angle (li) → turning wrapper → ring
              radius → counter-turning wrapper → upright badge. Without motion
              the two turning wrappers are inert and the logo rests at its
              start angle. */}
          <ul>
            {content.items.map((item) => {
              const ring = RINGS[item.ring];
              const spin: CSSProperties = {
                animationDuration: `${ring.seconds}s`,
                animationDirection: ring.reverse ? "reverse" : "normal",
              };
              return (
                <li
                  key={item.id}
                  className={cn(
                    "absolute top-1/2 left-1/2 size-0",
                    item.desktopOnly && "hidden sm:block",
                  )}
                  style={{ rotate: `${item.angle}deg` }}
                >
                  <span
                    className="block size-0 motion-safe:animate-orbit"
                    style={spin}
                  >
                    <span
                      className="block size-0"
                      style={{ translate: `${ring.size / 2}cqw 0` }}
                    >
                      <span
                        className="block size-0 motion-safe:animate-orbit-back"
                        style={spin}
                      >
                        <span
                          className="grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_10px_24px_-12px_rgb(2_28_55/0.25)] sm:size-12"
                          style={{ rotate: `${-item.angle}deg` }}
                        >
                          <IntegrationLogo
                            id={item.id}
                            className="block size-5 sm:size-6 [&>svg]:size-full"
                          />
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* White fades over the top and bottom of the diagram, so rings and
              logos dissolve there (static overlays, not a mask around the
              animated logos). */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-[linear-gradient(to_bottom,#fff_10%,rgb(255_255_255/0))]" />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,#fff_10%,rgb(255_255_255/0))]" />
        </div>

        {/* Stack grid (sm up): one bordered panel split by hairlines, a
            column per category. */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/80 max-sm:hidden sm:grid-cols-2 lg:grid-cols-4">
          {content.stack.map((group) => (
            <div key={group.category} className="bg-white p-6 sm:p-7">
              <StackGroupBody group={group} />
            </div>
          ))}
        </div>

        {/* Phones: the same categories as cards in a self-moving infinite
            marquee, edge to edge (-mx-4 cancels the section's px-4). The list
            is rendered twice and the track slides -50% (transform only); each
            card carries its own right padding, not flex gap, so both halves
            are equal. Pauses on hover/touch. Reduced motion: one manually
            scrollable row. */}
        <div className="-mx-4 mt-12 overflow-hidden motion-reduce:overflow-x-auto sm:hidden">
          <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee">
            {/* Reduced motion: the static row starts at the gutter. */}
            <StackCards stack={content.stack} className="motion-reduce:pl-4" />
            <StackCards
              stack={content.stack}
              className="motion-reduce:hidden"
              decorative
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type StackGroup = IntegrationsContent["stack"][number];

function StackCards({
  stack,
  className,
  decorative = false,
}: {
  stack: readonly StackGroup[];
  className?: string;
  /** The duplicate copy exists only for the loop; hide it from assistive tech. */
  decorative?: boolean;
}) {
  return (
    <ul
      aria-hidden={decorative || undefined}
      className={cn("flex shrink-0", className)}
    >
      {stack.map((group) => (
        <li key={group.category} className="flex w-[17rem] shrink-0 pr-4">
          <div className="w-full rounded-2xl border border-zinc-200/80 bg-white p-6">
            <StackGroupBody group={group} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Category label plus its tools, each with a logo tile (a dot when none). */
function StackGroupBody({ group }: { group: StackGroup }) {
  return (
    <>
      <h3 className="font-mono text-xs tracking-wide text-brand-700 uppercase">
        {group.category}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {group.items.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 text-[15px] text-zinc-700"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-zinc-200">
              {item.logo ? (
                <IntegrationLogo
                  id={item.logo}
                  className="block size-4 [&>svg]:size-full"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-brand-gradient"
                />
              )}
            </span>
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}
