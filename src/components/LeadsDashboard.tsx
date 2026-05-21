"use client";

import { useEffect, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import type { Lead, LeadSource } from "@/lib/leads";
import { saveLeadAction, deleteLeadAction } from "@/app/leads/actions";
import { logoutAction } from "@/app/login/actions";

const SOURCES: LeadSource[] = ["Hero section", "Contact section"];

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

/** ISO string -> value accepted by <input type="datetime-local">. */
function toLocalInputValue(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function SourceBadge({ source }: { source: LeadSource }) {
  const isHero = source === "Hero section";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
        isHero
          ? "bg-accent-soft text-accent-deep ring-accent/40"
          : "bg-background text-foreground-muted ring-line"
      }`}
    >
      {source}
    </span>
  );
}

function ModalSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-foreground px-5 py-2.5 text-sm tracking-wide text-background transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Saving…" : "Save lead"}
    </button>
  );
}

/** Create / edit modal. `lead` is null when creating. */
function LeadModal({
  lead,
  onClose,
}: {
  lead: Lead | null;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleAction(formData: FormData) {
    setError(null);
    const result = await saveLeadAction(formData);
    if (result.ok) {
      onClose();
    } else {
      setError(result.error ?? "Could not save lead.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-background/40 px-3.5 py-2.5 text-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-surface p-7 shadow-[0_30px_80px_-20px_rgba(15,15,16,0.4)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-2xl tracking-tight text-foreground">
          {lead ? "Edit lead" : "New lead"}
        </h2>

        <form action={handleAction} className="mt-5 space-y-4">
          {lead && <input type="hidden" name="id" value={lead.id} />}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-foreground-muted">
                First name
              </label>
              <input
                name="firstName"
                defaultValue={lead?.firstName ?? ""}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-foreground-muted">
                Last name
              </label>
              <input
                name="lastName"
                defaultValue={lead?.lastName ?? ""}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-foreground-muted">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              defaultValue={lead?.phone ?? ""}
              placeholder="(555) 123-4567"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-foreground-muted">
              Source
            </label>
            <select
              name="source"
              defaultValue={lead?.source ?? SOURCES[0]}
              className={inputClass}
            >
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-foreground-muted">
              Submitted
            </label>
            <input
              name="submittedAt"
              type="datetime-local"
              defaultValue={toLocalInputValue(
                lead?.submittedAt ?? new Date().toISOString()
              )}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-background"
            >
              Cancel
            </button>
            <ModalSubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LeadsDashboard({ leads }: { leads: Lead[] }) {
  // `null` = closed, `{ lead: null }` = creating, `{ lead }` = editing.
  const [modal, setModal] = useState<{ lead: Lead | null } | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteLeadAction(id);
      if (!result.ok) setFeedback(result.error ?? "Could not delete lead.");
      setConfirmId(null);
    });
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-foreground-muted transition-colors hover:border-accent hover:text-foreground"
        >
          <span aria-hidden>←</span>
          Go back to website
        </Link>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-7">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-accent">
              Internal
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Lead Submissions
            </h1>
            <p className="mt-3 text-foreground-muted">
              Free Smile Consultation requests from the Hero and Contact
              forms.
              <span className="ml-2 font-medium text-foreground">
                {leads.length} total
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-xl px-4 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                Sign out
              </button>
            </form>
            <button
              type="button"
              onClick={() => setModal({ lead: null })}
              className="rounded-xl bg-foreground px-4 py-2.5 text-sm tracking-wide text-background transition-colors hover:bg-accent-deep"
            >
              + New lead
            </button>
          </div>
        </header>

        {feedback && (
          <p className="mt-6 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
            {feedback}
          </p>
        )}

        {leads.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-surface/50 py-16 text-center">
            <p className="text-foreground-muted">No submissions yet.</p>
            <button
              type="button"
              onClick={() => setModal({ lead: null })}
              className="mt-4 rounded-xl bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-accent-deep"
            >
              Add the first lead
            </button>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-foreground-muted">
                  <th className="px-5 py-4 font-medium">Name</th>
                  <th className="px-5 py-4 font-medium">Phone</th>
                  <th className="px-5 py-4 font-medium">Source</th>
                  <th className="px-5 py-4 font-medium">Submitted</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-line/60 last:border-0 hover:bg-background/60"
                  >
                    <td className="px-5 py-4 font-medium text-foreground">
                      {lead.firstName} {lead.lastName}
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                        className="text-accent-deep hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <SourceBadge source={lead.source} />
                    </td>
                    <td className="px-5 py-4 text-foreground-muted">
                      {dateFormatter.format(new Date(lead.submittedAt))}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {confirmId === lead.id ? (
                          <>
                            <span className="mr-1 text-xs text-foreground-muted">
                              Delete?
                            </span>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() => handleDelete(lead.id)}
                              className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmId(null)}
                              className="rounded-lg px-2.5 py-1.5 text-xs text-foreground-muted transition-colors hover:bg-background"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => setModal({ lead })}
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-background"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFeedback(null);
                                setConfirmId(lead.id);
                              }}
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <LeadModal lead={modal.lead} onClose={() => setModal(null)} />
      )}
    </main>
  );
}
