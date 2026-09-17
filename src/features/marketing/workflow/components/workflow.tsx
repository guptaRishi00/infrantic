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
      className="scroll-mt-24 px-4 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[84rem]">
        <SectionHeading
          id="workflow-title"
          size="lg"
          title={content.title}
          description={content.description}
        />
        <div className="mt-12">
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
    <div className="rounded-[1.75rem] border border-zinc-200/80 bg-zinc-100/60 p-2 shadow-[0_30px_60px_-40px_rgb(2_28_55/0.35)]">
      <div className="grid gap-2 rounded-3xl bg-white p-2 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col p-5 sm:p-7">
          <span className="w-fit rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-500">
            {step.stepLabel}
          </span>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
            {step.title}
          </h3>
          <div className="mt-10 lg:mt-auto">
            <p className="max-w-xs text-sm leading-6 text-zinc-500">
              {step.description}
            </p>
            <ButtonLink href={step.cta.href} size="sm" className="mt-5">
              {step.cta.label}
            </ButtonLink>
          </div>
        </div>
        <FlowCanvas step={step} />
      </div>
    </div>
  );
}
