import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio — RealVeneers",
  description:
    "Real patients, real results. Smile transformations by Dr. Ryan Trevino in Sugar Land, TX.",
};

type CaseStudy = {
  name: string;
  subhead: string;
  storyAsQuote: boolean;
  story: string[];
  summary: string[];
  gallery: string[];
};

const cases: CaseStudy[] = [
  {
    name: "Erielle",
    subhead: "Miss Sugar Land 2025",
    storyAsQuote: true,
    story: [
      "“Hi, my name is Erielle Gabay. I have the honor of representing my hometown Sugar Land, TX, as Miss Sugar Land 2025, and I’ll be competing for Miss Texas this summer.",
      "When I met Dr. Trevino, my teeth were not in good shape. They were dull, worn, and broken in few places. It didn’t match the persona and look I am going for as a public figure. Before advancing to the next level of competition, I knew that I needed to restore my smile to achieve a perfect glow.",
      "Getting my front teeth restored with his advanced tech, AI designed veneers immediately improved my confidence. It was a simple, 2-visit process to get my teeth measured and fitted. He let me contribute during the creative process even to the finest detail for color, design, and translucency. The tech is incredible. The accuracy of my bite… everything went so smoothly.",
      "Now I have the confidence to go on and win when I compete for Miss Texas 2025!”",
    ],
    summary: [
      "In just 2 quick appointments a couple of days apart, Erielle’s smile was completely transformed with upper minimal-prep ceramic veneers.",
      "Since Erielle had a certain look she was going for, she really appreciated being able to participate in every aspect of the design process—from the size and the shape, to the color and the amount of translucency!",
      "She also received 1 ZOOM whitening session in order to ensure a perfect shade match between her top and bottom teeth.",
      "Her smile makeover helped accelerate her confidence in preparation for the Miss Texas pageant in May 2025! Our team is cheering her on!!",
    ],
    gallery: [
      "/portfolio/p01.webp",
      "/portfolio/p02.webp",
      "/portfolio/p03.webp",
      "/portfolio/p04.webp",
      "/portfolio/p05.webp",
      "/portfolio/p06.webp",
      "/portfolio/p07.webp",
      "/portfolio/p08.webp",
      "/portfolio/p09.webp",
      "/portfolio/p10.webp",
    ],
  },
  {
    name: "Rich",
    subhead: "Amazon Executive",
    storyAsQuote: false,
    story: [
      "Rich has that outgoing, charismatic personality that allows him to constantly make connections with new clients and business opportunities.",
      "He is such a generous person in his actions and his words. Now he has an even more engaging smile that makes other people smile… and he uses it everyday—from the gym, to the golf course, to the boardroom!",
    ],
    summary: [
      "In just 2 days, Rich’s smile was transformed with 14 upper minimal-prep ceramic veneers.",
      "Rich wanted veneers that look so realistic that no one would even know that he has them! Dr. Trevino uses the highest quality translucent materials in his in-office lab for a natural appearance.",
      "Rich also received 1 ZOOM whitening session for his bottom teeth in order to ensure a perfect shade match between top and bottom.",
      "He tells us that he now gets complimented on his smile while out at restaurants and in meetings all of the time!",
    ],
    gallery: [
      "/portfolio/p11.webp",
      "/portfolio/p12.webp",
      "/portfolio/p13.webp",
      "/portfolio/p14.webp",
      "/portfolio/p15.webp",
      "/portfolio/p16.webp",
      "/portfolio/p17.webp",
    ],
  },
];

const totalPhotos = cases.reduce((n, c) => n + c.gallery.length, 0);

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group aspect-[4/5] overflow-hidden rounded-2xl bg-foreground/5 ring-1 ring-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
      />
    </div>
  );
}

function CaseSection({
  study,
  index,
  shaded,
}: {
  study: CaseStudy;
  index: number;
  shaded: boolean;
}) {
  return (
    <section className={`py-20 lg:py-28 ${shaded ? "bg-surface" : ""}`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Case header — large index numeral + name */}
        <div className="flex items-end gap-5 sm:gap-8">
          <span className="font-display leading-[0.72] text-accent/35 text-[clamp(3.5rem,9vw,7rem)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="pb-1">
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              {study.subhead}
            </div>
            <h2 className="mt-2 font-display text-5xl lg:text-7xl leading-[1] tracking-tight">
              {study.name}
            </h2>
          </div>
        </div>

        {/* Story + treatment */}
        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-16 items-start">
          {study.storyAsQuote ? (
            <blockquote className="border-l-2 border-accent pl-6 lg:pl-8 space-y-4 text-lg leading-relaxed text-foreground">
              {study.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </blockquote>
          ) : (
            <div className="space-y-4 text-lg leading-relaxed text-foreground-muted">
              {study.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          <aside className="rounded-2xl border border-line bg-accent-soft/40 p-7 lg:p-8">
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              The treatment
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-muted">
              {study.summary.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </aside>
        </div>

        {/* Gallery — each picture sized like the home-page portfolio */}
        <div className="mt-14 lg:mt-20 grid sm:grid-cols-2 gap-x-8 gap-y-14">
          {study.gallery.map((src, i) => (
            <GalleryImage
              key={src}
              src={src}
              alt={`${study.name} — veneer result ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <section className="pt-32 lg:pt-44 pb-4 lg:pb-8">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              Real patients, real results
            </div>
            <h1 className="mt-5 font-display text-6xl lg:text-8xl leading-[1] tracking-tight">
              Portfolio
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted text-balance">
              Every smile here was designed, milled, and hand-finished in our
              Sugar Land studio — in just two days.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.18em] uppercase text-foreground-muted">
              <span>{cases.length} Transformations</span>
              <span className="text-accent">·</span>
              <span>{totalPhotos} Photographs</span>
              <span className="text-accent">·</span>
              <span>Sugar Land, TX</span>
            </div>
            <div className="divider-line mt-10" />
          </div>
        </section>

        {cases.map((study, i) => (
          <CaseSection
            key={study.name}
            study={study}
            index={i}
            shaded={i % 2 === 0}
          />
        ))}

        {/* Closing CTA */}
        <section className="bg-foreground text-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
            <div className="text-xs tracking-[0.22em] uppercase text-accent">
              Your turn
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl leading-[1.04] tracking-tight text-balance">
              Your smile could be next.
            </h2>
            <p className="mt-6 mx-auto max-w-md text-lg leading-relaxed text-background/70">
              Book a free consultation and see what two days could do for your
              smile.
            </p>
            <Link
              href="/#contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-soft transition-colors"
            >
              Book a free consultation
              <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground/10 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
