import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import type { OrbitIntegration } from "../hero.types";

type CssVars = CSSProperties & Record<`--${string}`, string | number>;

// Design-pixel radii of the concentric rings, centred 36px (scaled) below the
// anchor; badges sit on them (see `ring` in hero.data.ts).
const RING_RADII = [650, 800, 960, 1120, 1285, 1450] as const;
const RING_CENTER_Y = 36;
const RINGS_BOX = 3000;
// Every ring carries two comets, one climbing each side, with the same short
// tail (design px). Rings are staggered across the 26s `animate-comet` cycle;
// a ring's two comets run in sync as mirror images.
const COMET_TAIL = 150;
const COMET_STAGGER_S = 4.3;
const COMET_SIDES = ["left", "right"] as const;

/**
 * Comet style for ring `index`: a conic tail whose head starts at the bottom.
 * Left comets climb clockwise, right comets counter-clockwise.
 */
function cometStyle(
  radius: number,
  index: number,
  side: (typeof COMET_SIDES)[number],
): CssVars {
  const tail = (COMET_TAIL / radius) * (180 / Math.PI);
  const left = side === "left";
  return {
    width: `${((radius * 2) / RINGS_BOX) * 100}%`,
    backgroundImage: left
      ? `conic-gradient(from 180deg, transparent ${360 - tail}deg, #07a1fd ${360 - tail / 2}deg, #047efd 360deg)`
      : `conic-gradient(from 180deg, #047efd 0deg, #07a1fd ${tail / 2}deg, transparent ${tail}deg)`,
    "--comet-turn": left ? "180deg" : "-180deg",
    animationDelay: `${index * -COMET_STAGGER_S}s`,
  };
}

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
  // Finer steps above xl: the scale no longer changes, so a badge should appear
  // as soon as it fits instead of waiting for the next Tailwind breakpoint.
  // (Class names must stay static strings for Tailwind to generate them.)
  { minWidth: 1360, scale: 0.85, reveal: "hidden min-[1360px]:block" },
  { minWidth: 1440, scale: 0.85, reveal: "hidden min-[1440px]:block" },
  { minWidth: 1536, scale: 0.85, reveal: "hidden 2xl:block" },
  { minWidth: 1600, scale: 0.85, reveal: "hidden min-[1600px]:block" },
  { minWidth: 1680, scale: 0.85, reveal: "hidden min-[1680px]:block" },
  { minWidth: 1800, scale: 0.85, reveal: "hidden min-[1800px]:block" },
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
        {/* Comets: ring-sized boxes masked down to a 1.5px stroke, painted with a
            conic tail; rotating half a turn carries the head from the bottom
            to the top. Motion-only. */}
        {RING_RADII.flatMap((radius, index) =>
          COMET_SIDES.map((side) => (
            <span
              key={`comet-${radius}-${side}`}
              className="absolute top-1/2 left-1/2 hidden aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full p-[1.5px] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] motion-safe:block motion-safe:animate-comet"
              style={cometStyle(radius, index, side)}
            />
          )),
        )}
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
