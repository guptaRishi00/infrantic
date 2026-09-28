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

        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {content.stack.map((group) => {
            const Icon = stackIcons[group.icon];
            return (
              <div
                key={group.category}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/50 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-300/60 hover:shadow-[0_12px_40px_rgb(59,130,246,0.15)]"
              >
                <div className="absolute -right-20 -top-20 size-40 rounded-full bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                
                <dt className="relative flex items-center gap-3 text-[16px] font-semibold tracking-tight text-ink transition-colors duration-500 group-hover:text-blue-950">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-white to-zinc-100 text-zinc-600 shadow-[0_2px_10px_rgba(0,0,0,0.04)] ring-1 ring-zinc-200/50 transition-all duration-500 group-hover:scale-110 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)] group-hover:ring-blue-600">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={2.5} />
                  </span>
                  {group.category}
                </dt>
                <dd className="relative mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-zinc-200/60 bg-white/80 px-2.5 py-1.5 text-[13px] font-medium text-zinc-600 shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:border-blue-200/80 group-hover:bg-blue-50 group-hover:text-blue-700"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-8 text-center shadow-sm">
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-indigo-400/20 blur-3xl" />
            <p className="relative inline-flex flex-col items-center justify-center gap-3 text-lg font-medium text-blue-950 sm:flex-row sm:text-xl">
              <Sparkles className="hidden size-5 text-blue-500 sm:block" />
              {content.footnote}
              <Sparkles className="hidden size-5 text-blue-500 sm:block" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
