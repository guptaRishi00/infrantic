"use client";

import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import Link from "next/link";
import {
  type ReactNode,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { blockIcons } from "@/features/marketing/page-blocks";
import { cn } from "@/shared/lib/cn";
import {
  type ContactField,
  type ContactFormState,
  submitContact,
} from "../contact.actions";
import type { ContactFormContent } from "../contact.data";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "block w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-zinc-400 transition-colors hover:border-zinc-300 focus:border-brand focus:ring-3 focus:ring-brand/15 focus:outline-none aria-invalid:border-red-400 aria-invalid:focus:ring-red-400/15";

/**
 * Contact form. Posts to the `submitContact` server action (which validates
 * everything again); the browser's own checks are only a first pass. After an
 * error the action echoes the values back as `defaultValue`s, so React's
 * post-submit form reset restores them instead of clearing the form.
 */
export function ContactForm({ content }: { content: ContactFormContent }) {
  // Remounting (new key) is the reset: fresh action state, empty fields.
  const [attempt, setAttempt] = useState(0);
  return (
    <FormBody
      key={attempt}
      content={content}
      onReset={() => setAttempt((n) => n + 1)}
    />
  );
}

function FormBody({
  content,
  onReset,
}: {
  content: ContactFormContent;
  onReset: () => void;
}) {
  const [state, action, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  // Move focus to what changed: the confirmation, or the first invalid field.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error" && state.errors) {
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid=true]")
        ?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <output className="flex flex-col items-start py-6">
        <CircleCheck aria-hidden="true" className="size-9 text-emerald-600" />
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-5 text-2xl font-semibold tracking-tight text-ink focus:outline-none"
        >
          {content.successTitle}
        </h2>
        <p className="mt-2 max-w-md text-[15px] leading-6 text-zinc-600">
          {content.successBody}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex h-11 items-center rounded-lg border border-zinc-200 bg-white px-4.5 text-[15px] font-medium text-zinc-800 transition-colors hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {content.resetLabel}
        </button>
      </output>
    );
  }

  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const field = (name: ContactField) => ({
    id: `${id}-${name}`,
    name,
    defaultValue: values[name],
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  return (
    <form ref={formRef} action={action} className="grid gap-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          {content.title}
        </h2>
        <p className="mt-1 text-[14px] text-zinc-500">{content.description}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          required
          error={errors.name}
          htmlFor={`${id}-name`}
          errorId={`${id}-name-error`}
        >
          <input
            {...field("name")}
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field
          label="Work email"
          required
          error={errors.email}
          htmlFor={`${id}-email`}
          errorId={`${id}-email-error`}
        >
          <input
            {...field("email")}
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field
          label="Company"
          error={errors.company}
          htmlFor={`${id}-company`}
          errorId={`${id}-company-error`}
        >
          <input
            {...field("company")}
            type="text"
            maxLength={120}
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
        <Field
          label="Phone"
          error={errors.phone}
          htmlFor={`${id}-phone`}
          errorId={`${id}-phone-error`}
        >
          <input
            {...field("phone")}
            type="tel"
            maxLength={40}
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="text-[14px] font-medium text-ink">
          {content.interestLegend}
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {content.interests.map((interest) => {
            const Icon = blockIcons[interest.icon];
            return (
              <label
                key={interest.value}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white py-1.5 pr-3.5 pl-2 text-[14px] text-zinc-700 transition-colors select-none hover:border-zinc-300 has-checked:border-brand-300 has-checked:bg-brand-50 has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
              >
                <input
                  type="radio"
                  name="interest"
                  value={interest.value}
                  defaultChecked={values.interest === interest.value}
                  className="sr-only"
                />
                <span className="grid size-6 place-items-center rounded-full bg-zinc-100">
                  <Icon aria-hidden="true" className="size-3.5 text-zinc-800" />
                </span>
                {interest.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field
        label="What does the workflow look like today?"
        required
        error={errors.message}
        htmlFor={`${id}-message`}
        errorId={`${id}-message-error`}
      >
        <textarea
          {...field("message")}
          required
          minLength={20}
          maxLength={5000}
          rows={5}
          placeholder="Who is involved, which tools it runs through, and where it gets stuck."
          className={cn(inputClass, "resize-y")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-[14px] text-red-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-zinc-500">
          {content.privacyNote}{" "}
          <Link
            href={content.privacyLink.href}
            className="underline underline-offset-2 hover:text-ink"
          >
            {content.privacyLink.label}
          </Link>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-black px-5 text-[15px] font-medium text-white transition-colors hover:bg-brand-gradient focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="size-4 motion-safe:animate-spin"
              />
              {content.pendingLabel}
            </>
          ) : (
            <>
              {content.submitLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[14px] font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-zinc-400">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-[13px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
