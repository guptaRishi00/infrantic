import type { FaqContent } from "@/features/marketing/faq";
import type {
  BeforeAfterContent,
  BlockIcon,
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
  StepsContent,
} from "@/features/marketing/page-blocks";

export type GapRowsContent = {
  eyebrow: string;
  title: string;
  description: string;
  todayLabel: string;
  changeLabel: string;
  gaps: readonly {
    id: string;
    icon: BlockIcon;
    title: string;
    today: string;
    change: string;
    /** The product on /products that closes this gap (card anchor). */
    product: { name: string; href: string };
  }[];
};

const hero = {
  eyebrow: "Challenges",
  title: "Where growing businesses lose time",
  description:
    "Operational drag is rarely one broken tool. It is the work between people, files, and systems: chasing updates, rebuilding reports, approving by email. Here is where we see it, and what it costs.",
  primaryCta: { label: "Book a call", href: "/contact" },
  secondaryCta: { label: "See the products that fix these", href: "/products" },
  stats: [
    { value: "6", label: "Recurring operational gaps we fix" },
    { value: "1", label: "Shared source of truth per workflow" },
    { value: "0", label: "Tools you have to throw away first" },
  ],
  visual: {
    kind: "flow",
    label:
      "Spreadsheets, WhatsApp, email, and a CRM all feed Infrantic, which keeps one live operations status up to date: approvals routed, the weekly report sent, and a risk flagged early.",
    nodes: [
      {
        id: "sheets",
        x: 16,
        y: 22,
        label: "Spreadsheets",
        logo: "googleSheets",
      },
      {
        id: "whatsapp",
        x: 16,
        y: 42,
        label: "WhatsApp",
        logo: "whatsapp",
      },
      {
        id: "email",
        x: 16,
        y: 62,
        label: "Email",
        icon: "messages",
      },
      {
        id: "crm",
        x: 16,
        y: 82,
        label: "CRM",
        icon: "users",
      },
      {
        id: "hub",
        x: 46,
        y: 52,
        label: "Infrantic",
        variant: "hub",
      },
      {
        id: "record",
        x: 78,
        y: 52,
        label: "Operations status",
        variant: "record",
        kicker: "Live workspace",
        lines: ["Approvals routed", "Report sent Monday", "1 risk flagged"],
      },
    ],
    wires: [
      {
        from: [16, 22],
        to: [30, 22],
        delay: 0,
      },
      {
        from: [30, 22],
        to: [30, 52],
        delay: 0.5,
      },
      {
        from: [16, 42],
        to: [30, 42],
        delay: 0.3,
      },
      {
        from: [30, 42],
        to: [30, 52],
        delay: 0.8,
      },
      {
        from: [16, 62],
        to: [30, 62],
        delay: 0.6,
      },
      {
        from: [30, 62],
        to: [30, 52],
        delay: 1.1,
      },
      {
        from: [16, 82],
        to: [30, 82],
        delay: 0.9,
      },
      {
        from: [30, 82],
        to: [30, 52],
        delay: 1.4,
      },
      {
        from: [30, 52],
        to: [46, 52],
        delay: 1.8,
      },
      {
        from: [46, 52],
        to: [62, 52],
        delay: 2.4,
      },
    ],
  },
} as const satisfies PageHeroContent;

const shift = {
  id: "shift",
  eyebrow: "The shift",
  title: "From chasing information to seeing it",
  description:
    "The tools usually stay. What changes is how work moves between them.",
  before: {
    label: "How it runs today",
    items: [
      "Status lives in messages, calls, and someone's spreadsheet",
      "Approvals wait in inboxes with no owner or deadline",
      "Reports are rebuilt by hand every week",
      "Each department keeps its own version of the truth",
      "Problems show up after the customer notices",
    ],
  },
  after: {
    label: "How it runs connected",
    items: [
      "One record per order, request, or job that every team reads",
      "Approvals routed to the right person, with a visible trail",
      "Reports generated from live data, on schedule",
      "Departments update the same status instead of reconciling",
      "Exceptions flagged early, while there is still time to act",
    ],
  },
} as const satisfies BeforeAfterContent;

