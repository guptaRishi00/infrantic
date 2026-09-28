import type { Metadata } from "next";
import { CaseStudiesPage } from "@/features/marketing/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Systems and workflows Infrantic has built: procurement automation, AI document review, role-based task management, and a connected garment order structure.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <CaseStudiesPage />;
}
