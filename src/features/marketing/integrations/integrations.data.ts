import type { IntegrationsContent } from "./integrations.types";

const integrationsContent = {
  eyebrow: "Our technology",
  title: "Modern engineering, AI, and automation",
  description:
    "We combine modern software engineering with AI and automation technologies.",
  // Spread evenly per ring; the rings turn, so these are starting angles.
  items: [
    { id: "openai", label: "OpenAI", ring: 0, angle: 0 },
    { id: "claude", label: "Claude", ring: 0, angle: 120 },
    { id: "gemini", label: "Gemini", ring: 0, angle: 240 },
    { id: "n8n", label: "n8n", ring: 1, angle: 45 },
    { id: "make", label: "Make", ring: 1, angle: 135 },
    { id: "zapier", label: "Zapier", ring: 1, angle: 225 },
    { id: "python", label: "Python", ring: 1, angle: 315, desktopOnly: true },
    { id: "supabase", label: "Supabase", ring: 2, angle: 10 },
    { id: "nextjs", label: "Next.js", ring: 2, angle: 82 },
    {
      id: "postgresql",
      label: "PostgreSQL",
      ring: 2,
      angle: 154,
      desktopOnly: true,
    },
    { id: "vercel", label: "Vercel", ring: 2, angle: 226, desktopOnly: true },
    { id: "github", label: "GitHub", ring: 2, angle: 298, desktopOnly: true },
  ],
  stack: [
    {
      category: "Intelligence",
      items: [
        { name: "OpenAI", logo: "openai" },
        { name: "Claude", logo: "claude" },
        { name: "Gemini", logo: "gemini" },
        { name: "Agents and retrieval" },
      ],
    },
    {
      category: "Automation",
      items: [
        { name: "n8n", logo: "n8n" },
        { name: "Make", logo: "make" },
        { name: "Zapier", logo: "zapier" },
      ],
    },
    {
      category: "Engineering",
      items: [
        { name: "Next.js", logo: "nextjs" },
        { name: "Python", logo: "python" },
        { name: "GitHub", logo: "github" },
        { name: "Vercel", logo: "vercel" },
      ],
    },
    {
      category: "Data",
      items: [
        { name: "Supabase", logo: "supabase" },
        { name: "PostgreSQL", logo: "postgresql" },
        { name: "Google Sheets", logo: "googleSheets" },
        { name: "Business APIs" },
      ],
    },
  ],
} as const satisfies IntegrationsContent;

export function getIntegrationsContent(): IntegrationsContent {
  return integrationsContent;
}
