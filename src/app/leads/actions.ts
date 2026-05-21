"use server";

// Server Actions backing the /leads dashboard CRUD.
//
// Note: Server Actions are POST endpoints reachable directly, not only
// through the UI. These post to the `/leads` route, which the Basic Auth
// gate in `src/proxy.ts` already covers — so they inherit that protection.

import { revalidatePath } from "next/cache";
import {
  createLead,
  updateLead,
  deleteLead,
  LEAD_SOURCES,
  type LeadInput,
  type LeadSource,
} from "@/lib/leads";

export type ActionResult = { ok: boolean; error?: string };

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

/** Create a lead when no `id` is present, otherwise update that lead. */
export async function saveLeadAction(
  formData: FormData
): Promise<ActionResult> {
  const id = field(formData, "id");
  const firstName = field(formData, "firstName");
  const lastName = field(formData, "lastName");
  const phone = field(formData, "phone");
  const sourceRaw = field(formData, "source");
  const submittedAtRaw = field(formData, "submittedAt");

  if (!firstName || !lastName) {
    return { ok: false, error: "First and last name are required." };
  }
  if (!phone) {
    return { ok: false, error: "A phone number is required." };
  }

  const source: LeadSource = LEAD_SOURCES.includes(sourceRaw as LeadSource)
    ? (sourceRaw as LeadSource)
    : "Hero section";

  const submittedDate = submittedAtRaw ? new Date(submittedAtRaw) : new Date();
  if (Number.isNaN(submittedDate.getTime())) {
    return { ok: false, error: "The submission date is invalid." };
  }

  const input: LeadInput = {
    firstName,
    lastName,
    phone,
    source,
    submittedAt: submittedDate.toISOString(),
  };

  try {
    if (id) {
      await updateLead(id, input);
    } else {
      await createLead(input);
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not save lead.",
    };
  }

  revalidatePath("/leads");
  return { ok: true };
}

/** Delete a lead by id. */
export async function deleteLeadAction(id: string): Promise<ActionResult> {
  if (!id) return { ok: false, error: "Missing lead id." };

  try {
    await deleteLead(id);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not delete lead.",
    };
  }

  revalidatePath("/leads");
  return { ok: true };
}
