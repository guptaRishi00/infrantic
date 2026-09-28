import type {
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
  StackShowcaseContent,
  StatsContent,
} from "@/features/marketing/page-blocks";

const hero = {
  eyebrow: "About Infrantic",
  title: "We simplify the machinery behind modern businesses",
  description:
    "Infrantic builds AI-powered automation, custom software, and connected business systems. One team, from the first conversation to the support that follows launch.",
  primaryCta: { label: "Book a discovery call", href: "/#contact" },
  secondaryCta: { label: "Work with us", href: "/careers" },
  stats: [
    { value: "1", label: "Team from discovery to support" },
    { value: "5", label: "Disciplines under one roof" },
    { value: "10", label: "Industries we build for" },
  ],
  visual: {
    kind: "orbit",
    label:
      "Infrantic at the centre, with strategy, support, automation, software, AI, data, and the tools we use on rings around it.",
    chips: [
      {
        label: "Strategy",
        ring: 0,
        angle: -90,
        icon: "compass",
      },
      {
        label: "Support",
        ring: 0,
        angle: 90,
        icon: "wrench",
      },
      {
        label: "Automation",
        ring: 1,
        angle: 0,
        logo: "n8n",
      },
      {
        label: "Software",
        ring: 1,
        angle: 180,
        logo: "nextjs",
      },
      {
        label: "AI",
        ring: 1,
        angle: -45,
        logo: "openai",
      },
      {
        label: "Data",
        ring: 1,
        angle: 135,
        logo: "supabase",
      },
      {
        label: "Claude",
        ring: 2,
        angle: -60,
        logo: "claude",
      },
      {
        label: "Make",
        ring: 2,
        angle: 60,
        logo: "make",
      },
      {
        label: "Python",
        ring: 2,
        angle: 120,
        logo: "python",
      },
      {
        label: "Postgres",
        ring: 2,
        angle: -120,
        logo: "postgresql",
      },
    ],
  },
} as const satisfies PageHeroContent;

