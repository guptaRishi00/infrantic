export type GapIcon =
  | "updates"
  | "approvals"
  | "reports"
  | "data"
  | "risks"
  | "documents";

export type OperationalGap = {
  id: string;
  icon: GapIcon;
  title: string;
  /** What the team sees day to day. */
  symptom: string;
  /** What it costs the business. */
  impact: string;
  href: string;
};

export type ProblemContent = {
  eyebrow: string;
  title: string;
  /** Small label shown on every card. */
  gapLabel: string;
  learnMoreLabel: string;
  gaps: readonly OperationalGap[];
};
