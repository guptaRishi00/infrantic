import type { IntegrationId } from "@/shared/ui/integration-logo";

export type { IntegrationId };

export type CompanyId =
  | "google"
  | "airbnb"
  | "coinbase"
  | "notion"
  | "gumroad"
  | "paypal"
  | "upwork"
  | "shopify"
  | "stripe"
  | "zoom";

export type Cta = { label: string; href: string };

export type Rating = {
  source: "google" | "trustpilot";
  label: string;
  score: number;
};

/**
 * An integration badge floating around the hero. `x`/`y` are offsets in design
 * pixels (1280px layout) from the top-centre of the activity stack; the orbit
 * scales them down on smaller breakpoints.
 */
export type OrbitIntegration = {
  id: IntegrationId;
  label: string;
  x: number;
  y: number;
};

export type Person = {
  name: string;
  initials: string;
  /** Tailwind gradient classes for the initials avatar. */
  tone: string;
};

export type Activity =
  | {
      kind: "joined";
      id: string;
      person: Person;
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
  ratings: readonly Rating[];
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  integrations: readonly OrbitIntegration[];
  activity: readonly Activity[];
  trustedBy: {
    label: string;
    companies: readonly { id: CompanyId; name: string }[];
  };
};
