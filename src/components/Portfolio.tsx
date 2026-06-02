"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";

type Model = {
  name: string;
  caption: string;
  before: string;
  after: string;
  /** Matched zoom on both layers — adds vertical slack so `afterShift` can nudge without exposing a gap. */
  zoom?: string;
  /** Vertical nudge on the AFTER layer only, to line its smile up with the BEFORE photo. */
  afterShift?: string;
};

const models: Model[] = [
  {
    name: "Erielle",
    caption: "Full porcelain veneers",
    before: "/models/before1.jpg",
    after: "/models/after1.jpg",
    zoom: "scale-[1.06]",
  },
];

// Drag-to-reveal before/after comparison.
function BeforeAfter({ model, index }: { model: Model; index: number }) {
  const [pos, setPos] = useState(50);

  return (
    <figure>
      <div
        className="relative aspect-[4/5] cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl bg-foreground ring-1 ring-line"
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          setPos(Math.max(4, Math.min(96, x)));
        }}
      >
        {/* BEFORE layer */}
        <img
          src={model.before}
          alt={`${model.name} before`}
          className={`absolute inset-0 h-full w-full object-cover object-top ${
            model.zoom ?? ""
          }`}
        />
        <div className="absolute left-4 top-4 rounded-full border border-background/20 bg-foreground/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-background backdrop-blur">
          Before
        </div>

        {/* AFTER layer (clipped from the left) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <img
            src={model.after}
            alt={`${model.name} after`}
            className={`absolute inset-0 h-full w-full object-cover object-top ${
              model.zoom ?? ""
            } ${model.afterShift ?? ""}`}
          />
          <div className="absolute right-4 top-4 rounded-full border border-accent/40 bg-background/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur">
            After
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 w-px bg-background shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent bg-background text-foreground shadow-xl">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 6 15 12 9 18" transform="translate(6 0)" />
            </svg>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
            {model.caption}
          </div>
        </div>
        <div className="font-display text-2xl leading-none text-accent">
          0{index + 1}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            See the <span className="italic text-accent">transformation.</span>
          </h2>
          <p className="max-w-md text-foreground-muted">
            Drag the slider on each portrait to reveal the before and after.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-y-14">
          {models.map((m, i) => (
            <BeforeAfter key={m.name} model={m} index={i} />
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground pl-7 pr-3 py-3 text-xs font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent-deep"
          >
            View full gallery
            <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
