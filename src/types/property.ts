// types/property.ts
export type GeoPoint = {
  _type?: string;
  lat: number;
  lng: number;
  alt?: number | null;
};

export type Property = {
  _id: string;
  title: string;
  slug: string;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqFt?: number | null;
  location?: string | GeoPoint | null;
  locationLabel?: string | null;
  heroUrl?: string | null; // <-- direct URL from Sanity
};
