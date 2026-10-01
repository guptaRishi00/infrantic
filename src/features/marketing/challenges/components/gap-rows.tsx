import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlockHeading, blockIcons } from "@/features/marketing/page-blocks";
import type { GapRowsContent } from "../challenges.data";

/**
 * Six gaps as numbered rows, each pairing what the team sees today with what
 * changes once it is connected (the home page shows them as cards). Each row
 * links to the product on /products that closes that gap.
 */
export function GapRows({ content }: { content: GapRowsContent }) {
  return (
    <section
      id="gaps"
      aria-labelledby="gaps-title"
      className="scroll-mt-24 bg-white px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="gaps-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <div className="mt-12 rounded-2xl border border-zinc-200/80 bg-white">
          <div
            aria-hidden="true"
            className="hidden grid-cols-[4rem_1.1fr_1fr] gap-8 rounded-t-2xl border-b border-zinc-200/80 bg-zinc-50/80 px-7 py-3.5 text-[12px] font-semibold tracking-[0.12em] text-zinc-600 uppercase lg:grid"
          >
            <span />
            <span>{content.todayLabel}</span>
            <span>{content.changeLabel}</span>
          </div>
          <ol className="divide-y divide-zinc-200/80">
            {content.gaps.map((gap) => {
              const Icon = blockIcons[gap.icon];
              return (
                <li
                  key={gap.id}
                  className="grid gap-5 px-7 py-7 lg:grid-cols-[4rem_1.1fr_1fr] lg:items-start lg:gap-8"
                >
                  <span className="grid size-10 place-items-center rounded-xl border border-zinc-200 bg-zinc-50">
                    <Icon aria-hidden="true" className="size-5 text-zinc-800" />
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-ink">
                      {gap.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-6 text-zinc-600">
                      {gap.today}
                    </p>
                  </div>
                  <div>
                    <p className="flex gap-3 rounded-xl bg-brand-50/60 px-4 py-3 text-[15px] leading-6 text-zinc-700">
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-brand-to"
                      />
                      <span>
                        <span className="sr-only">{content.changeLabel}: </span>
                        {gap.change}
                      </span>
                    </p>
                    <Link
                      href={gap.product.href}
                      className="group mt-3 ml-4 inline-flex items-center gap-1.5 rounded-md text-[14px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink max-sm:mt-0 max-sm:-mb-3 max-sm:py-3"
                    >
                      <span className="text-zinc-500">Product:</span>{" "}
                      {gap.product.name}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
