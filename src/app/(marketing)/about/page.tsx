import type { Metadata } from "next";
import { AboutPage } from "@/features/marketing/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Infrantic builds AI-powered automation, custom software, and connected business systems. One team from discovery to support.",
};

// Statically prerendered, like the home page.
export default function Page() {
  return <AboutPage />;
}
