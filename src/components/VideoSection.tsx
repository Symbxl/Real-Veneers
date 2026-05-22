"use client";

import { useRef, useState } from "react";

export default function VideoSection() {
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
    <section className="bg-white pt-6 pb-20 lg:pt-10 lg:pb-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2 className="mb-8 text-center font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight">
          About our trial smile:
        </h2>
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_40px_90px_-40px_rgba(15,15,16,0.45)]">
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
              className="group absolute inset-0 grid place-items-center bg-foreground/25 transition-colors hover:bg-foreground/35"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full bg-foreground/90 px-6 py-3.5 text-sm font-medium text-background shadow-xl backdrop-blur transition-transform group-hover:scale-105">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
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
      </div>
    </section>
  );
}
