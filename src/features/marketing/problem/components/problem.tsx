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
      <div className="mx-auto max-w-[80rem] pl-6 pr-[1.125rem]">
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
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-b from-white to-blue-50/20 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/80 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)]"
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-2">
                        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-zinc-50 to-zinc-100/50 text-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.04)] ring-1 ring-zinc-200/50 transition-all duration-300">
                          <Icon aria-hidden="true" className="size-6" strokeWidth={2.5} />
                        </span>
                      </div>
                      <h3
                        id={headingId}
                        className="mt-6 text-xl font-semibold tracking-tight text-ink transition-colors duration-500 group-hover:text-blue-950"
                      >
                        {gap.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-6 text-zinc-600">
                        {gap.symptom}
                      </p>
                      <p className="mt-4 flex-1 border-t border-zinc-100 pt-4 text-[15px] leading-6 text-zinc-600 transition-colors duration-500 group-hover:border-blue-100">
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
