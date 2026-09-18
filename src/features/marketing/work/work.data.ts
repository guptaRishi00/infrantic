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
        "Automation flow: a stock form triggers an AI agent that uses a chat model, Supabase, memory, and Jira as tools, then routes approvals to Slack and supplier requests to email.",
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
        "Proofreading app: a new review panel with model, dictionary, and status, next to a drop zone for a technical PDF.",
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
        "Task management app: a task list with priority, due date, review status, and the assigned checker for each task.",
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
