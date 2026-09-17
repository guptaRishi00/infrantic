import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import type { FlowNode, FlowNodeStatus, WorkflowStep } from "../workflow.types";

const statusStyles: Record<FlowNodeStatus, { dot: string; ring: string }> = {
  done: { dot: "bg-emerald-500 text-white", ring: "border-emerald-200" },
  active: {
    dot: "bg-brand text-white",
    ring: "border-brand-200 shadow-[0_0_0_4px_rgb(7_150_254/0.12)]",
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
      className="relative h-full min-h-[30rem] overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 bg-[radial-gradient(rgb(2_28_55/0.08)_1px,transparent_1px)] [background-size:16px_16px]"
    >
      {step.edges.map(([fromId, toId]) => {
        const from = byId.get(fromId);
        const to = byId.get(toId);
        if (!from || !to) return null;
        return (
          <Connector
            key={`${fromId}-${toId}`}
            from={from}
            to={to}
            muted={to.status === "todo"}
          />
        );
      })}

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
                  <Check
                    aria-hidden="true"
                    className="size-2.5"
                    strokeWidth={3}
                  />
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

/**
 * Elbow connector (horizontal → vertical → horizontal) drawn with bordered
 * boxes positioned in % of the canvas, so it scales like the old SVG path.
 */
function Connector({
  from,
  to,
  muted,
}: {
  from: FlowNode;
  to: FlowNode;
  muted: boolean;
}) {
  const line = muted
    ? "border-dashed border-zinc-300"
    : "border-solid border-brand";
  const midX = (from.x + to.x) / 2;
  const top = Math.min(from.y, to.y);
  const height = Math.abs(to.y - from.y);

  const segments: CSSProperties[] =
    from.x === to.x
      ? [
          {
            left: `${from.x}%`,
            top: `${top}%`,
            height: `${height}%`,
            borderLeftWidth: 1.5,
          },
        ]
      : [
          {
            left: `${Math.min(from.x, midX)}%`,
            top: `${from.y}%`,
            width: `${Math.abs(midX - from.x)}%`,
            borderTopWidth: 1.5,
          },
          {
            left: `${midX}%`,
            top: `${top}%`,
            height: `${height}%`,
            borderLeftWidth: 1.5,
          },
          {
            left: `${Math.min(midX, to.x)}%`,
            top: `${to.y}%`,
            width: `${Math.abs(to.x - midX)}%`,
            borderTopWidth: 1.5,
          },
        ];

  return segments.map((style) => (
    <span
      key={`${style.left}-${style.top}-${style.width ?? style.height}`}
      className={cn("absolute border-0", line)}
      style={style}
    />
  ));
}
