import type { WorkContent } from "./work.types";

const workContent = {
  eyebrow: "Selected work",
  title: "Systems and workflows we've built",
  labels: {
    problem: "The problem",
    built: "What we built",
    benefits: "Operational benefit",
  },
  cases: [
    {
      id: "procurement",
      number: "01",
      title: "Inventory and procurement automation",
      summary: "Low stock, approvals, and purchasing",
      visual: "automation",
      visualLabel:
        "Automation flow: Shopify orders, warehouse barcode scans, and returns merge into one stream; a code step updates stock levels in Supabase, an AI reorder check reads them, and anything running short raises a reorder alert in Slack.",
      problem:
        "Low-stock alerts, approvals, supplier selection, and purchasing were handled by hand across several people and tools.",
      built:
        "An automated flow that detects low stock, routes approvals, sends RFQs, raises purchase orders, checks invoices, and updates stock levels.",
      benefits: [
        "Faster response when stock runs low",
        "Less repeated manual handling",
        "A clear approval trail",
        "Live visibility into stock and purchasing",
      ],
    },
    {
      id: "proofreader",
      number: "02",
      title: "AI technical document proofreader",
      summary: "Repeated technical document checks",
      visual: "proofreader",
      visualLabel:
        "Proofreading app mid-review: a technical specification page with four highlighted passages, next to a findings list (mixed units, an unapproved term, a missing figure reference, a tolerance format) ranked by severity, awaiting the reviewer's sign-off.",
      problem:
        "Reviewers checked the same issues again and again across PDFs and scanned files.",
      built:
        "A controlled first-pass review that highlights likely issues, applies an approved terminology list, and keeps the reviewer in charge.",
      benefits: [
        "A structured first pass on every document",
        "Possible issues flagged sooner",
        "Consistent terminology",
        "Less repetitive checking",
      ],
    },
    {
      id: "tasks",
      number: "03",
      title: "Role-based task management",
      summary: "Executor, checker, and approver workflows",
      visual: "tasks",
      visualLabel:
        "Task board with four columns, to do, in progress, in review, and approved; each task card shows the role that owns it (executor, checker, or approver), its due date, and overdue or rework flags.",
      problem:
        "No one clearly owned each step between the people doing, checking, and approving the work.",
      built:
        "Role-based workflows with rework loops, overdue alerts, a full history, and workload tracking.",
      benefits: [
        "Clear ownership at every step",
        "Consistent review stages",
        "Overdue work visible early",
        "A full record of rejections and rework",
      ],
    },
  ],
} as const satisfies WorkContent;

/** Single read path for case studies; swap for a CMS later. */
export function getWorkContent(): WorkContent {
  return workContent;
}
