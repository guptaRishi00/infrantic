import {
  ArrowUpRight,
  BrainCircuit,
  CodeXml,
  LayoutDashboard,
  type LucideIcon,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/shared/ui/button-link";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { BuildItemIcon, WhatWeBuildContent } from "../what-we-build.types";

const icons: Record<BuildItemIcon, LucideIcon> = {
  workflow: Workflow,
  dashboard: LayoutDashboard,
  ai: BrainCircuit,
  software: CodeXml,
};

/** Capability overview: four focus areas in a single bordered 2×2 grid. */
export function WhatWeBuild({ content }: { content: WhatWeBuildContent }) {
  return (
    <section
      id="what-we-build"
      aria-labelledby="what-we-build-title"
      className="scroll-mt-24 bg-ink px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-brand-300">
              {content.eyebrow}
            </p>
            <SectionHeading
              id="what-we-build-title"
              title={content.title}
              description={content.description}
              align="left"
              tone="dark"
              size="lg"
              titleWidth="max-w-[26ch]"
              className="mt-3"
            />
          </div>
          <ButtonLink
            href={content.allServices.href}
            variant="secondary"
            size="sm"
            className="self-start lg:self-auto"
          >
            {content.allServices.label}
          </ButtonLink>
        </div>

        <ul className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:grid-cols-2">
          {content.items.map((item) => {
            const Icon = icons[item.icon];
            const headingId = `build-${item.id}`;
            return (
              // Inner borders only: every cell draws its bottom and right
              // edge, and the outer frame hides the ones on the rim.
              <li
                key={item.id}
                className="-mr-px -mb-px border-r border-b border-white/10"
              >
                <article
                  aria-labelledby={headingId}
                  className="flex h-full flex-col gap-6 p-7 transition-colors duration-200 hover:bg-white/[0.04] sm:flex-row sm:p-10"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white ring-1 ring-white/10">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <h3
                      id={headingId}
                      className="max-w-[22ch] text-xl font-semibold tracking-tight text-balance text-white"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-400">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      aria-describedby={headingId}
                      className="group/link mt-6 inline-flex items-center gap-1 self-start rounded-md text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                    >
                      <span className="bg-brand-gradient bg-clip-text text-transparent">
                        {content.learnMoreLabel}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-brand-to transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
