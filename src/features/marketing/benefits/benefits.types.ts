import type { AvatarPerson } from "@/shared/ui/initials-avatar";

export type BenefitVisual = "collaboration" | "boards" | "reviews" | "tracking";

export type Benefit = {
  id: string;
  title: string;
  description: string;
  visual: BenefitVisual;
};

export type BenefitsContent = {
  title: string;
  description: string;
  benefits: readonly Benefit[];
  collaborators: readonly AvatarPerson[];
};
