import type { FaqContent } from "@/features/marketing/faq";
import type { BlockIcon } from "@/features/marketing/page-blocks";

// `value` is what the server action accepts (see contact.actions.ts).
export const interestValues = [
  "ai-automation",
  "process-automation",
  "custom-software",
  "integrations",
  "data",
  "not-sure",
] as const;

export type InterestValue = (typeof interestValues)[number];

export type ContactDetail = {
  id: string;
  icon: "mail" | "phone" | "location";
  label: string;
  value: string;
  href?: string;
};

export type ContactIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
  nextTitle: string;
  next: readonly { id: string; title: string; description: string }[];
  detailsTitle: string;
  details: readonly ContactDetail[];
};

export type ContactFormContent = {
  title: string;
  description: string;
  interestLegend: string;
  interests: readonly {
    value: InterestValue;
    label: string;
    icon: BlockIcon;
  }[];
  privacyNote: string;
  privacyLink: { label: string; href: string };
  submitLabel: string;
  pendingLabel: string;
  successTitle: string;
  successBody: string;
  resetLabel: string;
};

const intro = {
  eyebrow: "Rough notes are fine",
  title: "Tell us where the work gets stuck",
  description:
    "Describe the workflow that takes too much chasing, checking, or re-typing. Rough notes are fine: we will ask the right questions on the call.",
  nextTitle: "What happens next",
  next: [
    {
      id: "read",
      title: "We read it and reply",
      description:
        "A person on the team reads your message and replies with a few questions and times for a call.",
    },
    {
      id: "call",
      title: "Discovery call",
      description:
        "We walk through the workflow, the people involved, and the tools it runs through today. No preparation needed.",
    },
    {
      id: "plan",
      title: "A clear first step",
      description:
        "You get a short written summary: what we would build first, and what it would change for the team.",
    },
  ],
  detailsTitle: "Prefer to reach us directly?",
  // PLACEHOLDER contact details (user, 2026-09-28): replace with the real
  // email, phone, and location before launch.
  details: [
    {
      id: "email",
      icon: "mail",
      label: "Email",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    {
      id: "phone",
      icon: "phone",
      label: "Phone",
      value: "+1 555 010 0000",
      href: "tel:+15550100000",
    },
    {
      id: "location",
      icon: "location",
      label: "Location",
      value: "City, Country",
    },
  ],
} as const satisfies ContactIntroContent;

const form = {
  title: "Send us a message",
  description: "Fields marked * are required.",
  interestLegend: "What would you like to improve?",
  interests: [
    { value: "ai-automation", label: "AI automation", icon: "bot" },
    {
      value: "process-automation",
      label: "Process automation",
      icon: "clipboard",
    },
    { value: "custom-software", label: "Custom software", icon: "code" },
    { value: "integrations", label: "Integrations", icon: "plug" },
    { value: "data", label: "Data & reporting", icon: "chart" },
    { value: "not-sure", label: "Not sure yet", icon: "compass" },
  ],
  privacyNote: "We only use these details to reply to you.",
  privacyLink: { label: "Privacy Policy", href: "/privacy" },
  submitLabel: "Send message",
  pendingLabel: "Sending…",
  successTitle: "Thanks, your message is in",
  successBody:
    "We will read it and reply by email with a few questions and times for a discovery call.",
  resetLabel: "Send another message",
} as const satisfies ContactFormContent;

const faq = {
  eyebrow: "Questions",
  title: "Before you get in touch",
  description:
    "Anything else, put it in your message and we will answer on the call.",
  items: [
    {
      id: "q1",
      question: "What should I put in the message?",
      answer:
        "The workflow that frustrates you most, who is involved, and the tools it runs through today. A few sentences are enough to start.",
    },
    {
      id: "q2",
      question: "Do we need to know what we want to build?",
      answer:
        "No. Most people describe a problem, not a solution. Mapping the workflow is how we find the first thing worth building.",
    },
    {
      id: "q3",
      question: "Can you work with the tools we already use?",
      answer:
        "Usually, yes. We connect the systems you have where we can, and only suggest replacing a tool when it is the bottleneck.",
    },
    {
      id: "q4",
      question: "How big does a first project have to be?",
      answer:
        "Small is better. Every engagement starts with one workflow and a focused first release, then grows from what it changes.",
    },
    {
      id: "q5",
      question: "Is the discovery call a sales pitch?",
      answer:
        "It is a working conversation about your workflow. If we are not the right fit for it, we will say so.",
    },
  ],
} as const satisfies FaqContent;

export function getContactContent() {
  return { intro, form, faq };
}
