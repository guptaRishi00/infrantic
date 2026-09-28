import {
  type NavLink,
  sectorLinks,
  serviceLinks,
} from "@/features/site-header/navigation";

export type FooterColumn = { title: string; links: readonly NavLink[] };
export type SocialId = "facebook" | "linkedin" | "x";

export const footerTagline =
  "Infrantic turns complex business processes into intelligent, automated systems.";

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Services",
    links: serviceLinks.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Challenges", href: "/challenges" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Sectors",
    links: sectorLinks.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const socialLinks: readonly {
  id: SocialId;
  label: string;
  href: string;
}[] = [
  { id: "facebook", label: "Facebook", href: "https://facebook.com" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { id: "x", label: "X", href: "https://x.com" },
];
