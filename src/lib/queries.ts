// src/lib/queries.ts
import "server-only";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN, // optional
});

export async function getAllPropertySlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "property" && defined(slug.current)][].slug.current`
  );
}

export async function getPropertyBySlug(slug: string) {
  const q = `*[_type == "property" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    price,
    currency,
    tagline,
    description,
    seo,
    // Try common image fields for OG/cover
    "coverImageUrl": coalesce(seo.image.asset->url, mainImage.asset->url),
    // If you store an SEO image url directly
    "seo": {
      "title": seo.title,
      "description": seo.description,
      "imageUrl": coalesce(seo.image.asset->url, seo.imageUrl)
    }
  }`;
  return client.fetch(q, { slug });
}
