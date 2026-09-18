import type { Cta } from "@/shared/types";

export type CtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  /** Short statements shown as a row of steps under the description. */
  commitments: readonly string[];
  primaryCta: Cta;
  secondaryCta: Cta;
};
