import type { FaqContent } from "./faq.types";

const faqContent = {
  eyebrow: "FAQ",
  title: "Questions we hear often",
  description:
    "Don't see yours here? Book a discovery call and ask us directly.",
  items: [
    {
      id: "who",
      question: "What kind of businesses do you work with?",
      answer:
        "Businesses where operations run across spreadsheets, email, messaging, and disconnected tools: manufacturing, apparel, logistics, professional services, retail, and growing startups.",
    },
    {
      id: "replace-tools",
      question: "Do we have to replace the tools we already use?",
      answer:
        "Usually not. We connect and automate around the systems you already have, and only build custom software where a workflow genuinely needs it.",
    },
    {
      id: "start",
      question: "How does a project start?",
      answer:
        "With a discovery call and a short mapping of how the work runs today: the people, the tools, the bottlenecks, and the data. From there we propose a focused first system.",
    },
    {
      id: "timeline",
      question: "How long does it take to see results?",
      answer:
        "It depends on scope. We plan a focused first release so your team sees value early, then build the rest in stages.",
    },
    {
      id: "ai",
      question: "How do you use AI without losing control?",
      answer:
        "AI works as a controlled assistant: it drafts, classifies, and flags, while people keep the approvals and decisions that matter.",
    },
    {
      id: "after-launch",
      question: "What happens after launch?",
      answer:
        "We monitor, refine, and extend the system as the business changes. Ongoing support is part of how we work, not an afterthought.",
    },
  ],
} as const satisfies FaqContent;

/** Single read path for FAQ content; swap for a CMS later. */
export function getFaqContent(): FaqContent {
  return faqContent;
}
