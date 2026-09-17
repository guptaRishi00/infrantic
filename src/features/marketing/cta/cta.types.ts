import type { Cta } from "@/shared/types";
import type { IntegrationId } from "@/shared/ui/integration-logo";

export type CtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  /** Short statements shown as a row of steps under the description. */
  commitments: readonly string[];
  primaryCta: Cta;
  secondaryCta: Cta;
  /** Floating badges; `x`/`y` are centre positions in % of the band. */
  badges: readonly { id: IntegrationId; x: number; y: number }[];
};
