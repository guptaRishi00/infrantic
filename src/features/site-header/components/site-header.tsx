import Link from "next/link";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { ButtonLink } from "@/shared/ui/button-link";
import { NewBadge } from "@/shared/ui/new-badge";
import { headerActions, isNavGroup, primaryNav } from "../navigation";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/85 pr-2 pl-4 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_10px_30px_-18px_rgb(0_0_0/0.12)] backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <BrandLogo priority className="h-[18px] w-auto sm:h-5" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center">
            {primaryNav.map((item) =>
              isNavGroup(item) ? (
                <li key={item.label}>
                  <NavDropdown group={item} />
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-zinc-700 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
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
            href={headerActions.secondary.href}
            variant="muted"
            size="sm"
          >
            {headerActions.secondary.label}
          </ButtonLink>
          <ButtonLink href={headerActions.primary.href} size="sm">
            {headerActions.primary.label}
          </ButtonLink>
        </div>

        <MobileNav
          items={primaryNav}
          actions={[headerActions.secondary, headerActions.primary]}
        />
      </div>
    </header>
  );
}
