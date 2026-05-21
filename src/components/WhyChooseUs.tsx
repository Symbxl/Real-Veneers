const rows = [
  {
    label: "The laboratory",
    us: "Master ceramist lab under our own roof",
    them: "Outsourced to a remote lab you never see",
  },
  {
    label: "Your timeline",
    us: "A finished smile in two days",
    them: "Three to six weeks living in temporaries",
  },
  {
    label: "The design",
    us: "AI-assisted, sculpted around your face",
    them: "A generic shade guide and stock shapes",
  },
  {
    label: "Your care team",
    us: "One dentist, one team, every single step",
    them: "Handed between rotating assistants",
  },
  {
    label: "The porcelain",
    us: "Hand-layered, translucent, true to light",
    them: "Opaque, monolithic milled blocks",
  },
  {
    label: "The result",
    us: "Reads as natural anatomy, even up close",
    them: "An obvious, uniform “Hollywood” white",
  },
];

function Check() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-deep text-background">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function Dash() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line text-foreground-muted/40">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <line x1="6" y1="12" x2="18" y2="12" />
      </svg>
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-28 lg:py-36 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
            Why RealVeneers
          </div>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            A different standard,{" "}
            <span className="italic text-foreground-muted">by design.</span>
          </h2>
          <p className="mt-6 text-lg text-foreground-muted text-balance">
            Most veneer cases look the way they do because of choices made long
            before the chair. Here is what changes when every one of them
            happens under a single roof.
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-line bg-surface">
          {/* Header row */}
          <div className="grid grid-cols-1 sm:grid-cols-[0.9fr_1.4fr_1.4fr]">
            <div className="hidden sm:block" />
            <div className="bg-foreground text-background px-6 lg:px-8 py-6">
              <div className="font-display text-xl lg:text-2xl">
                RealVeneers
              </div>
              <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-background/55">
                Sugar Land studio
              </div>
            </div>
            <div className="px-6 lg:px-8 py-6 border-t sm:border-t-0 sm:border-l border-line">
              <div className="font-display text-xl lg:text-2xl text-foreground-muted">
                The typical practice
              </div>
              <div className="mt-1 text-[11px] tracking-[0.18em] uppercase text-foreground-muted/55">
                Industry standard
              </div>
            </div>
          </div>

          {/* Comparison rows */}
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 sm:grid-cols-[0.9fr_1.4fr_1.4fr] border-t border-line"
            >
              <div className="px-6 lg:px-8 pt-5 pb-1 sm:py-6 flex items-center text-[11px] tracking-[0.18em] uppercase text-foreground-muted">
                {row.label}
              </div>
              <div className="px-6 lg:px-8 py-4 sm:py-6 flex items-start gap-3 bg-accent-soft/40 sm:border-l border-line">
                <Check />
                <span className="text-[15px] leading-snug text-foreground">
                  {row.us}
                </span>
              </div>
              <div className="px-6 lg:px-8 py-4 sm:py-6 flex items-start gap-3 border-t border-line sm:border-t-0 sm:border-l">
                <Dash />
                <span className="text-[15px] leading-snug text-foreground-muted">
                  {row.them}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-deep transition-colors group"
          >
            See the difference for yourself
            <span className="grid place-items-center w-9 h-9 rounded-full bg-background/15 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </a>
          <span className="text-sm text-foreground-muted">
            Free consultation · no obligation
          </span>
        </div>
      </div>
    </section>
  );
}
