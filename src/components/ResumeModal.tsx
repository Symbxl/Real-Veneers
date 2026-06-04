"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// react-pdf touches browser-only globals (DOMMatrix) at import time, so the
// viewer must never run on the server. Load it client-only, on first open.
const ResumeViewer = dynamic(() => import("./ResumeViewer"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 backdrop-blur-sm">
      <div className="text-xs uppercase tracking-[0.18em] text-background">
        Loading…
      </div>
    </div>
  ),
});

export default function ResumeModal({
  resume,
  name,
}: {
  resume: string;
  name: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-background px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-accent-soft/50"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        Resume
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>

      {open && (
        <ResumeViewer
          resume={resume}
          name={name}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
