"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Self-hosted worker (copied into /public) so rendering works offline and the
// version always matches the bundled pdfjs-dist.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function ResumeViewer({
  resume,
  name,
  onClose,
}: {
  resume: string;
  name: string;
  onClose: () => void;
}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Close on Escape, page with arrow keys, and lock background scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPageNumber((p) => Math.min(p + 1, numPages));
      if (e.key === "ArrowLeft") setPageNumber((p) => Math.max(p - 1, 1));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [numPages, onClose]);

  // Fit a single page to the available height of the modal body.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setPageHeight(Math.max(el.clientHeight - 32, 240));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const downloadName = `${name} - Resume.pdf`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} resume`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-background shadow-[0_40px_120px_-30px_rgba(15,15,16,0.6)]"
      >
        {/* Header: title + download + close */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          <div className="truncate text-xs font-medium uppercase tracking-[0.18em] text-foreground">
            {name} — Resume
          </div>
          <div className="flex items-center gap-2">
            <a
              href={resume}
              download={downloadName}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent-deep"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground transition-colors hover:bg-accent-soft/50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* One page at a time, fitted to the modal height */}
        <div
          ref={bodyRef}
          className="flex flex-1 items-center justify-center overflow-auto bg-foreground/5 p-4"
        >
          <Document
            file={resume}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
                Loading…
              </div>
            }
            error={
              <div className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
                Couldn&apos;t load the resume.
              </div>
            }
          >
            {pageHeight > 0 && (
              <Page
                pageNumber={pageNumber}
                height={pageHeight}
                className="overflow-hidden rounded-lg shadow-md ring-1 ring-line"
              />
            )}
          </Document>
        </div>

        {/* Page navigation */}
        {numPages > 1 && (
          <div className="flex items-center justify-center gap-5 border-t border-line px-5 py-3">
            <button
              type="button"
              onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
              disabled={pageNumber <= 1}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground transition-colors hover:bg-accent-soft/50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <span aria-hidden>←</span>
            </button>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              Page {pageNumber} of {numPages}
            </div>
            <button
              type="button"
              onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
              disabled={pageNumber >= numPages}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-foreground transition-colors hover:bg-accent-soft/50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
