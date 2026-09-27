"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

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

export default function Treatments() {
  return (
    <section id="treatments" className="relative bg-white">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        {/* ---------- Marble panel — kicker, heading, copy ----------
            Full-bleed to the left edge; the inner padding grows with the
            viewport so the copy lines up with the site's max-w-7xl gutter. */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(rgba(255,255,255,0.36), rgba(255,255,255,0.36)), url(/textures/marble.webp) center / cover no-repeat, #f4efe9",
          }}
        >
          <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:py-28 lg:pl-[max(2.5rem,calc((100vw_-_80rem)_/_2_+_2.5rem))] lg:pr-16 xl:pr-24">
            {/* Kicker */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.34em] text-accent-deep"
            >
              <span aria-hidden className="h-px w-12 bg-accent" />
              <span>Smile Makeover</span>
              {/* Grouped so the location wraps as one unit on narrow screens */}
              <span className="flex items-center gap-x-4 text-foreground-muted">
                <span
                  aria-hidden
                  className="hidden h-1 w-1 rotate-45 bg-accent sm:block"
                />
                Sugar Land, TX
              </span>
            </motion.div>

            {/* Headline — roman with an italic turn on the promise */}
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={1}
              className="mt-7 max-w-2xl font-display text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.02] tracking-tight text-accent-deep text-balance"
            >
              A Complete Smile Makeover{" "}
              <span className="italic">in Two Days</span>
            </motion.h2>

            {/* Lead — one serif line that carries the idea */}
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={2}
              className="mt-8 max-w-xl font-display text-[clamp(1.35rem,1.9vw,1.65rem)] leading-snug text-foreground text-balance"
            >
              Veneers, whitening, and subtle reshaping, brought together into
              one cohesive design.
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={3}
              className="mt-6 max-w-xl text-[17px] leading-[1.75] text-foreground-muted text-pretty"
            >
              Dr. Trevino builds it around your proportions, your lips, and the
              way you laugh, so the result feels like you rather than a
              Hollywood template. Every veneer is designed in 3D, milled in the
              lab inside our studio, and hand-finished by master ceramists, so
              nothing leaves the building and nothing waits.
            </motion.p>

            {/* Inside the lab — Dr. Trevino hand-finishing a veneer */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={4}
              className="relative mt-12 max-w-xl overflow-hidden rounded-2xl bg-foreground ring-1 ring-line shadow-[0_40px_90px_-40px_rgba(15,15,16,0.5)] lg:mt-14 lg:rounded-[1.75rem]"
            >
              <video
                src="/process.mp4"
                poster="/lab-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Dr. Trevino hand-finishing a porcelain veneer in the RealVeneers lab"
                className="aspect-video h-auto w-full object-cover"
              />
              {/* Frosted caption, framed like a player */}
              <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-medium tracking-tight text-foreground shadow-[0_8px_24px_-10px_rgba(15,15,16,0.5)] ring-1 ring-foreground/10 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Inside our in-house lab
              </span>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 lg:rounded-[1.75rem]" />
            </motion.div>
          </div>
        </div>

        {/* ---------- Portrait — full-bleed to the right edge ---------- */}
        <div className="relative min-h-[28rem] overflow-hidden bg-accent-soft sm:min-h-[36rem] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/models/erielle-portrait.webp"
              alt="A RealVeneers patient smiling after her porcelain veneers"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
