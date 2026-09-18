import type { Cta } from "@/shared/types";

export type StepIcon =
  | "order"
  | "costing"
  | "procurement"
  | "readiness"
  | "production"
  | "dispatch";

export type ProjectFact = { number: string; label: string; body: string };

export type FlowStep = { id: string; label: string; icon: StepIcon };

export type FeaturedProjectContent = {
  eyebrow: string;
  title: string;
  facts: readonly ProjectFact[];
  cta: Cta;
  diagram: {
    label: string;
    hub: string;
    steps: readonly FlowStep[];
    outcome: string;
    legend: { primary: string; feedback: string };
  };
};
