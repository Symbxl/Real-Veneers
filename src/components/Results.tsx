type GumStyle = "tube" | "realistic" | "plaster";

export default function Results({
  gumStyle: _gumStyle = "tube",
}: { gumStyle?: GumStyle } = {}) {
  return (
    <section id="results" className="py-28 lg:py-36 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
            Results
          </div>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            A complete smile,{" "}
            <span className="italic text-foreground-muted">designed to look lived-in.</span>
          </h2>
          <p className="mt-6 text-lg text-foreground-muted text-balance">
            Every tooth is shaped, shaded, and sequenced against your gum line — so
            the finished arch reads as anatomy, not installation. Natural
            translucency, soft cervical warmth, no two teeth identical.
          </p>
        </div>
      </div>
    </section>
  );
}
