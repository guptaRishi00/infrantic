import type { CtaContent } from "./cta.types";

const ctaContent = {
  eyebrow: "What is slowing your business down?",
  title: "Let's make your business easier to operate",
  description:
    "Infrantic exists to simplify the machinery behind modern businesses. Tell us where the friction is, and we'll design the system that removes it.",
  commitments: [
    "We find the friction",
    "We design the system",
    "We automate the work",
    "We build the software",
    "We connect everything",
  ],
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  secondaryCta: { label: "Explore our services", href: "/#services" },
  badges: [
    { id: "make", x: 20, y: 72 },
    { id: "googleSheets", x: 32, y: 86 },
    { id: "openai", x: 9, y: 34 },
    { id: "claude", x: 88, y: 30 },
    { id: "n8n", x: 70, y: 86 },
    { id: "whatsapp", x: 82, y: 70 },
  ],
} as const satisfies CtaContent;

export function getCtaContent(): CtaContent {
  return ctaContent;
}
