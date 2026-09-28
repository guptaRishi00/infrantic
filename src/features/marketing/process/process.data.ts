import type { FaqContent } from "@/features/marketing/faq";
import type {
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
  StepsContent,
} from "@/features/marketing/page-blocks";

export type EngagementTimelineContent = {
  eyebrow: string;
  title: string;
  description: string;
  seeLabel: string;
  timeLabel: string;
  phases: readonly {
    id: string;
    label: string;
    title: string;
    description: string;
    see: string;
    time: string;
  }[];
};

const hero = {
  eyebrow: "Process",
  title: "Discover, design, build, automate, improve",
  description:
    "A steady, visible way of working. You always know which stage we are in, what it produces, and what we need from you to keep moving.",
  primaryCta: { label: "Book a discovery call", href: "/#contact" },
  secondaryCta: { label: "See what we build", href: "/services" },
  stats: [
    { value: "5", label: "Stages, each with a clear output" },
    { value: "1", label: "Focused first release" },
    { value: "Ongoing", label: "Support and improvement after launch" },
  ],
  visual: {
    kind: "flow",
    label:
      "Five stages in a row, discover, design, build, automate, and improve, with a loop from improve back to discover for the next workflow.",
    nodes: [
      {
        id: "discover",
        x: 12,
        y: 48,
        label: "Discover",
        icon: "compass",
      },
      {
        id: "design",
        x: 31,
        y: 48,
        label: "Design",
        icon: "ruler",
      },
      {
        id: "build",
        x: 50,
        y: 48,
        label: "Build",
        icon: "code",
      },
      {
        id: "automate",
        x: 69,
        y: 48,
        label: "Automate",
        icon: "bot",
      },
      {
        id: "improve",
        x: 88,
        y: 48,
        label: "Improve",
        icon: "trend",
      },
      {
        id: "next",
        x: 50,
        y: 18,
        label: "Next workflow",
        icon: "sparkles",
      },
    ],
    wires: [
      {
        from: [12, 48],
        to: [31, 48],
        delay: 0,
      },
      {
        from: [31, 48],
        to: [50, 48],
        delay: 0.6,
      },
      {
        from: [50, 48],
        to: [69, 48],
        delay: 1.2,
      },
      {
        from: [69, 48],
        to: [88, 48],
        delay: 1.8,
      },
      {
        from: [88, 48],
        to: [88, 18],
        delay: 2.4,
      },
      {
        from: [88, 18],
        to: [12, 18],
        delay: 2.8,
      },
      {
        from: [12, 18],
        to: [12, 48],
        delay: 3.2,
      },
    ],
  },
} as const satisfies PageHeroContent;

const stages = {
  id: "stages",
  eyebrow: "Stage by stage",
  title: "What each stage produces",
  description:
    "Nothing here is a black box. Every stage ends with something you can read, test, or use.",
  steps: [
    {
      number: "01",
      title: "Discover",
      description:
        "We learn how the business operates today: the processes, the people, the tools, the bottlenecks, and the data. Mostly by listening and watching the work happen.",
      outputs: ["Process map", "Tools inventory", "Bottleneck list"],
    },
    {
      number: "02",
      title: "Design",
      description:
        "We identify where automation and software create measurable improvement, and design the system around the actual requirements rather than a template.",
      outputs: ["Flow design", "Architecture", "Roadmap with priorities"],
    },
    {
      number: "03",
      title: "Build",
      description:
        "We develop the software, integrations, dashboards, and AI capabilities the design calls for, in accounts you own, with reviews along the way.",
      outputs: ["Working system", "Integrations", "Documentation"],
    },
    {
      number: "04",
      title: "Automate",
      description:
        "Triggers, extraction, approvals, and notifications go live, with human checkpoints wherever a decision matters.",
      outputs: ["Live automations", "Alerts", "Training"],
    },
    {
      number: "05",
      title: "Improve",
      description:
        "We watch the system run with your team, fix what they hit, and extend it to the next workflow as the business changes.",
      outputs: ["Monitoring", "Refinements", "Next-workflow plan"],
    },
  ],
} as const satisfies StepsContent;

