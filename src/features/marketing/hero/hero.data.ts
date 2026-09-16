import type { HeroContent } from "./hero.types";

const heroContent = {
  ratings: [
    { source: "google", label: "Google", score: 4.6 },
    { source: "trustpilot", label: "Trustpilot", score: 4.9 },
  ],
  title: "AI-powered tools to stay organized",
  subtitle:
    "From small tasks to complex projects, manage everything in one place and keep your team moving forward.",
  primaryCta: { label: "Get started free", href: "/sign-up" },
  secondaryCta: { label: "Talk to sales team", href: "/contact" },
  integrations: [
    { id: "slack", label: "Slack", x: -374, y: -318 },
    { id: "pinwheel", label: "Workspace", x: -504, y: -160 },
    { id: "meta", label: "Meta", x: -325, y: -64 },
    { id: "mailchimp", label: "Mailchimp", x: -560, y: 20 },
    { id: "googleAds", label: "Google Ads", x: -312, y: 143 },
    { id: "zapier", label: "Zapier", x: 373, y: -318 },
    { id: "aws", label: "AWS", x: 503, y: -160 },
    { id: "stackedBars", label: "Forms", x: 328, y: -65 },
    { id: "clickup", label: "ClickUp", x: 564, y: 20 },
    { id: "airtable", label: "Airtable", x: 415, y: 150 },
  ],
  activity: [
    {
      kind: "joined",
      id: "activity-wei",
      person: {
        name: "Wei Chen",
        initials: "WC",
        tone: "from-amber-200 to-orange-300 text-orange-900",
      },
      target: "Final Presentation",
      meta: ["8 min ago", "Orixcreative Dribbble"],
    },
    {
      kind: "profile",
      id: "activity-matthew",
      person: {
        name: "Matthew Johnson",
        initials: "MJ",
        tone: "from-sky-200 to-indigo-300 text-indigo-900",
      },
      role: "Content Writer",
      handle: "@orixcreative",
    },
    {
      kind: "email",
      id: "activity-terry",
      sender: "Terry Lipshutz",
      summary: "Approved the design of the iOS app for launch",
    },
  ],
  trustedBy: {
    label: "Trusted by 200,000+ users worldwide",
    companies: [
      { id: "google", name: "Google" },
      { id: "airbnb", name: "Airbnb" },
      { id: "coinbase", name: "Coinbase" },
      { id: "notion", name: "Notion" },
      { id: "gumroad", name: "Gumroad" },
      { id: "paypal", name: "PayPal" },
      { id: "upwork", name: "Upwork" },
      { id: "shopify", name: "Shopify" },
      { id: "stripe", name: "Stripe" },
      { id: "zoom", name: "Zoom" },
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
