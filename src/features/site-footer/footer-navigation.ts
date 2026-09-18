import { type NavLink, serviceLinks } from "@/features/site-header/navigation";

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
      { label: "The problem we solve", href: "/#problem" },
      { label: "How we work", href: "/#workflow" },
      { label: "Industries", href: "/#industries" },
      { label: "Technology", href: "/#technology" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Book a discovery call", href: "/#contact" },
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
