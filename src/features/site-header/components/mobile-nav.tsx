"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/button-link";
import { NewBadge } from "@/shared/ui/new-badge";
import { isNavGroup, type NavItem, type NavLink } from "../navigation";

type MobileNavProps = {
  items: readonly NavItem[];
  actions: readonly NavLink[];
};

export function MobileNav({ items, actions }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = () => setOpen(false);

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
        className="grid size-10 place-items-center rounded-lg text-zinc-800 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-ink"
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
            <ul className="flex flex-col">
              {items.map((item) =>
                isNavGroup(item) ? (
                  <li key={item.label} className="py-1">
                    <span className="block px-3 pt-2 pb-1 text-xs font-medium tracking-wide text-zinc-400 uppercase">
                      {item.label}
                    </span>
                    <ul>
                      {item.items.map((child) => (
                        <li key={child.label}>
                          <MobileLink link={child} onNavigate={close} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <MobileLink link={item} onNavigate={close} />
                  </li>
                ),
              )}
            </ul>
            <div className="mt-2 grid auto-cols-fr grid-flow-col gap-2 border-t border-zinc-100 pt-3">
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

function MobileLink({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
    >
      {link.label}
      {link.badge ? <NewBadge label={link.badge} /> : null}
    </Link>
  );
}