const story = {
  id: "story",
  eyebrow: "Why we exist",
  title: "Businesses don't lack tools. They lack connection.",
  description:
    "Every company we meet already has software: a CRM, an ERP, accounting, spreadsheets, messaging. The work still stalls between them. Infrantic exists to connect that machinery so people can spend their time on the business, not on moving information around it.",
  points: [
    "Operations first: we start from how the work runs, not from a product",
    "AI as a controlled assistant, with people keeping the decisions",
    "Systems built in your accounts, documented, and yours to keep",
  ],
  panel: {
    label: "In short",
    items: [
      {
        term: "What we do",
        detail:
          "AI automation, business process automation, custom software, integrations, and operational intelligence.",
      },
      {
        term: "Who it's for",
        detail: "Businesses where operational complexity is slowing growth.",
      },
      {
        term: "How we work",
        detail:
          "Discover, design, build, automate, improve. One workflow at a time.",
      },
      {
        term: "What we promise",
        detail: "Measurable operational change, not AI for its own sake.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const beliefs = {
  id: "beliefs",
  eyebrow: "What we believe",
  title: "The principles behind every system we build",
  tone: "dark",
  items: [
    {
      id: "outcomes",
      icon: "target",
      title: "Outcomes over hype",
      description:
        "A system is good when the team works differently afterwards. Everything else is a demo.",
    },
    {
      id: "control",
      icon: "shield",
      title: "People stay in control",
      description:
        "Automation removes repetition, not judgement. Approvals and decisions keep a name next to them.",
    },
    {
      id: "simple",
      icon: "ruler",
      title: "Simple beats clever",
      description:
        "The right amount of technology is the least that solves the problem reliably.",
    },
    {
      id: "yours",
      icon: "handshake",
      title: "It stays yours",
      description:
        "Your accounts, your data, your code. No dependency on us to keep the lights on.",
    },
    {
      id: "honest",
      icon: "scale",
      title: "Honest scoping",
      description:
        "We say when something should not be automated, and when a spreadsheet is still the right tool.",
    },
    {
      id: "long-term",
      icon: "trend",
      title: "Built to be extended",
      description:
        "Each workflow joins one operating structure, so the business grows into a system instead of a pile of tools.",
    },
  ],
} as const satisfies FeatureGridContent;

const different = {
  id: "different",
  eyebrow: "How we're different",
  title: "Why teams choose to work with us",
  items: [
    {
      id: "founder",
      icon: "users",
      title: "Senior people on the work",
      description:
        "The people who scope your system are the people who build it. No hand-off to a separate delivery team.",
    },
    {
      id: "ops",
      icon: "compass",
      title: "Operations, not just software",
      description:
        "We map the process before we write code, and we measure the operational result after.",
    },
    {
      id: "stack",
      icon: "plug",
      title: "Your stack, extended",
      description:
        "We connect the CRM, ERP, sheets, and messaging you already use. Replacement is the last resort.",
    },
    {
      id: "ai",
      icon: "brain",
      title: "Practical AI",
      description:
        "Document reading, classification, drafting, and flagging: AI where it saves real hours, with review built in.",
    },
    {
      id: "docs",
      icon: "clipboard",
      title: "Documentation as standard",
      description:
        "Every flow is written down and taught, so the system survives staff changes on both sides.",
    },
    {
      id: "partner",
      icon: "wrench",
      title: "Around after launch",
      description:
        "Monitoring, support, and the next workflow. Most of our work is with clients we already know.",
    },
  ],
} as const satisfies FeatureGridContent;

const team = {
  id: "team",
  eyebrow: "The team",
  title: "Five disciplines, one conversation",
  description:
    "Strategy, automation, software, AI, and support sit in the same team, so a workflow is designed and built by people who talk to each other every day.",
  tone: "dark",
  reverse: true,
  cta: { label: "Join the team", href: "/careers" },
  panel: {
    label: "Disciplines",
    items: [
      {
        term: "Strategy & process",
        detail: "Mapping how the work runs and deciding what to build first.",
      },
      {
        term: "Automation",
        detail:
          "Workflows, triggers, approvals, and integrations across your tools.",
      },
      {
        term: "Software",
        detail: "Internal tools, portals, dashboards, and custom applications.",
      },
      {
        term: "AI & data",
        detail:
          "Document intelligence, agents, reporting, and the data behind them.",
      },
      {
        term: "Support",
        detail: "Monitoring, refinement, training, and the next workflow.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const numbers = {
  id: "at-a-glance",
  eyebrow: "At a glance",
  title: "Infrantic in numbers",
  stats: [
    { value: "5", label: "Service lines, combined per project" },
    { value: "5", label: "Delivery stages with defined outputs" },
    { value: "10", label: "Industries we build for" },
    { value: "1", label: "Shared operating structure per client" },
  ],
} as const satisfies StatsContent;

const stack = {
  id: "technology",
  eyebrow: "Our technology",
  title: "Modern engineering, chosen per problem",
  description:
    "We are not tied to a vendor. These are the tools we trust most, grouped by what they do for your business.",
  groups: [
    {
      label: "Intelligence",
      items: [
        { name: "OpenAI", logo: "openai" },
        { name: "Claude", logo: "claude" },
        { name: "Gemini", logo: "gemini" },
        { name: "Agents and retrieval" },
      ],
    },
    {
      label: "Automation",
      items: [
        { name: "n8n", logo: "n8n" },
        { name: "Make", logo: "make" },
        { name: "Zapier", logo: "zapier" },
      ],
    },
    {
      label: "Engineering",
      items: [
        { name: "Next.js", logo: "nextjs" },
        { name: "Python", logo: "python" },
        { name: "GitHub", logo: "github" },
        { name: "Vercel", logo: "vercel" },
      ],
    },
    {
      label: "Data",
      items: [
        { name: "Supabase", logo: "supabase" },
        { name: "PostgreSQL", logo: "postgresql" },
        { name: "Google Sheets", logo: "googleSheets" },
        { name: "Business APIs" },
      ],
    },
  ],
  footnote: "Technology follows the workflow, never the other way round.",
} as const satisfies StackShowcaseContent;

const aboutContent = {
  hero,
  story,
  beliefs,
  different,
  team,
  stack,
  numbers,
} as const;

export function getAboutContent() {
  return aboutContent;
}
