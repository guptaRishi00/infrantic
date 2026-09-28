import type { InterestValue } from "./contact.data";

export type ContactRequest = {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: InterestValue | "";
  message: string;
};

/**
 * Where a validated contact request goes.
 *
 * NOT WIRED YET (user, 2026-09-28: "design now, wire later"). Submissions are
 * accepted and acknowledged but not delivered anywhere. Connect this to email,
 * a CRM, or a webhook (e.g. an n8n flow, URL from an env var) before launch.
 * Throw on failure: the action turns that into a friendly error for the visitor.
 *
 * Deliberately not a "use server" module: every export of one of those is a
 * public endpoint, and this must only run after validation in the action.
 */
export async function deliverContactRequest(
  request: ContactRequest,
): Promise<void> {
  // No personal data in logs: just enough to see that the form is being used.
  console.info(
    `[contact] request received (not delivered: no destination configured); interest=${request.interest || "none"}, message length=${request.message.length}`,
  );
}
