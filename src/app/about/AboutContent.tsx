"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";
import TeamCarousel from "@/components/TeamCarousel";

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

const stats = [
  { value: "400+", label: "5-star Google reviews" },
  { value: "700+", label: "Hours of continuing education" },
  { value: "2-day", label: "Porcelain veneers" },
  { value: "1 roof", label: "Care for the whole family" },
];

const credentials = [
  { title: "Doctor of Dental Surgery", detail: "Baylor College of Dentistry — with honors" },
  { title: "American Dental Association", detail: "Active member" },
  { title: "Texas Dental Association", detail: "Active member" },
  { title: "CEREC same-day crowns", detail: "Advanced certification" },
  { title: "Digital imaging", detail: "Advanced certification" },
  { title: "Invisalign orthodontics", detail: "Advanced certification" },
];

const philosophy = [
  "Great dentistry begins with listening. Every treatment plan is built around your goals, your concerns, and your comfort — never a rushed, one-size-fits-all procedure.",
  "We preserve your natural tooth structure wherever possible, and we treat every patient the way we'd treat our own family — with genuine care, patience, and respect. From a first cleaning to a full smile transformation, you'll understand every option, every cost, and every step before anything begins.",
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
      "Two-day porcelain veneers",
      "Teeth whitening",
      "Cosmetic bonding",
      "Invisalign",
    ],
  },
  {
    title: "Restorative",
    items: ["Fillings & crowns", "Bridges & implants", "Root canals", "Dentures"],
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

// Two founder photos that cross-fade into each other on a timer.
const founderPhotos = [
  {
    src: "/tdg/dr-trevino.jpg",
    alt: "Dr. Ryan Trevino, founder of Trevino Dental Group and RealVeneers",
    position: "object-top",
  },
  {
    src: "/tdg/dr-trevino-candid.jpg",
    alt: "Dr. Ryan Trevino away from the practice",
    position: "object-center",
  },
];

// Auto-crossfading founder portrait — alternates the two photos every few seconds.
function FounderPortrait() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % founderPhotos.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const photo = founderPhotos[index];

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_40px_90px_-50px_rgba(15,15,16,0.45)]">
      <AnimatePresence>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={`absolute inset-0 h-full w-full object-cover ${photo.position}`}
        />
      </AnimatePresence>
    </div>
  );
}

export default function AboutContent() {
  return (
    <main className="flex-1">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-background pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-accent-soft/50 blur-3xl" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
              <span className="h-px w-10 bg-accent" />
              About the practice · Sugar Land, TX
            </div>
            <h1 className="mt-6 font-display text-5xl lg:text-8xl leading-[1] tracking-tight text-balance">
              Where dentistry becomes{" "}
              <span className="italic text-accent">artistry.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted">
              RealVeneers is the cosmetic studio inside Trevino Dental Group — a
              top-rated Sugar Land practice led by Dr. Ryan Trevino. Natural
              porcelain veneers, designed and milled by hand in two days,
              alongside the preventive and restorative care your whole family
              needs — all under one roof.
            </p>
          </motion.div>

          {/* Feature video */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={1}
            className="relative mt-12 overflow-hidden rounded-3xl ring-1 ring-line shadow-[0_50px_110px_-50px_rgba(15,15,16,0.5)]"
          >
            <video
              src="/about-lab.mp4"
              poster="/about-lab-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/7]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/85 px-4 py-2 text-xs font-medium tracking-[0.04em] text-foreground shadow-lg backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Trevino Dental Group · Sugar Land, TX
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                custom={i}
              >
                <div className="font-display text-4xl tracking-tight text-foreground lg:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm leading-snug text-foreground-muted">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Meet Dr. Trevino ---------- */}
      <section className="border-y border-line bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            >
              <FounderPortrait />
              <div className="absolute -bottom-6 left-6 rounded-2xl bg-surface px-6 py-5 ring-1 ring-line shadow-[0_24px_50px_-24px_rgba(15,15,16,0.45)] sm:left-8">
                <div className="h-px w-8 bg-accent" />
                <div className="mt-3 font-display text-2xl leading-none">
                  Dr. Ryan Trevino
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                  Founder &amp; Lead Clinician
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={1}
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
                <span className="h-px w-10 bg-accent" />
                Meet the founder
              </div>
              <h2 className="mt-6 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                A clinician who thinks like an{" "}
                <span className="italic text-accent">artist.</span>
              </h2>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-foreground-muted">
                <p>
                  Dr. Trevino earned his Doctor of Dental Surgery from Baylor
                  College of Dentistry in Dallas, graduating with honors, and is
                  an active member of the American Dental Association and the
                  Texas Dental Association.
                </p>
                <p>
                  With advanced certifications in CEREC same-day crowns, digital
                  imaging, and Invisalign — and more than 700 hours of continuing
                  education — he pairs comprehensive training with the latest
                  technology to deliver holistic, patient-centered care.
                </p>
                <p>
                  He studies the way light moves through enamel, how a smile sits
                  inside a face, and how the smallest asymmetries make a result
                  feel real rather than manufactured — the standard behind every
                  RealVeneers smile.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Credentials ---------- */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
              <span className="h-px w-10 bg-accent" />
              Credentials
            </div>
            <h2 className="mt-6 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              Trained to a higher{" "}
              <span className="italic text-accent">standard.</span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c, i) => (
              <motion.div
                key={c.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                custom={i % 3}
              >
                <div className="h-px w-10 bg-accent" />
                <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {c.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The team ---------- */}
      <section className="border-t border-line py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
                <span className="h-px w-10 bg-accent" />
                The team
              </div>
              <h2 className="mt-6 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                Specialists across{" "}
                <span className="italic text-accent">every discipline.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
                Dr. Trevino is supported by a full team of dentists,
                specialists, hygienists, and patient-care staff — so every part
                of your visit is in expert hands.
              </p>
            </div>

            <Link
              href="/meet-the-team"
              className="group inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full border border-line bg-background px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-accent-soft/60"
            >
              Meet the full team
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            custom={1}
            className="mt-14"
          >
            <TeamCarousel />
          </motion.div>
        </div>
      </section>

      {/* ---------- Philosophy ---------- */}
      <section className="border-y border-line bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
                <span className="h-px w-10 bg-accent" />
                Our philosophy
              </div>
              <h2 className="mt-6 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
                A patient-first,{" "}
                <span className="italic text-accent">minimally invasive</span>{" "}
                approach.
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={reveal}
              custom={1}
              className="space-y-5 text-lg leading-relaxed text-foreground-muted"
            >
              {philosophy.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent-deep">
              <span className="h-px w-10 bg-accent" />
              Under one roof
            </div>
            <h2 className="mt-6 font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              Complete care for the{" "}
              <span className="italic text-accent">whole family.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
              From routine cleanings to full smile makeovers, every service your
              family needs is here — no referrals across town.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                custom={i}
              >
                <div className="h-px w-10 bg-accent" />
                <h3 className="mt-5 font-display text-2xl leading-tight tracking-tight">
                  {s.title}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground-muted">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-accent">
            RealVeneers · Trevino Dental Group
          </div>
          <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
            Your most natural smile starts here.
          </h2>
          <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
            Book a consultation with Dr. Trevino in Sugar Land, TX —
            compassionate, comprehensive care for the whole family.
          </p>
          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-soft transition-colors"
          >
            Book a consultation
            <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground/10 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-background/50">
            4660 Sweetwater Blvd, Suite 230 · Sugar Land, TX 77479
          </p>
        </div>
      </section>
    </main>
  );
}
