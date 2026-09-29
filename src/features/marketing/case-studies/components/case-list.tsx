import { Check } from "lucide-react";
import { BlockHeading } from "@/features/marketing/page-blocks";
import type { CaseListContent } from "../case-studies.data";

/**
 * Case studies as stacked write-ups: context and tools on the left; the
 * challenge, what we built (as steps), and the results on the right. The home
 * page shows the same projects as tabs with illustrations.
 */
export function CaseList({ content }: { content: CaseListContent }) {
  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      className="scroll-mt-24 px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <BlockHeading
          id="cases-title"
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />
        <ol className="mt-12 space-y-6">
          {content.cases.map((study) => (
            <li key={study.id}>
              <article
                aria-labelledby={`${study.id}-title`}
                className="reveal grid overflow-hidden rounded-2xl border border-zinc-200/80 lg:grid-cols-[22rem_1fr]"
              >
                <div className="flex flex-col border-b border-zinc-200/80 bg-zinc-50/70 p-7 lg:border-r lg:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] text-brand-700">
                      {study.number}
                    </span>
                    <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[13px] text-zinc-600">
                      {study.sector}
                    </span>
                  </div>
                  <h3
                    id={`${study.id}-title`}
                    className="mt-5 text-2xl font-semibold tracking-tight text-balance text-ink"
                  >
                    {study.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-6 text-zinc-600">
                    {study.summary}
                  </p>
                  <div className="mt-6 lg:mt-auto lg:pt-8">
                    <p className="font-mono text-xs tracking-wide text-zinc-500 uppercase">
                      {content.toolsLabel}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {study.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-md border border-zinc-200/80 bg-white px-2 py-1 text-[13px] text-zinc-700"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <dl className="grid gap-8 p-7 lg:grid-cols-3 lg:p-8">
                  <div>
                    <dt className="font-mono text-xs tracking-wide text-zinc-500 uppercase">
                      {content.challengeLabel}
                    </dt>
                    <dd className="mt-3 text-[15px] leading-6 text-zinc-600">
                      {study.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs tracking-wide text-zinc-500 uppercase">
                      {content.approachLabel}
                    </dt>
                    <dd className="mt-3">
                      <ol className="space-y-2.5">
                        {study.approach.map((step, index) => (
                          <li
                            key={step}
                            className="flex gap-3 text-[15px] leading-6 text-zinc-700"
                          >
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-zinc-200 font-mono text-[11px] leading-none text-zinc-500 tabular-nums">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </dd>
                  </div>
                  <div className="md:border-l md:border-zinc-200/80 md:pl-8">
                    <dt className="font-mono text-xs tracking-wide text-brand-700 uppercase">
                      {content.resultsLabel}
                    </dt>
                    <dd className="mt-3">
                      <ul className="space-y-2.5">
                        {study.results.map((result) => (
                          <li
                            key={result}
                            className="flex gap-3 text-[15px] leading-6 text-zinc-700"
                          >
                            <span className="mt-1 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                              <Check
                                aria-hidden="true"
                                className="size-3"
                                strokeWidth={3}
                              />
                            </span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
