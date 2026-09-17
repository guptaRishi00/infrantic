import type { IntegrationsContent } from "./integrations.types";

const integrationsContent = {
  eyebrow: "Our technology",
  title: "Modern engineering, AI, and automation",
  description:
    "We combine modern software engineering with AI and automation technologies.",
  items: [
    { id: "openai", label: "OpenAI", x: 12, y: 14 },
    { id: "claude", label: "Claude", x: 28, y: 44 },
    { id: "n8n", label: "n8n", x: 5, y: 56, desktopOnly: true },
    { id: "make", label: "Make", x: 20, y: 84 },
    { id: "zapier", label: "Zapier", x: 40, y: 86 },
    { id: "python", label: "Python", x: 62, y: 14, desktopOnly: true },
    { id: "gemini", label: "Gemini", x: 90, y: 26 },
    { id: "supabase", label: "Supabase", x: 88, y: 58 },
    { id: "nextjs", label: "Next.js", x: 72, y: 76 },
    { id: "postgresql", label: "PostgreSQL", x: 64, y: 93, desktopOnly: true },
    { id: "vercel", label: "Vercel", x: 80, y: 8, desktopOnly: true },
    { id: "github", label: "GitHub", x: 36, y: 12, desktopOnly: true },
  ],
  stack: [
    {
      category: "AI",
      icon: "ai",
      items: [
        "OpenAI",
        "Claude",
        "Gemini",
        "LLMs",
        "AI Agents",
        "RAG",
        "AI-powered workflows",
      ],
    },
    {
      category: "Automation",
      icon: "automation",
      items: ["n8n", "Make", "Zapier", "APIs", "Webhooks", "Workflow engines"],
    },
    {
      category: "Software",
      icon: "software",
      items: [
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "TypeScript",
        "REST APIs",
      ],
    },
    {
      category: "Infrastructure",
      icon: "infrastructure",
      items: [
        "Supabase",
        "PostgreSQL",
        "Vercel",
        "Cloud Infrastructure",
        "GitHub",
      ],
    },
    {
      category: "Integrations",
      icon: "integrations",
      items: [
        "CRM",
        "ERP",
        "Accounting",
        "Payments",
        "Communication",
        "Business APIs",
      ],
    },
  ],
  footnote:
    "Our technology choices are driven by the problem, not by a fixed stack.",
} as const satisfies IntegrationsContent;

export function getIntegrationsContent(): IntegrationsContent {
  return integrationsContent;
}
