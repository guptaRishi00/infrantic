import type { Cta } from "@/shared/types";

export type BillingPeriod = "monthly" | "yearly";

export type PricingPlan = {
  id: "solo" | "team" | "studio";
  name: string;
  description: string;
  /** Price per user per month, in USD, for each billing period. */
  price: Record<BillingPeriod, number>;
  features: readonly string[];
  cta: Cta;
  featured?: boolean;
};

export type PricingContent = {
  title: string;
  description: string;
  unitLabel: string;
  periodLabels: Record<BillingPeriod, string>;
  yearlyNote: string;
  plans: readonly PricingPlan[];
};
