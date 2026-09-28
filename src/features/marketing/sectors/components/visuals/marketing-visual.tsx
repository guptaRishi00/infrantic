import { Packet, StrokeGradient, VisualFrame, X, Y } from "./visual-frame";

// A funnel pouring leads into a rising chart.
const FUNNEL = "M40 70 H260 L180 200 V250 H120 V200 Z";
const BANDS = "M72 118 H228 M104 166 H196";
const OUTLET = "M150 250 V320 H282";
const BASELINE = 340;
const BARS = [
  { x: 300, h: 70 },
  { x: 345, h: 115 },
  { x: 390, h: 165 },
  { x: 435, h: 225 },
] as const;
const BAR_W = 32;
const TREND = "M290 250 L345 205 L392 160 L452 92";

const PACKETS = [
  { from: [150, 50], to: [150, 250], delay: 0 },
  { from: [150, 50], to: [150, 250], delay: 1.1 },
  { from: [150, 50], to: [150, 250], delay: 2.2 },
  { from: [150, 250], to: [150, 320], delay: 0.8 },
  { from: [150, 320], to: [282, 320], delay: 1.4 },
] as const;

export function MarketingVisual() {
  return (
    <VisualFrame label="A marketing funnel pouring leads into a rising bar chart, with growth of 18 percent.">
      <svg
        aria-hidden="true"
        viewBox="0 0 500 400"
        className="absolute inset-0 size-full overflow-visible"
      >
        <StrokeGradient id="mk-stroke" />
        <defs>
          <linearGradient id="mk-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eef8ff" />
            <stop offset="1" stopColor="#b0dcff" />
          </linearGradient>
        </defs>
        <path
          d={FUNNEL}
          fill="url(#mk-fill)"
          stroke="url(#mk-stroke)"
          strokeWidth="3"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={BANDS}
          fill="none"
          stroke="rgb(4 126 253 / 0.25)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={OUTLET}
          fill="none"
          stroke="rgb(4 126 253 / 0.35)"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`M282 ${BASELINE} H480`}
          stroke="rgb(2 28 55 / 0.15)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={TREND}
          fill="none"
          stroke="#021c37"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M436 92 H452 V108"
          fill="none"
          stroke="#021c37"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {BARS.map((bar, index) => (
        <span
          key={bar.x}
          className="absolute origin-bottom rounded-t-lg bg-[linear-gradient(to_top,#047efd,#07a1fd)] shadow-[0_12px_30px_-14px_rgb(4_126_253/0.7)] motion-safe:animate-bar-rise"
          style={{
            left: X(bar.x - BAR_W / 2),
            width: X(BAR_W),
            top: Y(BASELINE - bar.h),
            height: Y(bar.h),
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}

      {PACKETS.map((packet) => (
        <Packet
          key={`${packet.from}-${packet.to}-${packet.delay}`}
          {...packet}
        />
      ))}

      <span
        className="absolute -translate-x-1/2 text-[13px] font-semibold text-ink"
        style={{ left: X(150), top: Y(22) }}
      >
        Leads
      </span>
      <span
        className="absolute -translate-y-1/2 rounded-full bg-ink px-2.5 py-1 text-[13px] font-semibold text-white"
        style={{ left: X(372), top: Y(92) }}
      >
        +18%
      </span>
    </VisualFrame>
  );
}
