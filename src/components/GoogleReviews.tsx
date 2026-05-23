import { Stars, GoogleG } from "./GoogleRating";

const reviews = [
  {
    quote:
      "I can't say enough great things about Dr. Trevino and his team. From the moment I walked in, I felt an incredible sense of comfort and professionalism. The team goes above and beyond to make both my smile and me feel at ease throughout the entire process.",
    name: "Mildred Sandor",
    date: "04-03-2026",
    initial: "M",
    color: "#e2725b",
  },
  {
    quote:
      "Dr. Trevino is the real deal. Their team is professional, creative, and results-driven. From strategy to execution, they understand how to build a brand and create engaging content that actually converts. They are not just another marketing agency.",
    name: "Houston Luxury Rides",
    date: "03-22-2026",
    initial: "H",
    color: "#3b6ea5",
  },
  {
    quote:
      "Dr. Trevino brings a point of excellence to every detail of their work — from communication and proposals to the final delivery. They placed a foundational role in building the social media presence for our social media presence, helping it grow far.",
    name: "Raul Bustillos",
    date: "03-04-2026",
    initial: "R",
    color: "#5a8f69",
  },
];

export default function GoogleReviews() {
  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-6 py-2.5 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            <GoogleG size={22} />
            <span className="text-sm font-medium tracking-wide text-foreground">
              Google Reviews
            </span>
            <Stars size={16} />
            <span className="text-sm font-semibold text-foreground">5.0</span>
          </div>

          <h2 className="mt-9 font-display text-5xl lg:text-7xl leading-[1.04] tracking-tight">
            What Our Clients Say
          </h2>
          <a
            href="https://share.google/iHBs3SSjTtufCv9cv"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-lg leading-relaxed text-foreground-muted underline underline-offset-4 decoration-line transition-colors hover:text-foreground hover:decoration-accent-deep"
          >
            Based on 400+ Reviews
          </a>
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="group relative flex flex-col rounded-3xl bg-white p-9 lg:p-10 ring-1 ring-line/70 shadow-[0_1px_2px_rgba(15,15,16,0.04),0_14px_36px_-18px_rgba(15,15,16,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:ring-accent/40 hover:shadow-[0_1px_2px_rgba(15,15,16,0.04),0_30px_56px_-22px_rgba(15,15,16,0.26)]"
            >
              <div className="relative flex items-center justify-between">
                <Stars size={20} />
                <GoogleG size={26} />
              </div>

              <blockquote className="relative mt-7 flex-1 text-[17px] leading-relaxed text-foreground/80">
                {r.quote}
              </blockquote>

              <a
                href="#"
                className="relative mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-deep transition-colors hover:text-foreground"
              >
                Read more
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>

              <figcaption className="relative mt-7 flex items-center gap-3.5 border-t border-line pt-6">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-base font-semibold text-white shadow-[0_4px_12px_-2px_rgba(15,15,16,0.3)] ring-2 ring-white"
                  style={{ backgroundColor: r.color }}
                  aria-hidden
                >
                  {r.initial}
                </span>
                <div className="leading-tight">
                  <div className="text-base font-semibold text-foreground">
                    {r.name}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-foreground-muted">
                    <GoogleG size={13} />
                    <span>Posted on Google</span>
                    <span className="text-line">·</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="https://share.google/iHBs3SSjTtufCv9cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-7 py-3.5 text-base text-foreground transition-colors hover:bg-accent-soft/50"
          >
            <GoogleG size={20} />
            View all 400+ reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
