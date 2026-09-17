import type { ServicesContent } from "./services.types";

const servicesContent = {
  eyebrow: "What we do",
  title: "Technology built around the way your business operates",
  description:
    "From everyday workflows to AI-powered internal systems, we turn fragmented operations into connected, scalable systems.",
  goalLabel: "Goal",
  services: [
    {
      id: "ai-automation",
      number: "01",
      title: "AI Automation",
      description:
        "We use AI to automate tasks that traditionally require repetitive human effort.",
      capabilities: [
        "AI-powered workflows",
        "Intelligent document processing",
        "Data extraction and classification",
        "AI assistants and agents",
        "Automated decision support",
        "Email and communication automation",
        "AI-powered reporting",
      ],
      goal: "Reduce manual work without removing human control.",
      icon: "ai",
    },
    {
      id: "process-automation",
      number: "02",
      title: "Business Process Automation",
      description:
        "We map existing business processes and identify where automation can create measurable improvements.",
      capabilities: [
        "Approval workflows",
        "Procurement automation",
        "Inventory workflows",
        "Lead management",
        "Customer onboarding",
        "Invoice processing",
        "Notifications and alerts",
        "Internal operations",
      ],
      goal: "Make businesses faster, more consistent, and less dependent on manual processes.",
      icon: "process",
    },
    {
      id: "custom-software",
      number: "03",
      title: "Custom Software",
      description:
        "When off-the-shelf software isn't enough, we build software specifically around the business.",
      capabilities: [
        "Internal business applications",
        "Operations management systems",
        "Admin panels",
        "Customer portals",
        "Workflow management platforms",
        "SaaS products",
        "Custom dashboards",
      ],
      goal: "Build software that fits the business instead of forcing the business to fit the software.",
      icon: "software",
    },
    {
      id: "systems-integrations",
      number: "04",
      title: "Systems & Integrations",
      description:
        "Businesses often have the right tools, but they don't communicate with each other. Infrantic connects them.",
      capabilities: [
        "CRMs",
        "ERPs",
        "Accounting systems",
        "Communication platforms",
        "Databases",
        "APIs",
        "Payment systems",
        "Cloud services",
        "AI platforms",
      ],
      goal: "Create one connected digital ecosystem instead of a collection of isolated tools.",
      icon: "integrations",
    },
    {
      id: "data-intelligence",
      number: "05",
      title: "Data & Operational Intelligence",
      description:
        "We turn business data into systems that people can actually use.",
      capabilities: [
        "Real-time dashboards",
        "Business analytics",
        "Operational reporting",
        "Automated reports",
        "Performance monitoring",
        "Data pipelines",
        "Centralized business data",
      ],
      goal: "Give businesses visibility into what is happening, why it is happening, and where action is required.",
      icon: "data",
    },
  ],
} as const satisfies ServicesContent;

export function getServicesContent(): ServicesContent {
  return servicesContent;
}
