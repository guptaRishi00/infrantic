import type { IntegrationId } from "@/shared/ui/integration-logo";

export type ConstellationItem = {
  id: IntegrationId;
  label: string;
  /** Orbit ring the logo rides on (0 = innermost). */
  ring: 0 | 1 | 2;
  /** Starting angle on the ring, in degrees clockwise from 3 o'clock. */
  angle: number;
  /** Hide on narrow screens where the constellation gets crowded. */
  desktopOnly?: boolean;
};

/** One tool in the stack grid; tools without a brand logo show a dot. */
export type TechStackItem = { name: string; logo?: IntegrationId };

export type TechStackGroup = {
  category: string;
  items: readonly TechStackItem[];
};

export type IntegrationsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ConstellationItem[];
  stack: readonly TechStackGroup[];
};
