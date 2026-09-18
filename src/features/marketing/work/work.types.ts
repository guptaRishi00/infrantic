export type CaseVisual = "automation" | "proofreader" | "tasks";

export type CaseStudy = {
  id: string;
  number: string;
  title: string;
  /** One-line summary shown under the tab title. */
  summary: string;
  visual: CaseVisual;
  /** Accessible description of the decorative visual. */
  visualLabel: string;
  problem: string;
  built: string;
  benefits: readonly string[];
};

export type WorkContent = {
  eyebrow: string;
  title: string;
  labels: { problem: string; built: string; benefits: string };
  cases: readonly CaseStudy[];
};
