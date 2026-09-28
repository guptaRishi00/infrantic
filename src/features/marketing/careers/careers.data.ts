import type {
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
  StepsContent,
} from "@/features/marketing/page-blocks";

export type Role = {
  id: string;
  title: string;
  team: string;
  type: string;
  summary: string;
};

const hero = {
  eyebrow: "Careers",
  title: "Build the systems businesses actually run on",
  description:
    "Small team, real client problems, modern tools. If you like turning messy operations into clear, working systems, we would like to hear from you.",
  primaryCta: { label: "Introduce yourself", href: "/contact" },
  secondaryCta: { label: "See what we build", href: "/case-studies" },
  visual: {
    kind: "flow",
    label:
      "Your first workflow: you map it, build it, and ship it, one step after another.",
    nodes: [
      {
        id: "you",
        x: 14,
        y: 78,
        label: "You",
        icon: "users",
      },
      {
        id: "map",
        x: 37,
        y: 62,
        label: "Map it",
        icon: "compass",
      },
      {
        id: "build",
        x: 60,
        y: 46,
        label: "Build it",
        icon: "code",
      },
      {
        id: "ship",
        x: 83,
        y: 30,
        label: "Ship it",
        icon: "rocket",
      },
    ],
    wires: [
      {
        from: [14, 78],
        to: [14, 62],
        delay: 0,
      },
      {
        from: [14, 62],
        to: [37, 62],
        delay: 0.4,
      },
      {
        from: [37, 62],
        to: [37, 46],
        delay: 0.8,
      },
      {
        from: [37, 46],
        to: [60, 46],
        delay: 1.2,
      },
      {
        from: [60, 46],
        to: [60, 30],
        delay: 1.6,
      },
      {
        from: [60, 30],
        to: [83, 30],
        delay: 2.0,
      },
    ],
  },
} as const satisfies PageHeroContent;

const why = {
  id: "why",
  eyebrow: "Why Infrantic",
  title: "Work that ships and gets used",
  description:
    "You will see the whole arc: the workflow as it runs today, the system you build, and the team using it a few weeks later.",
  items: [
    {
      id: "ownership",
      icon: "target",
      title: "Real ownership",
      description:
        "Own a workflow end to end, from mapping to launch to the first support cycles.",
    },
    {
      id: "problems",
      icon: "compass",
      title: "Real problems",
      description:
        "Procurement, approvals, document review, order tracking: work that matters to the people doing it.",
    },
    {
      id: "stack",
      icon: "code",
      title: "A modern stack",
      description:
        "Next.js, TypeScript, Supabase, Postgres, n8n and Make, and the current AI models, chosen per problem.",
    },
    {
      id: "learning",
      icon: "idea",
      title: "Breadth",
      description:
        "Automation, software, AI, and data in one team. You will touch more than one of them.",
    },
    {
      id: "people",
      icon: "users",
      title: "Senior peers",
      description:
        "Work directly with the people who scope and design the systems, not through layers.",
    },
    {
      id: "craft",
      icon: "ruler",
      title: "Room to do it properly",
      description:
        "Documentation, reviews, and monitoring are part of the job, not what gets cut.",
    },
  ],
} as const satisfies FeatureGridContent;

const roles: readonly Role[] = [
  {
    id: "automation-engineer",
    title: "Automation Engineer",
    team: "Automation",
    type: "Full-time",
    summary:
      "Design and build workflows across n8n, Make, and business APIs, with approvals and monitoring built in.",
  },
  {
    id: "fullstack-developer",
    title: "Full-stack Developer",
    team: "Software",
    type: "Full-time",
    summary:
      "Build internal tools, portals, and dashboards in Next.js and TypeScript on Supabase and Postgres.",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    team: "AI & data",
    type: "Full-time",
    summary:
      "Ship document intelligence, agents, and reporting that people trust, with evaluation and review loops.",
  },
  {
    id: "operations-analyst",
    title: "Operations Analyst",
    team: "Strategy & process",
    type: "Full-time",
    summary:
      "Map how client operations run, find the gaps, and shape the first system with the engineering team.",
  },
];

const dayToDay = {
  id: "day-to-day",
  eyebrow: "Day to day",
  title: "How the work runs here",
  description:
    "We work the way we ask our clients to: clear ownership, visible progress, and decisions written down.",
  points: [
    "Small releases, reviewed and documented before they ship",
    "Direct contact with the people who use what you build",
    "Weekly planning, honest retros, no status theatre",
    "Time set aside to learn the tools and models as they change",
  ],
  panel: {
    label: "The basics",
    items: [
      {
        term: "Ownership",
        detail: "One person owns each workflow, with support from the team.",
      },
      {
        term: "Tools",
        detail:
          "Modern stack, your choice of editor, and the AI tooling to go with it.",
      },
      {
        term: "Reviews",
        detail: "Design and code reviews as a habit, not a gate.",
      },
      {
        term: "Growth",
        detail:
          "Breadth across automation, software, and AI, then depth where you want it.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const hiring = {
  id: "hiring",
  eyebrow: "Hiring process",
  title: "Four conversations, no puzzles",
  description:
    "We want to see how you think about real operational problems, not how you perform under trick questions.",
  tone: "dark",
  steps: [
    {
      number: "01",
      title: "Introduction",
      description:
        "A short call about what you have built, what you want to do next, and whether the work here fits.",
    },
    {
      number: "02",
      title: "A real workflow",
      description:
        "We share an anonymised operational problem. You talk us through how you would map and structure it.",
    },
    {
      number: "03",
      title: "Working session",
      description:
        "A paired session on a small, realistic task in your discipline, using the tools you would use on the job.",
    },
    {
      number: "04",
      title: "Offer and onboarding",
      description:
        "A clear offer, then a first month with a named workflow to own and a peer to learn it with.",
    },
  ],
} as const satisfies StepsContent;

const careersContent = {
  hero,
  why,
  rolesEyebrow: "Open roles",
  rolesTitle: "Roles we hire for",
  rolesDescription:
    "We hire when a project needs it, so openings change. If none of these match but the work does, introduce yourself anyway.",
  applyLabel: "Apply",
  introduceCta: { label: "Send an introduction", href: "/contact" },
  roles,
  dayToDay,
  hiring,
} as const;

export function getCareersContent() {
  return careersContent;
}
