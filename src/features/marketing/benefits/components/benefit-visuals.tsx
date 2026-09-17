import { Bot, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import { BrandMark } from "@/shared/ui/brand-mark";
import type { Collaborator } from "../benefits.types";

// Illustrative product mockups. Purely decorative: every root is aria-hidden.

const panel =
  "rounded-lg border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)]";

export function CollaborationVisual({
  people,
}: {
  people: readonly Collaborator[];
}) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full min-h-[22rem] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#5cbaff_0%,#0796fe_45%,#021c37_100%)] px-6 pt-8 pb-6"
    >
      {/* Soft light from below plus a faint grid, for depth. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgb(255_255_255/0.28),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [mask-image:radial-gradient(closest-side,#000,transparent)] bg-[size:28px_28px]" />

      <span className="relative grid size-14 place-items-center rounded-2xl bg-white/15 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_12px_32px_-8px_rgb(2_28_55/0.55)] ring-1 ring-white/25 backdrop-blur">
        <BrandMark className="size-7" />
      </span>

      <ul className="relative my-auto grid grid-cols-3 gap-x-4 gap-y-3 py-8">
        {people.map((person, index) => (
          <li
            key={person.name}
            className={cn(
              "flex flex-col items-center gap-1.5",
              index % 3 === 1 && "translate-y-6",
            )}
          >
            <CollaboratorTile person={person} />
            <span className="rounded-full bg-ink/40 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur">
              {person.role}
            </span>
          </li>
        ))}
      </ul>

      <span className="relative inline-flex items-center gap-2 rounded-full bg-ink/85 px-3.5 py-2 text-xs font-medium text-white shadow-lg ring-1 ring-white/10 backdrop-blur">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        Human in the loop
      </span>
    </div>
  );
}

function CollaboratorTile({ person }: { person: Collaborator }) {
  const tile =
    "relative size-[4.5rem] overflow-hidden rounded-2xl shadow-[0_14px_28px_-12px_rgb(2_28_55/0.6)] ring-2 ring-white/70";

  if (person.kind === "agent") {
    return (
      <span
        className={cn(
          tile,
          "grid place-items-center bg-[linear-gradient(145deg,#1a416b,#021c37)] text-white",
        )}
      >
        <Bot className="size-7" strokeWidth={1.75} />
      </span>
    );
  }

  return (
    <span className={tile}>
      <Image
        src={person.photo}
        alt=""
        fill
        sizes="72px"
        className="object-cover"
      />
    </span>
  );
}

const boardColumns = [
  {
    name: "Before · manual",
    count: 3,
    tasks: [
      {
        title: "Invoice entry",
        tag: "Finance",
        tone: "bg-brand-100 text-brand-700",
      },
      {
        title: "Lead follow-up",
        tag: "Sales",
        tone: "bg-brand-100 text-brand-700",
      },
    ],
  },
  {
    name: "After · automated",
    count: 2,
    tasks: [
      {
        title: "Invoice processing",
        tag: "Finance",
        tone: "bg-brand-100 text-brand-700",
      },
      {
        title: "Lead routing",
        tag: "Sales",
        tone: "bg-brand-100 text-brand-700",
      },
    ],
  },
] as const;

export function BoardsVisual() {
  return (
    <div
      aria-hidden="true"
      className="grid h-full grid-cols-2 gap-2.5 rounded-2xl bg-zinc-50 p-4"
    >
      {boardColumns.map((column) => (
        <div key={column.name} className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1 text-[11px] font-medium text-zinc-500">
            {column.name}
            <span className="rounded bg-zinc-200/70 px-1 text-[10px] text-zinc-500">
              {column.count}
            </span>
          </div>
          {column.tasks.map((task) => (
            <div key={task.title} className={cn(panel, "p-2.5")}>
              <p className="text-[11px] font-medium text-zinc-800">
                {task.title}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={cn(
                    "rounded px-1.5 py-px text-[9px] font-medium",
                    task.tone,
                  )}
                >
                  {task.tag}
                </span>
                <span className="h-1 w-8 overflow-hidden rounded-full bg-zinc-100">
                  <span className="block h-full w-2/3 rounded-full bg-zinc-300" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ReviewsVisual() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col gap-2.5 rounded-2xl bg-zinc-50 p-4"
    >
      <div className={cn(panel, "p-3")}>
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-gradient-to-br from-brand-100 to-brand-300" />
          <span className="text-[11px] font-medium text-zinc-800">
            Procurement bot
          </span>
          <span className="ml-auto text-[9px] text-zinc-400">2m</span>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-zinc-500">
          Purchase order #418 needs approval.
        </p>
      </div>
      <div className={cn(panel, "ml-6 p-3")}>
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-gradient-to-br from-ink-700 to-ink" />
          <span className="text-[11px] font-medium text-zinc-800">
            Priya Shah
          </span>
          <span className="ml-auto grid size-3.5 place-items-center rounded-full bg-emerald-500 text-white">
            <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-zinc-500">
          Approved. Synced to ERP.
        </p>
      </div>
      <span className="mx-auto mt-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-700 shadow-sm">
        <span className="size-1.5 rounded-full bg-brand" />
        Approve &amp; sync
      </span>
    </div>
  );
}

const timeRows = [
  {
    task: "Invoices processed",
    status: "Running",
    tone: "bg-amber-50 text-amber-700",
    time: "412",
    progress: "w-3/4",
  },
  {
    task: "Orders synced",
    status: "Needs review",
    tone: "bg-brand-50 text-brand-700",
    time: "836",
    progress: "w-1/2",
  },
  {
    task: "Reports generated",
    status: "Complete",
    tone: "bg-emerald-50 text-emerald-700",
    time: "36",
    progress: "w-full",
  },
] as const;

export function TrackingVisual() {
  return (
    <div aria-hidden="true" className="h-full rounded-2xl bg-zinc-50 p-4">
      <div className={cn(panel, "overflow-hidden")}>
        <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5">
          <div>
            <p className="text-[10px] text-zinc-400">Automated today</p>
            <p className="text-sm font-semibold tracking-tight text-ink tabular-nums">
              1,284 tasks
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-ink px-2 py-1 text-[10px] font-medium text-white">
            <span className="size-1.5 animate-pulse rounded-full bg-red-400 motion-reduce:animate-none" />
            Live
          </span>
        </div>
        <ul className="divide-y divide-zinc-100">
          {timeRows.map((row) => (
            <li
              key={row.task}
              className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center gap-3 px-3 py-2.5 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr]"
            >
              <span className="truncate text-[11px] font-medium text-zinc-800">
                {row.task}
              </span>
              <span
                className={cn(
                  "w-fit rounded px-1.5 py-px text-[9px] font-medium",
                  row.tone,
                )}
              >
                {row.status}
              </span>
              <span className="text-[11px] text-zinc-500 tabular-nums">
                {row.time}
              </span>
              <span className="hidden h-1.5 overflow-hidden rounded-full bg-zinc-100 sm:block">
                <span
                  className={cn(
                    "block h-full rounded-full bg-brand-300",
                    row.progress,
                  )}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
