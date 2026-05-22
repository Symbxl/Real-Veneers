"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-line bg-background/40 px-4 py-3.5 text-base transition placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl bg-surface p-8 text-center ring-1 ring-line shadow-[0_30px_80px_-30px_rgba(15,15,16,0.22)]">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-2xl text-accent-deep">
          ✓
        </div>
        <h3 className="mt-5 font-display text-2xl tracking-tight text-foreground">
          Thank you — we&apos;ll be in touch.
        </h3>
        <p className="mt-2 text-foreground-muted">
          We reply to every message within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-accent-deep underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl bg-surface p-7 lg:p-9 ring-1 ring-line shadow-[0_30px_80px_-30px_rgba(15,15,16,0.22)]"
    >
      <h3 className="font-display text-2xl tracking-tight text-foreground">
        Send us a message
      </h3>
      <p className="mt-1.5 text-sm text-foreground-muted">
        Tell us a little about what you&apos;re looking for.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-muted"
            >
              First name
            </label>
            <input id="firstName" name="firstName" required className={inputClass} />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-muted"
            >
              Last name
            </label>
            <input id="lastName" name="lastName" required className={inputClass} />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-muted"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-muted"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-foreground-muted"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Tell us about the smile you want…"
            className={`${inputClass} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-foreground px-6 py-4 text-base tracking-wide text-background transition-colors hover:bg-accent-deep"
      >
        Send message
      </button>

      <p className="mt-3 text-center text-xs text-foreground-muted">
        We&apos;ll get back to you within one business day.
      </p>
    </form>
  );
}
