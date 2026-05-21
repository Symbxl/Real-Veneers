import Image from "next/image";
import Link from "next/link";

const photos = [
  { src: "/exec.webp", width: 1500, height: 2249, hideOnMobile: false },
  { src: "/portfolio/p06.webp", width: 900, height: 1200, hideOnMobile: true },
];

export default function PortfolioShowcase() {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        {photos.map((p) => (
          <Image
            key={p.src}
            src={p.src}
            alt="Portfolio — meet our models"
            width={p.width}
            height={p.height}
            sizes="(min-width: 640px) 50vw, 100vw"
            className={`h-auto w-full sm:w-1/2 ${
              p.hideOnMobile ? "hidden sm:block" : ""
            }`}
            priority
          />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center text-center sm:mt-16">
        <div className="text-xs uppercase tracking-[0.22em] text-accent-deep">
          Portfolio
        </div>
        <h2 className="mt-4 font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          Meet our <span className="italic">models.</span>
        </h2>
        <Link
          href="/portfolio"
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-foreground pl-7 pr-3 py-3 text-xs font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-accent-deep"
        >
          View Gallery
          <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
