import type { ProblemContent } from "./problem.types";

const problemContent = {
  eyebrow: "Where work slows down",
  title:
    "The real problem is usually the work between people, files, and systems",
  gapLabel: "Operational gap",
  learnMoreLabel: "Learn more",
  // "Learn more" points at the services that close each gap until dedicated
  // pages exist.
  gaps: [
    {
      id: "updates",
      icon: "updates",
      title: "Updates take constant chasing",
      symptom:
        "Key information is spread across calls, messages, email, and spreadsheets.",
      impact:
        "Managers spend their time gathering updates instead of acting on them.",
      href: "/#services",
    },
    {
      id: "approvals",
      icon: "approvals",
      title: "Approvals lose momentum",
      symptom:
        "Requests sit idle when the owner, the context, or the next step isn't clear.",
      impact: "Work stalls, and it gets hard to see who is accountable.",
      href: "/#services",
    },
    {
      id: "reports",
      icon: "reports",
      title: "Reports get rebuilt by hand",
      symptom: "Teams gather and format the same information again and again.",
      impact:
        "By the time a decision is made, the data is already out of date.",
      href: "/#services",
    },
    {
      id: "data",
      icon: "data",
      title: "Operational data is scattered",
      symptom: "Each department keeps its own version of the same status.",
      impact:
        "Teams spend their time reconciling data instead of moving work forward.",
      href: "/#services",
    },
    {
      id: "risks",
      icon: "risks",
      title: "Risks surface too late",
      symptom:
        "Shortages, delays, and overdue tasks only show up once delivery is already hit.",
      impact: "The team is left making reactive decisions.",
      href: "/#services",
    },
    {
      id: "documents",
      icon: "documents",
      title: "Documents need repeated review",
      symptom:
        "Senior staff check for the same issues across reports, PDFs, and scanned files.",
      impact: "Expert time goes into predictable first-pass checks.",
      href: "/#services",
    },
  ],
} as const satisfies ProblemContent;

export function getProblemContent(): ProblemContent {
  return problemContent;
}
