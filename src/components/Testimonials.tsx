const reviews = [
  {
    quote:
      "I researched veneer dentists in Houston for nearly a year. Dr. Trevino was the only one who didn't try to sell me a 'package.' He listened, sketched what he saw, and two days later I had a smile I actually recognize as mine.",
    name: "Sarah K.",
    detail: "Sugar Land · 10 upper veneers",
  },
  {
    quote:
      "The in-house lab is the difference. You can feel that someone touched your case at every step. I've had cosmetic work done in three other states — nothing compares to this team's eye for detail.",
    name: "Daniel R.",
    detail: "Houston · Full smile makeover",
  },
  {
    quote:
      "I was terrified veneers would look fake. They don't. People keep asking what's different and they can't tell. That's exactly what I wanted.",
    name: "Priya M.",
    detail: "Katy · 8 anterior veneers",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 lg:py-36 bg-accent-soft/50 relative overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 sm:px-10 relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
            What patients say
          </div>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            The work speaks.
            <br />
            <span className="italic">Then they do.</span>
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="bg-surface rounded-2xl p-8 lg:p-10 border border-line/60 shadow-[0_1px_0_rgba(0,0,0,0.02)] flex flex-col"
            >
              <div className="text-accent font-display text-5xl leading-none mb-6">
                &ldquo;
              </div>
              <blockquote className="font-display text-xl lg:text-[22px] leading-snug text-foreground flex-1">
                {r.quote}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-line/60">
                <div className="text-sm font-medium tracking-wide">
                  {r.name}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-foreground-muted">
                  {r.detail}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
