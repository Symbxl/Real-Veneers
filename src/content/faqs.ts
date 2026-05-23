// Single source of truth for the FAQ shown on the home page.
// The same questions feed (1) the rendered <FAQ /> accordion and
// (2) the FAQPage JSON-LD that lets Google show an expandable Q&A in search.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much do veneers cost?",
    a: "Every case is quoted after your consultation, because the price depends on how many teeth we're treating and what each one needs. You'll get a clear, itemized number before anything begins — no packages, no pressure, no surprises.",
  },
  {
    q: "Is a new smile in two days really possible?",
    a: "Yes. Because our master ceramists work in a lab inside our studio, there's no shipping your case to a remote lab and waiting weeks. Day one we design and prepare; day two we place your finished veneers.",
  },
  {
    q: "Will my veneers look fake?",
    a: "That's the one outcome we design against. We hand-layer translucent porcelain, vary the shape of every tooth, and shade against your gum line — so the result reads as natural enamel, not a uniform white block.",
  },
  {
    q: "Do veneers damage my natural teeth?",
    a: "Veneers need a conservative amount of enamel reduction so they sit flush and natural. Dr. Trevino removes only what's necessary — in some cases almost nothing — and walks you through exactly what your teeth need beforehand.",
  },
  {
    q: "How long do veneers last?",
    a: "Well-made porcelain veneers routinely last 10 to 15 years, and often longer with good care. Yours are designed to be brushed, flossed, and lived with like natural teeth.",
  },
  {
    q: "Do you offer financing?",
    a: "We do. Most patients spread treatment across monthly payments, and we'll review the options with you during your free consultation — so the number is never the reason you wait.",
  },
];
