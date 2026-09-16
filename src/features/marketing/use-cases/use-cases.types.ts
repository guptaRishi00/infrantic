export type UseCaseIllustration =
  | "campaign"
  | "production"
  | "intake"
  | "org"
  | "launch";

export type UseCase = {
  id: string;
  title: string;
  description: string;
  href: string;
  illustration: UseCaseIllustration;
};

export type UseCasesContent = {
  title: string;
  linkLabel: string;
  useCases: readonly UseCase[];
};
