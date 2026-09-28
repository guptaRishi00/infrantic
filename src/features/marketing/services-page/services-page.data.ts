import type { FaqContent } from "@/features/marketing/faq";
import type {
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
  StackShowcaseContent,
} from "@/features/marketing/page-blocks";

const hero = {
  eyebrow: "Services",
  title: "Technology built around the way your business operates",
  description:
    "Five service lines, one team. We connect and automate the systems you already run, and build software only where a workflow genuinely needs it.",
  primaryCta: { label: "Book a discovery call", href: "/#contact" },
  secondaryCta: { label: "See case studies", href: "/case-studies" },
  stats: [
    { value: "5", label: "Service lines, combined per project" },
    { value: "1", label: "Team from discovery to support" },
    { value: "Yours", label: "The tools we build around" },
  ],
  visual: {
    kind: "flow",
    label:
      "Five service lines, AI automation, process automation, custom software, integrations, and data, all feed one connected Infrantic system.",
    nodes: [
      {
        id: "ai",
        x: 16,
        y: 26,
        label: "AI automation",
        icon: "bot",
      },
      {
        id: "process",
        x: 16,
        y: 52,
        label: "Process automation",
        icon: "clipboard",
      },
      {
        id: "software",
        x: 16,
        y: 78,
        label: "Custom software",
        icon: "code",
      },
      {
        id: "integrations",
        x: 84,
        y: 34,
        label: "Integrations",
        icon: "plug",
      },
      {
        id: "data",
        x: 84,
        y: 70,
        label: "Data & insight",
        icon: "chart",
      },
      {
        id: "hub",
        x: 50,
        y: 52,
        label: "Your system",
        variant: "hub",
      },
    ],
    wires: [
      {
        from: [16, 26],
        to: [33, 26],
        delay: 0,
      },
      {
        from: [33, 26],
        to: [33, 52],
        delay: 0.4,
      },
      {
        from: [16, 52],
        to: [33, 52],
        delay: 0.2,
      },
      {
        from: [16, 78],
        to: [33, 78],
        delay: 0.3,
      },
      {
        from: [33, 78],
        to: [33, 52],
        delay: 0.7,
      },
      {
        from: [33, 52],
        to: [50, 52],
        delay: 1.1,
      },
      {
        from: [84, 34],
        to: [67, 34],
        delay: 0.5,
      },
      {
        from: [67, 34],
        to: [67, 52],
        delay: 0.9,
      },
      {
        from: [84, 70],
        to: [67, 70],
        delay: 0.6,
      },
      {
        from: [67, 70],
        to: [67, 52],
        delay: 1.0,
      },
      {
        from: [67, 52],
        to: [50, 52],
        delay: 1.3,
      },
    ],
  },
} as const satisfies PageHeroContent;

