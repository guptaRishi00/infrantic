import Link from "next/link";
import type { IconType } from "react-icons";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/shared/ui/brand-logo";
import {
  footerColumns,
  footerTagline,
  type SocialId,
  socialLinks,
} from "../footer-navigation";

const socialIcons: Record<SocialId, IconType> = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pt-24 pb-10 sm:pt-28">
      <div className="mx-auto max-w-[80rem]">
        <div className="border-b border-zinc-100 pb-10">
          <BrandLogo className="h-auto w-full" />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="max-w-xs text-[15px] leading-6 text-zinc-500">
              {footerTagline}
            </p>
            <ul className="mt-5 flex gap-2">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-9 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    <SocialIcon id={social.id} />
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
                <h2 className="text-[15px] font-medium text-ink">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-zinc-500 transition-colors hover:text-ink"
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

        <p className="mt-14 text-[13px] text-zinc-400">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ id }: { id: SocialId }) {
  const Icon = socialIcons[id];
  return <Icon aria-hidden="true" className="size-4" />;
}
