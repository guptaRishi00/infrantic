import type { IntegrationId } from "@/shared/ui/integration-logo";

export type ConstellationItem = {
  id: IntegrationId;
  label: string;
  /** Centre position in % of the constellation box. */
  x: number;
  y: number;
  /** Hide on narrow screens where the constellation gets crowded. */
  desktopOnly?: boolean;
};

export type TechStackIcon =
  | "ai"
  | "automation"
  | "software"
  | "infrastructure"
  | "integrations";

export type TechStackGroup = {
  category: string;
  icon: TechStackIcon;
  items: readonly string[];
};

export type IntegrationsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ConstellationItem[];
  stack: readonly TechStackGroup[];
  footnote: string;
};
