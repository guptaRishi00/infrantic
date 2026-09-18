"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
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
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-lg text-zinc-800 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-ink"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <nav
        id={panelId}
        hidden={!open}
        aria-label="Mobile"
        className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.2)]"
      >
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
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3">
          {actions.map((action, index) => (
            <ButtonLink
              key={action.href}
              href={action.href}
              onClick={close}
              size="sm"
              variant={index === actions.length - 1 ? "primary" : "muted"}
            >
              {action.label}
            </ButtonLink>
          ))}
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
