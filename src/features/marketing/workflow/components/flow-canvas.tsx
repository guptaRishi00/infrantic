import { cn } from "@/shared/lib/cn";
import { CheckIcon } from "@/shared/ui/icons";
import type { FlowNode, FlowNodeStatus, WorkflowStep } from "../workflow.types";

const statusStyles: Record<FlowNodeStatus, { dot: string; ring: string }> = {
  done: { dot: "bg-emerald-500 text-white", ring: "border-emerald-200" },
  active: {
    dot: "bg-violet-500 text-white",
    ring: "border-violet-300 shadow-[0_0_0_4px_rgb(139_92_246/0.1)]",
  },
  todo: { dot: "bg-zinc-200 text-zinc-500", ring: "border-zinc-200" },
};

/** Decorative node graph: elbow connectors under absolutely placed cards. */
export function FlowCanvas({ step }: { step: WorkflowStep }) {
  const byId = new Map<string, FlowNode>(
    step.nodes.map((node) => [node.id, node]),
  );

  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-80 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 bg-[radial-gradient(rgb(24_24_27/0.08)_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        {step.edges.map(([fromId, toId]) => {
          const from = byId.get(fromId);
          const to = byId.get(toId);
          if (!from || !to) return null;
          const midX = (from.x + to.x) / 2;
          const d =
            from.x === to.x
              ? `M${from.x} ${from.y}V${to.y}`
              : `M${from.x} ${from.y}H${midX}V${to.y}H${to.x}`;
          return (
            <path
              key={`${fromId}-${toId}`}
              d={d}
              fill="none"
              stroke={to.status === "todo" ? "#d4d4d8" : "#a78bfa"}
              strokeWidth="1.5"
              strokeDasharray={to.status === "todo" ? "4 4" : undefined}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {step.nodes.map((node) => {
        const style = statusStyles[node.status];
        return (
          <div
            key={node.id}
            className={cn(
              "absolute w-[42%] max-w-44 -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white p-2.5",
              style.ring,
            )}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-4 shrink-0 place-items-center rounded-full",
                  style.dot,
                )}
              >
                {node.status === "done" ? (
                  <CheckIcon className="size-2.5" />
                ) : (
                  <span className="size-1 rounded-full bg-current" />
                )}
              </span>
              <span className="truncate text-[11px] font-medium text-zinc-800">
                {node.label}
              </span>
            </div>
            <p className="mt-1 truncate pl-6 text-[10px] text-zinc-400">
              {node.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}
