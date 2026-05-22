import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About the Practice",
  description:
    "Trevino Dental Group is a top-rated Sugar Land, TX dental practice led by Dr. Ryan Trevino — compassionate, comprehensive care for the whole family under one roof.",
  alternates: { canonical: "/about-the-practice" },
};

const stats = [
  { value: "400+", label: "5-star Google reviews" },
  { value: "4", label: "Doctors on the team" },
  { value: "700+", label: "Hours of continuing education" },
  { value: "1", label: "Roof — care for the whole family" },
];

const practice = [
  "Trevino Dental Group is a top-rated dental practice in Sugar Land, Texas, founded by Dr. Ryan Trevino. We bring preventive, cosmetic, and restorative dentistry together under one roof — so every member of your family can be cared for in one trusted place.",
  "Your comfort and your health are our top priorities. We take a minimally invasive approach that preserves your natural tooth structure wherever possible, and we treat every patient the way we would treat our own family — with genuine care, patience, and respect.",
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

const philosophy = [
  "We believe great dentistry begins with listening. Every treatment plan is built around your goals, your concerns, and your comfort — never a rushed, one-size-fits-all procedure.",
  "From your first cleaning to a full smile transformation, you will understand every option, every cost, and every step before anything begins.",
];

const team = [
  "/tdg/dr-trevino.jpg",
  "/tdg/team-1.jpg",
  "/tdg/team-2.jpg",
  "/tdg/team-3.jpg",
  "/tdg/team-4.jpg",
  "/tdg/team-5.jpg",
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
                Trevino Dental Group · Sugar Land, TX
              </div>
              <h1 className="mt-5 font-display text-5xl lg:text-8xl leading-[1] tracking-tight text-balance">
                Compassionate, comprehensive{" "}
                <span className="italic text-accent">dental care.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
                Your top-rated dentist in Sugar Land — preventive, cosmetic, and
                restorative dentistry for the whole family, led by Dr. Ryan
                Trevino.
              </p>
            </div>

            {/* Team group photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tdg/team-group.jpg"
              alt="The Trevino Dental Group team in Sugar Land, TX"
              className="mt-12 aspect-[16/10] w-full rounded-3xl object-cover object-top ring-1 ring-line sm:aspect-[16/8]"
            />

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl tracking-tight text-foreground lg:text-5xl">
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

        {/* About the practice */}
        <section className="py-24 lg:py-32 border-t border-line">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  About the practice
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  We treat every patient like{" "}
                  <span className="italic text-accent">family.</span>
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-foreground-muted">
                {practice.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet Dr. Trevino */}
        <section className="py-24 lg:py-32 border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tdg/dr-trevino-candid.jpg"
                alt="Dr. Ryan Trevino, founder of Trevino Dental Group"
                className="aspect-[4/5] w-full rounded-3xl object-cover ring-1 ring-line"
              />
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  Meet the founder
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  Dr. Ryan Trevino
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                  Dr. Trevino is a distinguished family dentist and the founder
                  of Trevino Dental Group. He earned his Doctor of Dental
                  Surgery degree from Baylor College of Dentistry in Dallas, and
                  is an active member of the American Dental Association and the
                  Texas Dental Association.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
                  With advanced certifications in CEREC same-day crowns, digital
                  imaging, and Invisalign — and more than 700 hours of
                  continuing education — he combines comprehensive training with
                  the latest technology to deliver holistic, patient-centered
                  care.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
                  Outside the practice, Dr. Trevino enjoys the outdoors with his
                  wife Sierra and their three children.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 lg:py-32">
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
                your family needs is here — no referrals across town.
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

        {/* Our philosophy */}
        <section className="py-24 lg:py-32 border-y border-line">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
                  Our philosophy
                </div>
                <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                  A <span className="italic text-accent">patient-first</span>{" "}
                  approach.
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

        {/* The team */}
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
                A warm, friendly team dedicated to making every visit feel
                calm, welcoming, and genuinely comfortable.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {team.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={src}
                  alt="A member of the Trevino Dental Group team"
                  className="aspect-square w-full rounded-2xl object-cover ring-1 ring-line"
                />
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
              Your healthiest smile starts here.
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a visit with Dr. Trevino and his team in Sugar Land, TX —
              compassionate, comprehensive care for the whole family.
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
