import type { Cta } from "@/shared/types";
import type { IntegrationId } from "@/shared/ui/integration-logo";
import type { BlockIcon } from "./block-icons";

export type Tone = "light" | "dark";

/** Stat figures are numeric only ("6", "100%", "24/7"), never words:
 * the design is a big number over a small label (user rule). */
export type Stat = { value: `${number}${string}`; label: string };

export type HeroFlowNode = {
  id: string;
  /** Centre position in % of the canvas. */
  x: number;
  y: number;
  label: string;
  icon?: BlockIcon;
  logo?: IntegrationId;
  /** "hub" = brand tile; "record" = a status card (kicker + lines). */
  variant?: "node" | "hub" | "record";
  kicker?: string;
  lines?: readonly string[];
};

export type HeroFlowVisual = {
  kind: "flow";
  /** Accessible description. */
  label: string;
  nodes: readonly HeroFlowNode[];
  /** Straight segments (horizontal or vertical), centre to centre under the nodes. */
  wires: readonly {
    from: readonly [number, number];
    to: readonly [number, number];
    delay: number;
  }[];
};

export type HeroOrbitVisual = {
  kind: "orbit";
  label: string;
  chips: readonly {
    label: string;
    ring: 0 | 1 | 2;
    angle: number;
    icon?: BlockIcon;
    logo?: IntegrationId;
  }[];
};

export type HeroVisualContent = HeroFlowVisual | HeroOrbitVisual;

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  stats?: readonly Stat[];
  visual?: HeroVisualContent;
};

export type FeatureItem = {
  id: string;
  icon: BlockIcon;
  title: string;
  description: string;
  /** Small chips under the description. */
  tags?: readonly string[];
};

export type FeatureGridContent = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly FeatureItem[];
  columns?: 2 | 3;
  tone?: Tone;
  cta?: Cta;
};

export type SplitSectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Check-marked points under the description. */
  points?: readonly string[];
  cta?: Cta;
  /** Side panel: labelled facts. */
  panel: { label: string; items: readonly { term: string; detail: string }[] };
  reverse?: boolean;
  tone?: Tone;
};

export type Step = {
  number: string;
  title: string;
  description: string;
  /** What comes out of this step. */
  outputs?: readonly string[];
};

export type StepsContent = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  steps: readonly Step[];
  tone?: Tone;
};

export type BeforeAfterContent = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  before: { label: string; items: readonly string[] };
  after: { label: string; items: readonly string[] };
};

export type StatsContent = {
  id: string;
  eyebrow: string;
  title: string;
  stats: readonly Stat[];
  footnote?: string;
};

export type StackItem = { name: string; logo?: IntegrationId };

export type StackShowcaseContent = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: Tone;
  groups: readonly { label: string; items: readonly StackItem[] }[];
  footnote?: string;
};
