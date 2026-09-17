export type ApproachContent = {
  eyebrow: string;
  title: string;
  description: string;
  difference: {
    label: string;
    title: string;
    notAsked: { lead: string; question: string };
    asked: { lead: string; question: string };
    answer: string;
    outcome: string;
  };
  philosophy: {
    label: string;
    title: string;
    description: string;
    closing: string;
    principles: readonly string[];
  };
  personality: readonly {
    trait: string;
    description: string;
    icon: "intelligent" | "precise" | "practical" | "human";
  }[];
};
