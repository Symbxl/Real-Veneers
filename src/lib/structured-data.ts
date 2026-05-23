// Builders for the JSON-LD blocks used across the site. Keeping them here means
// the business NAP (name, address, phone) is defined once and stays consistent
// everywhere Google looks — a core local-SEO requirement.

import { SITE_URL, site } from "./site";

// Stable @id for the business entity. Every other node references this so
// Google merges them into one knowledge-graph entity.
export const ORG_ID = `${SITE_URL}/#dentist`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

// LocalBusiness (Dentist) — powers the branded "Real Veneers" knowledge panel.
export function dentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": ORG_ID,
    name: site.name,
    alternateName: ["Real Veneers", "RealVeneers Sugar Land"],
    description: site.description,
    url: SITE_URL,
    telephone: site.phone,
    email: site.email,
    image: `${SITE_URL}/result.jpg`,
    logo: `${SITE_URL}/result.jpg`,
    priceRange: "$$$",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "City",
      name: `${name}, TX`,
    })),
    founder: { "@type": "Person", name: site.founder },
    medicalSpecialty: "CosmeticDentistry",
    knowsAbout: [
      "Porcelain veneers",
      "Composite veneers",
      "Smile makeovers",
      "Cosmetic dentistry",
      "Teeth whitening",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: site.social,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cosmetic dentistry services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Porcelain veneers",
            procedureType: "https://schema.org/CosmeticProcedure",
            bodyLocation: "Teeth",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Smile makeover",
            procedureType: "https://schema.org/CosmeticProcedure",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Teeth whitening",
            procedureType: "https://schema.org/CosmeticProcedure",
          },
        },
      ],
    },
  };
}

// WebSite — enables the sitelinks search box and ties pages to the brand.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

// Person — Dr. Trevino. Strengthens E-E-A-T signals (author + practitioner).
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#dr-trevino`,
    name: "Dr. Ryan Trevino, DDS",
    jobTitle: "Cosmetic and Family Dentist",
    description:
      "Sugar Land cosmetic and family dentist; founder of RealVeneers and Trevino Dental Group. Focuses on natural-looking, two-day porcelain veneers.",
    image: `${SITE_URL}/dr.jpg`,
    url: `${SITE_URL}/about`,
    worksFor: { "@id": ORG_ID },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Baylor College of Dentistry",
    },
    memberOf: [
      { "@type": "Organization", name: "American Dental Association" },
      { "@type": "Organization", name: "Texas Dental Association" },
    ],
    knowsAbout: [
      "Porcelain veneers",
      "Smile makeovers",
      "Cosmetic dentistry",
      "Digital dentistry",
    ],
  };
}

// Breadcrumb trail — produces the path shown under a result's title.
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Article — qualifies a blog post for article rich results.
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Person", name: opts.authorName },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
  };
}

// FAQPage — the question/answer pairs Google can show as an expandable list.
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
