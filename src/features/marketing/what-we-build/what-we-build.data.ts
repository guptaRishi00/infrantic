import type { WhatWeBuildContent } from "./what-we-build.types";

const whatWeBuildContent = {
  eyebrow: "WHAT WE BUILD",
  title: "Focused systems for work that is still too manual",
  description:
    "The technical approach follows the workflow, the people involved, and the business outcome—not the other way around.",
  items: [
    {
      id: "workflow-automation",
      title: "Workflow automation\nand integrations",
      description: "Connect repeated steps while keeping process control.",
      icon: "workflow",
      href: "#",
    },
    {
      id: "operations-dashboards",
      title: "Operations dashboards\nand internal tools",
      description: "Give teams one place to update, act, and see what needs attention.",
      icon: "dashboard",
      href: "#",
    },
    {
      id: "ai-workflows",
      title: "AI-assisted document\nand knowledge workflows",
      description: "Use AI as a controlled assistant for unstructured information.",
      icon: "ai",
      href: "#",
    },
    {
      id: "custom-software",
      title: "Custom software\nand ongoing support",
      description: "Build focused applications when the workflow needs one.",
      icon: "software",
      href: "#",
    },
  ],
  allServicesHref: "#",
} as const satisfies WhatWeBuildContent;

export function getWhatWeBuildContent(): WhatWeBuildContent {
  return whatWeBuildContent;
}
