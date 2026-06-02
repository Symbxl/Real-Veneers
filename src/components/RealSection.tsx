"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "motion/react";

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
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Subtle film grain for depth */}
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* ---------- Copy (desktop only) ----------
            Deep-navy panel: a cool counterpoint to the site's warm gold palette,
            letting the gold accents read as luxe rather than yellow. */}
        <div className="relative hidden overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#3a4d78] via-[#2e3f63] to-[#26314f] p-11 ring-1 ring-white/10 shadow-[0_50px_110px_-45px_rgba(33,44,74,0.7)] lg:block lg:p-14">
          {/* Soft warm glow + gold top hairline tie the panel back to the brand. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="relative flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent"
          >
            <span className="h-px w-10 bg-accent" />
            The difference
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={1}
            className="relative mt-6 font-display text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.98] tracking-tight text-white"
          >
            Veneers should
            <br />
            look <span className="italic text-accent">real.</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={2}
            className="relative mt-7 max-w-xl text-lg leading-relaxed text-white/70 text-balance"
          >
            No bulky, opaque &ldquo;Hollywood&rdquo; blocks. Every smile is
            hand-designed to match your face, your bite, and the way light moves
            through natural enamel — so the only person who knows is you.
          </motion.p>

          <ul className="relative mt-10 space-y-5">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                custom={3 + i}
                className="flex gap-4"
              >
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-[#26314f] ring-1 ring-accent/40">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <div className="font-display text-xl tracking-tight text-white">
                    {f.title}
                  </div>
                  <div className="mt-1 text-base leading-relaxed text-white/65">
                    {f.body}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ---------- About our trial smile (video) ---------- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={reveal}
          custom={1}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <h2 className="mb-6 text-center font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:mb-8 lg:text-5xl">
            About our trial smile
          </h2>

          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_40px_90px_-40px_rgba(15,15,16,0.45)]">
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
