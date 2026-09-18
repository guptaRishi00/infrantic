import type { HeroContent } from "./hero.types";

const heroContent = {
  eyebrow: "AI. Automation. Software.",
  // "\n" marks the intended line break (rendered with whitespace-pre-line).
  title: "Business is complex.\nYour systems shouldn't be.",
  subtitle:
    "Infrantic builds AI-powered automation, custom software, and connected business systems that simplify complex operations and help companies scale.",
  primaryCta: { label: "Book a discovery call", href: "/#contact" },
  secondaryCta: { label: "See how we work", href: "/#workflow" },
  // Mirrored left/right pairs: two pairs on ring 0, two on ring 1, one on ring 2.
  // Upper pairs stay at least ~75px clear of the header. Wider rings need wider
  // viewports (see revealClass in orbit-backdrop.tsx).
  integrations: [
    { id: "openai", label: "OpenAI", ring: 0, angle: -147 },
    { id: "claude", label: "Claude", ring: 0, angle: -33 },
    { id: "supabase", label: "Supabase", ring: 0, angle: 172 },
    { id: "postgresql", label: "PostgreSQL", ring: 0, angle: 8 },
    { id: "n8n", label: "n8n", ring: 1, angle: -156 },
    { id: "make", label: "Make", ring: 1, angle: -24 },
    { id: "whatsapp", label: "WhatsApp", ring: 1, angle: 167 },
    { id: "zapier", label: "Zapier", ring: 1, angle: 13 },
    { id: "googleSheets", label: "Google Sheets", ring: 2, angle: -163 },
    { id: "gemini", label: "Gemini", ring: 2, angle: -17 },
  ],
  // Illustrative examples of work running quietly in the background.
  activity: [
    {
      kind: "event",
      id: "activity-invoice",
      person: {
        name: "AI Agent",
        initials: "AI",
        tone: "from-brand-100 to-brand-200 text-ink",
      },
      action: "processed",
      target: "Invoice #1042",
      meta: ["2 min ago", "Synced to ERP"],
    },
    {
      kind: "profile",
      id: "activity-approval",
      person: {
        name: "Priya Shah",
        initials: "PS",
        tone: "from-ink-700 to-ink text-white",
      },
      role: "Approval needed",
      handle: "Purchase order #418",
    },
    {
      kind: "email",
      id: "activity-report",
      sender: "Weekly operations report",
      summary: "Generated and sent to 12 stakeholders",
    },
  ],
  industries: {
    label:
      "Built for businesses where operational complexity is slowing growth",
    items: [
      { id: "manufacturing", name: "Manufacturing" },
      { id: "apparel", name: "Apparel & Fashion" },
      { id: "logistics", name: "Logistics & Supply Chain" },
      { id: "professionalServices", name: "Professional Services" },
      { id: "retail", name: "Retail" },
      { id: "finance", name: "Finance & Accounting" },
      { id: "realEstate", name: "Real Estate" },
      { id: "healthcare", name: "Healthcare Operations" },
      { id: "education", name: "Education" },
      { id: "startups", name: "Startups & Growing Businesses" },
    ],
  },
} as const satisfies HeroContent;

/**
 * Single read path for hero content. Static today; swap the body for a CMS or
 * database call (and add caching there) without touching any component.
 */
export function getHeroContent(): HeroContent {
  return heroContent;
}
