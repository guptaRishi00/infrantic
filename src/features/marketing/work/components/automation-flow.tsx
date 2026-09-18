import {
  BrainCircuit,
  type LucideIcon,
  MemoryStick,
  Split,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaSlack } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { SiGmail, SiGoogleforms, SiJira, SiSupabase } from "react-icons/si";
import { FlowLine, FlowPacket } from "@/shared/ui/flow-line";

// The canvas is a 1000 × 540 design grid. `--u` is one design unit
// (container width / 1000), so every position, size, corner radius and label
// scales together and rounded connector corners stay true at any width.
// Lines and motion are pure CSS: straight legs carry marching dashes and a
// travelling packet; corners are quarter-circle dashed borders.

type Pt = readonly [x: number, y: number];

const u = (n: number) => `calc(var(--u) * ${n})`;
const LINE = "rgb(255 255 255 / 0.4)";
const TILE = 94;

type Leg = { from: Pt; to: Pt };
type Arc = { p: Pt; q: Pt; corner: Pt };
type Route = {
  legs: Leg[];
  arcs: Arc[];
  end: Pt;
  arrow: "right" | "down";
  delay: number;
};

/** Straight connector. */
function straight(a: Pt, b: Pt, delay: number): Route {
  return {
    legs: [{ from: a, to: b }],
    arcs: [],
    end: b,
    arrow: "right",
    delay,
  };
}

/** Horizontal → vertical → horizontal, turning at x = `mid`. */
function hvh(a: Pt, b: Pt, mid: number, r: number, delay: number): Route {
  const sx1 = Math.sign(mid - a[0]);
  const sx2 = Math.sign(b[0] - mid);
  const sy = Math.sign(b[1] - a[1]);
  return {
    legs: [
      { from: a, to: [mid - r * sx1, a[1]] },
      { from: [mid, a[1] + r * sy], to: [mid, b[1] - r * sy] },
      { from: [mid + r * sx2, b[1]], to: b },
    ],
    arcs: [
      {
        p: [mid - r * sx1, a[1]],
        q: [mid, a[1] + r * sy],
        corner: [mid, a[1]],
      },
      {
        p: [mid, b[1] - r * sy],
        q: [mid + r * sx2, b[1]],
        corner: [mid, b[1]],
      },
    ],
    end: b,
    arrow: "right",
    delay,
  };
}

/** Vertical → horizontal → vertical, turning at y = `mid`. */
function vhv(a: Pt, b: Pt, mid: number, r: number, delay: number): Route {
  const sy1 = Math.sign(mid - a[1]);
  const sy2 = Math.sign(b[1] - mid);
  const sx = Math.sign(b[0] - a[0]);
  return {
    legs: [
      { from: a, to: [a[0], mid - r * sy1] },
      { from: [a[0] + r * sx, mid], to: [b[0] - r * sx, mid] },
      { from: [b[0], mid + r * sy2], to: b },
    ],
    arcs: [
      {
        p: [a[0], mid - r * sy1],
        q: [a[0] + r * sx, mid],
        corner: [a[0], mid],
      },
      {
        p: [b[0] - r * sx, mid],
        q: [b[0], mid + r * sy2],
        corner: [b[0], mid],
      },
    ],
    end: b,
    arrow: "down",
    delay,
  };
}

// Node centres (design units). Tiles are TILE × TILE.
const FORM: Pt = [170, 245];
const ROUTER: Pt = [675, 245];
const SLACK: Pt = [860, 128];
const EMAIL: Pt = [860, 313];
const SUB_Y = 417;
const AGENT = { left: 295, right: 550, top: 202, bottom: 290 };
// Ports under the agent, and where their wires start (below the port labels).
const PORTS = [
  { label: "Chat Model", x: 337 },
  { label: "Memory", x: 418 },
  { label: "Tool", x: 494 },
] as const;
const PORT_Y = 312;
const SUB_TOP = SUB_Y - TILE / 2;
const SUB_MID = (PORT_Y + SUB_TOP) / 2;

