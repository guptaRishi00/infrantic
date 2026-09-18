import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import type { FlowNode, FlowNodeStatus, WorkflowStep } from "../workflow.types";

const statusStyles: Record<
  FlowNodeStatus,
  { card: string; pill: string; label: string }
> = {
  done: {
    card: "border-zinc-200",
    pill: "bg-emerald-50 text-emerald-700",
    label: "Done",
  },
  active: {
    card: "border-brand-200 shadow-[0_0_0_4px_rgb(7_150_254/0.08),0_12px_28px_-14px_rgb(4_126_253/0.45)]",
    pill: "bg-brand-50 text-brand-700",
    label: "In progress",
  },
  todo: {
    card: "border-dashed border-zinc-300 bg-white/70",
    pill: "bg-zinc-100 text-zinc-500",
    label: "Queued",
  },
};

/**
 * Decorative node graph: elbow connectors under absolutely placed cards.
 * Every connector marches in its flow direction: light brand into finished
 * work, full brand with a travelling packet into active work, slower grey
 * into queued work. Cards rise in one after another each time the panel is
 * shown. All motion is CSS.
 */
export function FlowCanvas({ step }: { step: WorkflowStep }) {
  const byId = new Map<string, FlowNode>(
    step.nodes.map((node) => [node.id, node]),
  );

  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-[30rem] overflow-hidden rounded-lg border border-zinc-200/70 bg-zinc-50 bg-[radial-gradient(rgb(2_28_55/0.08)_1px,transparent_1px)] [background-size:16px_16px]"
    >
      {step.edges.map(([fromId, toId], index) => {
        const from = byId.get(fromId);
        const to = byId.get(toId);
        if (!from || !to) return null;
        return (
          <Connector
            key={`${fromId}-${toId}`}
            from={from}
            to={to}
            status={to.status}
            delay={index * 0.6}
          />
        );
      })}

      {step.nodes.map((node, index) => (
        <NodeCard key={node.id} node={node} index={index} />
      ))}
    </div>
  );
}

function NodeCard({ node, index }: { node: FlowNode; index: number }) {
  const style = statusStyles[node.status];
  return (
    <div
      className="absolute w-[44%] max-w-52 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div
        className={cn(
          "rounded-lg border bg-white px-3 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] motion-safe:animate-rise",
          style.card,
        )}
        style={{ animationDelay: `${120 + index * 90}ms` }}
      >
        <div className="flex items-center gap-2">
          <StatusIcon status={node.status} />
          <span className="truncate text-[11px] font-semibold text-zinc-800">
            {node.label}
          </span>
          <span
            className={cn(
              "ml-auto shrink-0 rounded-full px-1.5 py-px text-[9px] font-medium",
              style.pill,
            )}
          >
            {style.label}
          </span>
        </div>
        <p className="mt-1 truncate pl-6 text-[10px] text-zinc-500">
          {node.detail}
        </p>
        {node.status === "active" ? (
          // Indeterminate progress: a short gradient bar sweeping the track.
          <span className="mt-2 ml-6 block h-1 overflow-hidden rounded-full bg-brand-50">
            <span className="block h-full w-1/3 rounded-full bg-brand-gradient motion-safe:animate-progress motion-reduce:w-2/3" />
          </span>
        ) : null}
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: FlowNodeStatus }) {
  if (status === "done") {
    return (
      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
        <Check aria-hidden="true" className="size-2.5" strokeWidth={3} />
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="relative grid size-4 shrink-0 place-items-center">
        <span className="absolute inset-0 rounded-full bg-brand/30 motion-safe:animate-ping" />
        <span className="relative size-2.5 rounded-full bg-brand-gradient" />
      </span>
    );
  }
  return (
    <span className="size-4 shrink-0 rounded-full border-[1.5px] border-dashed border-zinc-300" />
  );
}

type Segment = {
  style: CSSProperties;
  horizontal: boolean;
  /** Flow runs right→left or bottom→top. */
  reverse: boolean;
};

