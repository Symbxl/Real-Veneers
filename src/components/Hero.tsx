"use client";

import dynamic from "next/dynamic";

const ToothModel = dynamic(() => import("./ToothModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 grain">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #f5ebd9 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, #f0e3cf 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 backdrop-blur px-4 py-1.5 text-xs tracking-[0.18em] uppercase text-foreground-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Sugar Land · Houston, TX
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.98] tracking-tight text-balance">
              A new smile,
              <br />
              <span className="italic text-accent-deep">in just two days.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted text-balance">
              Crafted by Dr. Ryan Trevino — Houston&apos;s cosmetic dentist with
              an exceptional eye for aesthetics. AI-designed, hand-finished
              porcelain veneers built in our in-house lab. Effortlessly natural,
              even up close.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-deep transition-colors group"
              >
                Book a free consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-background/15 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                <span className="underline underline-offset-4 decoration-line">
                  See real patient results
                </span>
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
              {[
                { v: "2", l: "Days to a new smile" },
                { v: "500+", l: "Smiles transformed" },
                { v: "100%", l: "In-house crafted" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-foreground">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.15em] text-foreground-muted">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[640px] w-full">
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-accent-soft/60 via-transparent to-transparent blur-3xl" />
            <div className="relative h-full w-full">
              <ToothModel />
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] text-foreground-muted/70 pointer-events-none">
              Drag to rotate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
