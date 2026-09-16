import type { BenefitsContent } from "./benefits.types";

const benefitsContent = {
  title: "Why creative teams love us",
  description:
    "Purpose-built features that understand how creative professionals actually work.",
  benefits: [
    {
      id: "team-collaboration",
      title: "Team Collaboration",
      description:
        "Work together in real time with shared spaces, instant feedback, and seamless communication.",
      visual: "collaboration",
    },
    {
      id: "flexible-boards",
      title: "Flexible Boards",
      description:
        "Switch between kanban, list, and timeline views. Organize your work the way you think best.",
      visual: "boards",
    },
    {
      id: "seamless-reviews",
      title: "Seamless Reviews",
      description:
        "Pin feedback directly on designs, track revisions, and resolve comments in context.",
      visual: "reviews",
    },
    {
      id: "time-tracking",
      title: "Time Tracking",
      description:
        "Track time per task, project, or client. See budgets burn down before your spend does.",
      visual: "tracking",
    },
  ],
  collaborators: [
    {
      name: "Ava Rossi",
      initials: "AR",
      tone: "from-amber-200 to-orange-300 text-orange-900",
    },
    {
      name: "Leo Park",
      initials: "LP",
      tone: "from-zinc-700 to-zinc-900 text-white",
    },
    {
      name: "Mia Chen",
      initials: "MC",
      tone: "from-rose-200 to-pink-300 text-rose-900",
    },
    {
      name: "Noah Kim",
      initials: "NK",
      tone: "from-sky-200 to-indigo-300 text-indigo-900",
    },
    {
      name: "Zoe Hart",
      initials: "ZH",
      tone: "from-red-400 to-rose-600 text-white",
    },
    {
      name: "Eli Ward",
      initials: "EW",
      tone: "from-yellow-200 to-amber-400 text-amber-900",
    },
  ],
} as const satisfies BenefitsContent;

export function getBenefitsContent(): BenefitsContent {
  return benefitsContent;
}
