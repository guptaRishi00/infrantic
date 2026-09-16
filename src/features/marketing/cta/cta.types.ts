import type { Cta } from "@/shared/types";
import type { AvatarPerson } from "@/shared/ui/initials-avatar";
import type { IntegrationId } from "@/shared/ui/integration-logo";

export type CtaContent = {
  socialProof: {
    value: string;
    label: string;
    people: readonly AvatarPerson[];
  };
  title: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  /** Floating badges; `x`/`y` are centre positions in % of the band. */
  badges: readonly { id: IntegrationId; x: number; y: number }[];
};
