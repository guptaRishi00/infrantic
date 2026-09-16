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

export const primaryNav: readonly NavItem[] = [
  { label: "Products", href: "/products" },
  {
    label: "Solutions",
    items: [
      {
        label: "Startups",
        href: "/solutions/startups",
        description: "Ship faster with a lean, organized team.",
      },
      {
        label: "Agencies",
        href: "/solutions/agencies",
        description: "Keep every client project on track.",
      },
      {
        label: "Enterprise",
        href: "/solutions/enterprise",
        description: "Scale workflows with security and control.",
      },
    ],
  },
  { label: "Services", href: "/services", badge: "New" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insight", href: "/insight" },
];

export const headerActions = {
  signIn: { label: "Sign in", href: "/sign-in" },
  contact: { label: "Contact", href: "/contact" },
} as const satisfies Record<string, NavLink>;
