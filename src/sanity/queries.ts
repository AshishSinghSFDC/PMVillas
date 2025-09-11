// src/sanity/queries.ts

// Listing grid
export const PROPERTIES_QUERY = /* groq */ `
*[_type == "property" && defined(slug.current)]
| order(isFeatured desc, _createdAt desc)[0...36]{
  _id,
  title,
  "slug": slug.current,
  status,
  currency,
  price,
  displayPrice,
  city,
  country,
  heroImage
}
`;

// Detail page by slug
export const PROPERTY_BY_SLUG_QUERY = /* groq */ `
*[_type == "property" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  status,
  isFeatured,
  highlightTags,
  description,
  heroImage,
  gallery,
  videoUrl,
  tourUrl,
  floorplans,
  currency,
  price,
  displayPrice,
  bedrooms,
  bathrooms,
  areaSqft,
  lotSizeSqft,
  propertyType,
  yearBuilt,
  hoaFees,
  amenities,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  location,
  mapUrl,
  seoTitle,
  seoDescription,
  seoImage
}
`;
