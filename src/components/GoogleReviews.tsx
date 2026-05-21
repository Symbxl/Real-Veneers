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

function FadedG() {
  return (
    <div className="opacity-25" aria-hidden>
      <GoogleG size={40} />
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="bg-white py-28 lg:py-40">
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
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Don&apos;t just take our word for it — hear from the patients whose
            smiles we&apos;ve transformed.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-3xl border border-line/60 bg-surface p-9 lg:p-10 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-start justify-between">
                <Stars size={20} />
                <FadedG />
              </div>

              <blockquote className="mt-7 flex-1 text-[17px] leading-relaxed text-foreground-muted">
                {r.quote}
              </blockquote>

              <a
                href="#"
                className="mt-5 text-sm font-medium text-accent-deep underline underline-offset-4"
              >
                Read more
              </a>

              <figcaption className="mt-7 flex items-center gap-3.5 rounded-2xl border border-line/60 bg-white p-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-base font-semibold text-white"
                  style={{ backgroundColor: r.color }}
                  aria-hidden
                >
                  {r.initial}
                </span>
                <div className="leading-tight">
                  <div className="text-base font-medium text-foreground">
                    {r.name}
                  </div>
                  <div className="mt-0.5 text-sm text-foreground-muted">
                    {r.date}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-7 py-3.5 text-base text-foreground transition-colors hover:bg-accent-soft/50"
          >
            <GoogleG size={20} />
            View all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
