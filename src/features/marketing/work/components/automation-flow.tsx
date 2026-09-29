import { Braces, type LucideIcon, Merge, ScanBarcode } from "lucide-react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaSlack } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { SiGoogleforms, SiShopify, SiSupabase } from "react-icons/si";
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

/** Straight connector (horizontal, or vertical with a downward arrow). */
function straight(a: Pt, b: Pt, delay: number): Route {
  return {
    legs: [{ from: a, to: b }],
    arcs: [],
    end: b,
    arrow: a[0] === b[0] ? "down" : "right",
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

// Node centres (design units). Tiles are TILE × TILE.
// Live stock sync: three event sources (online orders, warehouse scans,
// returns) merge into one stream; a code step updates stock in Supabase, an AI
// reorder check reads the new levels, and anything short raises a Slack alert.
const MID_Y = 270;
const SOURCE_X = 100;
const SOURCE_YS = [110, 270, 430] as const;
const MERGE: Pt = [270, MID_Y];
const FAN_X = 185;
const CODE: Pt = [420, MID_Y];
const STOCK: Pt = [570, MID_Y];
const AI: Pt = [720, MID_Y];
const SLACK: Pt = [880, MID_Y];
const half = TILE / 2;

const ROUTES: readonly Route[] = [
  // Fan-in: each source joins the merge node.
  hvh([SOURCE_X + half, SOURCE_YS[0]], [MERGE[0] - half, MID_Y], FAN_X, 16, 0),
  straight([SOURCE_X + half, MID_Y], [MERGE[0] - half, MID_Y], 0.3),
  hvh(
    [SOURCE_X + half, SOURCE_YS[2]],
    [MERGE[0] - half, MID_Y],
    FAN_X,
    16,
    0.6,
  ),
  // Then one pipeline, left to right.
  straight([MERGE[0] + half, MID_Y], [CODE[0] - half, MID_Y], 1.2),
  straight([CODE[0] + half, MID_Y], [STOCK[0] - half, MID_Y], 1.6),
  straight([STOCK[0] + half, MID_Y], [AI[0] - half, MID_Y], 2.0),
  straight([AI[0] + half, MID_Y], [SLACK[0] - half, MID_Y], 2.4),
];

type FlowNode = {
  id: string;
  label: string;
  sublabel?: string;
  at: Pt;
  Icon: IconType | LucideIcon;
  color: string;
  /** Round badge instead of a logo (a routing step). */
  badge?: boolean;
  /** Icon rotation in degrees, e.g. to point a merge icon downstream. */
  rotate?: number;
  /** Soft pulsing glow (the AI step). */
  glow?: boolean;
};

// Logos keep their brand colours (lightened where the original would vanish on
// the dark tile: OpenAI → white, Slack → its red).
const NODES: readonly FlowNode[] = [
  {
    id: "shopify",
    label: "Shopify",
    sublabel: "New order",
    at: [SOURCE_X, SOURCE_YS[0]],
    Icon: SiShopify,
    color: "#95BF47",
  },
  {
    id: "warehouse",
    label: "Warehouse",
    sublabel: "Barcode scan",
    at: [SOURCE_X, SOURCE_YS[1]],
    Icon: ScanBarcode,
    color: "#ffffff",
  },
  {
    id: "returns",
    label: "Returns",
    sublabel: "Form",
    at: [SOURCE_X, SOURCE_YS[2]],
    Icon: SiGoogleforms,
    color: "#7248B9",
  },
  {
    id: "merge",
    label: "Merge",
    sublabel: "One stream",
    at: MERGE,
    Icon: Merge,
    color: "#ffffff",
    badge: true,
    rotate: 90,
  },
  {
    id: "code",
    label: "Update stock",
    sublabel: "Code",
    at: CODE,
    Icon: Braces,
    color: "#ffffff",
  },
  {
    id: "stock",
    label: "Supabase",
    sublabel: "Stock levels",
    at: STOCK,
    Icon: SiSupabase,
    color: "#3ECF8E",
  },
  {
    id: "ai",
    label: "Reorder check",
    sublabel: "AI",
    at: AI,
    Icon: RiOpenaiFill,
    color: "#ffffff",
    glow: true,
  },
  {
    id: "slack",
    label: "Slack",
    sublabel: "Reorder alert",
    at: SLACK,
    Icon: FaSlack,
    color: "#E01E5A",
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
        className="relative grid place-items-center border border-white/25 bg-[#07131d] shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)]"
        style={{ width: u(TILE), height: u(TILE), borderRadius: u(14) }}
      >
        {node.glow ? (
          // Pulse: a stronger glow on an overlay that only fades in and out.
          <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_0_6px_rgb(7_150_254/0.14),0_12px_40px_-10px_rgb(7_161_253/0.7)] motion-safe:animate-agent-glow" />
        ) : null}
        {node.badge ? (
          <span
            className="grid place-items-center rounded-full border border-white/40 bg-ink-800"
            style={{ width: u(40), height: u(40) }}
          >
            <Icon
              aria-hidden="true"
              color={node.color}
              style={{
                width: u(20),
                height: u(20),
                transform: node.rotate
                  ? `rotate(${node.rotate}deg)`
                  : undefined,
              }}
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

/**
 * Live stock sync: Shopify orders, warehouse scans and returns merge into one
 * stream that updates stock in Supabase; an AI reorder check raises a Slack
 * alert for anything running short.
 */
export function AutomationFlow({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="flex flex-1 flex-col">
      {/* The frame fills the panel's visual area; the graph is centred in it. */}
      <div className="flex flex-1 flex-col justify-center overflow-x-auto overflow-y-hidden rounded-xl border border-white/10 bg-ink-800/40 bg-[radial-gradient(rgb(255_255_255/0.1)_1px,transparent_1px)] bg-size-[22px_22px] [scrollbar-width:thin]">
        {/* The graph renders at 88% of the frame (capped at 50rem so it isn't
            much taller than the app mocks), centred, for breathing room. */}
        <div className="min-w-[40rem]">
          <div className="@container mx-auto w-[88%] max-w-[50rem]">
            <div
              aria-hidden="true"
              // Clip here (unrounded) so packets riding past a leg's end never
              // count as overflow of the scroller, which made its scrollbar
              // flicker in and out.
              className="relative aspect-[1000/540] overflow-hidden [--u:calc(100cqw/1000)]"
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
