import type { FeaturedProjectContent } from "./featured-project.types";

const featuredProjectContent = {
  eyebrow: "Featured project",
  title: "Every garment order, connected from costing to dispatch and payment",
  facts: [
    {
      number: "01",
      label: "Where it started",
      body: "Costing, procurement, pre-production, production, dispatch, GRN, payment, and reporting each lived in separate files with separate owners.",
    },
    {
      number: "02",
      label: "How we structured it",
      body: "One connected operating structure, built around a single shared internal order ID.",
    },
    {
      number: "03",
      label: "What it changes",
      body: "Less manual consolidation, clear ownership at every stage, and delivery risks visible while there is still time to act.",
    },
  ],
  cta: { label: "Discuss a similar project", href: "/#contact" },
  diagram: {
    label: "Connected operating structure",
    hub: "Shared internal order ID",
    steps: [
      { id: "order", label: "Order master", icon: "order" },
      { id: "costing", label: "Costing and approvals", icon: "costing" },
      {
        id: "procurement",
        label: "Procurement tracking",
        icon: "procurement",
      },
      {
        id: "readiness",
        label: "Pre-production readiness",
        icon: "readiness",
      },
      { id: "production", label: "Production updates", icon: "production" },
      { id: "dispatch", label: "Dispatch, GRN, and payment", icon: "dispatch" },
    ],
    outcome: "Shared visibility across teams",
    legend: { primary: "Primary flow", feedback: "Shared data and visibility" },
  },
} as const satisfies FeaturedProjectContent;

/** Single read path for the featured project; swap for a CMS later. */
export function getFeaturedProjectContent(): FeaturedProjectContent {
  return featuredProjectContent;
}
