import type { FaqContent } from "@/features/marketing/faq";
import type {
  BlockIcon,
  PageHeroContent,
  StepsContent,
} from "@/features/marketing/page-blocks";
import type { Cta } from "@/shared/types";
import type { IntegrationId } from "@/shared/ui/integration-logo";

export type Product = {
  id: string;
  icon: BlockIcon;
  name: string;
  summary: string;
  /** The manual work it takes over. */
  replaces: string;
  included: readonly string[];
  worksWith: readonly IntegrationId[];
};

export type ProductCatalogContent = {
  eyebrow: string;
  title: string;
  description: string;
  replacesLabel: string;
  includedLabel: string;
  worksWithLabel: string;
  cta: Cta;
  products: readonly Product[];
};

// Packaged versions of the work described across the site (approvals,
// reporting, document review, one shared record, integrations, intake).
// No prices or delivery times are promised here.

const hero = {
  eyebrow: "Six ready starting points",
  title: "Proven systems, ready to fit your workflow",
  description:
    "Six packaged starting points built from the work we do most often. Each one is adapted to your rules, roles, and tools, not the other way round.",
  primaryCta: { label: "Book a call", href: "/contact" },
  secondaryCta: { label: "See case studies", href: "/case-studies" },
  stats: [
    { value: "6+", label: "Products, each adapted to you" },
    { value: "100%", label: "Of your existing tools kept" },
    { value: "1", label: "Connected system as they combine" },
  ],
  visual: {
    kind: "flow",
    label:
      "Five products, approval flow, shared order record, document review, operations dashboard, and system connector, all plug into one connected system.",
    nodes: [
      {
        id: "approvals",
        x: 16,
        y: 26,
        label: "Approval Flow",
        icon: "clipboard",
      },
      { id: "record", x: 16, y: 52, label: "Order Record", icon: "network" },
      {
        id: "review",
        x: 16,
        y: 78,
        label: "Document Review",
        icon: "fileSearch",
      },
      { id: "dashboard", x: 84, y: 34, label: "Dashboard", icon: "dashboard" },
      { id: "connector", x: 84, y: 70, label: "Connector", icon: "plug" },
      { id: "hub", x: 50, y: 52, label: "Your system", variant: "hub" },
    ],
    wires: [
      { from: [16, 26], to: [33, 26], delay: 0 },
      { from: [33, 26], to: [33, 52], delay: 0.4 },
      { from: [16, 52], to: [33, 52], delay: 0.2 },
      { from: [16, 78], to: [33, 78], delay: 0.3 },
      { from: [33, 78], to: [33, 52], delay: 0.7 },
      { from: [33, 52], to: [50, 52], delay: 1.1 },
      { from: [84, 34], to: [67, 34], delay: 0.5 },
      { from: [67, 34], to: [67, 52], delay: 0.9 },
      { from: [84, 70], to: [67, 70], delay: 0.6 },
      { from: [67, 70], to: [67, 52], delay: 1.0 },
      { from: [67, 52], to: [50, 52], delay: 1.3 },
    ],
  },
} as const satisfies PageHeroContent;

