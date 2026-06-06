"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { team } from "@/content/team";

const AUTO_MS = 3800;
const DURATION_MS = 650;
const total = team.length;
// Rendered three times so there's always a full set on either side — lets the
// track always slide in the intended direction, then snap back invisibly.
const slides = [...team, ...team, ...team];

export default function TeamCarousel() {
  const [perView, setPerView] = useState(3);
  // Start in the middle copy so we can scroll forward and back before a reset.
  const [index, setIndex] = useState(total);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduceRef = useRef(false);

  // Responsive slides-per-view: 1 (mobile) / 2 (tablet) / 3 (desktop).
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const goNext = useCallback(() => setIndex((i) => i + 1), []);
  const goPrev = useCallback(() => setIndex((i) => i - 1), []);

  // Auto-advance, unless paused (hover/focus) or the user prefers reduced motion.
  useEffect(() => {
    if (paused || reduceRef.current) return;
    const id = setInterval(goNext, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // Re-enable the transition on the next frame, once the no-animation snap has
  // painted at its new offset (so toggling the transition back on can't animate).
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // When the track rests outside the middle copy, snap it back without animating.
  const handleRest = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (index < total || index >= 2 * total) {
      setAnimate(false);
      setIndex(total + ((((index - total) % total) + total) % total));
    }
  };

  const step = 100 / perView;
  const current = (((index - total) % total) + total) % total;

  return (
    <div
      className="group/carousel relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Our team"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex w-full"
          style={{
            transform: `translateX(-${index * step}%)`,
            transition: animate
              ? `transform ${DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
          }}
          onTransitionEnd={handleRest}
        >
          {slides.map((_, i) => {
            const m = team[i % total];
            const visible = i >= index && i < index + perView;
            return (
              <div
                key={i}
                aria-hidden={!visible}
                className="shrink-0 grow-0 px-2.5 sm:px-3.5"
                style={{ flexBasis: `${step}%` }}
              >
                <figure className="group/card flex h-full flex-col">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_30px_70px_-45px_rgba(15,15,16,0.5)]">
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.role} at Trevino Dental Group`}
                      width={1023}
                      height={1023}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover/card:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="mt-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                      {m.role}
                    </div>
                    <h3 className="mt-2 font-display text-2xl leading-none tracking-tight">
                      {m.name}
                    </h3>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-9 flex items-center justify-between gap-6">
        {/* Position dots — one per team member */}
        <div className="flex flex-wrap items-center gap-2">
          {team.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => {
                setAnimate(true);
                setIndex(total + i);
              }}
              aria-label={`Show ${m.name}`}
              aria-current={i === current}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-accent-deep"
                  : "w-1.5 bg-line hover:bg-accent/60"
              }`}
            />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous team members"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-background text-foreground transition-colors hover:bg-accent-soft/60"
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
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next team members"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-background text-foreground transition-colors hover:bg-accent-soft/60"
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
