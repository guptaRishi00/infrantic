import type {
  BlockIcon,
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
  StepsContent,
} from "@/features/marketing/page-blocks";

export type CaseListContent = {
  eyebrow: string;
  title: string;
  description: string;
  toolsLabel: string;
  challengeLabel: string;
  approachLabel: string;
  resultsLabel: string;
  cases: readonly {
    id: string;
    number: string;
    sector: string;
    title: string;
    summary: string;
    tools: readonly string[];
    challenge: string;
    approach: readonly string[];
    results: readonly string[];
  }[];
};

export type FeaturedCaseContent = {
  eyebrow: string;
  title: string;
  description: string;
  facts: readonly { label: string; value: string }[];
  flowLabel: string;
  hub: string;
  stages: readonly {
    id: string;
    icon: BlockIcon;
    label: string;
    detail: string;
  }[];
  before: { label: string; items: readonly string[] };
  after: { label: string; items: readonly string[] };
};

const hero = {
  eyebrow: "Case studies",
  title: "Real operational problems, working systems",
  description:
    "The problems clients brought us, the structure we put around them, and what changed for the team. Details are simplified to protect client specifics.",
  primaryCta: { label: "Discuss a similar project", href: "/#contact" },
  secondaryCta: { label: "See our process", href: "/process" },
  stats: [
    { value: "3", label: "Detailed case studies" },
    { value: "1", label: "Featured end-to-end project" },
    { value: "6", label: "Operational gaps they close" },
  ],
  visual: {
    kind: "flow",
    label:
      "A procurement flow: a stock form triggers an AI agent, which sends an approval and a supplier RFQ, and both lead to a raised purchase order.",
    nodes: [
      {
        id: "form",
        x: 12,
        y: 50,
        label: "Stock form",
        icon: "clipboard",
      },
      {
        id: "ai",
        x: 34,
        y: 50,
        label: "AI agent",
        logo: "openai",
      },
      {
        id: "approval",
        x: 58,
        y: 28,
        label: "Approval",
        icon: "messages",
      },
      {
        id: "rfq",
        x: 58,
        y: 74,
        label: "Supplier RFQ",
        icon: "handshake",
      },
      {
        id: "po",
        x: 86,
        y: 50,
        label: "PO raised",
        icon: "check",
      },
    ],
    wires: [
      {
        from: [12, 50],
        to: [34, 50],
        delay: 0,
      },
      {
        from: [34, 50],
        to: [46, 50],
        delay: 0.6,
      },
      {
        from: [46, 50],
        to: [46, 28],
        delay: 1.0,
      },
      {
        from: [46, 28],
        to: [58, 28],
        delay: 1.3,
      },
      {
        from: [46, 50],
        to: [46, 74],
        delay: 1.0,
      },
      {
        from: [46, 74],
        to: [58, 74],
        delay: 1.3,
      },
      {
        from: [58, 28],
        to: [72, 28],
        delay: 1.8,
      },
      {
        from: [72, 28],
        to: [72, 50],
        delay: 2.1,
      },
      {
        from: [58, 74],
        to: [72, 74],
        delay: 1.8,
      },
      {
        from: [72, 74],
        to: [72, 50],
        delay: 2.1,
      },
      {
        from: [72, 50],
        to: [86, 50],
        delay: 2.5,
      },
    ],
  },
} as const satisfies PageHeroContent;

