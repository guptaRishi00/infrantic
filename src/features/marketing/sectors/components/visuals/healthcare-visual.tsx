import { Server, Stethoscope, Users } from "lucide-react";
import type { CSSProperties } from "react";
import { Packet, StrokeGradient, VisualFrame, X, Y } from "./visual-frame";

// A heartbeat that turns into a network: the trace runs flat, spikes, and its
// line splits into the three things the headline names.
const TRACE =
  "M0 200 H120 L135 185 L150 200 H165 L180 215 L200 90 L222 300 L240 200 H262 L275 178 L290 200 H330";
// The outer branches end at y 110/290; phones (below sm) spread them to
// 70/330, because the stage is drawn so small there that each node's label
// would touch the next node.
const SPREAD = { base: [110, 290], phone: [70, 330] } as const;

function branches([top, bottom]: readonly [number, number]) {
  return `M330 200 V${top} H412 M330 200 H412 M330 200 V${bottom} H412`;
}

function branchPackets([top, bottom]: readonly [number, number]) {
  return [
    { from: [330, 200], to: [330, top], delay: 1.2 },
    { from: [330, top], to: [412, top], delay: 1.8 },
    { from: [330, 200], to: [412, 200], delay: 1.5 },
    { from: [330, 200], to: [330, bottom], delay: 1.2 },
    { from: [330, bottom], to: [412, bottom], delay: 1.8 },
  ] as const;
}

const NODES = [
  { y: 110, phoneY: 70, label: "Patients", Icon: Users },
  { y: 200, phoneY: 200, label: "Staff", Icon: Stethoscope },
  { y: 290, phoneY: 330, label: "Systems", Icon: Server },
] as const;

export function HealthcareVisual() {
  return (
    <VisualFrame label="A heartbeat line that branches into a network connecting patients, staff, and systems.">
      <svg
        aria-hidden="true"
        viewBox="0 0 500 400"
        className="absolute inset-0 size-full overflow-visible"
      >
        <StrokeGradient id="hc-stroke" />
        {(["base", "phone"] as const).map((key) => (
          <path
            key={key}
            d={branches(SPREAD[key])}
            className={key === "base" ? "max-sm:hidden" : "sm:hidden"}
            fill="none"
            stroke="rgb(4 126 253 / 0.35)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={TRACE}
          fill="none"
          stroke="url(#hc-stroke)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Scan beam across the trace; unrounded clip keeps it in the stage. */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="absolute inset-y-[18%] left-0 hidden w-full motion-safe:block motion-safe:animate-scan-sweep">
          <span className="absolute inset-y-0 right-full w-32 bg-[radial-gradient(closest-side,rgb(7_161_253/0.16),rgb(7_161_253/0))]" />
        </span>
      </div>

      <Packet from={[0, 200]} to={[120, 200]} />
      {(["base", "phone"] as const).map((key) => (
        <div
          key={key}
          className={
            key === "base" ? "contents max-sm:hidden" : "contents sm:hidden"
          }
        >
          {branchPackets(SPREAD[key]).map((packet) => (
            <Packet key={`${packet.from}-${packet.to}`} {...packet} />
          ))}
        </div>
      ))}

      {/* The peak of the beat, pulsing. */}
      <span
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-to shadow-[0_0_12px_4px_rgb(7_161_253/0.5)]"
        style={{ left: X(200), top: Y(90) }}
      >
        <span className="absolute -inset-2 rounded-full opacity-0 shadow-[0_0_0_4px_rgb(7_150_254/0.25)] motion-safe:animate-agent-glow" />
      </span>

      {NODES.map(({ y, phoneY, label, Icon }) => (
        <div
          key={label}
          className="absolute top-(--y) -translate-x-1/2 -translate-y-1/2 max-sm:top-(--phone-y)"
          style={
            {
              left: X(440),
              "--y": Y(y),
              "--phone-y": Y(phoneY),
            } as CSSProperties
          }
        >
          <span className="grid size-14 place-items-center rounded-full border-2 border-brand-200 bg-white shadow-[0_0_0_6px_rgb(7_150_254/0.07),0_14px_30px_-14px_rgb(2_28_55/0.35)]">
            <Icon className="size-6 text-zinc-800" strokeWidth={1.75} />
          </span>
          <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 text-[13px] font-semibold whitespace-nowrap text-ink">
            {label}
          </span>
        </div>
      ))}
    </VisualFrame>
  );
}
