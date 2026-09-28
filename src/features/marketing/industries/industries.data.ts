import type { FaqContent } from "@/features/marketing/faq";
import type {
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
} from "@/features/marketing/page-blocks";

const hero = {
  eyebrow: "Industries",
  title: "Built for businesses where operational complexity is slowing growth",
  description:
    "The tools differ from one industry to the next. The friction between them looks remarkably similar. We have built for these sectors, and the patterns carry across.",
  primaryCta: { label: "Book a discovery call", href: "/#contact" },
  secondaryCta: { label: "See case studies", href: "/case-studies" },
  stats: [
    { value: "10", label: "Industries we build for" },
    { value: "1", label: "Underlying pattern across them" },
    { value: "Yours", label: "Existing tools stay in place" },
  ],
  visual: {
    kind: "orbit",
    label:
      "Ten industries arranged on rings around Infrantic: retail, finance, manufacturing, apparel, logistics, healthcare, real estate, education, professional services, and startups.",
    chips: [
      {
        label: "Retail",
        ring: 0,
        angle: -90,
        icon: "store",
      },
      {
        label: "Finance",
        ring: 0,
        angle: 90,
        icon: "finance",
      },
      {
        label: "Manufacturing",
        ring: 1,
        angle: 0,
        icon: "factory",
      },
      {
        label: "Apparel",
        ring: 1,
        angle: 180,
        icon: "shirt",
      },
      {
        label: "Logistics",
        ring: 1,
        angle: -45,
        icon: "truck",
      },
      {
        label: "Healthcare",
        ring: 1,
        angle: 135,
        icon: "health",
      },
      {
        label: "Real estate",
        ring: 2,
        angle: -60,
        icon: "building",
      },
      {
        label: "Education",
        ring: 2,
        angle: 60,
        icon: "education",
      },
      {
        label: "Services",
        ring: 2,
        angle: 120,
        icon: "handshake",
      },
      {
        label: "Startups",
        ring: 2,
        angle: -120,
        icon: "rocket",
      },
    ],
  },
} as const satisfies PageHeroContent;

const sectors = {
  id: "sectors",
  eyebrow: "Where we work",
  title: "Sectors and the workflows we usually start with",
  description:
    "Each card lists the systems that tend to come first in that sector.",
  columns: 2,
  items: [
    {
      id: "manufacturing",
      icon: "factory",
      title: "Manufacturing",
      description:
        "Production updates, material shortages, and quality checks that live in spreadsheets and WhatsApp groups.",
      tags: ["Production tracking", "Procurement", "Quality checks"],
    },
    {
      id: "apparel",
      icon: "shirt",
      title: "Apparel & fashion",
      description:
        "Orders that move through costing, sampling, production, dispatch, and payment across separate owners.",
      tags: ["Order master", "Costing approvals", "Dispatch & GRN"],
    },
    {
      id: "logistics",
      icon: "truck",
      title: "Logistics & supply chain",
      description:
        "Shipments, documents, and exceptions tracked by email and phone instead of one shared status.",
      tags: ["Shipment status", "Document checks", "Exception alerts"],
    },
    {
      id: "professional-services",
      icon: "handshake",
      title: "Professional services",
      description:
        "Client requests, reviews, and deliverables with unclear ownership between the people doing and checking the work.",
      tags: ["Task ownership", "Review stages", "Client portals"],
    },
    {
      id: "retail",
      icon: "store",
      title: "Retail",
      description:
        "Stock, suppliers, and store reporting that are consolidated by hand every week.",
      tags: ["Stock alerts", "Supplier RFQs", "Store reporting"],
    },
    {
      id: "finance",
      icon: "finance",
      title: "Finance & accounting",
      description:
        "Invoices, approvals, and reconciliations that depend on chasing people for documents.",
      tags: ["Invoice processing", "Approval trails", "Reconciliation"],
    },
    {
      id: "real-estate",
      icon: "building",
      title: "Real estate",
      description:
        "Leads, site visits, documents, and payments handled across a CRM, spreadsheets, and messages.",
      tags: ["Lead routing", "Document collection", "Payment follow-ups"],
    },
    {
      id: "healthcare",
      icon: "health",
      title: "Healthcare operations",
      description:
        "Scheduling, intake forms, and reporting that keep administrative staff copying information between systems.",
      tags: ["Intake forms", "Scheduling", "Operational reporting"],
    },
    {
      id: "education",
      icon: "education",
      title: "Education",
      description:
        "Admissions, fee follow-ups, and internal approvals that run on email threads.",
      tags: ["Admissions", "Fee reminders", "Approvals"],
    },
    {
      id: "startups",
      icon: "rocket",
      title: "Startups & growing businesses",
      description:
        "Teams that outgrew their spreadsheets and need an operating structure before hiring more coordinators.",
      tags: ["Internal tools", "Dashboards", "Automation first"],
    },
  ],
} as const satisfies FeatureGridContent;