const cost = {
  id: "cost",
  eyebrow: "The real cost",
  title: "Small delays compound into slow companies",
  description:
    "None of these gaps look expensive on their own. Together they set the pace of the whole business.",
  tone: "dark",
  items: [
    {
      id: "manager-time",
      icon: "hourglass",
      title: "Manager time",
      description:
        "Experienced people spend their week collecting updates instead of deciding what to do with them.",
    },
    {
      id: "late-decisions",
      icon: "clock",
      title: "Late decisions",
      description:
        "By the time the numbers are consolidated, the situation they describe has already moved on.",
    },
    {
      id: "errors",
      icon: "alert",
      title: "Copy-paste errors",
      description:
        "Every manual hand-off between systems is a chance for a wrong quantity, price, or date.",
    },
    {
      id: "onboarding",
      icon: "users",
      title: "Slow onboarding",
      description:
        "When the process lives in people's heads, every new hire has to learn it by asking.",
    },
    {
      id: "customers",
      icon: "messages",
      title: "Customer experience",
      description:
        "Delays and inconsistencies inside the business surface as late replies and missed dates outside it.",
    },
    {
      id: "ceiling",
      icon: "trend",
      title: "A ceiling on growth",
      description:
        "More volume means more coordination, so the team grows faster than the business does.",
    },
  ],
} as const satisfies FeatureGridContent;

