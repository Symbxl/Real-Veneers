import { Stars, GoogleG } from "./GoogleRating";

const reviews = [
  {
    quote: [
      "I've been coming to this dental office for a while now and every visit has been excellent. The staff is friendly, the office is always clean and welcoming, and they really take the time to explain everything clearly. A special shoutout to Stana, my hygienist — she's amazing! Super gentle, thorough, and always makes sure I'm comfortable the entire time. I always look forward to my cleanings. Highly recommend this place!",
    ],
    name: "Carlos Aparicio",
    initial: "C",
    color: "#e2725b",
  },
  {
    quote: [
      "Dr. Trevino's entire team is an absolute gem. From the front desk staff, to the hygienists (Stana and Janet are incredible!) and of course Dr. Trevino himself - everyone is so kind, patient, and make you feel so comfortable. I've had terrible past experiences with dentists who have bad bedside manner and Dr. Trevino's care and passion truly shine through when he's speaking to you. I've never felt rushed or like just another number when I'm here. Dare I say, I look forward to coming to the dentist now. I cannot recommend Dr. Trevino and his team enough. My only complaint is that Google only allows me to give 5 stars!",
    ],
    name: "Shelly Rospond",
    initial: "S",
    color: "#3b6ea5",
  },
  {
    quote: [
      "Great office. Very clean and updated facility. Staff is very friendly and welcoming. They get you in and out in a great time. I've been very happy with the services I've received here. Nothing feels rushed and everyone takes time to sit and talk with you about any questions or concerns. Dr. Trevino is a great dentist, very knowledgeable and patient!",
    ],
    name: "Laccie Sumpter",
    initial: "L",
    color: "#5a8f69",
  },
];

export default function GoogleReviews() {
  return (
    <section className="relative overflow-hidden bg-background py-28 lg:py-40">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
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
          <span
            aria-hidden
            className="mt-7 block h-px w-16 bg-gradient-to-r from-transparent via-line to-transparent"
          />
          <a
            href="https://share.google/iHBs3SSjTtufCv9cv"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 text-lg leading-relaxed text-foreground-muted underline underline-offset-4 decoration-line transition-colors hover:text-foreground hover:decoration-accent-deep"
          >
            Based on 400+ Reviews
          </a>
        </div>

        <div className="mt-16 grid items-start gap-7 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-9 lg:p-10 ring-1 ring-line/70 shadow-[0_1px_2px_rgba(15,15,16,0.04),0_14px_36px_-18px_rgba(15,15,16,0.14)] transition-all duration-300 hover:-translate-y-1.5 hover:ring-accent/40 hover:shadow-[0_1px_2px_rgba(15,15,16,0.04),0_30px_56px_-22px_rgba(15,15,16,0.26)]"
            >
              {/* Decorative serif quotation glyph. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-5 select-none font-display text-[8rem] leading-none text-foreground/[0.06] transition-colors duration-300 group-hover:text-foreground/10"
              >
                &ldquo;
              </span>

              <div className="relative flex items-center justify-between">
                <Stars size={20} />
                <GoogleG size={26} />
              </div>

              <blockquote className="relative mt-7 flex-1 space-y-4 text-[17px] leading-relaxed text-foreground/80">
                {r.quote.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </blockquote>

              <a
                href="https://share.google/pkxEsKOxoWHfLFhyS"
                target="_blank"
                rel="noopener noreferrer"
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
