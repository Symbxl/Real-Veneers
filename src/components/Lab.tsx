const stages = [
  {
    n: "01",
    img: "/front.webp",
    alt: "Digital 3D scan of a patient's teeth in smile-design software",
    title: "Digital design",
    body: "Your smile is sculpted in software — matched to your face, your proportions, and your gum line before a single tooth is touched.",
  },
  {
    n: "02",
    img: "/pps-product-image-cerec-primemill-mtl-zirconia.png",
    alt: "CEREC Primemill milling unit used to cut veneers in-house",
    title: "Precision milling",
    body: "Each veneer is milled in-house to within microns on our CEREC Primemill — no outsourcing, no waiting on the mail.",
  },
  {
    n: "03",
    img: "/modal.webp",
    alt: "Hand-finished porcelain dental model on a marble surface",
    title: "Hand-finished ceramic",
    body: "A master ceramist layers, glazes, and polishes every surface by hand for translucency that reads true to natural light.",
  },
];

export default function Lab() {
  return (
    <section id="lab" className="py-28 lg:py-36 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
            Inside the lab
          </div>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
            Your smile is made here.{" "}
            <span className="italic text-foreground-muted">
              Not shipped here.
            </span>
          </h2>
          <p className="mt-6 text-lg text-foreground-muted text-balance">
            From the first digital scan to the final hand-glazed surface, every
            veneer is designed, milled, and finished by our own team — steps
            away from your chair.
          </p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {stages.map((s) => (
            <figure key={s.n} className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-line bg-background">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 left-4 font-display text-2xl text-background mix-blend-difference">
                  {s.n}
                </div>
              </div>
              <figcaption className="mt-5">
                <div className="font-display text-2xl leading-tight">
                  {s.title}
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-foreground-muted">
                  {s.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
