import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { OrbitIntegration } from "../hero.types";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

// Design-pixel radii of the concentric rings, centred 36px (scaled) below the
// anchor; badges sit on them (see `ring` in hero.data.ts).
const RING_RADII = [510, 650, 800, 960, 1120, 1285, 1450] as const;
const RING_CENTER_Y = 36;
const RINGS_BOX = 3000;

/** Design-pixel offset of a point on a ring, relative to the backdrop anchor. */
function pointOnRing(ring: number, angle: number) {
  const radius = RING_RADII[ring] ?? RING_RADII[0];
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.round(radius * Math.cos(rad)),
    y: Math.round(radius * Math.sin(rad) + RING_CENTER_Y),
  };
}

// Breakpoints the badges render at, with the `--orbit-scale` each one sets on the
// wrapper below (keep in sync) and the class that reveals a badge from there up.
const BREAKPOINTS = [
  { minWidth: 640, scale: 0.54, reveal: "hidden sm:block" },
  { minWidth: 768, scale: 0.64, reveal: "hidden md:block" },
  { minWidth: 1024, scale: 0.76, reveal: "hidden lg:block" },
  { minWidth: 1280, scale: 0.85, reveal: "hidden xl:block" },
] as const;
const EDGE_GUTTER = 8;

/**
 * Class that hides a badge until the smallest breakpoint where it fits
 * horizontally inside the viewport (a badge is `16 * scale + 44` px wide).
 */
function revealClass(x: number) {
  const fit = BREAKPOINTS.find(
    ({ minWidth, scale }) =>
      Math.abs(x) * scale + (16 * scale + 44) / 2 <= minWidth / 2 - EDGE_GUTTER,
  );
  return fit?.reveal ?? "hidden";
}

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
      className="pointer-events-none absolute top-0 left-1/2 -z-10 [--orbit-scale:0.44] sm:[--orbit-scale:0.54] md:[--orbit-scale:0.64] lg:[--orbit-scale:0.76] xl:[--orbit-scale:0.85]"
    >
      {/* Concentric rings as bordered circles in a RINGS_BOX-sized, radially masked box. */}
      <div className="absolute top-[calc(var(--orbit-scale)*36px)] left-0 size-[calc(var(--orbit-scale)*3000px)] max-w-none -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,#000_70%,transparent_100%)]">
        {RING_RADII.map((radius) => (
          <span
            key={radius}
            className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200"
            style={{ width: `${((radius * 2) / RINGS_BOX) * 100}%` }}
          />
        ))}
      </div>

      <ul className="hidden sm:block">
        {integrations.map((integration) => {
          const point = pointOnRing(integration.ring, integration.angle);
          return (
            <li
              key={integration.id}
              className={cn(
                "absolute top-0 left-0 translate-x-[calc(var(--x)*var(--orbit-scale)*1px_-_50%)] translate-y-[calc(var(--y)*var(--orbit-scale)*1px_-_50%)]",
                // Badges near the horizontal run past narrower viewports.
                revealClass(point.x),
              )}
              style={{ "--x": point.x, "--y": point.y } as CssVars}
            >
              <span className="grid size-[calc(var(--orbit-scale)*16px_+_44px)] place-items-center rounded-full border border-zinc-200/70 bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_24px_-10px_rgb(2_28_55/0.18)]">
                <IntegrationLogo
                  id={integration.id}
                  className="block size-[calc(var(--orbit-scale)*8px_+_20px)] [&>svg]:size-full"
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