const patterns = {
  id: "patterns",
  eyebrow: "Patterns that repeat",
  title: "Different clients, the same building blocks",
  description:
    "Most of our systems are combinations of a few proven patterns. Recognising yours is usually the first step.",
  items: [
    {
      id: "trigger",
      icon: "bot",
      title: "Trigger, decide, act",
      description:
        "An event in one system (a low stock level, a new form) starts a flow that gathers context, applies rules or AI, and acts in another system.",
      tags: ["Procurement", "Alerts"],
    },
    {
      id: "shared-id",
      icon: "network",
      title: "One shared record",
      description:
        "A single internal ID follows an order or request through every stage, so departments update one thing instead of reconciling many.",
      tags: ["Garment orders", "Order tracking"],
    },
    {
      id: "first-pass",
      icon: "fileSearch",
      title: "AI first pass, human final say",
      description:
        "AI does the repetitive first read of documents and flags likely issues. A person reviews and decides.",
      tags: ["Document review", "Proofreading"],
    },
    {
      id: "roles",
      icon: "users",
      title: "Role-based ownership",
      description:
        "Executor, checker, and approver roles with rework loops, so every step has a name next to it.",
      tags: ["Task management"],
    },
    {
      id: "exceptions",
      icon: "alert",
      title: "Exceptions, not everything",
      description:
        "People are notified about what needs attention, not every update. Overdue and at-risk work surfaces itself.",
      tags: ["Overdue alerts", "Risk visibility"],
    },
    {
      id: "one-view",
      icon: "dashboard",
      title: "One view of the work",
      description:
        "A dashboard built from live data replaces the weekly report that used to be assembled by hand.",
      tags: ["Reporting", "Dashboards"],
    },
  ],
} as const satisfies FeatureGridContent;

const build = {
  id: "how-built",
  eyebrow: "Behind each case",
  title: "How these systems came together",
  tone: "dark",
  steps: [
    {
      number: "01",
      title: "Map the current workflow",
      description:
        "Who does what, in which tool, and where the work waits. The map usually shows the first system to build.",
      outputs: ["Process map", "Gap list"],
    },
    {
      number: "02",
      title: "Design the structure",
      description:
        "Decide what triggers the flow, where people approve, what the shared record looks like, and which tools stay.",
      outputs: ["Flow design", "Data model", "Checkpoints"],
    },
    {
      number: "03",
      title: "Build and connect",
      description:
        "Automations, integrations, and any custom screens, built in the client's own accounts.",
      outputs: ["Working system", "Integrations", "Documentation"],
    },
    {
      number: "04",
      title: "Run it with the team",
      description:
        "The people who own the workflow run it with us for the first cycles, and we refine based on what they hit.",
      outputs: ["Training", "Refinements", "Handover"],
    },
  ],
} as const satisfies StepsContent;

