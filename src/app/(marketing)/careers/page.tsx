import type { Metadata } from "next";
import { CareersPage } from "@/features/marketing/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a small team building the automation, software, and AI systems that businesses run on.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <CareersPage />;
}
