import type { UseCasesContent } from "./use-cases.types";

const useCasesContent = {
  title: "Discover how Infrantic streamlines various tasks.",
  linkLabel: "Explore more",
  useCases: [
    {
      id: "campaigns",
      title: "Campaign management made easy.",
      description:
        "Plan, track, and ramp up your campaigns with shared calendars and live status.",
      href: "/use-cases/campaigns",
      illustration: "campaign",
    },
    {
      id: "production",
      title: "Creative production made easy.",
      description:
        "Speed up your creative process by automating handoffs from brief to final asset.",
      href: "/use-cases/production",
      illustration: "production",
    },
    {
      id: "intake",
      title: "Project intake made simple.",
      description:
        "Automatically capture, prioritize, and route incoming requests to the right team.",
      href: "/use-cases/intake",
      illustration: "intake",
    },
    {
      id: "operations",
      title: "Organizational planning.",
      description:
        "See work across every team, balance workloads, and plan headcount with confidence.",
      href: "/use-cases/operations",
      illustration: "org",
    },
    {
      id: "launches",
      title: "Product launches, on time.",
      description:
        "Coordinate every launch task and dependency so nothing slips on release day.",
      href: "/use-cases/launches",
      illustration: "launch",
    },
  ],
} as const satisfies UseCasesContent;

export function getUseCasesContent(): UseCasesContent {
  return useCasesContent;
}
