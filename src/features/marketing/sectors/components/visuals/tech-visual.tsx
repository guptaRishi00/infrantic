import { CodeXml } from "lucide-react";
import { Packet, VisualFrame, X, Y } from "./visual-frame";

// A circuit board: the product is the chip in the middle, and orthogonal
// traces carry work out to the systems around it.
const TRACES = [
  // left
  "M190 170 H120 V90 H40",
  "M190 200 H40",
  "M190 230 H120 V310 H40",
  // right
  "M310 170 H380 V90 H460",
  "M310 200 H460",
  "M310 230 H380 V310 H460",
  // top
  "M250 140 V40",
  "M220 140 V100 H160 V40",
  "M280 140 V100 H340 V40",
  // bottom
  "M250 260 V360",
  "M220 260 V300 H160 V360",
  "M280 260 V300 H340 V360",
];

const PADS = [
  [40, 90],
  [40, 200],
  [40, 310],
  [460, 90],
  [460, 200],
  [460, 310],
  [250, 40],
  [160, 40],
  [340, 40],
  [250, 360],
  [160, 360],
  [340, 360],
] as const;

const LABELS = [
  { x: 40, y: 200, text: "Admin", side: "below" },
  { x: 460, y: 200, text: "API", side: "below" },
  { x: 250, y: 40, text: "Webhooks", side: "above" },
] as const;

const PACKETS = [
  { from: [190, 200], to: [40, 200], delay: 0 },
  { from: [310, 200], to: [460, 200], delay: 0.8 },
  { from: [250, 140], to: [250, 40], delay: 1.6 },
  { from: [250, 260], to: [250, 360], delay: 2.4 },
  { from: [120, 90], to: [40, 90], delay: 0.4 },
  { from: [380, 310], to: [460, 310], delay: 1.2 },
  { from: [160, 300], to: [160, 360], delay: 2.0 },
  { from: [340, 100], to: [340, 40], delay: 2.8 },
] as const;

export function TechVisual() {
  return (
    <VisualFrame label="A circuit board with your product as the chip at its centre, sending work along traces to the API, webhooks, and admin tools around it.">
      <svg
        aria-hidden="true"
        viewBox="0 0 500 400"
        className="absolute inset-0 size-full overflow-visible"
      >
        {TRACES.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="rgb(4 126 253 / 0.4)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {PACKETS.map((packet) => (
        <Packet key={`${packet.from}-${packet.to}`} {...packet} />
      ))}

      {PADS.map(([x, y]) => (
        <span
          key={`${x}-${y}`}
          className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-white shadow-[0_0_0_4px_rgb(7_150_254/0.1)]"
          style={{ left: X(x), top: Y(y) }}
        />
      ))}

      {LABELS.map((label) => (
        <span
          key={label.text}
          className={
            label.side === "below"
              ? "absolute mt-4 -translate-x-1/2 font-mono text-[12px] text-zinc-600"
              : "absolute -mt-9 -translate-x-1/2 font-mono text-[12px] text-zinc-600"
          }
          style={{ left: X(label.x), top: Y(label.y) }}
        >
          {label.text}
        </span>
      ))}

      {/* The chip: 120×120 design units, pins drawn as short stubs. */}
      <div
        className="absolute grid place-items-center rounded-[1.25rem] bg-[linear-gradient(145deg,#0c2f55,#021c37)] shadow-[0_0_0_1px_rgb(7_161_253/0.5),0_0_0_8px_rgb(7_150_254/0.08),0_24px_50px_-18px_rgb(2_28_55/0.7)]"
        style={{ left: X(190), top: Y(140), width: X(120), height: Y(120) }}
      >
        <span className="absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_0_6px_rgb(7_150_254/0.18),0_0_40px_-4px_rgb(7_161_253/0.7)] motion-safe:animate-agent-glow" />
        <span className="flex flex-col items-center gap-1.5">
          <CodeXml className="size-9 text-white" strokeWidth={1.75} />
          <span className="font-mono text-[10px] tracking-wide text-white/60 uppercase">
            Your product
          </span>
        </span>
      </div>
    </VisualFrame>
  );
}
