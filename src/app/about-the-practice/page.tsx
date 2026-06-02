import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About the Practice",
  description:
    "Step inside Trevino Dental Group in Sugar Land, TX — a calm, welcoming dental home led by Dr. Ryan Trevino. See how a visit works, how we keep you comfortable, and why families feel at ease here.",
  alternates: { canonical: "/about-the-practice" },
};

const stats = [
  { value: "400+", label: "5-star Google reviews" },
  { value: "Same day", label: "Crowns & smile design" },
  { value: "All ages", label: "Care for the whole family" },
  { value: "1 roof", label: "Every service in one place" },
];

const welcome = [
  "Trevino Dental Group is a top-rated dental practice in Sugar Land, Texas, founded by Dr. Ryan Trevino. From the moment you walk in, the goal is simple: a calm, unhurried visit where you feel genuinely looked after — never rushed, never just another name on the schedule.",
  "We bring preventive, cosmetic, and restorative dentistry together under one roof, so every member of your family is cared for in one trusted place. And because comfort comes first, we take a gentle, minimally invasive approach that protects your natural teeth wherever we can.",
];

// The patient journey — the heart of how the office actually works.
const visit = [
  {
    n: "01",
    title: "A warm welcome",
    body: "You're greeted by name, not a clipboard. Paperwork is handled ahead of time so you can settle into a comfortable space instead of a cold waiting room.",
  },
  {
    n: "02",
    title: "We get to know you",
    body: "Before any instruments come out, we sit and talk — your history, your goals, what's worried you in the past. The visit is built around you, not a script.",
  },
  {
    n: "03",
    title: "A gentle, thorough exam",
    body: "Digital imaging and intraoral photos let you see exactly what we see on the screen. No mystery, no jargon — just a clear picture of where things stand.",
  },
  {
    n: "04",
    title: "An honest plan",
    body: "We walk you through every option, timeline, and cost up front — including doing nothing at all. You decide what's right for you, with zero pressure.",
  },
  {
    n: "05",
    title: "Comfortable treatment",
    body: "Unhurried, gentle, and paced to you — with sedation and anxiety-friendly options if you want them. We check in the whole way through.",
  },
  {
    n: "06",
    title: "We stay with you",
    body: "One team that knows your history, easy follow-ups, and a standing invitation to call with any question. Care here doesn't end when you leave the chair.",
  },
];

const comfort = [
  "Sedation and anxiety-friendly options for nervous patients",
  "Gentle, minimally invasive techniques that protect natural teeth",
  "Plain-English explanations — you'll always know what's happening and why",
  "Same-day technology, so most care takes fewer visits",
  "Flexible, family-friendly scheduling that respects your time",
  "Little comforts that make the chair feel a lot less clinical",
];

const services = [
  {
    title: "Preventive",
    items: [
      "Cleanings & oral exams",
      "Periodontal deep cleanings",
      "Hydroxyapatite & fluoride",
      "Sealants",
    ],
  },
  {
    title: "Cosmetic",
    items: [
      "Porcelain veneers",
      "Teeth whitening",
      "Cosmetic bonding",
      "Invisalign",
    ],
  },
  {
    title: "Restorative",
    items: [
      "Fillings & crowns",
      "Bridges & implants",
      "Root canals",
      "Dentures",
    ],
  },
  {
    title: "Advanced care",
    items: [
      "CEREC same-day crowns",
      "Sedation dentistry",
      "Digital imaging",
      "Emergency visits",
    ],
  },
];

const newPatient = [
  {
    title: "Insurance & financing",
    body: "We accept most major plans and offer flexible financing — our team helps you understand your coverage before anything begins.",
  },
  {
    title: "Easy scheduling",
    body: "Book online or by phone, with new-patient appointments that leave plenty of time to talk, ask questions, and never feel rushed.",
  },
  {
    title: "The whole family welcome",
    body: "From a child's first visit to grandparents' implants, every generation is cared for in the same trusted place.",
  },
];

