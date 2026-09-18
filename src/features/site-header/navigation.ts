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
    href: "/#services",
    description: "Reduce manual work without removing human control.",
  },
  {
    label: "Business Process Automation",
    href: "/#services",
    description: "Faster, more consistent operations.",
  },
  {
    label: "Custom Software",
    href: "/#services",
    description: "Software that fits the way you work.",
  },
  {
    label: "Systems & Integrations",
    href: "/#services",
    description: "One connected digital ecosystem.",
  },
  {
    label: "Data & Operational Intelligence",
    href: "/#services",
    description: "Visibility into what is happening and why.",
  },
];

export const primaryNav: readonly NavItem[] = [
  { label: "Services", items: serviceLinks },
  { label: "How we work", href: "/#workflow" },
  { label: "Industries", href: "/#industries" },
  { label: "Technology", href: "/#technology" },
  { label: "FAQ", href: "/#faq" },
];

export const headerActions = {
  secondary: { label: "The problem", href: "/#problem" },
  primary: { label: "Book a call", href: "/#contact" },
} as const satisfies Record<string, NavLink>;
