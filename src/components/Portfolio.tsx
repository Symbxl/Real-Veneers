import Image from "next/image";
import Link from "next/link";

const days = [
  {
    day: "Day 1",
    title: "Before",
    src: "/models/before1.jpg",
    alt: "Smile before porcelain veneers — uneven, worn natural teeth",
  },
  {
    day: "Day 2",
    title: "After",
    src: "/models/after1.jpg",
    alt: "The same smile two days later with natural porcelain veneers",
  },
];

const timeline = [
  { when: "Day 1", what: "Consult, 3D scan & smile design" },
  { when: "Overnight", what: "Milled & hand-finished in our lab" },
  { when: "Day 2", what: "Veneers bonded — you leave smiling" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            See the <span className="italic text-accent">transformation.</span>
          </h2>
          <p className="max-w-md text-foreground-muted">
            One smile, two days. Designed, milled, and placed under one roof —
            no weeks of waiting on an outside lab.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {days.map((d) => (
              <figure key={d.day}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-foreground ring-1 ring-line">
                  <Image
                    src={d.src}
                    alt={d.alt}
                    fill
                    sizes="(min-width:1024px) 500px, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between border-b border-line pb-3">
                  <span className="font-display text-2xl italic">{d.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent-deep">
                    {d.day}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {timeline.map((t, i) => (
              <li key={t.when} className="flex gap-4 sm:flex-col sm:gap-3">
                <span className="font-display text-3xl leading-none text-accent">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                    {t.when}
                  </p>
                  <p className="mt-1.5 text-foreground">{t.what}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col items-center text-center lg:mt-20">
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Meet our <span className="italic">models.</span>
          </h2>
          <Link
            href="/portfolio"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-foreground pl-7 pr-3 py-3 text-xs font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent-deep"
          >
            View Gallery
            <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
