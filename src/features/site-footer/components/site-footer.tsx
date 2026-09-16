import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandMark } from "@/shared/ui/brand-mark";
import {
  footerColumns,
  footerTagline,
  type SocialId,
  socialLinks,
} from "../footer-navigation";

const socialIcons: Record<SocialId, string> = {
  facebook:
    "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21Z",
  linkedin:
    "M6.9 8.9H3.8V20h3.1ZM5.3 3.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM20 13.9c0-3-1.6-5.2-4.6-5.2-1.5 0-2.5.8-2.9 1.5V8.9H9.5V20h3.1v-5.5c0-1.5.3-2.9 2.1-2.9s1.9 1.7 1.9 3V20H20Z",
  x: "M17.8 3.5h2.9l-6.4 7.3 7.5 9.7h-5.9l-4.6-6-5.3 6H3.1l6.8-7.8L2.7 3.5h6l4.2 5.5Zm-1 15.3h1.6L7.9 5.1H6.2Z",
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6 border-b border-zinc-100 pb-8">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#a78bfa,#6d28d9)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">
            <BrandMark className="size-6" />
          </span>
          <p
            aria-hidden="true"
            className="-mb-3 text-[clamp(3.5rem,15vw,11.5rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-zinc-950 lowercase select-none"
          >
            {siteConfig.name}
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="max-w-xs text-sm leading-6 text-zinc-500">
              {footerTagline}
            </p>
            <ul className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-9 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-zinc-950"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-4"
                    >
                      <path fill="currentColor" d={socialIcons[social.id]} />
                    </svg>
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium text-zinc-950">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-950"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-14 text-xs text-zinc-400">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
