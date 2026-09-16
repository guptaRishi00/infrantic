import { cn } from "@/shared/lib/cn";
import type { Activity, Person } from "../hero.types";

const layers = [
  "z-30 w-full",
  "z-20 -mt-1.5 w-[88%]",
  "z-10 -mt-1.5 w-[72%] opacity-80 [mask-image:linear-gradient(#000_55%,transparent)]",
] as const;

/** Illustrative stack of workspace notifications beneath the hero CTAs. */
export function ActivityStack({ activity }: { activity: readonly Activity[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-72 w-[36rem] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(96_165_250/0.5),rgb(147_197_253/0.28)_50%,transparent)] blur-2xl"
      />
      <ul
        aria-label="Recent team activity"
        className="flex flex-col items-center"
      >
        {activity.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "relative rounded-xl border border-zinc-200/80 bg-white/95 px-3.5 py-3 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_28px_-14px_rgb(24_24_27/0.2)]",
              layers[Math.min(index, layers.length - 1)],
            )}
          >
            <ActivityRow item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityRow({ item }: { item: Activity }) {
  switch (item.kind) {
    case "joined":
      return (
        <div className="flex items-center gap-3">
          <Avatar person={item.person} badge="verified" />
          <div className="min-w-0 text-left">
            <p className="truncate text-sm text-zinc-600">
              <span className="font-medium text-zinc-950">
                {item.person.name}
              </span>{" "}
              joined to{" "}
              <span className="font-medium text-zinc-950">{item.target}</span>
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-500">
              {item.meta.join(" · ")}
            </p>
          </div>
        </div>
      );
    case "profile":
      return (
        <div className="flex items-center gap-3">
          <Avatar person={item.person} badge="online" />
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium text-zinc-950">
              {item.person.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-500">
              {item.role} · <span className="text-zinc-400">{item.handle}</span>
            </p>
          </div>
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-4 shrink-0 text-zinc-400"
          >
            <g fill="currentColor">
              <circle cx="8" cy="3.5" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="12.5" r="1.2" />
            </g>
          </svg>
        </div>
      );
    case "email":
      return (
        <div className="flex items-center gap-3">
          <GmailIcon />
          <div className="min-w-0 text-left">
            <p className="truncate text-[13px] text-zinc-600">{item.sender}</p>
            <p className="mt-0.5 truncate text-[11px] text-zinc-400">
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
          "grid size-9 place-items-center rounded-full bg-gradient-to-br text-xs font-semibold ring-2 ring-white",
          person.tone,
        )}
      >
        {person.initials}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-0.5 -right-0.5 grid size-3.5 place-items-center rounded-full ring-2 ring-white",
          badge === "verified" ? "bg-blue-500" : "bg-emerald-500",
        )}
      >
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="size-2 text-white"
        >
          <path
            d="m2.5 6.2 2.2 2.2 4.8-4.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  );
}

function GmailIcon() {
  return (
    <span className="grid size-9 shrink-0 place-items-center">
      <svg viewBox="0 0 48 48" aria-hidden="true" className="size-6">
        <path
          fill="#4CAF50"
          d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z"
        />
        <path
          fill="#1E88E5"
          d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z"
        />
        <path
          fill="#E53935"
          d="M35 11.2 24 19.45 13 11.2 12 17l1 6.7 11 8.25 11-8.25 1-6.7z"
        />
        <path
          fill="#C62828"
          d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z"
        />
        <path
          fill="#FBC02D"
          d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 45 12.298z"
        />
      </svg>
    </span>
  );
}
