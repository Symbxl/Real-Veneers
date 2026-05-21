// First panel of /process — the headline, the promise, and the
// forty-eight-hour timeline overview.
const TIMELINE = [
  {
    n: "01",
    day: "Day 1 · Morning",
    title: "Consult & 3D scan",
    body: "A relaxed conversation about the smile you want, then a digital scan — no trays, no impression goop.",
  },
  {
    n: "02",
    day: "Day 1 · Midday",
    title: "Smile design",
    body: "Your new smile is sculpted in 3D and previewed against your face before anything is made.",
  },
  {
    n: "03",
    day: "Day 1 · Afternoon",
    title: "Milled in-house",
    body: "Each veneer is carved from a solid ceramic block in our on-site lab — the same day.",
  },
  {
    n: "04",
    day: "Day 2",
    title: "Placed & polished",
    body: "Final fit, bite, and hand-polish. You walk out with the finished smile — calibrated and yours.",
  },
];

export default function ProcessIntro() {
  return (
    <section className="snap-start min-h-screen flex items-center py-24">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="max-w-4xl">
          <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
            The process
          </div>
          <h1 className="mt-5 font-display text-5xl lg:text-7xl leading-[1.02] tracking-tight text-balance">
            A new smile in two days.{" "}
            <span className="italic text-foreground-muted">
              Here is every step.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg lg:text-xl leading-relaxed text-foreground-muted text-balance">
            Most practices stretch a veneer case across six weeks and a lab you
            never see. We design, mill, and finish yours under one roof — so the
            whole transformation takes forty-eight hours.
          </p>
        </div>

        {/* Forty-eight-hour timeline overview */}
        <div className="relative mt-14 lg:mt-16">
          <div className="hidden md:block absolute top-[6px] left-2 right-2 h-px bg-line" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {TIMELINE.map((s) => (
              <li key={s.n} className="relative">
                <span className="block w-3.5 h-3.5 rounded-full bg-accent-deep ring-4 ring-background relative z-10" />
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-lg text-accent">{s.n}</span>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-accent-deep">
                    {s.day}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl lg:text-2xl leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