// Every connector marches in its flow direction (8px dash period = the 8px
// flow-x/y keyframe shift, so the loop is seamless). Done work is light brand,
// active work is full brand with a packet, queued work is grey and slower.
const LINE: Record<FlowNodeStatus, { x: string; y: string }> = {
  done: {
    x: "h-[1.5px] bg-[repeating-linear-gradient(90deg,var(--color-brand-300)_0_4px,transparent_4px_8px)] bg-size-[8px_100%] motion-safe:animate-flow-x",
    y: "w-[1.5px] bg-[repeating-linear-gradient(180deg,var(--color-brand-300)_0_4px,transparent_4px_8px)] bg-size-[100%_8px] motion-safe:animate-flow-y",
  },
  active: {
    x: "h-[1.5px] bg-[repeating-linear-gradient(90deg,var(--color-brand-from)_0_4px,transparent_4px_8px)] bg-size-[8px_100%] motion-safe:animate-flow-x",
    y: "w-[1.5px] bg-[repeating-linear-gradient(180deg,var(--color-brand-from)_0_4px,transparent_4px_8px)] bg-size-[100%_8px] motion-safe:animate-flow-y",
  },
  todo: {
    x: "h-px bg-[repeating-linear-gradient(90deg,rgb(161_161_170)_0_3px,transparent_3px_8px)] bg-size-[8px_100%] motion-safe:animate-flow-x",
    y: "w-px bg-[repeating-linear-gradient(180deg,rgb(161_161_170)_0_3px,transparent_3px_8px)] bg-size-[100%_8px] motion-safe:animate-flow-y",
  },
};

/**
 * Elbow connector (horizontal → vertical → horizontal) built from boxes
 * positioned in % of the canvas, so it scales with the canvas.
 */
function Connector({
  from,
  to,
  status,
  delay,
}: {
  from: FlowNode;
  to: FlowNode;
  status: FlowNodeStatus;
  delay: number;
}) {
  const midX = (from.x + to.x) / 2;
  const top = Math.min(from.y, to.y);
  const height = Math.abs(to.y - from.y);
  const up = to.y < from.y;

  const vertical: Segment = {
    style: {
      left: `${from.x === to.x ? from.x : midX}%`,
      top: `${top}%`,
      height: `${height}%`,
    },
    horizontal: false,
    reverse: up,
  };
  const segments: Segment[] =
    from.x === to.x
      ? [vertical]
      : [
          {
            style: {
              left: `${Math.min(from.x, midX)}%`,
              top: `${from.y}%`,
              width: `${Math.abs(midX - from.x)}%`,
            },
            horizontal: true,
            reverse: midX < from.x,
          },
          vertical,
          {
            style: {
              left: `${Math.min(midX, to.x)}%`,
              top: `${to.y}%`,
              width: `${Math.abs(to.x - midX)}%`,
            },
            horizontal: true,
            reverse: to.x < midX,
          },
        ];

  return segments.map((segment, index) => (
    <span
      key={`${segment.style.left}-${segment.style.top}-${segment.style.width ?? segment.style.height}`}
      className={cn(
        "absolute",
        segment.horizontal
          ? `-translate-y-1/2 ${LINE[status].x}`
          : `-translate-x-1/2 ${LINE[status].y}`,
      )}
      style={{
        ...segment.style,
        animationDirection: segment.reverse ? "reverse" : undefined,
        // Queued work drifts at half speed.
        animationDuration: status === "todo" ? "1.6s" : undefined,
      }}
    >
      {status === "active" ? (
        // Packet: travels each segment in turn along the elbow.
        <span
          className={cn(
            "absolute hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-to shadow-[0_0_8px_2px_rgb(7_161_253/0.55)] motion-safe:block",
            segment.horizontal
              ? "top-1/2 motion-safe:animate-packet-x"
              : "left-1/2 motion-safe:animate-packet-y",
          )}
          style={{
            animationDelay: `${delay + index * 0.35}s`,
            animationDirection: segment.reverse ? "reverse" : undefined,
          }}
        />
      ) : null}
    </span>
  ));
}
