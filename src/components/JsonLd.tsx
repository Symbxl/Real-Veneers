// Renders a JSON-LD structured-data block. Google reads this to build rich
// results (business knowledge panel, article cards, FAQ accordions).
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from trusted, in-repo data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
