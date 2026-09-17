import type { ApproachContent } from "./approach.types";

const approachContent = {
  eyebrow: "What makes Infrantic different",
  title: "Business-first, technology-second",
  description:
    "We build practical systems that solve real operational problems, rather than adding AI simply because it is fashionable.",
  difference: {
    label: "Our starting point",
    title: "We start with the business, not the tool",
    notAsked: {
      lead: "We don't start by asking",
      question: "What AI tool should we use?",
    },
    asked: {
      lead: "We start by asking",
      question: "What is slowing your business down?",
    },
    answer:
      "Then we determine whether the answer is automation, custom software, AI, integration, or a combination of all four.",
    outcome:
      "The result is a system that solves a real operational problem, not another tool to manage.",
  },
  philosophy: {
    label: "Our philosophy",
    title: "Technology should disappear into the workflow.",
    description:
      "The best business software doesn't create another layer of complexity. It quietly handles the repetitive work in the background, surfaces the information people need, and gives teams control when decisions matter.",
    closing: "That's what we build.",
    principles: [
      "Less manual work.",
      "Less fragmented data.",
      "Less operational friction.",
      "More intelligent businesses.",
    ],
  },
  personality: [
    {
      trait: "Intelligent",
      icon: "intelligent",
      description: "Technology-driven without being overly technical.",
    },
    {
      trait: "Precise",
      icon: "precise",
      description: "Systems that are engineered, not improvised.",
    },
    {
      trait: "Practical",
      icon: "practical",
      description: "Measurable business outcomes over AI hype.",
    },
    {
      trait: "Human",
      icon: "human",
      description: "Technology supports people, not replaces their judgment.",
    },
  ],
} as const satisfies ApproachContent;

export function getApproachContent(): ApproachContent {
  return approachContent;
}
