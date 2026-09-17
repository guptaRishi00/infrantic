export type ToolIcon =
  | "excel"
  | "email"
  | "whatsapp"
  | "crm"
  | "erp"
  | "sheets"
  | "accounting"
  | "documents";

export type ProblemIcon =
  | "repetitive"
  | "errors"
  | "delays"
  | "silos"
  | "visibility"
  | "bottlenecks"
  | "overhead";

export type ProblemContent = {
  eyebrow: string;
  title: string;
  description: string;
  /** The tools information gets copied between by hand. */
  tools: readonly {
    label: string;
    icon: ToolIcon;
    /** Start a new row with this tag (from `sm` up). */
    breakBefore?: boolean;
  }[];
  toolsCaption: string;
  effectsLabel: string;
  effects: readonly { label: string; icon: ProblemIcon }[];
  resolution: { title: string; description: string };
};
