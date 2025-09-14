import { groq } from "next-sanity";

export const PROPERTY_SLUGS_QUERY = groq`
  *[_type == "property" && defined(slug.current)]{ "slug": slug.current }
`;

const BASE_FIELDS = groq`
  "slug": slug.current,
  title,
  tagline,
  status,
  price,
  currency,
  location,
  bedrooms,
  bathrooms,
  areaSqFt,
  lotSqFt,
  heroImage,
  gallery,
  highlights,
  description,
  amenities,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  seo
`;

export const PROPERTIES_LIST_QUERY = groq`
  *[_type == "property" && defined(slug.current)]
  | order(coalesce(updatedAt, _updatedAt) desc)[0...100]{
    ${BASE_FIELDS}
  }
`;

export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug][0]{
    ${BASE_FIELDS}
  }
`;
