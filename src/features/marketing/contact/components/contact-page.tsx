import { Mail, MapPin, Phone } from "lucide-react";
import { Faq } from "@/features/marketing/faq";
import { type ContactDetail, getContactContent } from "../contact.data";
import { ContactForm } from "./contact-form";

const detailIcons: Record<ContactDetail["icon"], typeof Mail> = {
  mail: Mail,
  phone: Phone,
  location: MapPin,
};

/**
 * Contact: intro and form side by side from lg (on phones the form comes
 * straight after the heading, then "what happens next" and direct details),
 * followed by the shared FAQ. No CtaBand: its button points here.
 */
export function ContactPage() {
  const { intro, form, faq } = getContactContent();
  return (
    <>
      <section
        aria-labelledby="page-title"
        className="bg-[radial-gradient(70%_60%_at_50%_0%,#eef8ff_0%,rgb(255_255_255/0)_100%)] px-4 pt-36 pb-16 sm:pt-44 sm:pb-24"
      >
        <div className="mx-auto grid max-w-[80rem] gap-12 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16">
          {/* Phones: the intro is drawn at 90%; the form keeps its size so its
              inputs stay readable (and iOS doesn't zoom on focus). */}
          <div className="max-sm:[zoom:0.9]">
            <p className="w-fit rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-[13px] font-medium tracking-wide text-zinc-600">
              {intro.eyebrow}
            </p>
            <h1
              id="page-title"
              className="mt-6 max-w-[16ch] text-[2.5rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-ink sm:text-[3.25rem] lg:text-[3.75rem]"
            >
              {intro.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-7 text-pretty text-zinc-600">
              {intro.description}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <ContactForm content={form} />
          </div>

          <div className="grid gap-10">
            <div>
              <h2 className="font-mono text-[13px] tracking-[0.08em] text-brand-700 uppercase">
                {intro.nextTitle}
              </h2>
              <ol className="relative mt-5 grid gap-6">
                <span
                  aria-hidden="true"
                  className="absolute top-3 bottom-3 left-[0.9375rem] w-px bg-[linear-gradient(to_bottom,#07a1fd,#047efd)]"
                />
                {intro.next.map((step, index) => (
                  <li key={step.id} className="relative flex gap-4">
                    <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-brand-200 bg-white font-mono text-[13px] text-brand-700">
                      {index + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-[17px] font-semibold tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-md text-[15px] leading-6 text-zinc-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-mono text-[13px] tracking-[0.08em] text-brand-700 uppercase">
                {intro.detailsTitle}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2">
                {intro.details.map((detail: ContactDetail) => {
                  const Icon = detailIcons[detail.icon];
                  const body = (
                    <>
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-zinc-200 bg-white">
                        <Icon
                          aria-hidden="true"
                          className="size-4 text-zinc-800"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] text-zinc-500">
                          {detail.label}
                        </span>
                        <span className="block truncate text-[15px] font-medium text-ink">
                          {detail.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={detail.id}>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-3 transition-colors hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200/80 bg-white/70 p-3">
                          {body}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Faq content={faq} />
    </>
  );
}
