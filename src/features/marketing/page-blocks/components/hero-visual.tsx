import type { CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import { BrandMark } from "@/shared/ui/brand-mark";
import { FlowLine, FlowPacket } from "@/shared/ui/flow-line";
import { IntegrationLogo } from "@/shared/ui/integration-logo";
import { RingComet } from "@/shared/ui/ring-comet";
import { blockIcons } from "../block-icons";
import type {
  HeroFlowNode,
  HeroFlowVisual,
  HeroOrbitVisual,
  HeroVisualContent,
} from "../page-blocks.types";

// Hero diagrams for inner pages. Everything that moves is a compositor-only
// transform/opacity animation from shared/ui (FlowLine/FlowPacket dashes and
// packets, RingComet); nodes and rings are static. Decorative: role="img" with
// a text description, inner markup aria-hidden.

const WIRE = "rgb(4 126 253 / 0.45)";

function at(x: number, y: number): CSSProperties {
  return { left: `${x}%`, top: `${y}%` };
}

function Wire({
  from,
  to,
  delay,
}: {
  from: readonly [number, number];
  to: readonly [number, number];
  delay: number;
}) {
  const horizontal = from[1] === to[1];
  const reverse = horizontal ? to[0] < from[0] : to[1] < from[1];
  const geometry: CSSProperties = horizontal
    ? {
        left: `${Math.min(from[0], to[0])}%`,
        top: `${from[1]}%`,
        width: `${Math.abs(to[0] - from[0])}%`,
      }
    : {
        left: `${from[0]}%`,
        top: `${Math.min(from[1], to[1])}%`,
        height: `${Math.abs(to[1] - from[1])}%`,
      };
  return (
    <>
      <FlowLine
        horizontal={horizontal}
        reverse={reverse}
        color={WIRE}
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
        dotClassName="shadow-[0_0_8px_2px_rgb(7_161_253/0.55)]"
      />
    </>
  );
}

function NodeGlyph({
  node,
  className,
}: {
  node: HeroFlowNode;
  className: string;
}) {
  if (node.logo) {
    return (
      <IntegrationLogo
        id={node.logo}
        className={cn("block [&>svg]:size-full", className)}
      />
    );
  }
  const Icon = blockIcons[node.icon ?? "check"];
  return <Icon aria-hidden="true" className={cn("text-zinc-800", className)} />;
}

function FlowNodeView({ node }: { node: HeroFlowNode }) {
  if (node.variant === "hub") {
    return (
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={at(node.x, node.y)}
      >
        <span className="grid size-16 place-items-center rounded-2xl bg-[linear-gradient(145deg,#07a1fd,#047efd_30%,#021c37)] shadow-[0_0_0_6px_rgb(7_150_254/0.1),0_16px_36px_-12px_rgb(7_150_254/0.55)]">
          <BrandMark className="size-8" />
        </span>
        <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 text-[12px] font-semibold whitespace-nowrap text-ink">
          {node.label}
        </span>
      </div>
    );
  }
  if (node.variant === "record") {
    return (
      <div
        className="absolute w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-brand-200 bg-white p-3.5 shadow-[0_0_0_4px_rgb(7_150_254/0.06),0_16px_32px_-18px_rgb(2_28_55/0.35)]"
        style={at(node.x, node.y)}
      >
        <p className="font-mono text-[10px] tracking-wide text-brand-700 uppercase">
          {node.kicker}
        </p>
        <p className="mt-1 text-[14px] font-semibold text-ink">{node.label}</p>
        <ul className="mt-2.5 space-y-1.5">
          {node.lines?.map((line, index) => (
            <li
              key={line}
              className="flex items-center gap-2 text-[12px] text-zinc-600"
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  index === (node.lines?.length ?? 0) - 1
                    ? "bg-amber-400"
                    : "bg-emerald-500",
                )}
              />
              {line}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={at(node.x, node.y)}
    >
      <span className="grid size-12 place-items-center rounded-xl border border-zinc-200 bg-white shadow-[0_8px_20px_-12px_rgb(2_28_55/0.3)]">
        <NodeGlyph node={node} className="size-5" />
      </span>
      <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 text-[12px] font-medium whitespace-nowrap text-zinc-600">
        {node.label}
      </span>
    </div>
  );
}

function FlowCanvas({ content }: { content: HeroFlowVisual }) {
  return (
    // No frame: the diagram sits on the hero background. overflow-hidden stays
    // (invisible) so the packets' travel can't widen the page. Phones: the
    // canvas takes the hero's free height (flex-1 down from PageHero's visual
    // box, capped at 44rem), so the nodes (placed in %) spread into it, and
    // bleeds into the gaps above and below (more above: the labels hang under
    // the nodes), where their empty margins sit; it ignores taps there so it
    // never covers the CTAs.
    <div className="relative aspect-[5/4] overflow-hidden max-sm:pointer-events-none max-sm:-mt-14 max-sm:-mb-7 max-sm:aspect-auto max-sm:max-h-[44rem] max-sm:flex-1">
      {content.wires.map((wire) => (
        <Wire key={`${wire.from.join()}-${wire.to.join()}`} {...wire} />
      ))}
      {content.nodes.map((node) => (
        <FlowNodeView key={node.id} node={node} />
      ))}
    </div>
  );
}

const ORBIT_BOX = 500;
const ORBIT_RADII = [110, 168, 226] as const;
// Fixed-width canvas (--orbit-w: 28rem, which fits the hero column from md
// up), so one design unit is a plain length. Container-query units in the
// comets' transform-origin kept their rotation on the main thread.
const ORBIT_UNIT = `calc(var(--orbit-w) / ${ORBIT_BOX})`;

function OrbitCanvas({ content }: { content: HeroOrbitVisual }) {
  return (
    // Phones: no CSS zoom (iOS Safari rendered the zoomed 28rem canvas too
    // big and off-centre); the canvas is sized per width instead so the
    // outermost chips, which may overhang it, still clear the column. Nudged
    // 3.5px left there: "Automation" (right) is wider than "Software" (left),
    // so this evens the visible gaps on both sides.
    <div className="relative mx-auto aspect-square w-(--orbit-w) overflow-hidden [--orbit-w:28rem] max-[340px]:[--orbit-w:16rem] max-sm:-translate-x-[3.5px] max-sm:overflow-visible min-[340px]:max-[368px]:[--orbit-w:19rem] min-[368px]:max-sm:[--orbit-w:21rem]">
      <div className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2">
        {ORBIT_RADII.map((radius) => (
          <span
            key={radius}
            className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-200"
            style={{ width: `${((radius * 2) / ORBIT_BOX) * 100}%` }}
          />
        ))}
        {ORBIT_RADII.flatMap((radius, index) =>
          (["left", "right"] as const).map((side) => (
            <RingComet
              key={`${radius}-${side}`}
              radius={radius}
              tail={70}
              unit={ORBIT_UNIT}
              side={side}
              delay={index * -5}
            />
          )),
        )}
        <span className="absolute top-1/2 left-1/2 grid size-[17%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[22%] bg-[linear-gradient(145deg,#07a1fd,#047efd_30%,#021c37)] shadow-[0_0_0_8px_rgb(7_150_254/0.08),0_20px_40px_-14px_rgb(7_150_254/0.55)]">
          <BrandMark className="size-[45%]" />
        </span>
        {content.chips.map((chip) => {
          const radius = ORBIT_RADII[chip.ring];
          const rad = (chip.angle * Math.PI) / 180;
          const Icon = chip.icon ? blockIcons[chip.icon] : null;
          return (
            <span
              key={chip.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-zinc-200 bg-white py-1 pr-2.5 pl-1 text-[12px] font-medium whitespace-nowrap text-zinc-700 shadow-[0_6px_16px_-10px_rgb(2_28_55/0.35)]"
              style={{
                left: `${50 + ((radius * Math.cos(rad)) / ORBIT_BOX) * 100}%`,
                top: `${50 + ((radius * Math.sin(rad)) / ORBIT_BOX) * 100}%`,
              }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-zinc-100">
                {chip.logo ? (
                  <IntegrationLogo
                    id={chip.logo}
                    className="block size-3.5 [&>svg]:size-full"
                  />
                ) : Icon ? (
                  <Icon aria-hidden="true" className="size-3.5 text-zinc-800" />
                ) : null}
              </span>
              {chip.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function HeroVisual({ content }: { content: HeroVisualContent }) {
  return (
    <div
      role="img"
      aria-label={content.label}
      className="max-sm:flex max-sm:flex-1 max-sm:flex-col"
    >
      <div
        aria-hidden="true"
        className="max-sm:flex max-sm:flex-1 max-sm:flex-col max-sm:justify-center"
      >
        {content.kind === "flow" ? (
          <FlowCanvas content={content} />
        ) : (
          <OrbitCanvas content={content} />
        )}
      </div>
    </div>
  );
}
