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
      className="scroll-mt-24 bg-brand-50/60 px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-brand-700">
              {content.eyebrow}
            </p>
            <SectionHeading
              id="what-we-build-title"
              title={content.title}
              description={content.description}
              align="left"
              size="lg"
              titleWidth="max-w-[26ch]"
              className="mt-3"
            />
          </div>
          <ButtonLink
            href={content.allServices.href}
            size="sm"
            className="self-start lg:self-auto"
          >
            {content.allServices.label}
          </ButtonLink>
        </div>

        <ul className="mt-12 grid overflow-hidden rounded-2xl border border-zinc-200/80 bg-white sm:grid-cols-2">
          {content.items.map((item) => {
            const Icon = icons[item.icon];
            const headingId = `build-${item.id}`;
            return (
              // Inner borders only: every cell draws its bottom and right
              // edge, and the outer frame hides the ones on the rim.
              <li
                key={item.id}
                className="-mr-px -mb-px border-r border-b border-zinc-200/80"
              >
                <article
                  aria-labelledby={headingId}
                  className="flex h-full flex-col gap-6 p-7 transition-colors duration-200 hover:bg-zinc-50/70 sm:flex-row sm:p-10"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-800 ring-1 ring-zinc-200">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <h3
                      id={headingId}
                      className="max-w-[22ch] text-xl font-semibold tracking-tight text-balance text-ink"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-6 text-zinc-500">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      aria-describedby={headingId}
                      className="group/link mt-6 inline-flex items-center gap-1 self-start rounded-md text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
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
