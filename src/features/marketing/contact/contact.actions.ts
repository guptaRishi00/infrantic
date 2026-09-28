"use server";

import { interestValues } from "./contact.data";
import { type ContactRequest, deliverContactRequest } from "./contact.delivery";

// This action is a public POST endpoint (anyone can call it, not just the
// form), so everything is checked here: types, lengths, allowed values.

export type ContactField = "name" | "email" | "company" | "phone" | "message";

export type ContactFormState = {
  status: "idle" | "error" | "success";
  /** Form-level message for status "error" (e.g. delivery failed). */
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Submitted values, echoed back so the form keeps them after an error. */
  values?: Partial<Record<ContactField | "interest", string>>;
};

const LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254,
  company: 120,
  phone: 40,
  message: 5000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s.-]{6,}$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: a field people never see. Bots that fill it get a normal-looking
  // success and nothing is delivered.
  if (text(formData, "website")) return { status: "success" };

  const interest = text(formData, "interest");
  const request: ContactRequest = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    company: text(formData, "company"),
    phone: text(formData, "phone"),
    interest: (interestValues as readonly string[]).includes(interest)
      ? (interest as ContactRequest["interest"])
      : "",
    message: text(formData, "message"),
  };

  const errors: Partial<Record<ContactField, string>> = {};
  if (!request.name) errors.name = "Please tell us your name.";
  if (!request.email) errors.email = "Please add an email we can reply to.";
  else if (!EMAIL.test(request.email))
    errors.email = "That email doesn't look right.";
  if (request.phone && !PHONE.test(request.phone))
    errors.phone = "Use digits, spaces, and + ( ) - only.";
  if (request.message.length < 20)
    errors.message =
      "A sentence or two about the workflow helps us prepare (20 characters minimum).";
  for (const field of Object.keys(LIMITS) as ContactField[]) {
    if (request[field].length > LIMITS[field])
      errors[field] = `Please keep this under ${LIMITS[field]} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    const { interest: chosen, ...fields } = request;
    return {
      status: "error",
      errors,
      values: { ...fields, interest: chosen },
    };
  }

  try {
    await deliverContactRequest(request);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    const { interest: chosen, ...fields } = request;
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email us directly.",
      values: { ...fields, interest: chosen },
    };
  }
  return { status: "success" };
}
