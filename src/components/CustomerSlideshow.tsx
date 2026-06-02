"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

type Card = {
  src: string;
  alt: string;
  /** Tailwind width classes — varied per card for an editorial collage feel. */
  width: string;
  /** Tailwind height classes — varied per card (mixed aspect ratios). */
  height: string;
  /** Vertical stagger so the baseline reads lively, not a uniform filmstrip. */
  offset: string;
};

// Mixed portrait / square / landscape crops with alternating vertical offsets.
const CARDS: Card[] = [
  {
    src: "/models/erielle-1.webp",
    alt: "Portrait of a RealVeneers patient",
    width: "w-44 sm:w-52",
    height: "h-80 sm:h-96",
    offset: "translate-y-4 sm:translate-y-8",
  },
  {
    src: "/models/rich-1.webp",
    alt: "A RealVeneers patient smiling",
    width: "w-52 sm:w-60",
    height: "h-72 sm:h-80",
    offset: "translate-y-3 sm:translate-y-6",
  },
  {
    src: "/models/after1.jpg",
    alt: "A finished smile after treatment",
    width: "w-72 sm:w-[22rem]",
    height: "h-52 sm:h-60",
    offset: "-translate-y-3 sm:-translate-y-6",
  },
  {
    src: "/models/after.jpg",
    alt: "Close-up of a completed veneer smile",
    width: "w-56 sm:w-64",
    height: "h-60 sm:h-72",
    offset: "translate-y-2 sm:translate-y-4",
  },
  {
    src: "/consult2.jpg",
    alt: "A patient consultation at RealVeneers",
    width: "w-72 sm:w-80",
    height: "h-56 sm:h-64",
    offset: "-translate-y-1 sm:-translate-y-2",
  },
  {
    src: "/lab-poster.jpg",
    alt: "Inside the RealVeneers dental lab",
    width: "w-72 sm:w-[22rem]",
    height: "h-52 sm:h-60",
    offset: "translate-y-3 sm:translate-y-6",
  },
  {
    src: "/milled.jpg",
    alt: "Freshly milled veneer restorations",
    width: "w-60 sm:w-72",
    height: "h-64 sm:h-72",
    offset: "translate-y-1 sm:translate-y-2",
  },
];

function SlideCard({ card }: { card: Card }) {
  return (
    <figure
      className={`group/card relative shrink-0 overflow-hidden rounded-[1.5rem] bg-accent-soft ring-1 ring-line shadow-[0_30px_70px_-35px_rgba(15,15,16,0.5)] ${card.width} ${card.height} ${card.offset}`}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="(min-width: 640px) 22rem, 18rem"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover/card:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
    </figure>
  );
}

const bandReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CustomerSlideshow() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* ---------- Section intro — about the practice ---------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={bandReveal}
        className="mx-auto mb-2 flex max-w-3xl flex-col items-center px-6 text-center sm:mb-4 sm:px-10"
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
          <span className="h-px w-10 bg-accent" />
          About the practice
          <span className="h-px w-10 bg-accent" />
        </div>

        <h2 className="mt-6 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.04] tracking-tight">
          Rooted in <span className="italic text-accent-deep">compassion</span>{" "}
          and craft.
        </h2>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted text-balance">
          These are real RealVeneers patients — never stock photos. Behind every
          smile is Dr. Trevino, who designs and mills each veneer in-house and
          treats every patient like family. Here, your comfort, your health, and
          the way you feel about your smile always come first.
        </p>
      </motion.div>

      {/* ---------- Full-bleed auto-scrolling rail ----------
          Breaks out of the centered container to true viewport width. The parent
          section is overflow-hidden, so w-screen never produces a horizontal page
          scrollbar. The band lifts in once on scroll to match the section above. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={bandReveal}
        className="group relative left-1/2 w-screen -translate-x-1/2"
      >
        {/* Edge-fade masks: cards melt in / out at the band edges. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        {/* The vertical padding clears the largest card offsets (±3rem) so the
            stagger is never clipped by the band's overflow-hidden. The lead inset
            (pl-*) lives HERE on the non-animated parent — never on the animated
            track — so it can't corrupt the translateX(-50%) loop math below. */}
        <div className="overflow-hidden py-16 pl-5 sm:pl-8">
          {/* Seamless loop: every card carries its OWN trailing gap (mr-*), and the
              card list is rendered TWICE back-to-back. Because each card is exactly
              `card + margin` wide and the animated track has zero padding of its own,
              the two copies are perfectly periodic: translateX(-50%) shifts the track
              by exactly one full copy — landing copy #2 where copy #1 began with zero
              jump, at every breakpoint. Pauses on hover; gated behind motion-safe so
              prefers-reduced-motion users see a static collage. */}
          <div className="flex w-max items-center motion-safe:animate-[customerScroll_64s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) =>
              CARDS.map((card, i) => (
                <div
                  key={`${copy}-${i}`}
                  aria-hidden={copy === 1}
                  className="mr-5 shrink-0 sm:mr-7"
                >
                  <SlideCard card={card} />
                </div>
              )),
            )}
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes customerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
