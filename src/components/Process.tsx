const steps = [
  {
    n: "01",
    title: "Free consultation",
    body: "We listen first. A relaxed conversation about the smile you've always wanted — and a digital scan to see what's possible. No pressure, no obligation.",
  },
  {
    n: "02",
    title: "AI-assisted design",
    body: "Your new smile is digitally sculpted to your face — proportions, gum line, and lip dynamics — until every detail feels unmistakably yours.",
  },
  {
    n: "03",
    title: "In-house lab craftsmanship",
    body: "Master ceramists layer translucent porcelain by hand in our on-site lab. No outsourcing, no shortcuts, no compromises on light or warmth.",
  },
  {
    n: "04",
    title: "Two-day transformation",
    body: "Day one we prepare and place temporaries. Day two you walk out with the smile you've been waiting for — calibrated, polished, and yours forever.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 lg:py-36 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
            The Process
          </div>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            From first call to final smile,{" "}
            <span className="italic text-foreground-muted">in 48 hours.</span>
          </h2>
          <p className="mt-6 text-lg text-foreground-muted text-balance">
            Most veneer practices send your case to a faceless lab and ask you
            to wait weeks. We don&apos;t. Every step happens under one roof, by
            one team, with one standard.
          </p>
        </div>

        <ol className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {steps.map((s) => (
            <li
              key={s.n}
              className="bg-background p-8 lg:p-10 flex flex-col group hover:bg-accent-soft/40 transition-colors duration-500"
            >
              <div className="font-display text-7xl text-accent/70 group-hover:text-accent-deep transition-colors">
                {s.n}
              </div>
              <div className="mt-8 h-px w-10 bg-foreground" />
              <h3 className="mt-6 font-display text-2xl leading-tight">
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
  );
}
