export type NavLink = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: readonly NavLink[];
};

export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

/** The five service lines; also used by the footer. */
export const serviceLinks: readonly NavLink[] = [
  {
    label: "AI Automation",
    href: "/services#ai-automation",
    description: "Reduce manual work without removing human control.",
  },
  {
    label: "Business Process Automation",
    href: "/services#process-automation",
    description: "Faster, more consistent operations.",
  },
  {
    label: "Custom Software",
    href: "/services#custom-software",
    description: "Software that fits the way you work.",
  },
  {
    label: "Systems & Integrations",
    href: "/services#systems-integrations",
    description: "One connected digital ecosystem.",
  },
  {
    label: "Data & Operational Intelligence",
    href: "/services#data-intelligence",
    description: "Visibility into what is happening and why.",
  },
];

export const primaryNav: readonly NavItem[] = [
  { label: "Challenges", href: "/challenges" },
  { label: "Services", items: serviceLinks },
  { label: "Case studies", href: "/case-studies" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const headerActions = {
  secondary: { label: "Challenges", href: "/challenges" },
  primary: { label: "Book a call", href: "/#contact" },
} as const satisfies Record<string, NavLink>;
