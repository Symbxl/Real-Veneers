"use client";

import { useState } from "react";
import { faqs } from "@/content/faqs";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span
          className={`font-display text-xl lg:text-2xl leading-snug tracking-tight transition-colors ${
            open ? "text-accent-deep" : "text-foreground group-hover:text-accent-deep"
          }`}
        >
          {q}
        </span>
        <span
          className={`relative grid place-items-center h-9 w-9 shrink-0 rounded-full border transition-colors ${
            open
              ? "border-accent-deep bg-accent-deep text-background"
              : "border-line text-foreground-muted group-hover:border-accent"
          }`}
        >
          <span className="absolute h-px w-3.5 bg-current" />
          <span
            className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${
              open ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-7 pr-12 text-[15px] leading-relaxed text-foreground-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 lg:py-36 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              Common questions
            </div>
            <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              Everything you&apos;re{" "}
              <span className="italic text-foreground-muted">wondering.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted text-balance">
              Still have a question that isn&apos;t here? The fastest answer is
              a real conversation.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-foreground hover:text-accent-deep transition-colors"
            >
              <span className="underline underline-offset-4 decoration-line">
                Talk to Dr. Trevino
              </span>
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="border-t border-line">
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
