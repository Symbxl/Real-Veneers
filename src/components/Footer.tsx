import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-line">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="font-display text-3xl tracking-tight">
              Real<span className="text-accent-deep italic">Veneers</span>
            </div>
            <p className="mt-4 text-sm text-foreground-muted max-w-xs leading-relaxed">
              A boutique cosmetic dentistry studio in Sugar Land, TX.
              Effortlessly natural smiles, hand-finished in 48 hours.
            </p>
          </div>
          <FooterCol title="Explore">
            <Link href="/process">The Process</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">Dr. Trevino</Link>
            <Link href="/meet-the-team">Meet the Team</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Book Consult</Link>
          </FooterCol>
          <FooterCol title="Visit">
            4660 Sweetwater Blvd
            <br />
            Suite 230
            <br />
            Sugar Land, TX 77479
          </FooterCol>
          <FooterCol title="Contact">
            <a href="tel:+12819801733">(281) 980-1733</a>
            <a href="mailto:hello@realveneers.com">hello@realveneers.com</a>
          </FooterCol>
        </div>

        <div className="divider-line my-12" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-foreground-muted">
          <div>© {new Date().getFullYear()} RealVeneers. All rights reserved.</div>
          <div className="tracking-wide">
            <a
              href="https://relight.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Built with purpose. Designed with intention.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs tracking-[0.2em] uppercase text-foreground/60 mb-4">
        {title}
      </div>
      <div className="flex flex-col gap-2 text-sm text-foreground-muted [&_a]:hover:text-accent-deep [&_a]:transition-colors">
        {children}
      </div>
    </div>
  );
}
