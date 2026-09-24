"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";

type Card = {
  src: string;
  poster?: string;
  caption: string;
  href: string;
  /** Desktop column span in the section's 12-col grid. */
  span: string;
  /** Desktop aspect ratio — the wide lab card opens up to show more of its landscape clip. */
  aspect: string;
  /** Desktop stagger — the inner card (nearest the copy) sits lower, editorial-style. */
  offset?: string;
  /** object-position for the portrait crop of a landscape clip — aims at the subject. */
  focus?: string;
};

// Two video cards. On desktop the Smile Design card stays tall and narrow
// while the In-House Lab card runs wide, tucking under the overhanging heading
// to fill the right-hand column. The clips are landscape, so object-cover
// crops the portrait card hard; `focus` slides that window onto the subject.
const CARDS: Card[] = [
  {
    src: "/video.mp4",
    caption: "Smile Design",
    href: "/process",
    span: "lg:col-span-4",
    aspect: "lg:aspect-[9/14]",
    focus: "32% 50%",
  },
  {
    src: "/about-lab.mp4",
    poster: "/about-lab-poster.jpg",
    caption: "In-House Lab",
    href: "/process",
    span: "lg:col-span-8",
    aspect: "lg:aspect-[4/3]",
    offset: "mt-8 sm:mt-12 lg:mt-24",
    focus: "45% 50%",
  },
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

export default function BrilliantSmiles() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Copy column — top right on desktop, right-aligned so it
              mirrors the reference. It shares row 1 with the cards so the wide
              lab card can run underneath the heading. ---------- */}
          <div className="relative z-10 flex flex-col lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:items-end lg:self-start lg:text-right">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              className="text-xs uppercase tracking-[0.3em] text-foreground-muted"
            >
              The <span className="font-bold text-accent-deep">craft</span>{" "}
              behind
            </motion.div>

            {/* On desktop it stays on one line, sized to its content and pinned
                to the column's right edge, so it overhangs leftward across the
                gap above the lower card. */}
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={1}
              className="relative z-10 mt-4 font-display text-[clamp(2.75rem,5.6vw,5rem)] font-normal leading-[0.95] tracking-[0.04em] text-accent-deep lg:w-max lg:self-end lg:whitespace-nowrap"
            >
              Real Veneers
            </motion.h2>
          </div>

          {/* ---------- Video cards — full width on desktop; the inner grid
              reuses the outer 12 tracks so the cards line up with the copy. ---------- */}
          <div className="lg:col-start-1 lg:col-end-13 lg:row-start-1">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              className="mb-6 text-right text-xs uppercase tracking-[0.3em] text-foreground-muted lg:mb-8 lg:text-left"
            >
              Our process
            </motion.div>

            <div className="grid grid-cols-2 items-start gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-12">
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.caption}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={reveal}
                  custom={2 + i}
                  className={[card.span, card.offset].filter(Boolean).join(" ")}
                >
                  <Link
                    href={card.href}
                    aria-label={`${card.caption} — see how we work`}
                    className={`group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-foreground ring-1 ring-line shadow-[0_40px_90px_-40px_rgba(15,15,16,0.5)] transition-shadow duration-300 hover:shadow-[0_50px_110px_-40px_rgba(15,15,16,0.6)] ${card.aspect} lg:rounded-[1.75rem]`}
                  >
                    <video
                      src={card.src}
                      poster={card.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{ objectPosition: card.focus }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    {/* Bottom scrim keeps the caption legible over any frame */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 lg:rounded-[1.75rem]" />
                    <span className="absolute bottom-5 left-5 right-5 font-display text-2xl italic leading-tight text-white sm:bottom-6 sm:left-6 sm:text-3xl lg:bottom-8 lg:left-8 lg:text-[2.75rem]">
                      {card.caption}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
