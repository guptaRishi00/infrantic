import type { AvatarPerson } from "@/shared/ui/initials-avatar";

export type Testimonial =
  | {
      kind: "quote";
      id: string;
      /** ISO date, e.g. `2026-04-12`. */
      date: string;
      quote: string;
      author: AvatarPerson;
      role: string;
    }
  | {
      /** Large portrait tile. Uses initials until photography exists. */
      kind: "portrait";
      id: string;
      person: AvatarPerson;
      role: string;
    };

export type TestimonialsContent = {
  title: string;
  description: string;
  testimonials: readonly Testimonial[];
};
