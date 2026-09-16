import type { IntegrationsContent } from "./integrations.types";

const integrationsContent = {
  title: "Seamless platform integrations",
  description:
    "Connect your favorite tools, automate workflows, and manage everything from a single workspace.",
  items: [
    {
      kind: "person",
      person: {
        name: "Ava Rossi",
        initials: "AR",
        tone: "from-sky-200 to-indigo-300 text-indigo-900",
      },
      x: 12,
      y: 14,
    },
    { kind: "logo", id: "slack", label: "Slack", x: 28, y: 44 },
    {
      kind: "logo",
      id: "zapier",
      label: "Zapier",
      x: 5,
      y: 56,
      desktopOnly: true,
    },
    { kind: "logo", id: "mailchimp", label: "Mailchimp", x: 20, y: 84 },
    { kind: "logo", id: "pinwheel", label: "Workspace", x: 40, y: 86 },
    {
      kind: "person",
      person: {
        name: "Leo Park",
        initials: "LP",
        tone: "from-amber-200 to-orange-300 text-orange-900",
      },
      x: 62,
      y: 14,
      desktopOnly: true,
    },
    { kind: "logo", id: "meta", label: "Meta", x: 90, y: 26 },
    { kind: "logo", id: "clickup", label: "ClickUp", x: 88, y: 58 },
    {
      kind: "person",
      person: {
        name: "Mia Chen",
        initials: "MC",
        tone: "from-rose-200 to-pink-300 text-rose-900",
      },
      x: 72,
      y: 76,
    },
    {
      kind: "logo",
      id: "stackedBars",
      label: "Forms",
      x: 64,
      y: 93,
      desktopOnly: true,
    },
    {
      kind: "logo",
      id: "airtable",
      label: "Airtable",
      x: 80,
      y: 8,
      desktopOnly: true,
    },
  ],
} as const satisfies IntegrationsContent;

export function getIntegrationsContent(): IntegrationsContent {
  return integrationsContent;
}
