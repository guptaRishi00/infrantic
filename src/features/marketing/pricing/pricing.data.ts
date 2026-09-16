import type { PricingContent } from "./pricing.types";

const pricingContent = {
  title: "Simple, transparent pricing",
  description: "Start free, then upgrade when your team is ready to scale.",
  unitLabel: "/user/month",
  periodLabels: { monthly: "Monthly", yearly: "Yearly" },
  yearlyNote: "Save 20%",
  plans: [
    {
      id: "solo",
      name: "Solo",
      description: "For individual creators and freelancers.",
      price: { monthly: 7, yearly: 5 },
      features: [
        "Up to 3 projects",
        "Basic task management",
        "Time tracking",
        "Email support",
        "1 GB storage",
      ],
      cta: { label: "Get Started", href: "/sign-up?plan=solo" },
    },
    {
      id: "team",
      name: "Team",
      description: "For small to medium creative teams.",
      price: { monthly: 15, yearly: 12 },
      features: [
        "Unlimited projects",
        "Advanced reviews & annotations",
        "Full time tracking",
        "Integrations (Figma, Slack, GitHub)",
        "Team analytics",
        "Priority support",
        "25 GB storage",
      ],
      cta: { label: "Get Started", href: "/sign-up?plan=team" },
      featured: true,
    },
    {
      id: "studio",
      name: "Studio",
      description: "For agencies and larger teams.",
      price: { monthly: 31, yearly: 25 },
      features: [
        "Everything in Team",
        "White-label options",
        "Custom workflows",
        "Advanced analytics",
        "Dedicated account manager",
        "SSO & SAML",
        "Unlimited storage",
      ],
      cta: { label: "Get Started", href: "/sign-up?plan=studio" },
    },
  ],
} as const satisfies PricingContent;

export function getPricingContent(): PricingContent {
  return pricingContent;
}
