export type ServiceIcon =
  | "ai"
  | "process"
  | "software"
  | "integrations"
  | "data";

export type Service = {
  id: string;
  /** Two-digit display index, e.g. "01". */
  number: string;
  title: string;
  description: string;
  capabilities: readonly string[];
  goal: string;
  icon: ServiceIcon;
};

export type ServicesContent = {
  eyebrow: string;
  title: string;
  description: string;
  goalLabel: string;
  services: readonly Service[];
};
