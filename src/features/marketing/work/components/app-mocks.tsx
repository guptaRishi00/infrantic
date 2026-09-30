import {
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  FolderKanban,
  List,
  ListChecks,
  type LucideIcon,
  Plus,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Illustrative product screens (not real client data). Both are decorative:
// the wrapper is role="img" with a text alternative, the inner UI aria-hidden.

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className="flex flex-1 flex-col">
      {/* Stretches to the panel's visual area; the window body grows with it. */}
      <div
        aria-hidden="true"
        className="flex flex-1 flex-col overflow-x-auto rounded-xl border border-white/10 bg-[#04182f] [scrollbar-width:thin]"
      >
        <div className="flex min-w-[40rem] flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

function Chip({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "brand";
}) {
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-1 font-mono text-[10px] tracking-wide uppercase",
        tone === "brand"
          ? "border-brand-300/40 bg-brand/10 text-brand-300"
          : "border-white/10 text-zinc-400",
      )}
    >
      {children}
    </span>
  );
}

function ToolbarButton({
  icon: Icon,
  children,
  active = false,
}: {
  icon: LucideIcon;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px]",
        active
          ? "border-brand-300/40 bg-brand/10 text-brand-300"
          : "border-white/10 text-zinc-300",
      )}
    >
      <Icon className="size-3.5" />
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// AI technical document proofreader: an active review. The document page on
// the left carries numbered highlights that match the findings on the right.

type Severity = "high" | "medium" | "low";

const SEVERITY_TONE: Record<Severity, string> = {
  high: "border-red-400/30 bg-red-400/10 text-red-300",
  medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  low: "border-white/10 bg-white/[0.04] text-zinc-400",
};

const FINDINGS: readonly {
  id: number;
  title: string;
  detail: string;
  page: string;
  severity: Severity;
}[] = [
  {
    id: 1,
    title: "Mixed units",
    detail: "Flange spacing given in mm and cm",
    page: "p. 4",
    severity: "high",
  },
  {
    id: 2,
    title: "Unapproved term",
    detail: "“flowrate” → “flow rate”",
    page: "p. 4",
    severity: "medium",
  },
  {
    id: 3,
    title: "Missing reference",
    detail: "Figure 7 is cited but not included",
    page: "p. 5",
    severity: "medium",
  },
  {
    id: 4,
    title: "Tolerance format",
    detail: "Use ±0.5 mm, not +/- 0.5",
    page: "p. 6",
    severity: "low",
  },
];

// One row per text line on the page: bar widths (%), and an optional finding
// highlighted on that line.
const PAGE_LINES: readonly { widths: readonly number[]; finding?: number }[] = [
  { widths: [34] },
  { widths: [92] },
  { widths: [58, 26], finding: 1 },
  { widths: [88] },
  { widths: [40, 22, 20], finding: 2 },
  { widths: [76] },
  { widths: [90] },
  { widths: [30, 44], finding: 3 },
  { widths: [84] },
  { widths: [62] },
  { widths: [48, 28], finding: 4 },
  { widths: [70] },
];

