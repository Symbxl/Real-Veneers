import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Dr. Ryan Trevino — RealVeneers",
  description:
    "Meet Dr. Ryan Trevino, DDS — the Sugar Land cosmetic and family dentist behind RealVeneers and Trevino Dental Group.",
};

const intro = [
  "Dr. Ryan Trevino is a Sugar Land cosmetic and family dentist who pairs an artist’s eye with an engineer’s precision. He founded RealVeneers — a studio devoted entirely to natural, two-day porcelain veneers — and leads Trevino Dental Group, his family dental practice in the same community.",
  "His work blends advanced digital dentistry with a genuinely personal standard of care. The goal is never just a healthier tooth — it’s a patient who leaves confident, comfortable, and certain they were truly listened to.",
];

const credentials = [
  {
    stat: "Baylor College of Dentistry",
    label: "Doctor of Dental Surgery — graduated with honors",
  },
  {
    stat: "700+ hours",
    label: "Of continuing education completed and counting",
  },
  {
    stat: "ADA & TDA",
    label: "American & Texas Dental Association member",
  },
  {
    stat: "CEREC · Invisalign",
    label: "Advanced same-day crown & clear-aligner certified",
  },
];

const philosophy = [
  "Dr. Trevino practices what he calls a holistic approach — one that considers the whole person, not just the tooth in the chair. Comfort, confidence, and long-term health all factor into every plan he designs.",
  "He believes a great dental experience is built on a lasting relationship of trust and mutual respect — never a transaction. Patients are walked through every option, every cost, and every step before anything begins.",
];

const practices = [
  {
    name: "RealVeneers",
    role: "Cosmetic veneer studio",
    body: "A boutique Sugar Land studio focused on one thing — AI-designed, hand-finished porcelain veneers, crafted in an in-house lab and delivered in just two days.",
    href: "/",
    cta: "You’re here",
    external: false,
  },
  {
    name: "Trevino Dental Group",
    role: "Family & general dentistry",
    body: "Dr. Trevino’s family dental practice — comprehensive, patient-centered care for every age, built on the same technology and the same standard.",
    href: "https://trevinodentalgroup.com",
    cta: "Visit the practice",
    external: true,
  },
];

const personal = [
  "Away from the practice, Dr. Trevino is happiest outdoors — hiking, biking, and camping with his wife Sierra and their three children, Mateo, Everest, and Elise. Seryn, the family husky, usually comes along too.",
  "He’s also a lifelong musician, proficient in seven instruments — drums, piano, electric and acoustic guitar, bass, and ukulele.",
];

const quotes = [
  {
    quote:
      "He’s an exceptional dentist who truly cares about their patients’ well-being.",
    name: "William M.",
  },
  {
    quote: "He is so easy-going and you feel very comfortable in his care.",
    name: "Alice T.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header — intro + portrait */}
        <section className="pt-32 lg:pt-44 pb-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                  About
                </div>
                <h1 className="mt-5 font-display text-6xl lg:text-8xl leading-[1] tracking-tight">
                  Dr. Ryan Trevino
                </h1>
                <div className="mt-4 text-sm tracking-[0.18em] uppercase text-foreground-muted">
                  DDS · Cosmetic &amp; Family Dentistry · Sugar Land, TX
                </div>
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground-muted">
                  {intro.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-accent-soft via-accent/30 to-accent-deep/40 ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/drt.jpg"
                  alt="Dr. Ryan Trevino"
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-display text-2xl text-white">
                    Founder &amp; Lead Clinician
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-16 lg:py-20 bg-surface border-y border-line">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {credentials.map((c) => (
                <div key={c.stat}>
                  <div className="font-display text-2xl lg:text-3xl leading-tight tracking-tight">
                    {c.stat}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                  Philosophy of care
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-balance">
                  A relationship, not a transaction.
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-foreground-muted">
                {philosophy.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Outside the office */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-line bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/trevino-44.jpg"
                  alt="Dr. Ryan Trevino outside the office"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                  Outside the office
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-balance">
                  When the lab coat comes off.
                </h2>
                <div className="mt-7 space-y-5 text-lg leading-relaxed text-foreground-muted">
                  {personal.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 grid sm:grid-cols-2 gap-6">
              {quotes.map((q) => (
                <figure
                  key={q.name}
                  className="rounded-2xl border border-line bg-surface p-8"
                >
                  <blockquote className="font-display text-xl lg:text-2xl leading-snug text-foreground">
                    {q.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-xs tracking-[0.18em] uppercase text-foreground-muted">
                    — {q.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* The two practices */}
        <section className="py-24 lg:py-32 bg-surface border-y border-line">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              Two practices, one standard
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-4xl lg:text-5xl leading-[1.05] tracking-tight text-balance">
              Where Dr. Trevino practices.
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {practices.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col rounded-3xl border border-line bg-background p-8 lg:p-10"
                >
                  <div className="text-xs tracking-[0.2em] uppercase text-accent-deep">
                    {p.role}
                  </div>
                  <div className="mt-3 font-display text-3xl tracking-tight">
                    {p.name}
                  </div>
                  <p className="mt-4 flex-1 leading-relaxed text-foreground-muted">
                    {p.body}
                  </p>
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm tracking-wide text-foreground hover:text-accent-deep transition-colors"
                    >
                      <span className="underline underline-offset-4 decoration-line">
                        {p.cta}
                      </span>
                      <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm tracking-wide text-foreground-muted">
                      {p.cta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Start here
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
              Meet Dr. Trevino in person.
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a free consultation and see what two days could do for your
              smile.
            </p>
            <Link
              href="/#contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-soft transition-colors"
            >
              Book a free consultation
              <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground/10 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
