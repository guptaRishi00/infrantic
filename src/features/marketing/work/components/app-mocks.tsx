import {
  BookOpen,
  ChartColumn,
  Cpu,
  Download,
  FileText,
  FolderKanban,
  History,
  Hourglass,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  Plus,
  Settings,
  Upload,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Illustrative product screens (not real client data). Both are decorative:
// the wrapper is role="img" with a text alternative, the inner UI aria-hidden.

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label}>
      <div
        aria-hidden="true"
        className="overflow-x-auto rounded-xl border border-white/10 bg-[#04182f] [scrollbar-width:thin]"
      >
        <div className="min-w-[40rem]">{children}</div>
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

const REVIEW_ROWS = [
  { icon: Cpu, label: "Model", value: "Gemini Pro" },
  { icon: BookOpen, label: "Dictionary", value: "128 approved terms" },
  { icon: Hourglass, label: "Status", value: "Waiting for a file" },
] as const;

/** First-pass PDF review tool: review setup on the left, drop zone on the right. */
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
              Engineering document review
            </span>
          </span>
        </span>
        <Chip>No document open</Chip>
        <Chip tone="brand">Workspace ready</Chip>
        <span className="ml-auto flex gap-1.5">
          <ToolbarButton icon={BookOpen}>Dictionary</ToolbarButton>
          <ToolbarButton icon={Download}>Export</ToolbarButton>
          <ToolbarButton icon={Settings} active>
            Admin
          </ToolbarButton>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-[radial-gradient(80%_100%_at_50%_0%,rgb(7_150_254/0.1),transparent)] p-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="font-mono text-[10px] tracking-wide text-brand-300 uppercase">
            New review
          </p>
          <p className="mt-2 text-base font-semibold text-white">
            Open a technical PDF
          </p>
          <ul className="mt-4 space-y-2">
            {REVIEW_ROWS.map(({ icon: Icon, label: rowLabel, value }) => (
              <li
                key={rowLabel}
                className="flex items-center gap-2.5 rounded-lg border border-white/10 px-3 py-2 text-[11px]"
              >
                <Icon className="size-3.5 text-brand-300" />
                <span className="font-mono tracking-wide text-zinc-400 uppercase">
                  {rowLabel}
                </span>
                <span className="ml-auto text-zinc-200">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid place-items-center rounded-xl border border-dashed border-brand-300/30 bg-brand/[0.04] p-6 text-center">
          <div>
            <span className="mx-auto grid size-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-white">
              <Upload className="size-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-white">
              Drop a PDF here
            </p>
            <p className="mx-auto mt-1 max-w-[16rem] text-[11px] leading-4 text-zinc-400">
              Or browse to choose a file. Scanned pages are supported.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FolderKanban, label: "Projects" },
  { icon: ListChecks, label: "Tasks", active: true },
  { icon: ChartColumn, label: "Reports" },
  { icon: History, label: "History" },
  { icon: Users, label: "Team" },
] as const;

type Priority = "High" | "Medium" | "Low";
type Status = "Overdue" | "In review" | "Pending" | "Approved";

// Status colours per the mockup rule: amber and emerald only, plus brand.
const PRIORITY_TONE: Record<Priority, string> = {
  High: "bg-amber-400/15 text-amber-300",
  Medium: "bg-brand/15 text-brand-300",
  Low: "bg-white/10 text-zinc-300",
};

const STATUS_TONE: Record<Status, string> = {
  Overdue: "border-amber-400/40 text-amber-300",
  "In review": "border-brand-300/40 text-brand-300",
  Pending: "border-white/15 text-zinc-400",
  Approved: "border-emerald-400/40 text-emerald-300",
};

const TASKS: readonly {
  id: string;
  task: string;
  priority: Priority;
  due: string;
  status: Status;
  checker: string;
}[] = [
  {
    id: "TSK-101",
    task: "Material review",
    priority: "High",
    due: "02 Jun",
    status: "Overdue",
    checker: "Checker A",
  },
  {
    id: "TSK-102",
    task: "Engineering analysis",
    priority: "Medium",
    due: "04 Jun",
    status: "In review",
    checker: "Checker B",
  },
  {
    id: "TSK-103",
    task: "Vendor coordination",
    priority: "Low",
    due: "05 Jun",
    status: "Approved",
    checker: "Checker A",
  },
  {
    id: "TSK-104",
    task: "Quality inspection",
    priority: "Medium",
    due: "06 Jun",
    status: "In review",
    checker: "Checker C",
  },
  {
    id: "TSK-105",
    task: "Documentation update",
    priority: "Low",
    due: "09 Jun",
    status: "Pending",
    checker: "Checker B",
  },
  {
    id: "TSK-106",
    task: "Risk assessment",
    priority: "High",
    due: "10 Jun",
    status: "Pending",
    checker: "Checker C",
  },
];

/** Executor → checker → approver task list with priorities and review status. */
export function TaskBoardMock({ label }: { label: string }) {
  return (
    <Frame label={label}>
      <div className="grid grid-cols-[10rem_1fr]">
        <div className="border-r border-white/10 p-3">
          <span className="flex items-center gap-2 px-2 py-1.5">
            <span className="grid size-6 place-items-center rounded-md bg-brand-gradient text-white">
              <ListChecks className="size-3.5" />
            </span>
            <span className="text-[11px] leading-tight font-semibold text-white">
              Operations
              <span className="block font-normal text-zinc-400">workspace</span>
            </span>
          </span>
          <ul className="mt-3 space-y-0.5">
            {NAV.map(({ icon: Icon, label: navLabel, ...rest }) => (
              <li
                key={navLabel}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]",
                  "active" in rest
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-400",
                )}
              >
                <Icon className="size-3.5" />
                {navLabel}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-white">Tasks</p>
            <span className="flex items-center gap-1 rounded-md bg-brand-gradient px-2.5 py-1.5 text-[11px] font-medium text-white">
              <Plus className="size-3.5" />
              New task
            </span>
          </div>
          <div className="mt-3 flex gap-4 border-b border-white/10 text-[11px]">
            {["My tasks", "All tasks", "Unassigned"].map((tab) => (
              <span
                key={tab}
                className={cn(
                  "-mb-px pb-2",
                  tab === "All tasks"
                    ? "border-b border-brand-300 text-white"
                    : "text-zinc-400",
                )}
              >
                {tab}
              </span>
            ))}
          </div>

          <table className="mt-2 w-full text-left text-[11px]">
            <thead className="font-mono text-[9px] tracking-wide text-zinc-500 uppercase">
              <tr>
                <th className="py-2 font-normal">Task</th>
                <th className="py-2 font-normal">Priority</th>
                <th className="py-2 font-normal">Due</th>
                <th className="py-2 font-normal">Review</th>
                <th className="py-2 font-normal">Checker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {TASKS.map((row) => (
                <tr key={row.id}>
                  <td className="py-2">
                    <span className="font-mono text-zinc-500">{row.id}</span>
                    <span className="ml-2 text-zinc-200">{row.task}</span>
                  </td>
                  <td className="py-2">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px]",
                        PRIORITY_TONE[row.priority],
                      )}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td className="py-2 text-zinc-400">{row.due}</td>
                  <td className="py-2">
                    <span
                      className={cn(
                        "rounded border px-1.5 py-0.5 text-[10px]",
                        STATUS_TONE[row.status],
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2 text-zinc-400">{row.checker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Frame>
  );
}
