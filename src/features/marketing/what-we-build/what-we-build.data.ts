import type { WhatWeBuildContent } from "./what-we-build.types";

const whatWeBuildContent = {
  eyebrow: "What we build",
  title: "Focused systems for work that is still too manual",
  description:
    "We start from the workflow, the people involved, and the outcome the business needs. The technology follows.",
  learnMoreLabel: "Learn more",
  // Card links point at the matching services until dedicated pages exist.
  items: [
    {
      id: "workflow-automation",
      title: "Workflow automation and integrations",
      description:
        "Connect the repeated steps between your tools, without losing control of the process.",
      icon: "workflow",
      href: "/#services",
    },
    {
      id: "operations-dashboards",
      title: "Operations dashboards and internal tools",
      description:
        "One place for teams to update work, act on it, and see what needs attention.",
      icon: "dashboard",
      href: "/#services",
    },
    {
      id: "ai-workflows",
      title: "AI-assisted document and knowledge workflows",
      description:
        "AI as a controlled assistant for documents, emails, and other unstructured information.",
      icon: "ai",
      href: "/#services",
    },
    {
      id: "custom-software",
      title: "Custom software and ongoing support",
      description:
        "Focused applications when a workflow needs one, maintained as the business grows.",
      icon: "software",
      href: "/#services",
    },
  ],
  allServices: { label: "View all services", href: "/#services" },
} as const satisfies WhatWeBuildContent;

export function getWhatWeBuildContent(): WhatWeBuildContent {
  return whatWeBuildContent;
}
