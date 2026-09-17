import {
  Boxes,
  Calculator,
  Contact,
  EyeOff,
  FileText,
  Hourglass,
  Layers,
  type LucideIcon,
  Mail,
  Repeat,
  TrendingUp,
  TriangleAlert,
  Unplug,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaFileExcel } from "react-icons/fa";
import { SiGooglesheets, SiWhatsapp } from "react-icons/si";
import { BrandMark } from "@/shared/ui/brand-mark";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { ProblemContent, ProblemIcon, ToolIcon } from "../problem.types";

// Product logos keep their original colours; generic categories use neutral dark grey.
const toolIcons: Record<
  ToolIcon,
  { Icon: IconType | LucideIcon; color: string }
> = {
  excel: { Icon: FaFileExcel, color: "#217346" },
  email: { Icon: Mail, color: "#27272a" },
  whatsapp: { Icon: SiWhatsapp, color: "#25D366" },
  crm: { Icon: Contact, color: "#27272a" },
  erp: { Icon: Boxes, color: "#27272a" },
  sheets: { Icon: SiGooglesheets, color: "#34A853" },
  accounting: { Icon: Calculator, color: "#27272a" },
  documents: { Icon: FileText, color: "#27272a" },
};

const icons: Record<ProblemIcon, LucideIcon> = {
  repetitive: Repeat,
  errors: TriangleAlert,
  delays: Hourglass,
  silos: Unplug,
  visibility: EyeOff,
  bottlenecks: Layers,
  overhead: TrendingUp,
};

export function Problem({ content }: { content: ProblemContent }) {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="scroll-mt-24 px-4 py-24 sm:py-28"
    >
      <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-medium text-brand-700">
            {content.eyebrow}
          </p>
          <SectionHeading
            id="problem-title"
            title={content.title}
            description={content.description}
            align="left"
            className="mt-3"
          />

          <div className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {content.tools.map((tool) => {
                const { Icon, color } = toolIcons[tool.icon];
                return [
                  tool.breakBefore ? (
                    // Zero-height full-width flex item forces the next tag onto a new row.
                    <li
                      key={`${tool.label}-break`}
                      aria-hidden="true"
                      className="hidden h-0 basis-full sm:block"
                    />
                  ) : null,
                  <li
                    key={tool.label}
                    className="flex items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-600"
                  >
                    <Icon aria-hidden="true" className="size-4" color={color} />
                    {tool.label}
                  </li>,
                ];
              })}
            </ul>
            <p className="mt-4 text-sm text-zinc-500 italic">
              {content.toolsCaption}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            {content.effectsLabel}
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {content.effects.map((effect) => {
              const Icon = icons[effect.icon];
              return (
                <li
                  key={effect.label}
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 text-sm font-medium text-zinc-800 sm:odd:last:col-span-2"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {effect.label}
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex gap-4 rounded-2xl bg-ink p-6 text-white">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(145deg,#0796fe,#021c37)]">
              <BrandMark className="size-5" />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-tight">
                {content.resolution.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {content.resolution.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
