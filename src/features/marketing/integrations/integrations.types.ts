import type { AvatarPerson } from "@/shared/ui/initials-avatar";
import type { IntegrationId } from "@/shared/ui/integration-logo";

type Placement = {
  /** Centre position in % of the constellation box. */
  x: number;
  y: number;
  /** Hide on narrow screens where the constellation gets crowded. */
  desktopOnly?: boolean;
};

export type ConstellationItem =
  | (Placement & { kind: "logo"; id: IntegrationId; label: string })
  | (Placement & { kind: "person"; person: AvatarPerson });

export type IntegrationsContent = {
  title: string;
  description: string;
  items: readonly ConstellationItem[];
};
