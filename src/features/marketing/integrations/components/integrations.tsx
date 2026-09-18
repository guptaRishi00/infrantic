import {
  CodeXml,
  type LucideIcon,
  Plug,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
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
// once (alternating direction). Logos counter-rotate to stay upright.
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

        {/* The vertical mask fades the whole diagram (rings and orbiting
            logos) at the top and bottom, so logos pass into the fade. */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-10 aspect-square max-w-[50rem] [mask-image:linear-gradient(to_bottom,transparent_4%,#000_40%,#000_60%,transparent_96%)]"
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

          {/* One turning square per ring; its logos sit on the ring line and
              rotate by minus the ring's inherited --orbit-angle, so they stay
              upright and can never drift out of sync. */}
          {RINGS.map((ring, ringIndex) => {
            const spin = {
              animationDuration: `${ring.seconds}s`,
              animationDirection: ring.reverse ? "reverse" : "normal",
            } as const;
            return (
              <ul
                key={ring.size}
                className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 [rotate:var(--orbit-angle)] motion-safe:animate-orbit"
                style={{ width: `${ring.size}%`, ...spin }}
              >
                {content.items
                  .filter((item) => item.ring === ringIndex)
                  .map((item) => {
                    const rad = (item.angle * Math.PI) / 180;
                    return (
                      <li
                        key={item.id}
                        className={cn(
                          "absolute -translate-x-1/2 -translate-y-1/2",
                          item.desktopOnly && "hidden sm:block",
                        )}
                        style={{
                          left: `${50 + 50 * Math.cos(rad)}%`,
                          top: `${50 + 50 * Math.sin(rad)}%`,
                        }}
                      >
                        <span className="grid size-11 place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_10px_24px_-12px_rgb(2_28_55/0.25)] [rotate:calc(var(--orbit-angle)*-1)] sm:size-12">
                          <IntegrationLogo
                            id={item.id}
                            className="block size-5 sm:size-6 [&>svg]:size-full"
                          />
                        </span>
                      </li>
                    );
                  })}
              </ul>
            );
          })}
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