const threads = {
  id: "threads",
  eyebrow: "Common threads",
  title: "Different industries, the same friction",
  description:
    "Sector knowledge matters for the details. The structure underneath is usually the same: information copied between people, files, and systems.",
  tone: "dark",
  points: [
    "A spreadsheet acting as the system of record",
    "Approvals that depend on someone remembering to chase",
    "Reports assembled from exports every week",
    "Problems noticed after delivery is already affected",
  ],
  cta: { label: "Tell us about your sector", href: "/#contact" },
  panel: {
    label: "What repeats",
    items: [
      {
        term: "One shared record",
        detail:
          "A single ID for the order, job, or request that every department updates.",
      },
      {
        term: "Routed approvals",
        detail:
          "Requests go to a named owner with a deadline and a visible trail.",
      },
      {
        term: "Live reporting",
        detail:
          "Dashboards built from the data as it changes, not from Friday's exports.",
      },
      {
        term: "Early warnings",
        detail:
          "Shortages, delays, and overdue work flagged while they can still be fixed.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const functions = {
  id: "functions",
  eyebrow: "By function",
  title: "Typical first systems, whatever the sector",
  description:
    "If your industry is not listed above, one of these workflows probably still is.",
  items: [
    {
      id: "procurement",
      icon: "boxes",
      title: "Procurement",
      description:
        "Low-stock detection, supplier requests, approvals, and purchase orders in one flow.",
    },
    {
      id: "approvals",
      icon: "clipboard",
      title: "Approvals",
      description:
        "Any request that needs an owner, a decision, and a record of who made it.",
    },
    {
      id: "reporting",
      icon: "chart",
      title: "Reporting",
      description:
        "Scheduled reports and live dashboards that replace manual consolidation.",
    },
    {
      id: "documents",
      icon: "fileSearch",
      title: "Document review",
      description:
        "AI first-pass checks on PDFs, scans, and forms, with people making the final call.",
    },
    {
      id: "field-updates",
      icon: "messages",
      title: "Field and floor updates",
      description:
        "Simple forms that feed production or site updates into the shared record.",
    },
    {
      id: "onboarding",
      icon: "users",
      title: "Customer onboarding",
      description:
        "Collecting documents, creating accounts, and handing over to the right team without email chains.",
    },
  ],
} as const satisfies FeatureGridContent;

const control = {
  id: "control",
  eyebrow: "Control",
  title: "Automation that keeps people accountable",
  description:
    "In regulated or document-heavy work, the point is not to remove people from the process. It is to make sure the right person sees the right thing at the right time.",
  reverse: true,
  points: [
    "Approvals and sign-offs stay with named people",
    "Every automated action is logged and traceable",
    "AI suggests and flags; it does not decide alone",
    "Access follows roles, not whoever has the spreadsheet",
  ],
  panel: {
    label: "Guardrails we build in",
    items: [
      {
        term: "Audit trail",
        detail: "Who changed what, when, and from where.",
      },
      {
        term: "Checkpoints",
        detail: "Human review steps wherever a decision carries risk.",
      },
      {
        term: "Role-based access",
        detail: "Executors, checkers, and approvers see what their role needs.",
      },
      {
        term: "Rollback",
        detail: "Automations can be paused, and manual paths stay available.",
      },
    ],
  },
} as const satisfies SplitSectionContent;

const faq = {
  eyebrow: "Questions",
  title: "Industry questions we often get",
  description:
    "Don't see yours here? Book a discovery call and ask us directly.",
  items: [
    {
      id: "q1",
      question: "Do you only work with the industries listed?",
      answer:
        "No. The list reflects where we see the most demand. The underlying patterns, shared records, routed approvals, and live reporting, apply almost everywhere.",
    },
    {
      id: "q2",
      question: "Do you need deep knowledge of our industry?",
      answer:
        "We bring the patterns; you bring the domain. The mapping sessions are where we learn your specifics, and we ask a lot of questions.",
    },
    {
      id: "q3",
      question: "Can you work with industry-specific software?",
      answer:
        "Usually. If a system has an API, a database we can read, or reliable exports, we can connect it.",
    },
    {
      id: "q4",
      question: "How do you handle sensitive or regulated data?",
      answer:
        "Access follows roles, actions are logged, and people keep the decisions that carry risk. We design around your compliance requirements from the start.",
    },
    {
      id: "q5",
      question: "Can we start with one site, team, or product line?",
      answer:
        "Yes, and we recommend it. Prove the system in one place, then roll it out.",
    },
  ],
} as const satisfies FaqContent;

const industriesContent = {
  hero,
  sectors,
  threads,
  functions,
  control,
  faq,
} as const;

export function getIndustriesContent() {
  return industriesContent;
}
