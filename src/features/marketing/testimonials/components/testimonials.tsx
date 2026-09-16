import { InitialsAvatar } from "@/shared/ui/initials-avatar";
import { SectionHeading } from "@/shared/ui/section-heading";
import type { Testimonial, TestimonialsContent } from "../testimonials.types";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <section aria-labelledby="testimonials-title" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          id="testimonials-title"
          title={content.title}
          description={content.description}
          align="left"
        />
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))] scroll-px-[max(1rem,calc((100%_-_72rem)/2_+_1rem))] [scrollbar-width:thin]">
        {content.testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="h-[22rem] w-[17rem] shrink-0 snap-start sm:w-[18.5rem]"
          >
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.kind === "portrait") {
    return (
      <figure className="relative flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-[radial-gradient(110%_80%_at_50%_20%,#f4f4f5,#d4d4d8_70%,#a1a1aa)] p-5">
        <InitialsAvatar
          person={testimonial.person}
          className="absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-[60%] text-4xl shadow-[0_24px_48px_-20px_rgb(24_24_27/0.5)] ring-4 ring-white/60"
        />
        <figcaption className="relative rounded-xl bg-white/80 px-3 py-2.5 backdrop-blur">
          <span className="block text-sm font-medium text-zinc-950">
            {testimonial.person.name}
          </span>
          <span className="block text-xs text-zinc-500">
            {testimonial.role}
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_2px_rgb(0_0_0/0.03)]">
      <time dateTime={testimonial.date} className="text-xs text-zinc-400">
        {dateFormat.format(new Date(testimonial.date))}
      </time>
      <blockquote className="mt-auto text-[15px] leading-6 text-pretty text-zinc-700">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-4">
        <InitialsAvatar
          person={testimonial.author}
          className="size-8 text-[11px]"
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-zinc-950">
            {testimonial.author.name}
          </span>
          <span className="block truncate text-xs text-zinc-500">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
