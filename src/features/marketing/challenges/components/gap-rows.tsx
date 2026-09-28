import { ArrowRight } from "lucide-react";
import { BlockHeading, blockIcons } from "@/features/marketing/page-blocks";
import type { GapRowsContent } from "../challenges.data";

/**
 * Six gaps as numbered rows, each pairing what the team sees today with what
 * changes once it is connected (the home page shows them as cards).
 */
export function GapRows({ content }: { content: GapRowsContent }) {
  return (
    <section
      id="gaps"
      aria-labelledby="gaps-title"
      className="scroll-mt-24 bg-zinc-50/70 px-4 py-16 sm:py-28"
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
            className="hidden grid-cols-[4rem_1.1fr_1fr] gap-8 border-b border-zinc-200/80 px-7 py-4 font-mono text-xs tracking-wide text-zinc-500 uppercase lg:grid"
          >
            <span>No.</span>
            <span>{content.todayLabel}</span>
            <span>{content.changeLabel}</span>
          </div>
          <ol className="divide-y divide-zinc-200/80">
            {content.gaps.map((gap) => {
              const Icon = blockIcons[gap.icon];
              return (
                <li
                  key={gap.id}
                  className="reveal grid gap-5 px-7 py-7 lg:grid-cols-[4rem_1.1fr_1fr] lg:items-start lg:gap-8"
                >
                  <span className="flex items-center gap-3 lg:block">
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-zinc-800 lg:mt-2"
                    />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ink">
                      {gap.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-6 text-zinc-600">
                      {gap.today}
                    </p>
                  </div>
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
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