const outcomes = {
  id: "outcomes",
  eyebrow: "Outcomes",
  title: "What we measure after launch",
  description:
    "We judge a system by the operational change it produces, not by how much it automates.",
  points: [
    "Time from trigger to action, before and after",
    "How often a step needed manual chasing",
    "Errors caught before they reached a customer or supplier",
    "Hours the team gets back each week",
  ],
  cta: { label: "Talk about your outcomes", href: "/#contact" },
  panel: {
    label: "Signals we track",
    items: [
      {
        term: "Cycle time",
        detail: "How long an order, approval, or request takes end to end.",
      },
      {
        term: "Touches",
        detail: "How many people handle the same piece of information.",
      },
      {
        term: "Exceptions",
        detail: "How early problems become visible, and to whom.",
      },
      {
        term: "Adoption",
        detail:
          "Whether the team actually uses the system without being reminded.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const cases = {
  eyebrow: "Case studies",
  title: "Three systems, in detail",
  description:
    "Each one started as a familiar operational problem. Here is what we built and what changed for the team.",
  toolsLabel: "Built with",
  challengeLabel: "Challenge",
  approachLabel: "What we built",
  resultsLabel: "What changed",
  cases: [
    {
      id: "procurement",
      number: "01",
      sector: "Manufacturing and supply",
      title: "Inventory and procurement automation",
      summary:
        "Stock levels, supplier requests, approvals, and purchase orders connected into one flow.",
      tools: ["n8n", "OpenAI", "Supabase", "Slack", "Gmail", "Jira"],
      challenge:
        "Low-stock alerts, supplier selection, approvals, and purchasing were handled by hand across several people and tools, so reorders ran late and were hard to trace.",
      approach: [
        "A stock form and sheet feed one trigger",
        "An AI agent checks history and drafts the RFQ",
        "Approvals go to Slack with the context attached",
        "Approved requests raise the PO and update stock",
      ],
      results: [
        "Reorders start when stock runs low, not when someone notices",
        "A complete trail of who approved what",
        "Far less copying between sheets, email, and chat",
      ],
    },
    {
      id: "proofreader",
      number: "02",
      sector: "Engineering services",
      title: "AI technical document proofreader",
      summary:
        "A controlled first-pass review for technical PDFs and scanned files.",
      tools: ["Gemini", "Python", "Next.js", "Supabase"],
      challenge:
        "Senior reviewers checked the same predictable issues across long PDFs and scans, which made reviews slow and inconsistent.",
      approach: [
        "PDFs and scans are uploaded into a review workspace",
        "AI runs a first pass against an approved terminology list",
        "Likely issues are highlighted for the reviewer",
        "The reviewer accepts, edits, or dismisses each flag",
      ],
      results: [
        "Every document gets the same structured first pass",
        "Reviewers spend their time on judgement, not repetition",
        "Terminology stays consistent across documents",
      ],
    },
    {
      id: "tasks",
      number: "03",
      sector: "Professional services",
      title: "Role-based task management",
      summary:
        "Executor, checker, and approver workflows with rework loops and overdue visibility.",
      tools: ["Next.js", "PostgreSQL", "Supabase", "Email alerts"],
      challenge:
        "Nobody clearly owned each step between the people doing, checking, and approving the work, so tasks stalled and rework went unrecorded.",
      approach: [
        "Roles defined for executor, checker, and approver",
        "Each task moves through explicit review stages",
        "Rejections loop back with a reason attached",
        "Overdue work and workload visible on one board",
      ],
      results: [
        "A named owner at every stage",
        "Consistent review steps across the team",
        "A full history of rejections and rework",
      ],
    },
  ],
} as const satisfies CaseListContent;

const featured = {
  eyebrow: "Featured project",
  title: "One order ID, from costing to dispatch and payment",
  description:
    "An apparel business ran every stage of an order in a different file with a different owner. We rebuilt it around one shared record.",
  facts: [
    { label: "Sector", value: "Apparel manufacturing" },
    {
      label: "Scope",
      value: "Every stage from costing to payment, plus reporting",
    },
    { label: "Structure", value: "One internal order ID shared by every team" },
  ],
  flowLabel: "Connected stages",
  hub: "Shared internal order ID",
  stages: [
    {
      id: "order",
      icon: "sheet",
      label: "Order master",
      detail: "Created once; every team reads from it",
    },
    {
      id: "costing",
      icon: "finance",
      label: "Costing and approvals",
      detail: "Costs signed off before production",
    },
    {
      id: "procurement",
      icon: "boxes",
      label: "Procurement",
      detail: "Materials ordered and tracked",
    },
    {
      id: "readiness",
      icon: "clipboard",
      label: "Pre-production",
      detail: "Samples and readiness checked",
    },
    {
      id: "production",
      icon: "factory",
      label: "Production",
      detail: "Floor updates against the order",
    },
    {
      id: "dispatch",
      icon: "truck",
      label: "Dispatch, GRN, payment",
      detail: "Delivery, receipt, and payment closed out",
    },
  ],
  before: {
    label: "Before",
    items: [
      "Each stage kept in its own spreadsheet",
      "Status gathered by calling each owner",
      "Delays found after delivery dates slipped",
      "Month-end reports built by hand",
    ],
  },
  after: {
    label: "After",
    items: [
      "Every team updates the same order record",
      "Status visible without asking",
      "Delivery risks flagged while there is time to act",
      "Reports produced from live data",
    ],
  },
} as const satisfies FeaturedCaseContent;

const caseStudiesContent = {
  hero,
  cases,
  featured,
  patterns,
  build,
  outcomes,
} as const;

export function getCaseStudiesContent() {
  return caseStudiesContent;
}
