// src/sanity/queries.ts
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
