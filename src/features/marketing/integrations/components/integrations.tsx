import {
  CodeXml,
  type LucideIcon,
  Plug,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import { BrandMark } from "@/shared/ui/brand-mark";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { IntegrationsContent, TechStackIcon } from "../integrations.types";

const stackIcons: Record<TechStackIcon, LucideIcon> = {
  ai: Sparkles,
  automation: Workflow,
  software: CodeXml,
  infrastructure: Server,
  integrations: Plug,
};

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
      className="scroll-mt-24 overflow-hidden px-4 pt-16 pb-24 sm:pt-20 sm:pb-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <div className="flex flex-col items-center text-center">
          <p className="text-[15px] font-medium text-brand-700">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="integrations-title"
            title={content.title}
            description={content.description}
            className="mt-3"
          />
        </div>

        {/* A size container, so logo orbits can use cqw for the ring radius. */}
        <div
          aria-hidden="true"
          className="@container relative mx-auto mt-10 aspect-square max-w-[50rem]"
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

          {/* Each logo starts at the centre and carries one transform animation
              (`animate-orbit`): out to its ring, around, and counter-rotated so
              it stays upright. The static transform is the reduced-motion
              placement. */}
          <ul>
            {content.items.map((item) => {
              const ring = RINGS[item.ring];
              return (
                <li
                  key={item.id}
                  className={cn(
                    "absolute top-1/2 left-1/2 -mt-[1.375rem] -ml-[1.375rem] [transform:rotate(var(--orbit-a))_translateX(var(--orbit-r))_rotate(calc(var(--orbit-a)*-1))] motion-safe:animate-orbit sm:-mt-6 sm:-ml-6",
                    item.desktopOnly && "hidden sm:block",
                  )}
                  style={
                    {
                      "--orbit-a": `${item.angle}deg`,
                      "--orbit-r": `${ring.size / 2}cqw`,
                      animationDuration: `${ring.seconds}s`,
                      animationDirection: ring.reverse ? "reverse" : "normal",
                    } as CSSProperties
                  }
                >
                  <span className="grid size-11 place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_10px_24px_-12px_rgb(2_28_55/0.25)] sm:size-12">
                    <IntegrationLogo
                      id={item.id}
                      className="block size-5 sm:size-6 [&>svg]:size-full"
                    />
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

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.stack.map((group) => {
            const Icon = stackIcons[group.icon];
            return (
              <div
                key={group.category}
                className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgb(0_0_0/0.03)]"
              >
                <dt className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
                  <span className="grid size-8 place-items-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {group.category}
                </dt>
                <dd className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-1 text-[13px] text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-8 text-center text-[15px] text-zinc-600">
          {content.footnote}
        </p>
      </div>
    </section>
  );
}