export function ProofreaderMock({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex items-center gap-2.5 rounded-lg border border-white/10 px-2.5 py-1.5">
          <span className="grid size-6 place-items-center rounded-md bg-brand-gradient text-white">
            <FileText className="size-3.5" />
          </span>
          <span className="text-xs leading-tight font-semibold text-white">
            ProofDesk
            <span className="block text-[10px] font-normal text-zinc-400">
              SPEC-2211 · Rev C · 42 pages
            </span>
          </span>
        </span>
        <Chip tone="brand">AI first pass done</Chip>
        <span className="ml-auto flex gap-1.5">
          <ToolbarButton icon={BookOpen}>Dictionary</ToolbarButton>
          <ToolbarButton icon={Download}>Export</ToolbarButton>
          <ToolbarButton icon={ShieldCheck} active>
            Sign off
          </ToolbarButton>
        </span>
      </div>

      <div className="grid flex-1 grid-cols-[1.1fr_1fr]">
        {/* Document page with numbered highlights. */}
        <div className="flex flex-col border-r border-white/10 bg-[radial-gradient(80%_100%_at_50%_0%,rgb(7_150_254/0.08),transparent)] p-5">
          <div className="flex flex-1 flex-col rounded-lg bg-[#f4f7fb] px-5 py-4 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.8)]">
            <p className="font-mono text-[9px] tracking-wide text-zinc-500 uppercase">
              4.2 Flange assembly
            </p>
            <div className="mt-3 flex flex-1 flex-col justify-between gap-2">
              {PAGE_LINES.map((line, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative lines
                  key={index}
                  className="flex items-center gap-1.5"
                >
                  {line.widths.map((width, part) => (
                    <span
                      // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative bars
                      key={part}
                      className={cn(
                        "h-1.5 rounded-full",
                        line.finding && part === line.widths.length - 1
                          ? "bg-amber-400/70 ring-2 ring-amber-400/30"
                          : "bg-zinc-300",
                      )}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                  {line.finding ? (
                    <span className="ml-auto grid size-4 shrink-0 place-items-center rounded-full bg-ink font-mono text-[9px] leading-none text-white">
                      {line.finding}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2.5 flex justify-between text-[10px] text-zinc-500">
            <span>Page 4 of 42</span>
            <span>100%</span>
          </p>
        </div>

        {/* Findings for the reviewer. */}
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] tracking-wide text-brand-300 uppercase">
              Findings
            </p>
            <span className="flex gap-1.5">
              <Chip>4 flagged</Chip>
              <Chip>18 passed</Chip>
            </span>
          </div>
          <ul className="mt-3 flex-1 space-y-2">
            {FINDINGS.map((finding) => (
              <li
                key={finding.id}
                className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
              >
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-[9px] leading-none text-white">
                  {finding.id}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-white">
                      {finding.title}
                    </span>
                    <span
                      className={cn(
                        "rounded border px-1.5 py-px font-mono text-[9px] uppercase",
                        SEVERITY_TONE[finding.severity],
                      )}
                    >
                      {finding.severity}
                    </span>
                  </span>
                  <span className="mt-0.5 flex justify-between gap-2 text-[10px] text-zinc-400">
                    <span className="truncate">{finding.detail}</span>
                    <span className="shrink-0 text-zinc-500">
                      {finding.page}
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-white/10 pt-3">
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>Reviewer: Checker A</span>
              <span className="text-amber-300">Awaiting sign-off</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[82%] rounded-full bg-brand-gradient" />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ---------------------------------------------------------------------------
// Role-based task management: a Kanban board. Each card carries the role that
// owns its current stage, the due date, and overdue / rework flags.

type Role = "Executor" | "Checker" | "Approver";

const ROLE_TONE: Record<Role, string> = {
  Executor: "border-white/10 text-zinc-300",
  Checker: "border-amber-400/30 text-amber-300",
  Approver: "border-emerald-400/30 text-emerald-300",
};

const COLUMNS: readonly {
  id: string;
  title: string;
  dot: string;
  cards: readonly {
    id: string;
    title: string;
    role: Role;
    owner: string;
    due: string;
    overdue?: boolean;
    rework?: boolean;
  }[];
}[] = [
  {
    id: "todo",
    title: "To do",
    dot: "bg-zinc-500",
    cards: [
      {
        id: "TSK-107",
        title: "Supplier audit checklist",
        role: "Executor",
        owner: "AK",
        due: "14 Jun",
      },
      {
        id: "TSK-108",
        title: "Drawing revision log",
        role: "Executor",
        owner: "MP",
        due: "15 Jun",
      },
    ],
  },
  {
    id: "doing",
    title: "In progress",
    dot: "bg-brand",
    cards: [
      {
        id: "TSK-102",
        title: "Engineering analysis",
        role: "Executor",
        owner: "RS",
        due: "04 Jun",
        overdue: true,
      },
      {
        id: "TSK-105",
        title: "Documentation update",
        role: "Executor",
        owner: "AK",
        due: "09 Jun",
      },
    ],
  },
  {
    id: "review",
    title: "In review",
    dot: "bg-amber-400",
    cards: [
      {
        id: "TSK-101",
        title: "Material review",
        role: "Checker",
        owner: "JD",
        due: "02 Jun",
        overdue: true,
      },
      {
        id: "TSK-104",
        title: "Quality inspection",
        role: "Checker",
        owner: "JD",
        due: "06 Jun",
        rework: true,
      },
    ],
  },
  {
    id: "done",
    title: "Approved",
    dot: "bg-emerald-400",
    cards: [
      {
        id: "TSK-103",
        title: "Vendor coordination",
        role: "Approver",
        owner: "LN",
        due: "03 Jun",
      },
      {
        id: "TSK-106",
        title: "Risk assessment",
        role: "Approver",
        owner: "LN",
        due: "10 Jun",
      },
    ],
  },
];

const VIEWS = [
  { icon: FolderKanban, label: "Board", active: true },
  { icon: List, label: "List", active: false },
  { icon: CalendarDays, label: "Timeline", active: false },
] as const;

export function TaskBoardMock({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex items-center gap-2 pr-1">
          <span className="grid size-6 place-items-center rounded-md bg-brand-gradient text-white">
            <ListChecks className="size-3.5" />
          </span>
          <span className="text-xs leading-tight font-semibold text-white">
            Operations
            <span className="block text-[10px] font-normal text-zinc-400">
              Review workflow
            </span>
          </span>
        </span>
        <span className="flex gap-1.5">
          {VIEWS.map((view) => (
            <ToolbarButton
              key={view.label}
              icon={view.icon}
              active={view.active}
            >
              {view.label}
            </ToolbarButton>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="rounded-md border border-red-400/30 bg-red-400/10 px-2 py-1 font-mono text-[10px] text-red-300 uppercase">
            2 overdue
          </span>
          <ToolbarButton icon={Plus}>New task</ToolbarButton>
        </span>
      </div>

      <div className="grid flex-1 grid-cols-4 gap-3 bg-[radial-gradient(80%_100%_at_50%_0%,rgb(7_150_254/0.08),transparent)] p-4">
        {COLUMNS.map((column) => (
          <div
            key={column.id}
            className="flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-2.5"
          >
            <p className="flex items-center gap-2 px-1 text-[11px] font-semibold text-white">
              <span className={cn("size-1.5 rounded-full", column.dot)} />
              {column.title}
              <span className="ml-auto font-mono text-[10px] font-normal text-zinc-500">
                {column.cards.length}
              </span>
            </p>
            <ul className="mt-2.5 flex-1 space-y-2">
              {column.cards.map((card) => (
                <li
                  key={card.id}
                  className="rounded-lg border border-white/10 bg-[#082443] p-2.5"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-zinc-500">
                      {card.id}
                    </span>
                    {card.overdue ? (
                      <span className="flex items-center gap-1 text-[9px] font-medium text-red-300">
                        <span className="size-1 rounded-full bg-red-400" />
                        Overdue
                      </span>
                    ) : card.rework ? (
                      <span className="flex items-center gap-1 text-[9px] font-medium text-amber-300">
                        <RotateCcw className="size-2.5" />
                        Rework
                      </span>
                    ) : null}
                  </span>
                  <p className="mt-1 text-[11px] leading-snug font-medium text-white">
                    {card.title}
                  </p>
                  <span className="mt-2 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "rounded border px-1.5 py-px text-[9px]",
                        ROLE_TONE[card.role],
                      )}
                    >
                      {card.role}
                    </span>
                    <span className="ml-auto text-[9px] whitespace-nowrap text-zinc-500">
                      {card.due}
                    </span>
                    <span className="grid size-4 place-items-center rounded-full bg-white/10 text-[7px] font-semibold text-zinc-200">
                      {card.owner}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Frame>
  );
}