const engage = {
  id: "engagement",
  eyebrow: "Engagement",
  title: "Start small, then extend",
  description:
    "Most clients begin with one workflow. Once it runs on its own, the next one connects to it. That keeps risk low and results visible.",
  points: [
    "A focused first release, scoped to one workflow",
    "Human checkpoints wherever a decision matters",
    "Clear ownership of code, data, and accounts: they stay yours",
    "Support and refinement after launch, as the business changes",
  ],
  cta: { label: "Discuss where to start", href: "/#contact" },
  panel: {
    label: "Ways to work with us",
    items: [
      {
        term: "First system",
        detail:
          "One workflow, mapped, built, and handed over with documentation and training.",
      },
      {
        term: "Build partner",
        detail:
          "An ongoing engagement that extends the operating structure workflow by workflow.",
      },
      {
        term: "Automation audit",
        detail:
          "A short mapping exercise that shows where time leaks and what to fix first.",
      },
      {
        term: "Support",
        detail:
          "Monitoring, fixes, and improvements for systems we have built.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const included = {
  id: "included",
  eyebrow: "In every project",
  title: "What comes with the work",
  description:
    "Whatever the service line, these are part of the job rather than extras.",
  items: [
    {
      id: "mapping",
      icon: "compass",
      title: "Process mapping first",
      description:
        "We map how the work actually runs before we automate any of it.",
    },
    {
      id: "checkpoints",
      icon: "shield",
      title: "Human checkpoints",
      description:
        "Approvals and judgement calls stay with people. Automation handles the routing and the paperwork.",
    },
    {
      id: "docs",
      icon: "clipboard",
      title: "Documentation",
      description:
        "Every flow and integration is written down, so the system does not depend on who built it.",
    },
    {
      id: "training",
      icon: "users",
      title: "Training for the team",
      description:
        "The people who run the workflow learn how it works and how to change the simple things themselves.",
    },
    {
      id: "monitoring",
      icon: "eye",
      title: "Monitoring and alerts",
      description:
        "Failures and exceptions are visible immediately, not discovered at month-end.",
    },
    {
      id: "ownership",
      icon: "handshake",
      title: "Your accounts, your code",
      description:
        "Systems are built in accounts you own. If we part ways, everything keeps running.",
    },
  ],
} as const satisfies FeatureGridContent;

const focus = {
  id: "focus-areas",
  eyebrow: "Four focus areas",
  title: "Where most projects begin",
  description:
    "Almost every engagement starts in one of these areas, then connects to the others as the system grows.",
  tone: "dark",
  columns: 2,
  items: [
    {
      id: "workflows",
      icon: "network",
      title: "Connected workflows",
      description:
        "Hand-offs between your tools run on their own: data moves, approvals route, and nobody copies it across by hand.",
      tags: ["n8n", "Make", "APIs"],
    },
    {
      id: "tools",
      icon: "dashboard",
      title: "Internal tools and dashboards",
      description:
        "One place for the team to update work, act on it, and see what needs attention today.",
      tags: ["Admin panels", "Portals", "Reports"],
    },
    {
      id: "ai",
      icon: "brain",
      title: "AI on documents and messages",
      description:
        "AI reads, classifies, and drafts from unstructured information, with a person approving anything that matters.",
      tags: ["Extraction", "Classification", "Drafting"],
    },
    {
      id: "software",
      icon: "code",
      title: "Custom software, supported",
      description:
        "Focused applications where off-the-shelf tools don't fit, kept up to date as the business changes.",
      tags: ["Next.js", "Supabase", "Ongoing support"],
    },
  ],
} as const satisfies FeatureGridContent;

const stack = {
  id: "stack",
  eyebrow: "Tools we work with",
  title: "We connect the stack you already run",
  description:
    "Our tool choice follows the problem. These are the ones we reach for most, and the categories we integrate with every week.",
  groups: [
    {
      label: "AI models",
      items: [
        { name: "OpenAI", logo: "openai" },
        { name: "Claude", logo: "claude" },
        { name: "Gemini", logo: "gemini" },
      ],
    },
    {
      label: "Automation",
      items: [
        { name: "n8n", logo: "n8n" },
        { name: "Make", logo: "make" },
        { name: "Zapier", logo: "zapier" },
        { name: "Webhooks and APIs" },
      ],
    },
    {
      label: "Software and data",
      items: [
        { name: "Next.js", logo: "nextjs" },
        { name: "Python", logo: "python" },
        { name: "Supabase", logo: "supabase" },
        { name: "PostgreSQL", logo: "postgresql" },
      ],
    },
    {
      label: "Business systems",
      items: [
        { name: "Google Sheets", logo: "googleSheets" },
        { name: "WhatsApp", logo: "whatsapp" },
        { name: "CRM and ERP" },
        { name: "Accounting" },
      ],
    },
  ],
  footnote:
    "Missing your tool? If it has an API or a reliable export, we can usually work with it.",
} as const satisfies StackShowcaseContent;

const faq = {
  eyebrow: "Questions",
  title: "About working with us",
  description:
    "Don't see yours here? Book a discovery call and ask us directly.",
  items: [
    {
      id: "q1",
      question: "Can we start with just one service line?",
      answer:
        "Yes, and most clients do. A first project usually covers one workflow, which might touch one or two service lines.",
    },
    {
      id: "q2",
      question: "Who owns what you build?",
      answer:
        "You do. Systems are built in your accounts, and the code, data, and documentation stay with you.",
    },
    {
      id: "q3",
      question: "Do you use automation platforms or write custom code?",
      answer:
        "Both, depending on the job. Automation platforms are faster for many workflows; custom code is worth it when you need control, scale, or a proper interface.",
    },
    {
      id: "q4",
      question: "How do you handle AI accuracy?",
      answer:
        "AI steps suggest, extract, or flag, and a person stays in the loop wherever an error would be costly. We test against your real examples before launch.",
    },
    {
      id: "q5",
      question: "What does support look like after launch?",
      answer:
        "Monitoring on every automation, fixes when something changes upstream, and small improvements as the team asks for them.",
    },
  ],
} as const satisfies FaqContent;

const servicesPageContent = {
  hero,
  focus,
  stack,
  faq,
  detailsEyebrow: "Service lines",
  detailsTitle: "What each service line covers",
  detailsDescription:
    "Projects usually combine two or three of these. Pick a starting point and we will scope around it.",
  discussLabel: "Discuss this",
  engage,
  included,
} as const;

export function getServicesPageContent() {
  return servicesPageContent;
}
