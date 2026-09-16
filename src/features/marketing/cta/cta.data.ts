import type { CtaContent } from "./cta.types";

const ctaContent = {
  socialProof: {
    value: "200K+",
    label: "happy creators",
    people: [
      {
        name: "Ava Rossi",
        initials: "AR",
        tone: "from-amber-200 to-orange-300 text-orange-900",
      },
      {
        name: "Noah Kim",
        initials: "NK",
        tone: "from-sky-200 to-indigo-300 text-indigo-900",
      },
      {
        name: "Mia Chen",
        initials: "MC",
        tone: "from-rose-200 to-pink-300 text-rose-900",
      },
    ],
  },
  title: "Create better, faster, and together",
  description:
    "The modern project management tool designed for designers, developers, and makers. Streamline your creative workflow from concept to launch.",
  primaryCta: { label: "Get Started", href: "/sign-up" },
  secondaryCta: { label: "See Demo", href: "/demo" },
  badges: [
    { id: "mailchimp", x: 20, y: 72 },
    { id: "pinwheel", x: 32, y: 86 },
    { id: "slack", x: 9, y: 34 },
    { id: "meta", x: 88, y: 30 },
    { id: "clickup", x: 70, y: 86 },
    { id: "zapier", x: 82, y: 70 },
  ],
} as const satisfies CtaContent;

export function getCtaContent(): CtaContent {
  return ctaContent;
}
