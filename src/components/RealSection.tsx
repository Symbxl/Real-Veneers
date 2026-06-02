"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { GoogleG, Stars } from "./GoogleRating";

const FEATURES = [
  {
    title: "Layered like natural enamel",
    body: "Translucent edges and warm dentin tones — never flat, chalky, or opaque.",
  },
  {
    title: "Shaped to your face",
    body: "Proportioned to your lips, smile line, and the way you actually talk and laugh.",
  },
  {
    title: "Designed & milled in-house",
    body: "Dr. Trevino controls every step, so the result matches the plan — in two days.",
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

export default function RealSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Restart the reel from the beginning and play it with sound.
  function playWithSound() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {});
    setMuted(false);
    setStarted(true);
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
  }

  return (
    <section className="relative overflow-hidden bg-accent-soft/30 py-24 sm:py-32">
      {/* Subtle film grain for depth */}
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* ---------- Copy (desktop only) — supporting context beside the video ---------- */}
        <div className="hidden lg:block">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="flex items-center gap-4 text-xs uppercase tracking-[0.34em] text-accent-deep"
          >
            <span aria-hidden className="h-px w-12 bg-accent" />
            The RealVeneers difference
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={1}
            className="mt-7 font-display text-[clamp(2.85rem,4.8vw,4.5rem)] font-normal leading-[0.96] tracking-[0.05em] text-accent-deep"
          >
            VENEERS
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={2}
            className="mt-3 text-sm uppercase tracking-[0.28em] text-foreground-muted"
          >
            That{" "}
            <span className="font-display lowercase italic tracking-normal text-accent-deep">
              feel
            </span>{" "}
            like your own
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={3}
            className="mt-9 max-w-md font-display text-[1.7rem] leading-snug text-foreground text-balance"
          >
            Beautiful is the easy part &mdash; we obsess over believable.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={4}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground-muted"
          >
            No bulky, opaque &ldquo;Hollywood&rdquo; blocks. Every smile is
            hand-designed to match your face, your bite, and the way light moves
            through natural enamel &mdash; so the only person who knows is you.
          </motion.p>

          <ul className="mt-9 max-w-md space-y-4">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                custom={5 + i}
                className="flex gap-3.5 text-[15px] leading-relaxed text-foreground-muted"
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] h-px w-5 shrink-0 bg-accent"
                />
                <span>
                  <span className="font-medium text-foreground">{f.title}</span>
                  {" — "}
                  {f.body}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* ---------- Conversion: primary CTA + trust (desktop only) ---------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={8}
            className="mt-11 flex flex-col items-start gap-6"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-accent-deep/60 px-8 py-4 text-xs uppercase tracking-[0.24em] text-accent-deep transition-colors duration-300 hover:border-accent-deep hover:bg-accent-deep hover:text-background"
            >
              Book your free consultation
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </a>

            <div className="flex items-center gap-3 text-sm text-foreground-muted">
              <span className="inline-flex items-center gap-2">
                <GoogleG size={16} />
                <Stars size={12} />
                <span className="font-semibold text-foreground">5.0</span>
              </span>
              <span aria-hidden className="h-3.5 w-px bg-line" />
              <span>400+ five-star reviews</span>
            </div>
          </motion.div>
        </div>

        {/* ---------- About our trial smile (video) ---------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={reveal}
          custom={1}
          className="relative mx-auto w-full max-w-md lg:max-w-[440px]"
        >
          {/* Flat offset accent panel — desktop only, sits behind the card for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-5 -right-5 -top-5 left-12 hidden rounded-[1.75rem] bg-accent-soft ring-1 ring-accent/30 lg:block"
          />

          {/* Mobile keeps its own heading; on desktop the left column carries it */}
          <h2 className="mb-6 text-center font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:hidden">
            About our trial smile
          </h2>

          <div className="relative z-10 mx-auto w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_40px_90px_-40px_rgba(15,15,16,0.45)] lg:max-w-[440px] lg:rounded-[1.75rem] lg:shadow-[0_55px_130px_-45px_rgba(15,15,16,0.55)]">
            {/* Frosted caption — desktop only, frames the clip like a player */}
            <span className="pointer-events-none absolute left-4 top-4 z-20 hidden items-center gap-2 rounded-full bg-background/90 px-3.5 py-1.5 text-xs font-medium tracking-tight text-foreground shadow-[0_8px_24px_-10px_rgba(15,15,16,0.5)] ring-1 ring-foreground/10 backdrop-blur lg:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Trial smile preview
            </span>
            <video
              ref={videoRef}
              src="/stepone.mov"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="block aspect-[9/16] w-full object-cover"
            />

            {!started ? (
              /* Centered call-to-action — restarts the reel with sound */
              <button
                type="button"
                onClick={playWithSound}
                aria-label="Play video with sound"
                className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-foreground/45 via-foreground/15 to-foreground/15 transition-colors hover:from-foreground/55"
              >
                <span className="inline-flex items-center gap-3 rounded-full bg-background/95 py-2 pl-2 pr-6 text-sm font-semibold tracking-tight text-foreground shadow-[0_18px_40px_-12px_rgba(15,15,16,0.55)] ring-1 ring-foreground/10 backdrop-blur transition-transform duration-300 ease-out group-hover:scale-[1.04]">
                  <span className="relative grid h-11 w-11 place-items-center">
                    {/* Pulsing halo behind the play disc */}
                    <span className="absolute inset-0 rounded-full bg-foreground/20 motion-safe:animate-ping" />
                    <span className="relative grid h-11 w-11 place-items-center rounded-full bg-foreground text-background shadow-lg transition-transform duration-300 ease-out group-hover:scale-105">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                        className="translate-x-[1px]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                  Play video with sound
                </span>
              </button>
            ) : (
              /* Play/pause and mute toggles once the reel is playing with sound */
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground/80 px-4 py-2.5 text-sm font-medium text-background backdrop-blur transition-colors hover:bg-foreground"
                >
                  {playing ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground/80 px-4 py-2.5 text-sm font-medium text-background backdrop-blur transition-colors hover:bg-foreground"
                >
                  {muted ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M11 5 6 9H2v6h4l5 4z" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M11 5 6 9H2v6h4l5 4z" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
