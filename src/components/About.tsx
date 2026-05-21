export default function About() {
  return (
    <section
      id="about"
      className="py-28 lg:py-36 relative bg-surface text-foreground overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 95%, #f0e3cf 0%, transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 sm:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="aspect-[1/2] relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-soft via-accent/30 to-accent-deep/40">
              <img
                src="/dr.jpg"
                alt="Dr. Ryan Trevino"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-background/70">
                    Founder &amp; Lead Clinician
                  </div>
                  <div className="font-display text-3xl mt-2 text-white">
                    Dr. Ryan Trevino
                  </div>
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-background/70 text-right">
                  DDS
                  <br />
                  Cosmetic
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-accent-deep">
              An eye for aesthetics
            </div>
            <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              Veneers aren&apos;t a procedure.
              <br />
              <span className="italic text-accent-deep">They&apos;re a portrait.</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground-muted">
              <p>
                Dr. Trevino trained as a clinician but thinks like an artist.
                He studies the way light moves through enamel, how a smile sits
                inside a face, how the smallest asymmetries make a result feel
                real instead of manufactured.
              </p>
              <p>
                Every smile he designs is built around <em>you</em> — your
                proportions, your personality, the way your lips move when you
                laugh. The goal isn&apos;t a Hollywood look. The goal is the
                version of you that already exists in your head.
              </p>
            </div>

            <blockquote className="mt-10 pl-6 border-l-2 border-accent">
              <p className="font-display text-2xl lg:text-3xl italic leading-snug text-foreground text-balance">
                &ldquo;Smile makeovers are crafted to look effortlessly natural,
                even up close. That&apos;s the whole standard.&rdquo;
              </p>
              <footer className="mt-4 text-sm tracking-[0.18em] uppercase text-foreground-muted">
                — Dr. Ryan Trevino
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
