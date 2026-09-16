import type { CSSProperties } from "react";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { OrbitIntegration } from "../hero.types";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

// Design-pixel radii of the concentric rings, centred 36px (scaled) below the
// anchor so the inner ring wraps the activity stack.
const RING_RADII = [340, 470, 600, 740, 890] as const;
const VIEWBOX = 1900;

/** Highlighted arc segments: ring index, rotation (deg) and dash length (% of ring). */
const ACCENTS = [
  { ring: 1, rotate: 196, length: 4 },
  { ring: 2, rotate: 168, length: 4 },
  { ring: 2, rotate: 334, length: 5 },
  { ring: 1, rotate: 4, length: 3 },
] as const;

/**
 * Decorative rings and floating integration badges. Rendered on the server;
 * all motion is CSS and disabled under `prefers-reduced-motion`.
 * Positioned from the top-centre of its (relative) parent.
 */
export function OrbitBackdrop({
  integrations,
}: {
  integrations: readonly OrbitIntegration[];
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-1/2 -z-10 [--orbit-scale:0.5] sm:[--orbit-scale:0.62] md:[--orbit-scale:0.74] lg:[--orbit-scale:0.9] xl:[--orbit-scale:1]"
    >
      <svg
        aria-hidden="true"
        viewBox={`${-VIEWBOX / 2} ${-VIEWBOX / 2} ${VIEWBOX} ${VIEWBOX}`}
        className="absolute top-[calc(var(--orbit-scale)*36px)] left-0 size-[calc(var(--orbit-scale)*1900px)] max-w-none -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,#000_62%,transparent_100%)]"
      >
        <g fill="none" stroke="#E4E4E7" strokeWidth="1">
          {RING_RADII.map((radius) => (
            <circle key={radius} r={radius} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        <g className="hidden origin-center sm:block motion-safe:animate-orbit">
          {ACCENTS.map((accent) => (
            <circle
              key={`${accent.ring}-${accent.rotate}`}
              r={RING_RADII[accent.ring]}
              fill="none"
              stroke="#3B82F6"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${accent.length} ${100 - accent.length}`}
              transform={`rotate(${accent.rotate})`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>

      <ul className="hidden sm:block">
        {integrations.map((integration, index) => (
          <li
            key={integration.id}
            className="absolute top-0 left-0 translate-x-[calc(var(--x)*var(--orbit-scale)*1px_-_50%)] translate-y-[calc(var(--y)*var(--orbit-scale)*1px_-_50%)]"
            style={{ "--x": integration.x, "--y": integration.y } as CssVars}
          >
            <span
              className="grid size-[calc(var(--orbit-scale)*16px_+_44px)] place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_24px_-10px_rgb(24_24_27/0.18)] motion-safe:animate-float"
              style={{ animationDelay: `${index * -0.7}s` }}
            >
              <IntegrationLogo
                id={integration.id}
                className="block size-[calc(var(--orbit-scale)*8px_+_20px)] [&>svg]:size-full"
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
