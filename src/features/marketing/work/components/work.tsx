import type { ReactNode } from "react";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { CaseStudy, WorkContent } from "../work.types";
import { ProofreaderMock, TaskBoardMock } from "./app-mocks";
import { AutomationFlow } from "./automation-flow";
import { WorkTabs } from "./work-tabs";

function CaseVisual({ study }: { study: CaseStudy }): ReactNode {
  switch (study.visual) {
    case "automation":
      return <AutomationFlow label={study.visualLabel} />;
    case "proofreader":
      return <ProofreaderMock label={study.visualLabel} />;
    case "tasks":
      return <TaskBoardMock label={study.visualLabel} />;
  }
}

function CasePanel({
  study,
  labels,
}: {
  study: CaseStudy;
  labels: WorkContent["labels"];
}) {
  return (
    <article
      aria-labelledby={`case-${study.id}`}
      className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8"
    >
      <p className="font-mono text-[13px] text-brand-300">{study.number}</p>
      <h3
        id={`case-${study.id}`}
        className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
      >
        {study.title}
      </h3>

      <div className="mt-6">
        <CaseVisual study={study} />
      </div>

      <dl className="mt-8 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-3">
        <div>
          <dt className="font-mono text-xs tracking-wide text-zinc-300 uppercase">
            {labels.problem}
          </dt>
          <dd className="mt-2 text-[15px] leading-6 text-zinc-300">
            {study.problem}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-wide text-zinc-300 uppercase">
            {labels.built}
          </dt>
          <dd className="mt-2 text-[15px] leading-6 text-zinc-300">
            {study.built}
          </dd>
        </div>
        <div className="md:border-l md:border-white/10 md:pl-6">
          <dt className="font-mono text-xs tracking-wide text-brand-300 uppercase">
            {labels.benefits}
          </dt>
          <dd className="mt-2">
            <ul className="space-y-1.5 text-[15px] leading-6 text-zinc-300">
              {study.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-gradient"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </article>
  );
}

/** Selected work: case-study tabs beside an animated/illustrated detail panel. */
export function Work({ content }: { content: WorkContent }) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-24 bg-ink px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <p className="text-[15px] font-medium text-brand-300">
          {content.eyebrow}
        </p>
        <SectionHeading
          id="work-title"
          title={content.title}
          align="left"
          tone="dark"
          size="lg"
          titleWidth="max-w-[30ch]"
          className="mt-3"
        />

        <WorkTabs
          tabs={content.cases.map(({ id, number, title, summary }) => ({
            id,
            number,
            title,
            summary,
          }))}
          panels={content.cases.map((study) => (
            <CasePanel key={study.id} study={study} labels={content.labels} />
          ))}
        />
      </div>
    </section>
  );
}
