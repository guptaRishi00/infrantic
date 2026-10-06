"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import { NewBadge } from "@/shared/ui/new-badge";
import {
  isNavGroup,
  type NavGroup,
  type NavItem,
  type NavLink,
} from "../navigation";

type MobileNavProps = {
  items: readonly NavItem[];
  actions: readonly NavLink[];
};

export function MobileNav({ items, actions }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = () => setOpen(false);

  // Any navigation closes the menu, not only a tap on one of its links
  // (back/forward, or a link elsewhere on the page while it is open).
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        data-mobile-toggle
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-lg text-zinc-800 max-sm:size-11 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-ink"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <Menu aria-hidden="true" className="size-6" />
        )}
      </button>

      {/* Opens like SoftexEdge's mobile menu: attached under the bar (which
          squares its bottom corners while open), so the bar grows into one
          card, and unfolds as an always-mounted grid-rows accordion (CSS
          only, no JS per frame). `invisible` keeps the closed links out of
          the focus order and the accessibility tree. */}
      <nav
        id={panelId}
        aria-label="Mobile"
        className={cn(
          "absolute inset-x-0 top-full grid rounded-b-2xl border border-t-0 border-zinc-200/80 bg-white shadow-[0_16px_40px_-16px_rgb(0_0_0/0.2)] transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          open
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain p-2">
            <div className="flex flex-col px-2">
              {items.map((item) =>
                isNavGroup(item) ? (
                  <MobileNavGroup
                    key={item.label}
                    item={item}
                    menuOpen={open}
                    onNavigate={close}
                  />
                ) : (
                  <MobileLink key={item.label} link={item} onNavigate={close} />
                ),
              )}
            </div>
            <div className="mt-4 grid auto-cols-fr grid-flow-col gap-2 pt-3 max-sm:mt-1 max-sm:pt-1">
              {actions.map((action, index) => (
                <ButtonLink
                  key={action.href}
                  href={action.href}
                  onClick={close}
                  variant={index === actions.length - 1 ? "primary" : "muted"}
                >
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function MobileNavGroup({
  item,
  menuOpen,
  onNavigate,
}: {
  item: NavGroup;
  menuOpen: boolean;
  onNavigate: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Closing the menu folds its groups too, so it reopens collapsed.
  const [wasOpen, setWasOpen] = useState(menuOpen);
  if (menuOpen !== wasOpen) {
    setWasOpen(menuOpen);
    if (!menuOpen) setIsExpanded(false);
  }

  return (
    <div className="w-full border-b border-zinc-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between py-3.5 text-left text-lg font-medium text-zinc-900"
      >
        <span>{item.label}</span>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "shrink-0 text-zinc-400 transition-transform duration-200",
            isExpanded ? "rotate-180" : "",
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={cn(
          "grid w-full transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isExpanded
            ? "visible grid-rows-[1fr] opacity-100"
            : "invisible grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 w-full overflow-hidden">
          <div className="mb-3 flex w-full flex-col rounded-xl bg-zinc-50 px-3 py-1">
            {item.items.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                onClick={onNavigate}
                className="flex w-full items-center justify-between gap-2 py-2.5 text-left text-base text-zinc-600 transition-colors hover:text-zinc-900"
              >
                {child.label}
                {child.badge ? <NewBadge label={child.badge} /> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate: () => void;
}) {
  return (
    <div className="w-full border-b border-zinc-100 last:border-b-0">
      <Link
        href={link.href}
        onClick={onNavigate}
        className="flex w-full items-center justify-between py-3.5 text-left text-lg font-medium text-zinc-900 transition-colors hover:text-zinc-600"
      >
        {link.label}
        {link.badge ? <NewBadge label={link.badge} /> : null}
      </Link>
    </div>
  );
}
