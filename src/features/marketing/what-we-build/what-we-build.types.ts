import { type LucideIcon } from "lucide-react";

export type BuildItemIcon = "workflow" | "dashboard" | "ai" | "software";

export interface BuildItem {
  id: string;
  title: string;
  description: string;
  icon: BuildItemIcon;
  href: string;
}

export interface WhatWeBuildContent {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly BuildItem[];
  allServicesHref: string;
}
