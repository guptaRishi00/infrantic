import type { FaqContent } from "@/features/marketing/faq";
import type {
  FeatureGridContent,
  PageHeroContent,
  SplitSectionContent,
} from "@/features/marketing/page-blocks";

export type SectorContent = {
  /** Browser title and meta description. */
  meta: { title: string; description: string };
  hero: PageHeroContent;
  friction: FeatureGridContent;
  systems: FeatureGridContent;
  approach: SplitSectionContent;
  faq: FaqContent;
};

const productsCta = { label: "See our products", href: "/products" } as const;
const contactCta = {
  label: "Book a discovery call",
  href: "/contact",
} as const;

const healthcare = {
  meta: {
    title: "Healthcare",
    description:
      "Automation and connected systems for clinics, labs, and health businesses: intake, referrals, scheduling, billing paperwork, and reporting.",
  },
  hero: {
    eyebrow: "Sectors · Healthcare",
    title: "Less paperwork between patients, staff, and systems",
    description:
      "Clinics, diagnostic labs, pharmacies, and health businesses run on forms, referrals, and follow-ups spread across phones, inboxes, and spreadsheets. We connect them, so staff spend their time on patients instead of chasing paperwork.",
    primaryCta: contactCta,
    secondaryCta: productsCta,
    stats: [
      { value: "1", label: "Record per referral or case, shared by the team" },
      { value: "Yours", label: "Existing systems stay in place" },
      { value: "Human", label: "Sign-off on every clinical decision" },
    ],
  },
  friction: {
    id: "friction",
    eyebrow: "Where the time goes",
    title: "Admin that pulls people away from care",
    description:
      "None of these needs a new hospital system. Each is a hand-off between people and tools that can be connected.",
    columns: 3,
    items: [
      {
        id: "intake",
        icon: "clipboard",
        title: "Intake typed in twice",
        description:
          "Details arrive on paper, by phone, or through a web form, and staff re-enter them into the system by hand.",
      },
      {
        id: "referrals",
        icon: "messages",
        title: "Referrals lost in inboxes",
        description:
          "Referrals and their documents arrive by email or chat, and nobody can see at a glance which are waiting.",
      },
      {
        id: "scheduling",
        icon: "clock",
        title: "Scheduling by phone",
        description:
          "Booking, reminders, and rescheduling take hours of calls, and no-shows are noticed only on the day.",
      },
      {
        id: "reports",
        icon: "fileSearch",
        title: "Reports checked by hand",
        description:
          "Lab and diagnostic reports are read line by line for the same routine issues before anyone can act.",
      },
      {
        id: "billing",
        icon: "finance",
        title: "Billing paperwork",
        description:
          "Claims and invoices need the same details copied from several places, and errors come back weeks later.",
      },
      {
        id: "stock",
        icon: "boxes",
        title: "Supplies run out",
        description:
          "Consumables are counted by hand, so shortages show up when something is already missing.",
      },
    ],
  },
  systems: {
    id: "systems",
    eyebrow: "What we build",
    title: "Systems that fit how your team already works",
    tone: "dark",
    columns: 2,
    cta: productsCta,
    items: [
      {
        id: "intake",
        icon: "clipboard",
        title: "Digital intake and referral tracking",
        description:
          "One form or inbox for referrals and intake, each with a record the whole team can see, from received to booked.",
        tags: ["Intake", "Referrals"],
      },
      {
        id: "scheduling",
        icon: "clock",
        title: "Scheduling and reminders",
        description:
          "Confirmations and reminders go out automatically by message or email, and replies update the schedule.",
        tags: ["Reminders", "WhatsApp"],
      },
      {
        id: "review",
        icon: "fileSearch",
        title: "AI first pass on documents",
        description:
          "AI reads reports and forms first and flags what needs attention. A qualified person always makes the call.",
        tags: ["Document review", "Human sign-off"],
      },
      {
        id: "dashboard",
        icon: "dashboard",
        title: "Operations dashboard",
        description:
          "Appointments, pending referrals, billing status, and stock in one live view instead of weekly spreadsheets.",
        tags: ["Reporting", "Stock"],
      },
    ],
  },
  approach: {
    id: "approach",
    eyebrow: "How we work in healthcare",
    title: "Sensitive data, handled deliberately",
    description:
      "Health information needs care. We design every system around your data-protection obligations and keep people in charge of decisions.",
    points: [
      "Access limited by role, so people see only what their work needs",
      "Every change and approval recorded in an audit trail",
      "AI suggests and flags; staff decide",
      "We work inside your existing systems and hosting where possible",
    ],
    cta: contactCta,
    panel: {
      label: "Typical starting points",
      items: [
        { term: "Front desk", detail: "Intake, booking, and reminders" },
        { term: "Referrals", detail: "One tracked record per referral" },
        { term: "Diagnostics", detail: "First-pass report review" },
        { term: "Back office", detail: "Billing paperwork and supplies" },
      ],
    },
  },
  faq: {
    eyebrow: "Questions",
    title: "Healthcare, specifically",
    description:
      "Don't see yours here? Book a discovery call and ask us directly.",
    items: [
      {
        id: "q1",
        question: "Do we have to replace our current system?",
        answer:
          "No. We connect the systems you already use and automate the hand-offs between them. Replacing a tool is a last resort.",
      },
      {
        id: "q2",
        question: "How do you handle patient data?",
        answer:
          "We map what data each step needs, limit access by role, keep an audit trail, and design around the data-protection rules that apply to you.",
      },
      {
        id: "q3",
        question: "Will AI make clinical decisions?",
        answer:
          "No. AI does repetitive first reads and sorting. Anything that affects care goes to a qualified person to decide.",
      },
      {
        id: "q4",
        question: "Where do healthcare teams usually start?",
        answer:
          "With the busiest hand-off, often intake and referrals, or appointment reminders. One focused workflow first, then the next.",
      },
    ],
  },
} as const satisfies SectorContent;