export default function AboutThePracticePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-background pt-36 pb-16 lg:pt-44 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                About the practice · Sugar Land, TX
              </div>
              <h1 className="mt-5 font-display text-5xl lg:text-8xl leading-[1] tracking-tight text-balance">
                Care that feels less like a clinic,{" "}
                <span className="italic text-accent">more like home.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
                Trevino Dental Group is a calm, welcoming practice in Sugar Land,
                TX — where every visit is unhurried, every option is explained,
                and comfort always comes first.
              </p>
            </div>

            {/* Welcoming patient moment */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/consult1.jpg"
              alt="A patient relaxed and smiling during a visit at Trevino Dental Group"
              className="mt-12 aspect-[16/10] w-full rounded-3xl object-cover object-center ring-1 ring-line sm:aspect-[16/8]"
            />

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl tracking-tight text-foreground lg:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm leading-snug text-foreground-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Welcome / our story */}
        <section className="py-24 lg:py-32 border-t border-line">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  Welcome
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  A practice built around{" "}
                  <span className="italic text-accent">how you feel.</span>
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-foreground-muted">
                {welcome.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How a visit works — the core of the page */}
        <section className="py-24 lg:py-32 border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                What to expect
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                How a visit{" "}
                <span className="italic text-accent">works here.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                No cold waiting rooms, no rushed appointments, no surprises on
                the bill. Here&apos;s exactly what your time with us looks like —
                from the front door to your follow-up.
              </p>
            </div>

            <ol className="mt-16 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
              {visit.map((s) => (
                <li
                  key={s.n}
                  className="group flex flex-col bg-surface p-8 transition-colors duration-500 hover:bg-accent-soft/40 lg:p-10"
                >
                  <div className="font-display text-6xl text-accent/70 transition-colors group-hover:text-accent-deep">
                    {s.n}
                  </div>
                  <div className="mt-7 h-px w-10 bg-foreground" />
                  <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Comfort, your way */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  Your comfort, first
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  Gentle by default,{" "}
                  <span className="italic text-accent">never rushed.</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                  Dentistry doesn&apos;t have to be stressful. We&apos;ve shaped
                  every part of the visit — the pace, the technology, the way we
                  explain things — around keeping you genuinely at ease.
                </p>

                <ul className="mt-8 space-y-4">
                  {comfort.map((c) => (
                    <li key={c} className="flex gap-3.5">
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep ring-1 ring-accent/30">
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
                      <span className="text-base leading-relaxed text-foreground-muted">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/result.jpg"
                alt="A relaxed, friendly consultation at Trevino Dental Group"
                className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-line shadow-[0_40px_90px_-50px_rgba(15,15,16,0.45)]"
              />
            </div>
          </div>
        </section>

        {/* Everything under one roof */}
        <section className="py-24 lg:py-32 border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                What we do
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                Complete care, under{" "}
                <span className="italic text-accent">one roof.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                From routine cleanings to full smile makeovers, every service
                your family needs is here — no referrals across town, no
                starting over with a stranger.
              </p>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div key={s.title}>
                  <div className="h-px w-10 bg-accent" />
                  <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground-muted">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Dr. Trevino — brief, with link to the full team */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tdg/dr-trevino-candid.jpg"
                alt="Dr. Ryan Trevino, founder of Trevino Dental Group"
                className="aspect-[4/5] w-full rounded-3xl object-cover object-top ring-1 ring-line"
              />
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  Led by Dr. Ryan Trevino
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  The dentist behind the door.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                  Dr. Trevino founded the practice on a simple idea: that great
                  dentistry begins with listening. He earned his Doctor of Dental
                  Surgery from Baylor College of Dentistry and brings advanced
                  training in CEREC same-day crowns, digital imaging, and
                  Invisalign — plus 700+ hours of continuing education — to every
                  patient he sees.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
                  Just as importantly, he&apos;s built a warm, easygoing team
                  who treat every patient the way they&apos;d treat their own
                  family. Outside the practice, he&apos;s usually outdoors with
                  his wife Sierra and their three children.
                </p>
                <Link
                  href="/meet-the-team"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-background pl-6 pr-3 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-accent-soft/50"
                >
                  Meet the whole team
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground/10 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* New here? — practical reassurance */}
        <section className="py-24 lg:py-32 border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                New here?
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                Your first visit, made easy.
              </h2>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {newPatient.map((n, i) => (
                <div key={n.title} className="flex flex-col">
                  <div className="font-display text-2xl leading-none text-accent">
                    0{i + 1}
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight">
                    {n.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-foreground-muted">
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Trevino Dental Group
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
              Come see how good a dental visit can feel.
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a visit with Dr. Trevino and his team in Sugar Land, TX — and
              experience the calm, welcoming care our patients keep coming back
              for.
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
