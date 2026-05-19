const items = [
  "AI Smile Design",
  "In-House Laboratory",
  "Translucent Porcelain",
  "2-Day Turnaround",
  "Hand-Finished",
  "Effortlessly Natural",
];

export default function Marquee() {
  return (
    <section
      aria-label="What we do"
      className="border-y border-line/70 bg-surface/40 overflow-hidden"
    >
      <div className="flex whitespace-nowrap animate-marquee py-6">
        {[...items, ...items, ...items].map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-10 px-10 text-foreground-muted font-display text-2xl italic"
          >
            <span>{t}</span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