const yourSide = {
  id: "your-side",
  eyebrow: "Working together",
  title: "What we need from you",
  description:
    "Less than you might expect, but the few things we do need matter. The best systems come from teams that stay involved.",
  tone: "dark",
  points: [
    "One person who owns the workflow and can make decisions",
    "Access to the tools and accounts the workflow touches",
    "Time from the people who do the work, for mapping and testing",
    "Honest feedback in the first cycles after launch",
  ],
  panel: {
    label: "Your side of the work",
    items: [
      {
        term: "Workflow owner",
        detail: "Answers questions, approves designs, and tests releases.",
      },
      {
        term: "Access",
        detail: "Admin or API access to the systems involved, in your name.",
      },
      {
        term: "Examples",
        detail: "Real orders, documents, and edge cases we can design against.",
      },
      {
        term: "A pilot group",
        detail:
          "A few people who run the first version and tell us what breaks.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const principles = {
  id: "principles",
  eyebrow: "Principles",
  title: "How we make decisions during delivery",
  items: [
    {
      id: "workflow-first",
      icon: "compass",
      title: "Workflow before technology",
      description:
        "We choose tools after we understand the work, never the other way round.",
    },
    {
      id: "small",
      icon: "target",
      title: "Small releases",
      description:
        "One workflow at a time, live and used, before the next one starts.",
    },
    {
      id: "control",
      icon: "shield",
      title: "People keep control",
      description:
        "Automation does the routing and the paperwork. Decisions stay with named people.",
    },
    {
      id: "existing",
      icon: "plug",
      title: "Build on what you have",
      description:
        "We connect existing tools first and add custom software only where a workflow needs it.",
    },
    {
      id: "visible",
      icon: "eye",
      title: "Visible progress",
      description:
        "You see the process map, the design, and the working system at each stage.",
    },
    {
      id: "measured",
      icon: "chart",
      title: "Measured outcomes",
      description: "We agree what should change, then check whether it did.",
    },
  ],
} as const satisfies FeatureGridContent;

const afterLaunch = {
  id: "after-launch",
  eyebrow: "Improve",
  title: "Launch is the start of the loop",
  description:
    "The first weeks in production show what the map could not. That is when the system settles into the way the team actually works.",
  reverse: true,
  points: [
    "Monitoring on every automation, with alerts when something fails",
    "A regular review of exceptions and manual workarounds",
    "Small refinements shipped as the team asks for them",
    "A plan for the next workflow to connect",
  ],
  cta: { label: "Ask about ongoing support", href: "/#contact" },
  panel: {
    label: "Ongoing",
    items: [
      {
        term: "Monitoring",
        detail: "Failures and exceptions surface immediately.",
      },
      {
        term: "Support",
        detail: "Fixes and adjustments as tools, people, and processes change.",
      },
      {
        term: "Extension",
        detail: "Connecting the next workflow to the same operating structure.",
      },
      {
        term: "Handover",
        detail:
          "Documentation and training so your team can run and change it.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const engagement = {
  eyebrow: "A first engagement",
  title: "What working together looks like",
  description:
    "Every project is different, but a first engagement usually runs through these six phases.",
  seeLabel: "You'll see",
  timeLabel: "Your time",
  phases: [
    {
      id: "kickoff",
      label: "Phase 1",
      title: "Kick-off",
      description:
        "We agree the workflow to focus on, who owns it, and what should change.",
      see: "A one-page brief",
      time: "One call",
    },
    {
      id: "mapping",
      label: "Phase 2",
      title: "Mapping sessions",
      description:
        "We sit with the people who do the work and map how it really runs.",
      see: "A process map and gap list",
      time: "A few short sessions",
    },
    {
      id: "design",
      label: "Phase 3",
      title: "Design review",
      description:
        "We walk you through the proposed flow, checkpoints, and data before building.",
      see: "A flow design to approve",
      time: "One review",
    },
    {
      id: "build",
      label: "Phase 4",
      title: "Build and test",
      description:
        "We build in your accounts and test against real examples and edge cases.",
      see: "Working previews",
      time: "Occasional feedback",
    },
    {
      id: "pilot",
      label: "Phase 5",
      title: "Pilot",
      description:
        "A small group runs the system on live work while we watch and adjust.",
      see: "The system on real work",
      time: "Input from a pilot group",
    },
    {
      id: "handover",
      label: "Phase 6",
      title: "Handover and support",
      description:
        "Documentation, training, and monitoring, then we plan the next workflow.",
      see: "Docs, training, monitoring",
      time: "A training session",
    },
  ],
} as const satisfies EngagementTimelineContent;

const faq = {
  eyebrow: "Questions",
  title: "About the process",
  description:
    "Don't see yours here? Book a discovery call and ask us directly.",
  items: [
    {
      id: "q1",
      question: "How much of our team's time will this take?",
      answer:
        "Mostly a workflow owner for decisions and reviews, plus short sessions with the people who do the work. We plan around your calendar.",
    },
    {
      id: "q2",
      question: "Can we change direction mid-project?",
      answer:
        "Yes. Short releases make it cheap to adjust, and if the mapping shows a better first workflow, we say so before building.",
    },
    {
      id: "q3",
      question: "How do you test before going live?",
      answer:
        "Against your real orders, documents, and edge cases, then with a pilot group on live work before the whole team switches over.",
    },
    {
      id: "q4",
      question: "What happens if an automation fails?",
      answer:
        "Every automation is monitored. Failures alert us straight away, and manual paths stay available so work never stops.",
    },
    {
      id: "q5",
      question: "Do we get documentation?",
      answer:
        "Always. Every flow, integration, and checkpoint is written down, and the team is trained to run it.",
    },
  ],
} as const satisfies FaqContent;

const processContent = {
  hero,
  engagement,
  faq,
  stages,
  yourSide,
  principles,
  afterLaunch,
} as const;

export function getProcessContent() {
  return processContent;
}
