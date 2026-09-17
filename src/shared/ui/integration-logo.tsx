import type { IconType } from "react-icons";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiClaude,
  SiGithub,
  SiGooglegemini,
  SiGooglesheets,
  SiMake,
  SiN8N,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiSupabase,
  SiVercel,
  SiWhatsapp,
} from "react-icons/si";
import { TbBrandZapier } from "react-icons/tb";

export type IntegrationId =
  | "openai"
  | "claude"
  | "gemini"
  | "n8n"
  | "make"
  | "zapier"
  | "supabase"
  | "postgresql"
  | "vercel"
  | "github"
  | "nextjs"
  | "python"
  | "whatsapp"
  | "googleSheets";

// Brand icons from react-icons, tinted with each brand's primary colour.
const logos: Record<IntegrationId, { Icon: IconType; color: string }> = {
  openai: { Icon: RiOpenaiFill, color: "#0D0D0D" },
  claude: { Icon: SiClaude, color: "#D97757" },
  gemini: { Icon: SiGooglegemini, color: "#8E75B2" },
  n8n: { Icon: SiN8N, color: "#EA4B71" },
  make: { Icon: SiMake, color: "#6D00CC" },
  zapier: { Icon: TbBrandZapier, color: "#FF4F00" },
  supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  postgresql: { Icon: SiPostgresql, color: "#4169E1" },
  vercel: { Icon: SiVercel, color: "#0D0D0D" },
  github: { Icon: SiGithub, color: "#181717" },
  nextjs: { Icon: SiNextdotjs, color: "#0D0D0D" },
  python: { Icon: SiPython, color: "#3776AB" },
  whatsapp: { Icon: SiWhatsapp, color: "#25D366" },
  googleSheets: { Icon: SiGooglesheets, color: "#34A853" },
};

export function IntegrationLogo({
  id,
  className,
}: {
  id: IntegrationId;
  className?: string;
}) {
  const { Icon, color } = logos[id];

  return (
    <span aria-hidden="true" className={className}>
      <Icon color={color} />
    </span>
  );
}
