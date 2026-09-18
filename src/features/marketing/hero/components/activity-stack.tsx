import { Check, EllipsisVertical } from "lucide-react";
import type { CSSProperties } from "react";
import { SiGmail } from "react-icons/si";
import { cn } from "@/shared/lib/cn";
import type { Activity, Person } from "../hero.types";

// The three cards stay put at their stepped widths (100 / 88 / 72%, each tucked
// 6px under the one above). The animation rotates their *content* instead:
// every card holds all rows stacked in one grid cell, and `row-cycle` shows one
// row at a time, so each notification steps up a card every 4s. Widths never
// animate. Under reduced motion each card simply shows its own row.
// Every row rotates through the narrowest (72%) card, so the stack width in
// hero.tsx is sized for the longest row to fit there untruncated (about 294px).
const CYCLE_SECONDS = 12;
const cards = [
  "z-30 w-full",
  "z-20 -mt-1.5 w-[88%]",
  "z-10 -mt-1.5 w-[72%] opacity-80 [mask-image:linear-gradient(#000_55%,transparent)]",
] as const;

/** Illustrative stack of workspace notifications beneath the hero CTAs. */
export function ActivityStack({ activity }: { activity: readonly Activity[] }) {
  const rows = activity.slice(0, cards.length);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-60 w-[30rem] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(7_150_254/0.35),rgb(124_198_255/0.22)_50%,transparent)] blur-2xl"
      />
      <ul
        aria-label="Recent team activity"
        className="flex flex-col items-center"
      >
        {cards.map((cardClass, slot) => (
          <li
            key={cardClass}
            className={cn(
              "relative grid overflow-hidden rounded-lg border border-zinc-200/80 bg-white/95 px-3 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_28px_-14px_rgb(2_28_55/0.2)]",
              cardClass,
            )}
          >
            {rows.map((item, row) => {
              const own = row === slot;
              // Row `row` occupies card `slot` for the window starting at
              // ((row - slot) mod 3) * 4s; a negative delay lands it there at t = 0.
              const steps = (slot - row + cards.length) % cards.length;
              const style: CSSProperties = {
                animationDelay: `${-steps * (CYCLE_SECONDS / cards.length)}s`,
              };
              return (
                <div
                  key={item.id}
                  aria-hidden={own ? undefined : true}
                  className={cn(
                    "col-start-1 row-start-1 min-w-0 motion-safe:animate-row-cycle",
                    !own && "opacity-0",
                  )}
                  style={style}
                >
                  <ActivityRow item={item} />
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityRow({ item }: { item: Activity }) {
  switch (item.kind) {
    case "event":
      return (
        <div className="flex items-center gap-2.5">
          <Avatar person={item.person} badge="verified" />
          <div className="min-w-0 text-left">
            <p className="truncate text-[13px] text-zinc-600">
              <span className="font-medium text-ink">{item.person.name}</span>{" "}
              {item.action}{" "}
              <span className="font-medium text-ink">{item.target}</span>
            </p>
            <p className="mt-0.5 truncate text-[11px] text-zinc-500">
              {item.meta.join(" · ")}
            </p>
          </div>
        </div>
      );
    case "profile":
      return (
        <div className="flex items-center gap-2.5">
          <Avatar person={item.person} badge="online" />
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-[13px] font-medium text-ink">
              {item.person.name}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-zinc-500">
              {item.role} · <span className="text-zinc-400">{item.handle}</span>
            </p>
          </div>
          <EllipsisVertical
            aria-hidden="true"
            className="size-4 shrink-0 text-zinc-400"
          />
        </div>
      );
    case "email":
      return (
        <div className="flex items-center gap-2.5">
          <GmailIcon />
          <div className="min-w-0 text-left">
            <p className="truncate text-xs text-zinc-600">{item.sender}</p>
            <p className="mt-0.5 truncate text-[10px] text-zinc-400">
              {item.summary}
            </p>
          </div>
        </div>
      );
  }
}

function Avatar({
  person,
  badge,
}: {
  person: Person;
  badge: "verified" | "online";
}) {
  return (
    <span className="relative shrink-0">
      <span
        aria-hidden="true"
        className={cn(
          "grid size-8 place-items-center rounded-full bg-gradient-to-br text-[11px] font-semibold ring-2 ring-white",
          person.tone,
        )}
      >
        {person.initials}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-0.5 -right-0.5 grid size-3 place-items-center rounded-full ring-2 ring-white",
          badge === "verified" ? "bg-brand-gradient" : "bg-emerald-500",
        )}
      >
        <Check
          aria-hidden="true"
          className="size-2 text-white"
          strokeWidth={4}
        />
      </span>
    </span>
  );
}

function GmailIcon() {
  return (
    <span className="grid size-8 shrink-0 place-items-center">
      <SiGmail aria-hidden="true" className="size-5 text-[#EA4335]" />
    </span>
  );
}