const techProducts = {
  meta: {
    title: "Tech product companies",
    description:
      "Internal tools and automation for SaaS and product companies: onboarding, support triage, admin panels, billing operations, and reporting.",
  },
  hero: {
    eyebrow: "Sectors · Tech product companies",
    title: "Internal tools and automation around your product",
    description:
      "Your engineers should build the product, not the admin panel, the onboarding checklist, or the weekly metrics sheet. We build and connect the operational systems around it.",
    primaryCta: contactCta,
    secondaryCta: productsCta,
    stats: [
      { value: "0", label: "Sprints taken from your product roadmap" },
      { value: "Your stack", label: "Built on the tools you already run" },
      { value: "Handover", label: "Documented so your team can own it" },
    ],
  },
  friction: {
    id: "friction",
    eyebrow: "Where the time goes",
    title: "Operations work that lands on the product team",
    description:
      "Every growing product company collects these. Each one quietly takes engineering or founder time.",
    columns: 3,
    items: [
      {
        id: "onboarding",
        icon: "rocket",
        title: "Manual onboarding",
        description:
          "New accounts are set up by hand from a checklist, and customers wait while someone gets to it.",
      },
      {
        id: "support",
        icon: "messages",
        title: "Support triage",
        description:
          "Tickets, emails, and chat arrive in different places and are sorted by whoever has a moment.",
      },
      {
        id: "admin",
        icon: "code",
        title: "Admin requests to engineers",
        description:
          "Refunds, plan changes, and data fixes go through developers because there is no internal tool for them.",
      },
      {
        id: "billing",
        icon: "finance",
        title: "Billing operations",
        description:
          "Invoices, failed payments, and plan changes are reconciled across billing, CRM, and spreadsheets.",
      },
      {
        id: "metrics",
        icon: "chart",
        title: "Metrics rebuilt weekly",
        description:
          "Usage, revenue, and churn numbers are exported and stitched together by hand before every review.",
      },
      {
        id: "handoffs",
        icon: "network",
        title: "Sales to success hand-offs",
        description:
          "Context from the sales process never reaches the people onboarding and supporting the customer.",
      },
    ],
  },
  systems: {
    id: "systems",
    eyebrow: "What we build",
    title: "Systems that give your team its time back",
    tone: "dark",
    columns: 2,
    cta: productsCta,
    items: [
      {
        id: "admin",
        icon: "dashboard",
        title: "Internal tools and admin panels",
        description:
          "Safe, role-based screens for the requests that now go to engineers: account changes, refunds, and data fixes.",
        tags: ["Admin panel", "Roles"],
      },
      {
        id: "onboarding",
        icon: "rocket",
        title: "Onboarding automation",
        description:
          "Signups trigger account setup, welcome steps, and follow-ups, with a person pulled in only when needed.",
        tags: ["Onboarding", "Lifecycle"],
      },
      {
        id: "support",
        icon: "bot",
        title: "AI support triage",
        description:
          "An agent reads incoming requests, tags and routes them with context, and drafts replies for review.",
        tags: ["Support", "AI agent"],
      },
      {
        id: "metrics",
        icon: "chart",
        title: "Live metrics and reporting",
        description:
          "Product, billing, and CRM data joined into dashboards that stay current, instead of a weekly export.",
        tags: ["Reporting", "Data"],
      },
    ],
  },
  approach: {
    id: "approach",
    eyebrow: "How we work with product teams",
    title: "Built to your standards, owned by your team",
    description:
      "We work like an extension of your engineering team: in your stack, in your repositories where it makes sense, and documented for handover.",
    points: [
      "We use your existing tools, languages, and hosting where possible",
      "Code and workflows are reviewed with your engineers",
      "Every system ships with documentation and monitoring",
      "Your roadmap stays yours: we take the operational work off it",
    ],
    cta: contactCta,
    panel: {
      label: "Typical starting points",
      items: [
        { term: "Customer success", detail: "Onboarding and hand-offs" },
        { term: "Support", detail: "Triage and routing" },
        { term: "Operations", detail: "Internal admin tools" },
        { term: "Leadership", detail: "Live product and revenue metrics" },
      ],
    },
  },
  faq: {
    eyebrow: "Questions",
    title: "For product companies",
    description:
      "Don't see yours here? Book a discovery call and ask us directly.",
    items: [
      {
        id: "q1",
        question: "Why not have our own engineers build this?",
        answer:
          "They can, but every sprint on internal tooling is a sprint off the product. We take that work on and hand it back documented.",
      },
      {
        id: "q2",
        question: "Will you work in our codebase?",
        answer:
          "Where it makes sense, yes, following your conventions and review process. Otherwise we build alongside it and integrate through your APIs.",
      },
      {
        id: "q3",
        question: "Can you connect to our product's data?",
        answer:
          "Usually, through your database, APIs, or event stream, with access scoped to exactly what each workflow needs.",
      },
      {
        id: "q4",
        question: "Who maintains it afterwards?",
        answer:
          "Your team, us, or both. Everything is documented for handover, and ongoing support is available if you want it.",
      },
    ],
  },
} as const satisfies SectorContent;