const catalog = {
  eyebrow: "The catalogue",
  title: "Pick the problem, start from a product",
  description:
    "Every product starts from a working pattern, then is configured around your process. They connect to each other, so the second one builds on the first.",
  replacesLabel: "Replaces",
  includedLabel: "Included",
  worksWithLabel: "Works with",
  cta: { label: "Enquire now", href: "/contact" },
  products: [
    {
      id: "approval-flow",
      icon: "clipboard",
      name: "Approval Flow",
      summary:
        "Requests reach the right approver with the context attached, a deadline, and reminders.",
      replaces: "Approvals chased over email and chat",
      included: [
        "Request form, or a trigger from your tools",
        "Routing rules by amount, team, or type",
        "Reminders and escalation",
        "A full approval trail",
      ],
      worksWith: ["n8n", "googleSheets", "whatsapp"],
    },
    {
      id: "operations-dashboard",
      icon: "dashboard",
      name: "Operations Dashboard",
      summary:
        "One live view of orders, tasks, and exceptions, built from the tools you already use.",
      replaces: "Weekly reports rebuilt by hand",
      included: [
        "Data pulled from your existing systems",
        "Views for each role",
        "Overdue and exception highlights",
        "Scheduled summaries by email",
      ],
      worksWith: ["supabase", "postgresql", "googleSheets"],
    },
    {
      id: "document-review",
      icon: "fileSearch",
      name: "Document Review Assistant",
      summary:
        "AI does the first read of documents and flags likely issues. A person makes the call.",
      replaces: "Experts doing first-pass checks",
      included: [
        "Checks defined with your experts",
        "Flags with the reason attached",
        "Human review and sign-off step",
        "A log of every decision",
      ],
      worksWith: ["openai", "claude", "python"],
    },
    {
      id: "shared-record",
      icon: "network",
      name: "Shared Order Record",
      summary:
        "One record per order or request that every department updates, from first step to last.",
      replaces: "Each team keeping its own spreadsheet",
      included: [
        "A single internal ID across stages",
        "Stage-by-stage status",
        "A named owner at every stage",
        "Visible to everyone who needs it",
      ],
      worksWith: ["supabase", "nextjs", "googleSheets"],
    },
    {
      id: "system-connector",
      icon: "plug",
      name: "System Connector",
      summary:
        "Your existing tools pass updates to each other, so nobody re-types the same data.",
      replaces: "Copy and paste between systems",
      included: [
        "A map of the data each tool needs",
        "Two-way sync where it makes sense",
        "Error alerts and automatic retries",
        "Documentation for every connection",
      ],
      worksWith: ["n8n", "make", "zapier"],
    },
    {
      id: "request-triage",
      icon: "bot",
      name: "Request Triage Agent",
      summary:
        "An AI agent reads incoming requests, sorts them, and routes each one with its context.",
      replaces: "Someone sorting the inbox all day",
      included: [
        "Intake from email, forms, or WhatsApp",
        "Classification and priority",
        "Routing to the right person or system",
        "Handover to a person when unsure",
      ],
      worksWith: ["openai", "whatsapp", "n8n"],
    },
  ],
} as const satisfies ProductCatalogContent;

const howItWorks = {
  id: "how-it-works",
  eyebrow: "How it works",
  title: "From product to your system",
  description:
    "A product is a head start, not a template you have to squeeze into.",
  tone: "dark",
  steps: [
    {
      number: "01",
      title: "Pick a starting point",
      description:
        "Choose the product closest to your problem, or describe the problem and we suggest one.",
      outputs: ["Agreed scope"],
    },
    {
      number: "02",
      title: "Fit it to your workflow",
      description:
        "We map your rules, roles, and tools, and configure the product around them.",
      outputs: ["Workflow map", "Configured product"],
    },
    {
      number: "03",
      title: "Launch with a pilot group",
      description:
        "A small group uses it on real work first, and we adjust before everyone switches over.",
      outputs: ["Live system", "Training"],
    },
    {
      number: "04",
      title: "Extend from there",
      description:
        "Products connect to each other, so the next one builds on the data the first one created.",
      outputs: ["Next workflow"],
    },
  ],
} as const satisfies StepsContent;

const faq = {
  eyebrow: "Questions",
  title: "About the products",
  description: "Don't see yours here? Book a call and ask us directly.",
  items: [
    {
      id: "q1",
      question: "How is a product different from a custom project?",
      answer:
        "A product starts from a pattern we have built before, so less has to be designed from scratch. It is still configured around your process and tools.",
    },
    {
      id: "q2",
      question: "Can we combine several products?",
      answer:
        "Yes. They are designed to connect: for example, an Approval Flow feeding a Shared Order Record that an Operations Dashboard reports on.",
    },
    {
      id: "q3",
      question: "What if none of them fits?",
      answer:
        "Then we build what you need as a custom project. The discovery call is the same either way.",
    },
    {
      id: "q4",
      question: "Do we need the tools listed under 'Works with'?",
      answer:
        "No. Those are common examples. We connect to the systems you already use wherever they allow it.",
    },
  ],
} as const satisfies FaqContent;

export function getProductsContent() {
  return { hero, catalog, howItWorks, faq };
}
