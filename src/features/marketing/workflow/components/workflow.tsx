import { ButtonLink } from "@/shared/ui/button-link";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { WorkflowContent, WorkflowStep } from "../workflow.types";
import { FlowCanvas } from "./flow-canvas";
import { WorkflowTabs } from "./workflow-tabs";

export function Workflow({ content }: { content: WorkflowContent }) {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-title"
      className="scroll-mt-24 px-4 py-16 sm:py-28"
    >
      <div className="mx-auto max-w-[80rem]">
        <SectionHeading
          id="workflow-title"
          size="lg"
          title={content.title}
          description={content.description}
        />
        {/* Phones: tabs + step panel zoomed to 90% as a whole (text, card,
            diagram and spacing alike); the heading keeps the site scale. */}
        <div className="mt-12 max-sm:[zoom:0.9]">
          <WorkflowTabs
            labels={content.steps.map((step) => step.tabLabel)}
            panels={content.steps.map((step) => (
              <StepPanel key={step.id} step={step} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}

function StepPanel({ step }: { step: WorkflowStep }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-zinc-100/60 p-2">
      <div className="grid gap-2 rounded-xl bg-white p-2 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col p-5 sm:p-7">
          <span className="w-fit rounded-full border border-zinc-200 px-2.5 py-0.5 text-[13px] text-zinc-600">
            {step.stepLabel}
          </span>
          <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-ink sm:text-3xl">
            {step.title}
          </h3>
          <div className="mt-10 lg:mt-auto">
            <p className="max-w-xs text-[15px] leading-6 text-zinc-600">
              {step.description}
            </p>
            {/* Phones: cancels the panel's 0.9 zoom so it matches every
                other button (margin 20px x 0.9). */}
            <ButtonLink
              href={step.cta.href}
              className="mt-5 max-sm:mt-[18px] max-sm:[zoom:1.1111]"
            >
              {step.cta.label}
            </ButtonLink>
          </div>
        </div>
        <FlowCanvas step={step} />
      </div>
    </div>
  );
}
