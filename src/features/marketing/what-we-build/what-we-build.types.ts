export type BuildItemIcon = "workflow" | "dashboard" | "ai" | "software";

export type BuildItem = {
  id: string;
  title: string;
  description: string;
  icon: BuildItemIcon;
  href: string;
};

export type WhatWeBuildContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly BuildItem[];
  learnMoreLabel: string;
  allServices: { label: string; href: string };
};
