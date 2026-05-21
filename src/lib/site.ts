// Central source of truth for SEO + business data.
// Update SITE_URL once the production domain is confirmed — every canonical
// URL, sitemap entry, and structured-data block is derived from it.

export const SITE_URL = "https://realveneers.com";

export const site = {
  name: "RealVeneers",
  // The literal phrase patients type into Google ("real veneers").
  legalName: "RealVeneers — Cosmetic Dentistry Studio",
  tagline: "2-Day Smile Transformations in Sugar Land, TX",
  description:
    "RealVeneers is a boutique cosmetic dentistry studio in Sugar Land, TX. Dr. Ryan Trevino crafts AI-designed, hand-finished porcelain veneers in an in-house lab — effortlessly natural smiles in just two days.",
  phone: "+1-281-980-1733",
  phoneDisplay: "(281) 980-1733",
  email: "hello@realveneers.com",
  address: {
    street: "4660 Sweetwater Blvd, Suite 230",
    city: "Sugar Land",
    region: "TX",
    postalCode: "77479",
    country: "US",
  },
  geo: { lat: 29.5969, lng: -95.6349 },
  // Cities the practice draws patients from — used throughout blog copy so the
  // site surfaces for "veneers near me" searches across Greater Houston.
  serviceAreas: [
    "Sugar Land",
    "Missouri City",
    "Richmond",
    "Rosenberg",
    "Stafford",
    "Katy",
    "Houston",
    "Pearland",
    "First Colony",
    "Greatwood",
    "Riverstone",
    "Telfair",
  ],
  founder: "Dr. Ryan Trevino, DDS",
  social: [] as string[],
} as const;
