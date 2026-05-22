export default function About() {
  return (
    <section
      id="about"
      className="py-28 lg:py-36 relative bg-surface text-foreground overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Portrait — with an offset accent frame for depth */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.75rem] border border-accent/50"
            />
            <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden ring-1 ring-line bg-background">
              <img
                src="/dr.jpg"
                alt="Dr. Ryan Trevino"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[11px] tracking-[0.22em] uppercase text-white/65">
                  Founder &amp; Lead Clinician
                </div>
                <div className="mt-1.5 font-display text-3xl text-white">
                  Dr. Ryan Trevino
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-accent-deep">
              <span className="h-px w-8 bg-accent" />
              An eye for aesthetics
            </div>
            <h2 className="mt-6 font-display text-5xl lg:text-6xl leading-[1.02] tracking-tight text-balance">
              Veneers aren&apos;t a procedure.
              <br />
              <span className="italic text-accent-deep">
                They&apos;re a portrait.
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground-muted">
              <p>
                Dr. Trevino trained as a clinician but thinks like an artist. He
                studies the way light moves through enamel, how a smile sits
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

            <blockquote className="relative mt-10 pl-9">
              <span
                aria-hidden
                className="absolute left-0 -top-3 font-display text-6xl leading-none text-accent"
              >
                &ldquo;
              </span>
              <p className="font-display text-2xl lg:text-3xl italic leading-snug text-foreground text-balance">
                Smile makeovers are crafted to look effortlessly natural, even
                up close. That&apos;s the whole standard.
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
