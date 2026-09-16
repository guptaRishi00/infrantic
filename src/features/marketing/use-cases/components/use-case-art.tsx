import type { ReactNode } from "react";
import type { UseCaseIllustration } from "../use-cases.types";

// Line-art spot illustrations: zinc strokes, one violet accent each.
const line = {
  fill: "none",
  stroke: "#3f3f46",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const accent = "#8b5cf6";
const soft = "#ede9fe";

const art: Record<UseCaseIllustration, ReactNode> = {
  campaign: (
    <>
      <rect x="34" y="30" width="72" height="52" rx="6" {...line} fill="#fff" />
      <path {...line} d="M34 44h72" />
      <rect x="44" y="54" width="22" height="18" rx="3" fill={soft} />
      <path {...line} d="M74 56h22M74 64h16M74 72h20" />
      <path fill={accent} d="m104 22 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z" />
    </>
  ),
  production: (
    <>
      <path {...line} fill="#fff" d="M38 48h64v36H38z" />
      <path {...line} fill={soft} d="m36 36 62-12 3 13-62 12z" />
      <path {...line} d="m52 33 6 12M68 30l6 12M84 27l6 12" />
      <path fill={accent} d="M62 58v18l16-9z" />
    </>
  ),
  intake: (
    <>
      <rect x="36" y="28" width="68" height="56" rx="6" {...line} fill="#fff" />
      <path {...line} d="M36 62h18l6 8h20l6-8h18" />
      <rect x="52" y="38" width="36" height="8" rx="2" fill={soft} />
      <path
        d="M70 18v22"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m63 33 7 7 7-7"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  org: (
    <>
      <rect x="56" y="22" width="28" height="18" rx="4" fill={accent} />
      <path {...line} d="M70 40v10M44 50h52M44 50v8M96 50v8M70 50v8" />
      <rect x="32" y="58" width="24" height="18" rx="4" {...line} fill="#fff" />
      <rect x="58" y="58" width="24" height="18" rx="4" {...line} fill={soft} />
      <rect x="84" y="58" width="24" height="18" rx="4" {...line} fill="#fff" />
    </>
  ),
  launch: (
    <>
      <path
        {...line}
        fill="#fff"
        d="M70 20c12 8 16 22 12 40H58c-4-18 0-32 12-40Z"
      />
      <circle cx="70" cy="40" r="5" {...line} fill={soft} />
      <path {...line} d="m58 52-8 10 10-2M82 52l8 10-10-2" />
      <path fill={accent} d="M64 64h12l-6 16z" />
    </>
  ),
};

export function UseCaseArt({ kind }: { kind: UseCaseIllustration }) {
  return (
    <div className="grid aspect-[16/10] place-items-center overflow-hidden rounded-xl bg-[linear-gradient(180deg,#fafafa,#f4f4f5)] bg-[size:auto]">
      <svg
        viewBox="0 0 140 100"
        aria-hidden="true"
        className="w-3/5 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
      >
        {art[kind]}
      </svg>
    </div>
  );
}
