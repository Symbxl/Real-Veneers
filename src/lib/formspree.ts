// Client-side helper for submitting the site's lead/contact forms to Formspree.
//
// The endpoint comes from NEXT_PUBLIC_FORMSPREE_ENDPOINT so the form ID can be
// swapped without code changes. Because it's a NEXT_PUBLIC_* var, the value is
// inlined into the client bundle at build time — set it in .env.local locally
// and in your hosting provider's env for production.

export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

/** True when a real endpoint (not the placeholder) has been configured. */
export const FORMSPREE_CONFIGURED =
  FORMSPREE_ENDPOINT.startsWith("https://formspree.io/f/") &&
  !FORMSPREE_ENDPOINT.includes("your_form_id");

export async function submitToFormspree(data: FormData): Promise<void> {
  if (!FORMSPREE_CONFIGURED) {
    throw new Error(
      "This form isn't connected yet. Add your Formspree form ID to NEXT_PUBLIC_FORMSPREE_ENDPOINT."
    );
  }

  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });

  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const json = (await res.json()) as {
        errors?: { message: string }[];
      };
      if (json?.errors?.length) {
        message = json.errors.map((e) => e.message).join(", ");
      }
    } catch {
      // Non-JSON error response — keep the generic message.
    }
    throw new Error(message);
  }
}
