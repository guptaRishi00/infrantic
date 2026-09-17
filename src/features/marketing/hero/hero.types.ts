import type { Cta } from "@/shared/types";
import type { IntegrationId } from "@/shared/ui/integration-logo";

export type { Cta, IntegrationId };

export type IndustryId =
  | "manufacturing"
  | "apparel"
  | "logistics"
  | "professionalServices"
  | "retail"
  | "finance"
  | "realEstate"
  | "healthcare"
  | "education"
  | "startups";

/**
 * A technology badge sitting on one of the hero's background rings.
 * `ring` indexes `RING_RADII` in orbit-backdrop.tsx; `angle` is in degrees,
 * clockwise from 3 o'clock.
 */
export type OrbitIntegration = {
  id: IntegrationId;
  label: string;
  ring: number;
  angle: number;
};

export type Person = {
  name: string;
  initials: string;
  /** Tailwind gradient classes for the initials avatar. */
  tone: string;
};

/** Illustrative automation events shown in the hero's card stack. */
export type Activity =
  | {
      /** "<person> <action> <target>", e.g. "AI Agent processed Invoice #1042". */
      kind: "event";
      id: string;
      person: Person;
      action: string;
      target: string;
      meta: readonly string[];
    }
  | {
      kind: "profile";
      id: string;
      person: Person;
      role: string;
      handle: string;
    }
  | {
      kind: "email";
      id: string;
      sender: string;
      summary: string;
    };

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  integrations: readonly OrbitIntegration[];
  activity: readonly Activity[];
  industries: {
    label: string;
    items: readonly { id: IndustryId; name: string }[];
  };
};
