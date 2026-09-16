import type { NavLink } from "@/features/site-header/navigation";

export type FooterColumn = { title: string; links: readonly NavLink[] };
export type SocialId = "facebook" | "linkedin" | "x";

export const footerTagline =
  "The modern project management tool for creative teams. Build, collaborate, and ship with confidence.";

export const footerColumns: readonly FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/docs" },
      { label: "Guides", href: "/guides" },
      { label: "Help Center", href: "/help" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
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
