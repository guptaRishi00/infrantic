import type { BenefitsContent } from "./benefits.types";

const benefitsContent = {
  eyebrow: "Outcomes",
  title: "Systems that handle the work in the background",
  description:
    "Less manual work, less fragmented data, and less operational friction, with your team in control when decisions matter.",
  benefits: [
    {
      id: "human-control",
      title: "Humans stay in control",
      description:
        "AI handles repetitive work, and people step in where judgment or approval matters.",
      visual: "collaboration",
    },
    {
      id: "less-manual-work",
      title: "Less manual work",
      description:
        "Invoices, leads, onboarding, and inventory move through automated workflows instead of inboxes.",
      visual: "boards",
    },
    {
      id: "approvals",
      title: "Approvals that keep moving",
      description:
        "Requests reach the right person with the right context, and approved work syncs everywhere.",
      visual: "reviews",
    },
    {
      id: "visibility",
      title: "Visibility into operations",
      description:
        "See what is happening, why it is happening, and where action is required, in real time.",
      visual: "tracking",
    },
  ],
  // Placeholder portraits (Unsplash). Replace with real team photos.
  collaborators: [
    {
      kind: "person",
      name: "Ava",
      role: "Operations",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    },
    { kind: "agent", name: "AI Agent", role: "Automation" },
    {
      kind: "person",
      name: "Daniel",
      role: "Finance",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    },
    {
      kind: "person",
      name: "Maya",
      role: "Sales",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    },
    {
      kind: "person",
      name: "Rohan",
      role: "Procurement",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    },
    {
      kind: "person",
      name: "Lena",
      role: "Support",
      photo:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=faces&auto=format&q=80",
    },
  ],
} as const satisfies BenefitsContent;

export function getBenefitsContent(): BenefitsContent {
  return benefitsContent;
}
