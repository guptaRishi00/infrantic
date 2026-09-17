export type BenefitVisual = "collaboration" | "boards" | "reviews" | "tracking";

export type Benefit = {
  id: string;
  title: string;
  description: string;
  visual: BenefitVisual;
};

/** A tile in the collaboration visual: a team member photo, or the AI agent. */
export type Collaborator =
  | { kind: "person"; name: string; role: string; photo: string }
  | { kind: "agent"; name: string; role: string };

export type BenefitsContent = {
  eyebrow: string;
  title: string;
  description: string;
  benefits: readonly Benefit[];
  collaborators: readonly Collaborator[];
};
