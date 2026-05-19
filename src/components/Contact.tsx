"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="contact"
      className="py-28 lg:py-36 bg-foreground text-background relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, #b89968 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 sm:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Free consultation
            </div>
            <h2 className="mt-5 font-display text-5xl lg:text-7xl leading-[0.98] tracking-tight text-balance">
              Start with a<br />
              <span className="italic text-accent">conversation.</span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-background/75 max-w-md">
              Tell us a little about the smile you have and the smile you want.
              We&apos;ll get back to you within one business day with next steps
              — no pressure, no obligation.
            </p>

            <div className="mt-12 space-y-6">
              <ContactRow label="Studio">
                4660 Sweetwater Blvd, Suite 230
                <br />
                Sugar Land, TX 77479
              </ContactRow>
              <ContactRow label="Phone">
                <a
                  href="tel:+12819801733"
                  className="hover:text-accent transition-colors"
                >
                  (281) 980-1733
                </a>
              </ContactRow>
              <ContactRow label="Hours">
                Mon–Thu · 9:00 – 5:00
                <br />
                Fri · By appointment
              </ContactRow>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-background text-foreground rounded-3xl p-8 lg:p-10 self-start"
          >
            {submitted ? (
              <div className="py-12 text-center">
                <div className="font-display text-3xl">Thank you.</div>
                <p className="mt-4 text-foreground-muted">
                  We&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label className="block text-xs tracking-[0.18em] uppercase text-foreground-muted mb-2">
                    Tell us about your smile
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-background-muted/50 border border-line rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-none"
                    placeholder="What would you change if you could?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-foreground text-background px-6 py-4 text-sm tracking-wide hover:bg-accent-deep transition-colors group"
                >
                  Request consultation
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
                <p className="text-xs text-foreground-muted text-center pt-2">
                  We&apos;ll never share your information.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 items-start border-t border-background/10 pt-6">
      <div className="text-xs tracking-[0.18em] uppercase text-background/50 w-20 shrink-0 pt-1">
        {label}
      </div>
      <div className="text-base text-background/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.18em] uppercase text-foreground-muted mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border border-line rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
      />
    </div>
  );
}