const ROUTES: readonly Route[] = [
  straight([FORM[0] + TILE / 2, 245], [AGENT.left, 245], 0),
  straight([AGENT.right, 245], [ROUTER[0] - TILE / 2, 245], 0.9),
  hvh(
    [ROUTER[0] + TILE / 2, 245],
    [SLACK[0] - TILE / 2, SLACK[1]],
    760,
    18,
    1.8,
  ),
  hvh(
    [ROUTER[0] + TILE / 2, 245],
    [EMAIL[0] - TILE / 2, EMAIL[1]],
    760,
    18,
    1.8,
  ),
  vhv([PORTS[0].x, PORT_Y], [202, SUB_TOP], SUB_MID, 14, 0.4),
  vhv([PORTS[1].x, PORT_Y], [355, SUB_TOP], SUB_MID, 14, 0.6),
  vhv([PORTS[1].x, PORT_Y], [513, SUB_TOP], SUB_MID, 14, 0.6),
  vhv([PORTS[2].x, PORT_Y], [675, SUB_TOP], SUB_MID, 14, 0.8),
];

type FlowNode = {
  id: string;
  label: string;
  sublabel?: string;
  at: Pt;
  Icon: IconType | LucideIcon;
  color: string;
  /** Round badge instead of a logo (the router step). */
  badge?: boolean;
};

// Logos keep their brand colours (lightened where the original would vanish on
// the dark tile: OpenAI → white, Slack → its red).
const NODES: readonly FlowNode[] = [
  {
    id: "form",
    label: "Stock form",
    at: FORM,
    Icon: SiGoogleforms,
    color: "#7248B9",
  },
  {
    id: "router",
    label: "Route",
    at: ROUTER,
    Icon: Split,
    color: "#ffffff",
    badge: true,
  },
  {
    id: "slack",
    label: "Slack",
    sublabel: "Approval request",
    at: SLACK,
    Icon: FaSlack,
    color: "#E01E5A",
  },
  { id: "email", label: "Email", at: EMAIL, Icon: SiGmail, color: "#EA4335" },
  {
    id: "model",
    label: "Chat Model",
    at: [202, SUB_Y],
    Icon: RiOpenaiFill,
    color: "#ffffff",
  },
  {
    id: "supabase",
    label: "Supabase",
    at: [355, SUB_Y],
    Icon: SiSupabase,
    color: "#3ECF8E",
  },
  {
    id: "memory",
    label: "Memory",
    at: [513, SUB_Y],
    Icon: MemoryStick,
    color: "#4A8FE7",
  },
  {
    id: "jira",
    label: "Jira",
    at: [675, SUB_Y],
    Icon: SiJira,
    color: "#2684FF",
  },
];

function LegLine({ leg, delay }: { leg: Leg; delay: number }) {
  const [x1, y1] = leg.from;
  const [x2, y2] = leg.to;
  const horizontal = y1 === y2;
  const reverse = horizontal ? x2 < x1 : y2 < y1;
  const length = horizontal ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
  if (length <= 0) return null;
  const geometry = {
    left: u(Math.min(x1, x2)),
    top: u(Math.min(y1, y2)),
    [horizontal ? "width" : "height"]: u(length),
  };
  return (
    <>
      <FlowLine
        horizontal={horizontal}
        reverse={reverse}
        color={LINE}
        className={
          horizontal
            ? "absolute h-[1.5px] -translate-y-1/2"
            : "absolute w-[1.5px] -translate-x-1/2"
        }
        style={geometry}
      />
      <FlowPacket
        horizontal={horizontal}
        reverse={reverse}
        delay={delay}
        style={geometry}
        dotClassName="shadow-[0_0_10px_2px_rgb(7_161_253/0.7)]"
      />
    </>
  );
}

/** Quarter-circle corner: the two box edges meeting at `corner`, rounded. */
function ArcCorner({ arc }: { arc: Arc }) {
  const left = Math.min(arc.p[0], arc.q[0]);
  const top = Math.min(arc.p[1], arc.q[1]);
  const size = Math.abs(arc.p[0] - arc.q[0]);
  const vertical = arc.corner[1] === top ? "Top" : "Bottom";
  const horizontal = arc.corner[0] === left ? "Left" : "Right";
  return (
    <span
      className="absolute"
      style={{
        left: u(left),
        top: u(top),
        width: u(size),
        height: u(size),
        borderStyle: "dashed",
        borderColor: LINE,
        borderWidth: 0,
        [`border${vertical}Width`]: "1.5px",
        [`border${horizontal}Width`]: "1.5px",
        [`border${vertical}${horizontal}Radius`]: u(size),
      }}
    />
  );
}

function Arrow({ at, direction }: { at: Pt; direction: "right" | "down" }) {
  // CSS triangle whose tip touches the target tile.
  const style: CSSProperties =
    direction === "right"
      ? {
          left: u(at[0]),
          top: u(at[1]),
          borderLeft: `6px solid ${LINE}`,
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          transform: "translate(-100%, -50%)",
        }
      : {
          left: u(at[0]),
          top: u(at[1]),
          borderTop: `6px solid ${LINE}`,
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          transform: "translate(-50%, -100%)",
        };
  return <span className="absolute size-0" style={style} />;
}

