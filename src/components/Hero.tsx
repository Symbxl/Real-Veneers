import HeroForm from "./HeroForm";
import GoogleRating from "./GoogleRating";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white">
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 backdrop-blur px-4 py-1.5 text-xs tracking-[0.18em] uppercase text-foreground-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Sugar Land · Houston, TX
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[0.95] tracking-tight text-balance">
              A new smile,
              <br />
              <span className="italic text-accent-deep">in just two days.</span>
            </h1>

            <p className="mt-7 max-w-xl text-xl leading-relaxed text-foreground-muted text-balance">
              Dr. Ryan Trevino is Houston&rsquo;s cosmetic dentist with an
              exceptional eye for aesthetics
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border-[3px] border-foreground text-foreground pl-7 pr-2.5 py-2.5 text-sm font-medium tracking-wide hover:bg-foreground hover:text-background transition-colors"
              >
                Book a free consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground/10 group-hover:bg-background/20 group-hover:translate-x-0.5 transition-all">
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

            <div className="mt-9">
              <GoogleRating />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-8 max-w-lg">
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

          <div
            className="animate-fade-up lg:pl-4"
            style={{ animationDelay: "0.15s" }}
          >
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}
