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

const RINGS = ["w-[34%]", "w-[58%]", "w-[84%]", "w-[112%]"] as const;

export function Integrations({ content }: { content: IntegrationsContent }) {
  return (
    <section
      id="technology"
      aria-labelledby="integrations-title"
      className="scroll-mt-24 overflow-hidden px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[84rem]">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-brand-700">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="integrations-title"
            title={content.title}
            description={content.description}
            className="mt-3"
          />
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto mt-10 aspect-[4/3] max-w-4xl sm:aspect-[16/9]"
        >
          {/* Clipped + masked so rings fade out instead of crossing the heading. */}
          <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(closest-side,#000_72%,transparent)]">
            {RINGS.map((width) => (
              <span
                key={width}
                className={cn(
                  "absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200",
                  width,
                )}
              />
            ))}
          </div>

          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-[linear-gradient(145deg,#0796fe,#021c37)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_24px_48px_-16px_rgb(7_150_254/0.45)] sm:size-24">
            <BrandMark className="size-10 sm:size-12" />
          </span>

          <ul>
            {content.items.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  item.desktopOnly && "hidden sm:block",
                )}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <span
                  className="block motion-safe:animate-float"
                  style={{ animationDelay: `${index * -0.9}s` }}
                >
                  <span className="grid size-11 place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_10px_24px_-12px_rgb(2_28_55/0.25)] sm:size-12">
                    <IntegrationLogo
                      id={item.id}
                      className="block size-5 sm:size-6 [&>svg]:size-full"
                    />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {content.stack.map((group) => {
            const Icon = stackIcons[group.icon];
            return (
              <div
                key={group.category}
                className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgb(0_0_0/0.03)]"
              >
                <dt className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink">
                  <span className="grid size-8 place-items-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {group.category}
                </dt>
                <dd className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-1 text-xs text-zinc-700"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="mt-8 text-center text-sm text-zinc-500">
          {content.footnote}
        </p>
      </div>
    </section>
  );
}