const marketing = {
  meta: {
    title: "Marketing",
    description:
      "Automation for agencies and marketing teams: client reporting, lead routing, content approvals, and campaign operations.",
  },
  hero: {
    eyebrow: "Sectors · Marketing",
    title: "Reporting, leads, and approvals without the busywork",
    description:
      "Agencies and marketing teams lose hours every week to pulling numbers, chasing approvals, and moving leads between tools. We automate the operations, so your people can work on the campaigns.",
    primaryCta: contactCta,
    secondaryCta: productsCta,
    stats: [
      { value: "1", label: "Report assembled from every channel" },
      { value: "Instant", label: "Lead routing from form to owner" },
      { value: "Yours", label: "Existing tools stay in place" },
    ],
  },
  friction: {
    id: "friction",
    eyebrow: "Where the time goes",
    title: "Busywork between the campaigns",
    description:
      "The work that makes a marketing team look slow is rarely the creative. It is the admin around it.",
    columns: 3,
    items: [
      {
        id: "reporting",
        icon: "sheet",
        title: "Reports built by hand",
        description:
          "Numbers are exported from every platform and pasted into a deck or sheet before each client call.",
      },
      {
        id: "leads",
        icon: "users",
        title: "Leads left waiting",
        description:
          "Form and chat leads sit in an inbox or a sheet until someone assigns them, and the fastest reply wins.",
      },
      {
        id: "approvals",
        icon: "clipboard",
        title: "Approvals by email thread",
        description:
          "Content and creative bounce between reviewers with no clear owner, version, or deadline.",
      },
      {
        id: "crm",
        icon: "unplug",
        title: "A CRM nobody trusts",
        description:
          "Duplicates, missing fields, and stale stages make pipeline numbers a matter of opinion.",
      },
      {
        id: "requests",
        icon: "messages",
        title: "Scattered requests",
        description:
          "Briefs and asset requests arrive by chat, email, and calls, so work starts without the details it needs.",
      },
      {
        id: "budgets",
        icon: "finance",
        title: "Budget surprises",
        description:
          "Spend is checked at month-end, when an overspent campaign can no longer be corrected.",
      },
    ],
  },
  systems: {
    id: "systems",
    eyebrow: "What we build",
    title: "Operations that run while you plan the next campaign",
    tone: "dark",
    columns: 2,
    cta: productsCta,
    items: [
      {
        id: "reporting",
        icon: "chart",
        title: "Automated client reporting",
        description:
          "Channel data pulled on a schedule into one report or live dashboard, ready to review before it is sent.",
        tags: ["Reporting", "Dashboards"],
      },
      {
        id: "leads",
        icon: "target",
        title: "Lead capture and routing",
        description:
          "Every lead lands in the CRM with its source, is assigned by rules, and gets a first reply straight away.",
        tags: ["Leads", "CRM"],
      },
      {
        id: "approvals",
        icon: "check",
        title: "Content approval flows",
        description:
          "Drafts go to the right reviewer with a deadline and reminders, and every decision is recorded.",
        tags: ["Approvals", "Content"],
      },
      {
        id: "alerts",
        icon: "alert",
        title: "Spend and performance alerts",
        description:
          "Campaigns that overspend or underperform raise an alert early, while there is still time to adjust.",
        tags: ["Budgets", "Alerts"],
      },
    ],
  },
  approach: {
    id: "approach",
    eyebrow: "How we work with marketing teams",
    title: "Your channels, one set of numbers",
    description:
      "Marketing runs on many tools. We connect them around your process, so the data agrees and the hand-offs happen by themselves.",
    points: [
      "We connect the ad platforms, CRM, and forms you already use",
      "Reports are reviewed by a person before a client sees them",
      "Rules for lead routing and approvals are set with your team",
      "Built for agencies with many clients and for in-house teams",
    ],
    cta: contactCta,
    panel: {
      label: "Typical starting points",
      items: [
        { term: "Agencies", detail: "Client reporting across accounts" },
        { term: "Growth", detail: "Lead capture and routing" },
        { term: "Content", detail: "Review and approval flows" },
        { term: "Finance", detail: "Spend tracking and alerts" },
      ],
    },
  },
  faq: {
    eyebrow: "Questions",
    title: "For marketing teams",
    description:
      "Don't see yours here? Book a discovery call and ask us directly.",
    items: [
      {
        id: "q1",
        question: "Can you pull data from all our ad platforms?",
        answer:
          "Most platforms have APIs or exports we can automate. We check yours on the discovery call before promising anything.",
      },
      {
        id: "q2",
        question: "We are an agency. Does this work across clients?",
        answer:
          "Yes. Reporting and approvals can be set up once and run per client, with each client's data kept separate.",
      },
      {
        id: "q3",
        question: "Will clients see automated reports without a check?",
        answer:
          "Only if you want them to. By default a person reviews each report before it is sent.",
      },
      {
        id: "q4",
        question: "Do we need a new CRM?",
        answer:
          "Rarely. Cleaning up and connecting the one you have is usually faster and cheaper than migrating.",
      },
    ],
  },
} as const satisfies SectorContent;

const sectors = {
  healthcare,
  "tech-product-companies": techProducts,
  marketing,
} as const;

export type SectorSlug = keyof typeof sectors;

/** Slugs for the prebuilt /sectors/[slug] pages (nav links use the same). */
export const sectorSlugs = Object.keys(sectors) as SectorSlug[];

export function isSectorSlug(slug: string): slug is SectorSlug {
  return slug in sectors;
}

export function getSectorContent(slug: SectorSlug): SectorContent {
  return sectors[slug];
}
