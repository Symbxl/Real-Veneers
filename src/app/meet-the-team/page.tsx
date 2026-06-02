import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the warm, friendly team behind Trevino Dental Group in Sugar Land, TX — and the welcoming, comfortable environment that makes every visit feel like home.",
  alternates: { canonical: "/meet-the-team" },
};

const welcome = [
  "The moment you walk in, you'll notice the difference. No cold waiting rooms, no rushed appointments — just a warm, friendly team that takes the time to know you by name.",
  "We've built a practice where comfort comes first. Whether you're here for a routine cleaning or a full smile transformation, you'll always feel listened to, looked after, and completely at ease.",
];

const quotes = [
  {
    quote:
      "From the front desk to the chair, everyone made me feel so comfortable and cared for.",
    name: "William M.",
  },
  {
    quote:
      "The whole team is so easy-going — you feel genuinely welcome the moment you walk in.",
    name: "Alice T.",
  },
];

export default function MeetTheTeamPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-background pt-36 pb-16 lg:pt-44 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                Meet the team · Sugar Land, TX
              </div>
              <h1 className="mt-5 font-display text-5xl lg:text-8xl leading-[1] tracking-tight text-balance">
                The team that makes every visit{" "}
                <span className="italic text-accent">feel like home.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
                From the front desk to the dental chair, our Sugar Land team is
                here to make you feel welcome, comfortable, and genuinely cared
                for — every single visit.
              </p>
            </div>

            {/* Team group photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tdg/team-group.jpg"
              alt="The Trevino Dental Group team in Sugar Land, TX"
              className="mt-12 aspect-[16/10] w-full rounded-3xl object-cover object-top ring-1 ring-line sm:aspect-[16/8]"
            />
          </div>
        </section>

        {/* The team — moved from About the Practice */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                Our people
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                The team behind your smile.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                A warm, friendly team dedicated to making every visit feel calm,
                welcoming, and genuinely comfortable.
              </p>
            </div>

            <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <figure key={m.name} className="flex flex-col">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.photo}
                      alt={`${m.name}, ${m.role} at Trevino Dental Group`}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-6 flex flex-1 flex-col">
                    <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                      {m.role}
                    </div>
                    <h3 className="mt-2 font-display text-3xl leading-none tracking-tight">
                      {m.name}
                    </h3>
                    <blockquote className="mt-4 flex-1 border-l-2 border-accent/40 pl-4 text-[15px] italic leading-relaxed text-foreground-muted">
                      {m.quote}
                    </blockquote>
                    {m.resume && (
                      <a
                        href={m.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-background px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-accent-soft/50"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        Resume
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </a>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Welcoming environment */}
        <section className="py-24 lg:py-32 border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  A welcoming environment
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  Calm, warm, and unhurried —{" "}
                  <span className="italic text-accent">by design.</span>
                </h2>
                <div className="mt-7 space-y-5 text-lg leading-relaxed text-foreground-muted">
                  {welcome.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/consult.jpg"
                alt="A warm, welcoming consultation at Trevino Dental Group"
                className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-line shadow-[0_40px_90px_-50px_rgba(15,15,16,0.45)]"
              />
            </div>
          </div>
        </section>

        {/* Patient voices */}
        <section className="py-24 lg:py-32 border-t border-line bg-surface">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                In their words
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                What it feels like to visit.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {quotes.map((q) => (
                <figure
                  key={q.name}
                  className="rounded-2xl border border-line bg-background p-8"
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

        {/* CTA */}
        <section className="bg-foreground text-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Come say hi
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
              We can&apos;t wait to meet you.
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a visit and meet the team in person — we&apos;ll make sure you
              feel right at home from the moment you arrive.
            </p>
            <Link
              href="/contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-soft transition-colors"
            >
              Book an appointment
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