function NodeTile({ node }: { node: FlowNode }) {
  const { Icon } = node;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: u(node.at[0]), top: u(node.at[1]) }}
    >
      <span
        className="grid place-items-center border border-white/25 bg-[#07131d] shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)]"
        style={{ width: u(TILE), height: u(TILE), borderRadius: u(14) }}
      >
        {node.badge ? (
          <span
            className="grid place-items-center rounded-full border border-white/40 bg-ink-800"
            style={{ width: u(40), height: u(40) }}
          >
            <Icon
              aria-hidden="true"
              color={node.color}
              style={{ width: u(20), height: u(20) }}
              className="rotate-90"
            />
          </span>
        ) : (
          <Icon
            aria-hidden="true"
            color={node.color}
            style={{ width: u(46), height: u(46) }}
          />
        )}
      </span>
      <span
        className="absolute top-full left-1/2 -translate-x-1/2 text-center font-semibold whitespace-nowrap text-white"
        style={{ marginTop: u(10), fontSize: `max(10px, ${u(12)})` }}
      >
        {node.label}
        {node.sublabel ? (
          <span
            className="block font-normal text-zinc-400"
            style={{ fontSize: `max(8px, ${u(8)})` }}
          >
            {node.sublabel}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function AgentCard() {
  return (
    <>
      <div
        className="absolute flex items-center border border-white/25 bg-[#07131d] shadow-[0_0_0_4px_rgb(7_150_254/0.08),0_14px_36px_-12px_rgb(7_161_253/0.45)]"
        style={{
          left: u(AGENT.left),
          top: u(AGENT.top),
          width: u(AGENT.right - AGENT.left),
          height: u(AGENT.bottom - AGENT.top),
          borderRadius: u(14),
          gap: u(28),
          paddingLeft: u(30),
        }}
      >
        {/* Pulse: a stronger glow on an overlay that only fades in and out. */}
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_0_6px_rgb(7_150_254/0.14),0_12px_40px_-10px_rgb(7_161_253/0.7)] motion-safe:animate-agent-glow" />
        <BrainCircuit
          aria-hidden="true"
          className="text-white"
          strokeWidth={1.25}
          style={{ width: u(46), height: u(46) }}
        />
        <span className="font-bold tracking-tight text-white">
          <span className="block" style={{ fontSize: `max(12px, ${u(20)})` }}>
            AI AGENT
          </span>
          <span
            className="mt-0.5 block text-center font-medium text-zinc-300"
            style={{ fontSize: `max(8px, ${u(9)})` }}
          >
            Tools agent
          </span>
        </span>
      </div>
      {PORTS.map((port) => (
        <span
          key={port.label}
          className="absolute -translate-x-1/2 font-semibold whitespace-nowrap text-white"
          style={{
            left: u(port.x),
            top: u(AGENT.bottom + 4),
            fontSize: `max(9px, ${u(11)})`,
          }}
        >
          {port.label}
        </span>
      ))}
    </>
  );
}

/**
 * Procurement agent flow: a stock form triggers an AI agent (chat model,
 * Supabase, memory and Jira as its tools), whose decision is routed to a Slack
 * approval or a supplier email.
 */
export function AutomationFlow({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label}>
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-ink-800/40 bg-[radial-gradient(rgb(255_255_255/0.1)_1px,transparent_1px)] bg-size-[22px_22px] [scrollbar-width:thin]">
        {/* The graph renders at 88% of the frame, centred, for breathing room. */}
        <div className="min-w-[40rem]">
          <div className="@container mx-auto w-[88%]">
            <div
              aria-hidden="true"
              className="relative aspect-[1000/540] [--u:calc(100cqw/1000)]"
            >
              {ROUTES.map((route) => (
                <div key={`${route.legs[0]?.from.join()}-${route.end.join()}`}>
                  {route.legs.map((leg, index) => (
                    <LegLine
                      key={`${leg.from.join()}-${leg.to.join()}`}
                      leg={leg}
                      delay={route.delay + index * 0.3}
                    />
                  ))}
                  {route.arcs.map((arc) => (
                    <ArcCorner key={arc.corner.join()} arc={arc} />
                  ))}
                  <Arrow at={route.end} direction={route.arrow} />
                </div>
              ))}

              <AgentCard />
              {NODES.map((node) => (
                <NodeTile key={node.id} node={node} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
