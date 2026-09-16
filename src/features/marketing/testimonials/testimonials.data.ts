import type { TestimonialsContent } from "./testimonials.types";

const testimonialsContent = {
  title: "Loved by creative leaders",
  description: "Hear from teams who've transformed their creative workflow.",
  testimonials: [
    {
      kind: "quote",
      id: "sarah",
      date: "2026-04-12",
      quote:
        "Infrantic transformed how our team collaborates. Reviews are now instant and feedback is actually actionable. We've cut revision rounds in half.",
      author: {
        name: "Sarah Chen",
        initials: "SC",
        tone: "from-rose-200 to-pink-300 text-rose-900",
      },
      role: "Creative Director, Lumen Studio",
    },
    {
      kind: "portrait",
      id: "daniel",
      person: {
        name: "Daniel Ortiz",
        initials: "DO",
        tone: "from-zinc-200 to-zinc-400 text-zinc-800",
      },
      role: "Head of Design, Northwind",
    },
    {
      kind: "quote",
      id: "marcus",
      date: "2026-04-08",
      quote:
        "The intuitive interface was an instant win. Our designers and developers finally work in the same space, and nobody asks where the latest file is.",
      author: {
        name: "Marcus Johnson",
        initials: "MJ",
        tone: "from-sky-200 to-indigo-300 text-indigo-900",
      },
      role: "Product Lead, Orbital",
    },
    {
      kind: "quote",
      id: "jamal",
      date: "2026-04-03",
      quote:
        "Our customer feedback loop has improved significantly. We ship faster, and clients can see exactly where their project stands at any time.",
      author: {
        name: "Jamal Rivera",
        initials: "JR",
        tone: "from-amber-200 to-orange-300 text-orange-900",
      },
      role: "Founder, Forma Agency",
    },
    {
      kind: "quote",
      id: "priya",
      date: "2026-03-28",
      quote:
        "Time tracking and budgets in one place changed how we price work. We finally know which projects are profitable before they wrap.",
      author: {
        name: "Priya Nair",
        initials: "PN",
        tone: "from-emerald-200 to-teal-300 text-teal-900",
      },
      role: "Operations Manager, Halo",
    },
  ],
} as const satisfies TestimonialsContent;

export function getTestimonialsContent(): TestimonialsContent {
  return testimonialsContent;
}
