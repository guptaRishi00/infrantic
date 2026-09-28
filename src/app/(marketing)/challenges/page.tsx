import type { Metadata } from "next";
import { ChallengesPage } from "@/features/marketing/challenges";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Where growing businesses lose time between people, files, and systems, and what Infrantic does about it.",
};

export default function Page() {
  return <ChallengesPage />;
}
