"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f5f5f5] py-28 lg:py-40 text-foreground"
    >
      {/* ---------- Decorative depth layers ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-foreground/[0.04] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-40 h-[34rem] w-[34rem] rounded-full bg-foreground/[0.03] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 18% 18%, rgba(90,87,79,0.05) 0%, transparent 58%), radial-gradient(ellipse 55% 60% at 88% 90%, rgba(90,87,79,0.04) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
      />

      {/* ---------- Content ---------- */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        {/* Centered statement */}
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Oversized watermark behind the headline */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] select-none font-display font-semibold tracking-tight text-[22vw] lg:text-[16rem] leading-none text-foreground/[0.04] whitespace-nowrap"
          >
            Portrait
          </span>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground-muted"
          >
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-r from-transparent to-foreground-muted/40"
            />
            <span
              aria-hidden
              className="h-1.5 w-1.5 rotate-45 bg-foreground-muted"
            />
            An eye for aesthetics
            <span
              aria-hidden
              className="h-1.5 w-1.5 rotate-45 bg-foreground-muted"
            />
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-l from-transparent to-foreground-muted/40"
            />
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={1}
            className="relative mt-7 font-display text-5xl lg:text-7xl leading-[1.03] tracking-tight text-balance"
          >
            Veneers aren&apos;t a procedure.{" "}
            <span className="italic text-foreground">They&apos;re a portrait.</span>
          </motion.h2>
        </div>

        {/* Portrait + body */}
        <div className="mt-20 grid items-center gap-x-20 gap-y-20 lg:grid-cols-2">
          {/* Portrait with floating cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={2}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            {/* Offset backing card */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-foreground/[0.04] ring-1 ring-foreground/10"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-line shadow-[0_50px_90px_-45px_rgba(15,15,16,0.5)]">
              <Image
                src="/dr.jpg"
                alt="Dr. Ryan Trevino"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>

            {/* Floating stat chip — top left */}
            <div className="absolute -left-4 -top-4 flex -rotate-3 flex-col items-center justify-center rounded-2xl bg-foreground px-5 py-4 text-background shadow-[0_30px_70px_-30px_rgba(15,15,16,0.6)] animate-float-slow sm:-left-6">
              <span className="font-display text-3xl leading-none">25+</span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-background/70">
                Years crafting smiles
              </span>
            </div>

            {/* Floating credential card */}
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-surface px-6 py-5 ring-1 ring-line shadow-[0_24px_50px_-24px_rgba(15,15,16,0.45)] sm:left-8">
              <div className="h-px w-8 bg-foreground" />
              <div className="mt-3 font-display text-2xl leading-none">
                Dr. Ryan Trevino
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                Founder &amp; Lead Clinician
              </div>
            </div>
          </motion.div>

          {/* Body */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={3}
              className="space-y-5 text-lg leading-relaxed text-foreground-muted"
            >
              <p>
                Dr. Trevino trained as a clinician but thinks like an artist. He
                studies the way light moves through enamel, how a smile sits
                inside a face, how the smallest asymmetries make a result feel
                real instead of manufactured.
              </p>
              <p>
                Every smile he designs is built around <em>you</em> — your
                proportions, your personality, the way your lips move when you
                laugh. The goal isn&apos;t a Hollywood look. It&apos;s the
                version of you that already exists in your head.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={4}
            >
              <Link
                href="#contact"
                className="group mt-7 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-foreground-muted"
              >
                Book a complimentary consultation
                <span
                  aria-hidden
                  className="grid h-6 w-6 place-items-center rounded-full bg-foreground/5 ring-1 ring-foreground/15 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            <motion.blockquote
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={5}
              className="relative mt-10 rounded-[1.5rem] bg-foreground/5 p-8 lg:p-10 ring-1 ring-foreground/10 shadow-[0_30px_70px_-40px_rgba(15,15,16,0.4)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-4 left-6 font-display text-[6rem] leading-none text-foreground/15 select-none"
              >
                &ldquo;
              </span>
              <p className="font-display text-2xl lg:text-3xl italic leading-snug text-foreground text-balance">
                Smile makeovers are crafted to look effortlessly natural, even
                up close. That&apos;s the whole standard.
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
                Dr. Ryan Trevino
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
