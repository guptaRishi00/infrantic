import {
  FileSearch,
  FileSpreadsheet,
  Hourglass,
  type LucideIcon,
  MessagesSquare,
  TriangleAlert,
  Unplug,
} from "lucide-react";
import { ButtonLink } from "@/shared/ui/button-link";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { GapIcon, ProblemContent } from "../problem.types";

const icons: Record<GapIcon, LucideIcon> = {
  updates: MessagesSquare,
  approvals: Hourglass,
  reports: FileSpreadsheet,
  data: Unplug,
  risks: TriangleAlert,
  documents: FileSearch,
};

export function Problem({ content }: { content: ProblemContent }) {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      // No top padding on purpose: this section follows the hero, whose bottom
      // padding alone sets the gap.
      className="scroll-mt-24 px-4 pb-24 sm:pb-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <p className="text-[15px] font-medium text-brand-700">
          {content.eyebrow}
        </p>
        <SectionHeading
          id="problem-title"
          title={content.title}
          align="left"
          size="lg"
          titleWidth="max-w-[20ch]"
          className="mt-3"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.gaps.map((gap) => {
            const Icon = icons[gap.icon];
            const headingId = `gap-${gap.id}`;
            return (
              <li key={gap.id}>
                <article
                  aria-labelledby={headingId}
                  className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-zinc-100 text-zinc-800">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-[13px] font-medium tracking-wide text-zinc-600 uppercase">
                      {content.gapLabel}
                    </span>
                  </div>
                  <h3
                    id={headingId}
                    className="mt-5 text-xl font-semibold tracking-tight text-ink"
                  >
                    {gap.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-6 text-zinc-600">
                    {gap.symptom}
                  </p>
                  <p className="mt-4 flex-1 border-t border-zinc-100 pt-4 text-[15px] leading-6 text-zinc-600">
                    {gap.impact}
                  </p>
                  <ButtonLink
                    href={gap.href}
                    aria-describedby={headingId}
                    size="sm"
                    className="mt-5 self-start"
                  >
                    {content.learnMoreLabel}
                  </ButtonLink>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
