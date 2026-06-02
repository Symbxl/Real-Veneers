import HeroForm from "./HeroForm";
import GoogleRating from "./GoogleRating";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white">
      {/* Warm ambient depth — sits behind the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-36 h-[38rem] w-[38rem] rounded-full bg-accent-soft/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 18% 18%, rgba(184,153,104,0.12) 0%, transparent 58%), radial-gradient(ellipse 55% 60% at 88% 90%, rgba(184,153,104,0.08) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 backdrop-blur px-4 py-1.5 text-xs tracking-[0.18em] uppercase text-foreground-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Sugar Land · Houston, TX
            </div>

            <h1 className="mt-6 font-display text-[4.75rem] md:text-[clamp(4.75rem,6.5vw,6rem)] leading-[0.95] tracking-tight text-balance">
              A new smile,
              <br />
              <span className="italic text-accent-deep">in just two days.</span>
            </h1>

            <p className="mt-7 max-w-xl text-xl leading-relaxed text-foreground-muted text-balance">
              Dr. Ryan Trevino is Houston&rsquo;s cosmetic dentist with an
              exceptional eye for aesthetics
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground-muted/90 text-balance">
              We don&rsquo;t dabble in veneers — it&rsquo;s all we design, every
              single day.
            </p>

            <div className="mt-9">
              <GoogleRating />
            </div>
          </div>

          <div
            className="relative animate-fade-up lg:pl-4"
            style={{ animationDelay: "0.15s" }}
          >
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}
