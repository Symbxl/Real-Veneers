import Link from "next/link";
import Nav from "@/components/Nav";
import ProcessIntro from "@/components/ProcessIntro";
import ToothShowcase from "@/components/ToothShowcase";
import VideoButton from "@/components/VideoButton";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

// One full-viewport, scroll-snapped panel.
function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`snap-start min-h-screen flex items-center py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">{children}</div>
    </section>
  );
}

function ImageStage({
  src,
  alt,
  imgClassName = "",
  bare = false,
}: {
  src: string;
  alt: string;
  imgClassName?: string;
  bare?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden ${
        bare ? "" : "rounded-3xl ring-1 ring-line bg-background"
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

export default function ProcessPage() {
  return (
    <>
      <Nav />
      {/* The page itself doesn't scroll — this container does, snapping
          one panel into view per scroll. */}
      <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* Panel 1 — Headline, promise & timeline */}
        <ProcessIntro />

        {/* Panel 2 — Step 01 · Free consultation */}
        <Panel>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="lg:order-2">
              <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                Step 01 · Consult &amp; 3D scan
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-5xl leading-[1.04] tracking-tight text-balance">
                It starts with a free consultation.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted text-balance">
                A relaxed, no-pressure conversation about the smile you want,
                then a quick digital scan. No trays, no impression goop, no
                obligation. You leave knowing exactly what&apos;s possible.
              </p>
              <VideoButton src="/stepone.mov" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line bg-background">
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Panel>

        {/* Panel 3 — Step 02 · Smile design */}
        <Panel>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                Step 02 · Design
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-5xl leading-[1.04] tracking-tight text-balance">
                Shaped the way a real tooth is shaped.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted text-balance">
                Before anything is milled, your smile is built in 3D. Every
                edge, every curve, every translucent layer modeled to sit
                naturally inside your face. Watch it cycle through every tooth
                type, the anatomy we design against.
              </p>
            </div>
            <ToothShowcase />
          </div>
        </Panel>

        {/* Panel 4 — Step 03 · In-house milling */}
        <Panel className="bg-surface">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="lg:order-2">
              <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                Step 03 · Craft
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-5xl leading-[1.04] tracking-tight text-balance">
                Milled in the next room, not mailed away.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted text-balance">
                Your veneers are cut on a CEREC Primemill, a five-axis,
                twin-spindle machine that carves each restoration from a solid
                ceramic block to tolerances under twenty-five microns. No
                impressions sent away, no two-week waits.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line bg-background">
              <video
                src="/process.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Panel>

        {/* Panel 5 — Step 04 · The result */}
        <Panel>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
                Step 04 · Result
              </div>
              <h2 className="mt-5 font-display text-4xl lg:text-5xl leading-[1.04] tracking-tight text-balance">
                The smile you walk out with.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground-muted text-balance">
                Two days after your first scan, the temporaries come off. Final
                fit, bite, and hand-polish, a complete, hand-finished smile
                designed to look lived-in, not installed.
              </p>
              <Link
                href="/#contact"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-3 py-3 text-sm tracking-wide hover:bg-accent-deep transition-colors group"
              >
                Book your free consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-background/15 group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </div>
            <ImageStage
              src="/result.jpg"
              alt="A finished veneer smile transformation"
            />
          </div>
        </Panel>

        {/* Why RealVeneers */}
        <div className="snap-start">
          <WhyChooseUs />
        </div>

        {/* Footer as the final snap stop */}
        <div className="snap-start">
          <Footer />
        </div>
      </main>
    </>
  );
}
