import { cn } from "@/shared/lib/cn";
import { BrandMark } from "@/shared/ui/brand-mark";
import { CheckIcon } from "@/shared/ui/icons";
import { type AvatarPerson, InitialsAvatar } from "@/shared/ui/initials-avatar";

// Illustrative product mockups. Purely decorative: every root is aria-hidden.

const panel =
  "rounded-lg border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)]";

export function CollaborationVisual({
  people,
}: {
  people: readonly AvatarPerson[];
}) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full min-h-[22rem] flex-col items-center overflow-hidden rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,#a78bfa_0%,#7c3aed_45%,#6d28d9_100%)] px-6 pt-8 pb-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgb(255_255_255/0.28),transparent_60%)]" />
      <span className="relative grid size-16 place-items-center rounded-2xl bg-white/15 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_12px_32px_-8px_rgb(46_16_101/0.6)] ring-1 ring-white/25 backdrop-blur">
        <BrandMark className="size-8" />
      </span>
      <ul className="relative my-auto grid grid-cols-3 gap-4 py-8">
        {people.map((person, index) => (
          <li
            key={person.name}
            className={cn(index % 3 === 1 && "translate-y-5")}
          >
            <InitialsAvatar
              person={person}
              className="size-16 rounded-2xl text-sm shadow-[0_10px_24px_-10px_rgb(30_10_80/0.55)] ring-2 ring-white/70"
            />
          </li>
        ))}
      </ul>
      <span className="relative inline-flex items-center gap-2 rounded-full bg-zinc-950/85 px-3.5 py-2 text-xs font-medium text-white shadow-lg ring-1 ring-white/10">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        Automatic Collaboration
      </span>
    </div>
  );
}

const boardColumns = [
  {
    name: "Backlog",
    count: 3,
    tasks: [
      {
        title: "Moodboard",
        tag: "Brand",
        tone: "bg-violet-100 text-violet-700",
      },
      { title: "Copy draft", tag: "Web", tone: "bg-sky-100 text-sky-700" },
    ],
  },
  {
    name: "In review",
    count: 2,
    tasks: [
      { title: "Hero layout", tag: "Web", tone: "bg-sky-100 text-sky-700" },
      {
        title: "Logo system",
        tag: "Brand",
        tone: "bg-violet-100 text-violet-700",
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
          <span className="size-5 rounded-full bg-gradient-to-br from-amber-200 to-orange-300" />
          <span className="text-[11px] font-medium text-zinc-800">
            Ava Rossi
          </span>
          <span className="ml-auto text-[9px] text-zinc-400">2m</span>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-zinc-500">
          Can we bump the heading contrast a touch?
        </p>
      </div>
      <div className={cn(panel, "ml-6 p-3")}>
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-gradient-to-br from-sky-200 to-indigo-300" />
          <span className="text-[11px] font-medium text-zinc-800">
            Noah Kim
          </span>
          <span className="ml-auto grid size-3.5 place-items-center rounded-full bg-emerald-500 text-white">
            <CheckIcon className="size-2.5" />
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-zinc-500">
          Done — resolved in v3.
        </p>
      </div>
      <span className="mx-auto mt-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-700 shadow-sm">
        <span className="size-1.5 rounded-full bg-violet-500" />
        Comment &amp; Annotate
      </span>
    </div>
  );
}

const timeRows = [
  {
    task: "Brand refresh",
    status: "In progress",
    tone: "bg-amber-50 text-amber-700",
    time: "12h 40m",
    progress: "w-3/4",
  },
  {
    task: "Website redesign",
    status: "Review",
    tone: "bg-violet-50 text-violet-700",
    time: "8h 15m",
    progress: "w-1/2",
  },
  {
    task: "Launch campaign",
    status: "Done",
    tone: "bg-emerald-50 text-emerald-700",
    time: "21h 05m",
    progress: "w-full",
  },
] as const;

export function TrackingVisual() {
  return (
    <div aria-hidden="true" className="h-full rounded-2xl bg-zinc-50 p-4">
      <div className={cn(panel, "overflow-hidden")}>
        <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5">
          <div>
            <p className="text-[10px] text-zinc-400">This week</p>
            <p className="text-sm font-semibold tracking-tight text-zinc-900 tabular-nums">
              42:00:00
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-2 py-1 text-[10px] font-medium text-white">
            <span className="size-1.5 animate-pulse rounded-full bg-red-400 motion-reduce:animate-none" />
            Tracking
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
                    "block h-full rounded-full bg-violet-400",
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
