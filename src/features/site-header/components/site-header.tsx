import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandMark } from "@/shared/ui/brand-mark";
import { ButtonLink } from "@/shared/ui/button-link";
import { NewBadge } from "@/shared/ui/new-badge";
import { headerActions, isNavGroup, primaryNav } from "../navigation";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/85 pr-2 pl-4 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_10px_30px_-18px_rgb(0_0_0/0.12)] backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        >
          <BrandMark className="size-6" />
          <span className="text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {primaryNav.map((item) =>
              isNavGroup(item) ? (
                <li key={item.label}>
                  <NavDropdown group={item} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-zinc-950"
                  >
                    {item.label}
                    {item.badge ? <NewBadge label={item.badge} /> : null}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink
            href={headerActions.signIn.href}
            variant="muted"
            size="sm"
          >
            {headerActions.signIn.label}
          </ButtonLink>
          <ButtonLink href={headerActions.contact.href} size="sm">
            {headerActions.contact.label}
          </ButtonLink>
        </div>

        <MobileNav
          items={primaryNav}
          actions={[headerActions.signIn, headerActions.contact]}
        />
      </div>
    </header>
  );
}
