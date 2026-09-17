import type { ProblemContent } from "./problem.types";

const problemContent = {
  eyebrow: "The problem we solve",
  title: "Modern businesses operate across a maze of tools",
  description:
    "Our solutions are particularly valuable for businesses where employees spend significant time moving information between spreadsheets, emails, documents, and disconnected software.",
  tools: [
    { label: "Excel", icon: "excel" },
    { label: "Email", icon: "email" },
    { label: "WhatsApp", icon: "whatsapp" },
    { label: "CRM", icon: "crm" },
    { label: "ERP", icon: "erp" },
    { label: "Google Sheets", icon: "sheets", breakBefore: true },
    { label: "Accounting software", icon: "accounting" },
    { label: "Documents", icon: "documents" },
  ],
  toolsCaption: "Information moves between them manually.",
  effectsLabel: "This creates",
  effects: [
    { label: "Repetitive work", icon: "repetitive" },
    { label: "Human errors", icon: "errors" },
    { label: "Delayed decisions", icon: "delays" },
    { label: "Data silos", icon: "silos" },
    { label: "Poor visibility", icon: "visibility" },
    { label: "Operational bottlenecks", icon: "bottlenecks" },
    { label: "Increasing overhead", icon: "overhead" },
  ],
  resolution: {
    title: "Infrantic connects the maze.",
    description:
      "We build systems where information moves automatically, processes become visible, and teams spend less time managing operations and more time moving the business forward.",
  },
} as const satisfies ProblemContent;

export function getProblemContent(): ProblemContent {
  return problemContent;
}
