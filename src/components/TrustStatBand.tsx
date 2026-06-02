"use client";

import { motion, type Variants } from "motion/react";

const STATS = [
  { figure: "500+", label: "Smiles transformed" },
  { figure: "25+", label: "Years of artistry" },
  { figure: "2-Day", label: "Smile turnaround" },
  { figure: "100%", label: "Crafted in-house" },
];

// Shared scroll-in reveal; `custom` index drives the stagger.
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const viewport = { once: true, margin: "-80px" } as const;

export default function TrustStatBand() {
  return (
    <section className="relative overflow-hidden bg-[#faf6ef] py-20 sm:py-24">
      {/* Warm ambient glow + faux-mesh + grain for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-accent-soft/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 18% 18%, rgba(184,153,104,0.12) 0%, transparent 58%), radial-gradient(ellipse 55% 60% at 88% 90%, rgba(184,153,104,0.08) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      {/* Edge feather — blends the tinted band into white neighbors */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
        {/* Diamond eyebrow rule + kicker */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={reveal}
          className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep"
        >
          <span aria-hidden className="h-px w-8 bg-accent" />
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent" />
          By the numbers
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent" />
          <span aria-hidden className="h-px w-8 bg-accent" />
        </motion.div>

        {/* Stats grid with hairline dividers.
            Vertical hairlines between columns at every breakpoint;
            a horizontal hairline splits the two mobile rows (removed at lg). */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={i}
              className={[
                "flex flex-col items-center px-4 py-6 text-center",
                // Column divider: left border on every cell except the first
                // of each visual row.
                "border-line border-l",
                // 2-up mobile: cells 0 & 2 start a row.
                "[&:nth-child(odd)]:border-l-0",
                // 4-up desktop: only the very first cell starts the row.
                "lg:[&:nth-child(odd)]:border-l lg:[&:first-child]:border-l-0",
                // Row divider: top border on the second mobile row (cells 2 & 3),
                // dropped once everything sits on one line at lg.
                "[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0",
              ].join(" ")}
            >
              <span className="font-display text-5xl leading-none text-foreground lg:text-6xl">
                {stat.figure}
              </span>
              <span className="mt-4 text-xs uppercase tracking-[0.15em] text-foreground-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
