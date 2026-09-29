import { AtSign, Mail, MousePointerClick, Users } from "lucide-react";
import { Packet, VisualFrame, X, Y } from "./visual-frame";

// On target: every channel's traces merge into one line that lands in the
// centre of a bullseye, the customer. Arcs sweep the rings like the home hero.
const CENTER = { x: 320, y: 200 } as const;
const RINGS = [
  { r: 150, duration: 18, reverse: false },
  { r: 105, duration: 13, reverse: true },
  { r: 62, duration: 9, reverse: false },
] as const;
const CORE = 34;

const TRACES = [
  "M70 110 H120 V200",
  "M70 200 H286",
  "M70 290 H120 V200",
] as const;

const CHANNELS = [
  { y: 110, label: "Ads", Icon: MousePointerClick },
  { y: 200, label: "Email", Icon: Mail },
  { y: 290, label: "Social", Icon: AtSign },
] as const;
const PAD_X = 48;
// Design units; the 5:4 frame matches the viewBox, so X(n) and Y(n) are the
// same length and circles stay circular.
const PAD = 44;

const PACKETS = [
  { from: [70, 110], to: [120, 110], delay: 0 },
  { from: [120, 110], to: [120, 200], delay: 0.5 },
  { from: [70, 290], to: [120, 290], delay: 1.2 },
  { from: [120, 290], to: [120, 200], delay: 1.7 },
  { from: [70, 200], to: [286, 200], delay: 0.8 },
  { from: [120, 200], to: [286, 200], delay: 2.3 },
] as const;

export function MarketingVisual() {
  return (
    <VisualFrame label="Ads, email, and social campaigns converging on a bullseye, with every lead landing on the right customer.">
      <svg
        aria-hidden="true"
        viewBox="0 0 500 400"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <radialGradient id="mk-target" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#d9efff" />
            <stop offset="1" stopColor="#eef8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={RINGS[0].r}
          fill="url(#mk-target)"
        />
        {RINGS.map(({ r }) => (
          <circle
            key={r}
            cx={CENTER.x}
            cy={CENTER.y}
            r={r}
            fill="none"
            stroke="rgb(4 126 253 / 0.28)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
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

      {/* Sweeping arcs: a transparent ring with one coloured side, rotated.
          Transform only, no mask; hidden under reduced motion. */}
      {RINGS.map(({ r, duration, reverse }) => (
        <span
          key={r}
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 motion-safe:block"
          style={{
            left: X(CENTER.x),
            top: Y(CENTER.y),
            width: X(r * 2),
            height: Y(r * 2),
          }}
        >
          <span
            className={
              reverse
                ? "block size-full rounded-full border-[2.5px] border-transparent border-t-brand-to motion-safe:animate-orbit-back"
                : "block size-full rounded-full border-[2.5px] border-transparent border-t-brand-to motion-safe:animate-orbit"
            }
            style={{ animationDuration: `${duration}s` }}
          />
        </span>
      ))}

      {PACKETS.map((packet) => (
        <Packet
          key={`${packet.from}-${packet.to}-${packet.delay}`}
          {...packet}
        />
      ))}

      {/* The bullseye: the customer every channel is aimed at. */}
      <span
        className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(145deg,#07a1fd,#047efd_35%,#021c37)] shadow-[0_0_0_8px_rgb(7_150_254/0.1),0_18px_40px_-12px_rgb(7_150_254/0.6)]"
        style={{
          left: X(CENTER.x),
          top: Y(CENTER.y),
          width: X(CORE * 2),
          height: Y(CORE * 2),
        }}
      >
        <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_0_7px_rgb(7_150_254/0.22),0_0_36px_-2px_rgb(7_161_253/0.8)] motion-safe:animate-agent-glow" />
        <Users className="size-[42%] text-white" strokeWidth={1.75} />
      </span>

      {CHANNELS.map(({ y, label, Icon }) => (
        <div key={label}>
          <span
            className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-brand bg-white shadow-[0_0_0_5px_rgb(7_150_254/0.1)]"
            style={{
              left: X(PAD_X),
              top: Y(y),
              width: X(PAD),
              height: Y(PAD),
            }}
          >
            <Icon className="size-[45%] text-ink" strokeWidth={1.75} />
          </span>
          <span
            className="absolute mt-8 -translate-x-1/2 font-mono text-[12px] text-zinc-600"
            style={{ left: X(PAD_X), top: Y(y) }}
          >
            {label}
          </span>
        </div>
      ))}
    </VisualFrame>
  );
}