const signs = {
  id: "signs",
  eyebrow: "Is this you?",
  title: "Signs the work between systems needs attention",
  description:
    "You do not need a transformation programme. You need the two or three workflows that everyone complains about to stop leaking time.",
  points: [
    "A spreadsheet has quietly become a system of record",
    "Someone's job is mostly forwarding information between tools",
    "The same question gets asked in three group chats",
    "Month-end means a week of consolidation",
    "Nobody can say where a request is without asking around",
  ],
  cta: { label: "Talk through your workflow", href: "/contact" },
  panel: {
    label: "Typical starting points",
    items: [
      {
        term: "Procurement",
        detail:
          "Low-stock alerts, supplier requests, approvals, and purchase orders.",
      },
      {
        term: "Approvals",
        detail:
          "Requests that need an owner, a deadline, and a record of the decision.",
      },
      {
        term: "Reporting",
        detail: "Weekly or monthly reports rebuilt from several exports.",
      },
      {
        term: "Document review",
        detail: "Repeated first-pass checks on PDFs, scans, and forms.",
      },
      {
        term: "Order tracking",
        detail:
          "One order moving through costing, production, dispatch, and payment.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const next = {
  id: "next",
  eyebrow: "What happens next",
  title: "From a conversation to a working system",
  description:
    "We start with the workflow that hurts most, prove it, then extend.",
  steps: [
    {
      number: "01",
      title: "A discovery call",
      description:
        "You walk us through how the work runs today. We ask about the people, the tools, the hand-offs, and where things stall.",
      outputs: ["Shared understanding", "Candidate workflows"],
    },
    {
      number: "02",
      title: "Mapping the workflow",
      description:
        "We map the current flow end to end and mark where information is copied, waits, or gets lost.",
      outputs: ["Process map", "Gap list", "First-system proposal"],
    },
    {
      number: "03",
      title: "A focused first system",
      description:
        "We build the smallest system that removes the biggest gap, with human checkpoints where they matter.",
      outputs: ["Working automation", "Documentation", "Training"],
    },
    {
      number: "04",
      title: "Extend from there",
      description:
        "Once the first workflow runs on its own, we connect the next one to it, so the business builds one operating structure instead of many tools.",
      outputs: ["Roadmap", "Ongoing support"],
    },
  ],
} as const satisfies StepsContent;

const gaps = {
  eyebrow: "Six common gaps",
  title: "Where the time actually goes",
  description:
    "Each gap looks small on its own. Here is how it shows up today, and what changes once the work is connected.",
  todayLabel: "What you see today",
  changeLabel: "What changes",
  gaps: [
    {
      id: "status",
      icon: "messages",
      title: "Status lives in people's heads",
      today:
        "Updates are scattered across calls, WhatsApp groups, email, and spreadsheets, so every status check means asking someone.",
      change:
        "One shared record per order or request, updated where the work happens and visible to everyone who needs it.",
      product: { name: "Shared Order Record", href: "/products#shared-record" },
    },
    {
      id: "approvals",
      icon: "hourglass",
      title: "Approvals stall in inboxes",
      today:
        "Requests sit waiting because nobody is sure who owns the decision or what they need to make it.",
      change:
        "Requests go to a named approver with the context attached, a deadline, and a reminder.",
      product: { name: "Approval Flow", href: "/products#approval-flow" },
    },
    {
      id: "reports",
      icon: "sheet",
      title: "Reports are rebuilt every week",
      today:
        "Someone exports, cleans, and formats the same numbers by hand before every review.",
      change:
        "Reports assemble themselves from live data on a schedule, and dashboards stay current in between.",
      product: {
        name: "Operations Dashboard",
        href: "/products#operations-dashboard",
      },
    },
    {
      id: "truth",
      icon: "unplug",
      title: "Every department keeps its own truth",
      today:
        "Sales, operations, and finance each track the same order in a different file.",
      change:
        "Systems are connected, so an update in one place reaches the others without re-typing.",
      product: { name: "System Connector", href: "/products#system-connector" },
    },
    {
      id: "late",
      icon: "alert",
      title: "Problems surface after the damage",
      today:
        "Shortages, delays, and overdue tasks are noticed once a customer or supplier is already affected.",
      change:
        "Exceptions trigger alerts early, while there is still time to reorder, reschedule, or escalate.",
      product: {
        name: "Operations Dashboard",
        href: "/products#operations-dashboard",
      },
    },
    {
      id: "review",
      icon: "fileSearch",
      title: "Experts do first-pass checking",
      today:
        "Senior people spend hours reading PDFs and scans for the same predictable issues.",
      change:
        "AI does the first pass and flags likely problems; the expert reviews and makes the call.",
      product: {
        name: "Document Review Assistant",
        href: "/products#document-review",
      },
    },
  ],
} as const satisfies GapRowsContent;

const faq = {
  eyebrow: "Questions",
  title: "Common questions about getting started",
  description: "Don't see yours here? Book a call and ask us directly.",
  items: [
    {
      id: "q1",
      question: "How do we know which workflow to fix first?",
      answer:
        "Usually it is the one people complain about most, or the one where delays reach customers. A discovery call and a short mapping session make the choice concrete.",
    },
    {
      id: "q2",
      question: "Our processes are messy. Is that a problem?",
      answer:
        "No. Most processes look messier on paper than they run in practice. Mapping them as they really work is the first step, and it is often useful on its own.",
    },
    {
      id: "q3",
      question: "Do we need to replace our spreadsheets or CRM?",
      answer:
        "Rarely. We connect and automate around the tools you already use, and only replace something when it is genuinely holding the workflow back.",
    },
    {
      id: "q4",
      question: "What if our team resists a new system?",
      answer:
        "We involve the people who do the work from the first mapping session and automate the tedious parts first, so the change shows up as less effort, not more.",
    },
    {
      id: "q5",
      question: "Is this only worth it for large companies?",
      answer:
        "No. The gaps appear as soon as a business grows past a few people coordinating by message. Smaller teams often feel the difference fastest.",
    },
  ],
} as const satisfies FaqContent;

const challengesContent = {
  hero,
  gaps,
  shift,
  cost,
  signs,
  next,
  faq,
} as const;

export function getChallengesContent() {
  return challengesContent;
}
