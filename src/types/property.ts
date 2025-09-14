// types/property.ts

export type GeoPoint = {
  _type?: string;
  lat: number;
  lng: number;
  alt?: number | null;
};

// Allow label-style location objects used in mock data (e.g., { area, country })
export type LocationLabel = {
  area?: string | null;
  country?: string | null;
  region?: string | null;
  city?: string | null;
};

// Minimal Sanity image type (kept loose for practical use)
export type SanityImage = any;

export type SEO = {
  title?: string | null;
  description?: string | null;
  image?: SanityImage | null;
};

export type Property = {
  _id?: string;
  title: string;
  slug: string;

  // Pricing
  price?: number | null;
  currency?: string | null;

  // Specs
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqFt?: number | null;
  lotSqFt?: number | null;

  // Features
  amenities?: string[] | null;
  highlights?: string[] | null;
  status?: string | null;

  // Location
  location?: string | GeoPoint | LocationLabel | null;
  locationLabel?: string | null;

  // Media
  heroImage?: SanityImage | null;
  heroUrl?: string | null; // optional direct URL when available
  gallery?: SanityImage[] | null;

  // Content
  description?: string | any[] | null;
  tagline?: string | null;

  // SEO
  seo?: SEO | null;

  // Misc
  updatedAt?: string | null;
};
