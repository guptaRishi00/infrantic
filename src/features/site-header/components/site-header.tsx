import Link from "next/link";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { ButtonLink } from "@/shared/ui/button-link";
import { NewBadge } from "@/shared/ui/new-badge";
import { headerActions, isNavGroup, primaryNav } from "../navigation";
import { AutoHideHeader } from "./auto-hide-header";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";

export function SiteHeader() {
  return (
    <AutoHideHeader>
      {/* Phones: a smaller bar with tighter padding. Below lg, while the
          mobile menu is open the bar squares its bottom corners and drops its
          bottom border, so it and the menu read as one card. */}
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/95 pr-[1.125rem] pl-6 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_10px_30px_-18px_rgb(0_0_0/0.12)] max-lg:transition-[border-radius] max-lg:duration-200 max-lg:has-[[data-mobile-toggle][aria-expanded=true]]:rounded-b-none max-lg:has-[[data-mobile-toggle][aria-expanded=true]]:border-b-transparent max-sm:h-14 max-sm:pr-2 max-sm:pl-4">
        {/* Faint brand hairline along the bottom edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-[linear-gradient(90deg,rgb(4_126_253/0),rgb(4_126_253/0.45),rgb(7_161_253/0))]"
        />
        <Link
          href="/"
          className="flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink max-lg:-my-3 max-lg:py-3"
        >
          <BrandLogo priority className="h-4 w-auto sm:h-5" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center lg:gap-2 xl:gap-4">
            {primaryNav.map((item) =>
              isNavGroup(item) ? (
                <li key={item.label}>
                  <NavDropdown group={item} />
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-zinc-700 xl:px-3 focus-visible:outline-2 focus-visible:outline-ink"
                  >
                    {/* The gradient is always clipped to the text; it shows
                        when the text colour goes transparent on hover. */}
                    <span className="bg-brand-gradient bg-clip-text transition-colors group-hover:text-transparent">
                      {item.label}
                    </span>
                    {item.badge ? <NewBadge label={item.badge} /> : null}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href={headerActions.primary.href} size="sm">
            {headerActions.primary.label}
          </ButtonLink>
        </div>

        <MobileNav items={primaryNav} actions={[headerActions.primary]} />
      </div>
    </AutoHideHeader>
  );
}
