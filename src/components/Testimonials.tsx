import { Stars, GoogleG } from "./GoogleRating";

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
          <div className="inline-flex items-center gap-4 rounded-full border border-line bg-surface px-6 py-3 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            <GoogleG size={24} />
            <span className="h-6 w-px bg-line" />
            <Stars size={18} />
            <span className="text-sm leading-none">
              <span className="font-semibold text-foreground">5.0</span>
              <span className="text-foreground-muted">
                {" "}
                · 200+ verified Google reviews
              </span>
            </span>
          </div>
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
                <Stars size={14} />
                <div className="mt-3 text-sm font-medium tracking-wide">
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
