"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";

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
    width: "w-52 sm:w-64",
    height: "h-96 sm:h-[28rem]",
    offset: "translate-y-4 sm:translate-y-8",
  },
  {
    src: "/models/rich-1.webp",
    alt: "A RealVeneers patient smiling",
    width: "w-64 sm:w-72",
    height: "h-80 sm:h-96",
    offset: "translate-y-3 sm:translate-y-6",
  },
  {
    src: "/models/after1.jpg",
    alt: "A finished smile after treatment",
    width: "w-80 sm:w-[26rem]",
    height: "h-60 sm:h-72",
    offset: "-translate-y-3 sm:-translate-y-6",
  },
  {
    src: "/consult2.jpg",
    alt: "A patient consultation at RealVeneers",
    width: "w-80 sm:w-[24rem]",
    height: "h-64 sm:h-72",
    offset: "-translate-y-1 sm:-translate-y-2",
  },
  {
    src: "/lab-poster.jpg",
    alt: "Inside the RealVeneers dental lab",
    width: "w-80 sm:w-[26rem]",
    height: "h-60 sm:h-72",
    offset: "translate-y-3 sm:translate-y-6",
  },
  {
    src: "/milled.jpg",
    alt: "Freshly milled veneer restorations",
    width: "w-72 sm:w-80",
    height: "h-72 sm:h-96",
    offset: "translate-y-1 sm:translate-y-2",
  },
];

function SlideCard({
  card,
  onSelect,
  focusable,
}: {
  card: Card;
  onSelect: () => void;
  focusable: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      tabIndex={focusable ? 0 : -1}
      aria-label={`${card.alt} — view our process`}
      className={`group/card relative block shrink-0 cursor-pointer overflow-hidden rounded-[1.5rem] bg-accent-soft ring-1 ring-line shadow-[0_30px_70px_-35px_rgba(15,15,16,0.5)] transition-shadow hover:shadow-[0_36px_80px_-30px_rgba(15,15,16,0.55)] ${card.width} ${card.height} ${card.offset}`}
    >
      <Image
        src={card.src}
        alt={card.alt}
        fill
        sizes="(min-width: 640px) 26rem, 20rem"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover/card:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
      {/* Hover affordance — hints that the card opens the process popup. */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex translate-y-2 items-center justify-center gap-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        View our process
        <span aria-hidden>→</span>
      </span>
    </button>
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
  const [active, setActive] = useState<Card | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // The card that opened the popup, so focus can return to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  // While the popup is open: lock body scroll, move focus into the dialog,
  // trap Tab within it, close on Escape, and restore focus on close.
  useEffect(() => {
    if (!active) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const el = document.activeElement;
      const inside = el ? panel.contains(el) && el !== panel : false;
      if (!inside) {
        // Focus is on the panel container or escaped it — pull it to an end.
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && el === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && el === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus();
    };
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* ---------- Section intro — about the practice ---------- */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={bandReveal}
        className="mx-auto mb-2 flex max-w-4xl flex-col items-center px-6 text-center sm:mb-4 sm:px-10"
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
          <span className="h-px w-10 bg-accent" />
          About the practice
          <span className="h-px w-10 bg-accent" />
        </div>

        <h2 className="mt-6 font-display text-[clamp(2.25rem,4.8vw,4.5rem)] leading-[1.03] tracking-tight text-balance">
          Rooted in <span className="italic text-accent-deep">compassion</span>{" "}
          and craft.
        </h2>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground-muted text-pretty lg:text-xl">
          <span className="font-medium text-foreground">
            These are real RealVeneers patients, never stock photos.
          </span>{" "}
          Behind every smile is Dr. Trevino, who designs and mills each veneer
          in-house and treats every patient like family. Here, your comfort, your
          health, and the way you feel about your smile always come first.
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
              jump, at every breakpoint. Pauses on hover or keyboard focus; gated
              behind motion-safe so prefers-reduced-motion users see a static collage. */}
          <div className="flex w-max items-center motion-safe:animate-[customerScroll_64s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {[0, 1].map((copy) =>
              CARDS.map((card, i) => (
                <div
                  key={`${copy}-${i}`}
                  aria-hidden={copy === 1}
                  className="mr-5 shrink-0 sm:mr-7"
                >
                  <SlideCard
                    card={card}
                    focusable={copy === 0}
                    onSelect={() => setActive(card)}
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </motion.div>

      {/* ---------- Click-to-open popup: photo + link into the process page ---------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="slideshow-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="RealVeneers patient"
            className="fixed inset-0 z-[60] grid place-items-center bg-foreground/70 p-5 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              ref={panelRef}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_50px_120px_-30px_rgba(15,15,16,0.6)] ring-1 ring-line outline-none sm:flex-row"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-foreground ring-1 ring-line backdrop-blur transition-colors hover:bg-background"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Photo */}
              <div className="relative h-64 w-full shrink-0 sm:h-auto sm:min-h-[24rem] sm:w-1/2">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Text beside the photo */}
              <div className="flex flex-1 flex-col justify-center gap-4 p-8 sm:p-10">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
                  <span className="h-px w-8 bg-accent" />
                  Real patient
                </div>
                <p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl">
                  See how every smile is designed and milled in-house.
                </p>
                <Link
                  href="/process"
                  className="group mt-2 inline-flex w-fit items-center gap-3 rounded-xl bg-foreground px-6 py-3.5 text-base font-medium tracking-wide text-background shadow-[0_18px_40px_-16px_rgba(15,15,16,0.5)] transition-colors hover:bg-accent-deep"
                >
                  View our process
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes customerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
