"use client";

import { useEffect, useState } from "react";

export default function VideoButton({
  src,
  label = "Watch Video",
}: {
  src: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  // Close the player on Escape while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-3 pr-7 py-3 text-sm tracking-wide transition-colors hover:bg-accent-deep"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-background/15 transition-transform group-hover:scale-105">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="w-full rounded-2xl bg-black shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-11 right-0 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
            >
              Close
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/30">
                ✕
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
