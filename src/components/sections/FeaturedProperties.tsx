// components/sections/FeaturedProperties.tsx
import PropertyCard from "@/components/PropertyCard";
import { client } from "@/lib/sanity.client";
import type { Property } from "@/types/property";

const QUERY = `
*[_type == "property" && defined(slug.current)] | order(_updatedAt desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  price,
  bedrooms,
  bathrooms,
  areaSqFt,
  location,
  "locationLabel": coalesce(locationLabel, locationName, address, city, location.city, location.name),

  // 👉 robust hero image URL (covers many common schema shapes)
  "heroUrl": coalesce(
    coverImage.asset->url,
    mainImage.asset->url,
    heroImage.asset->url,
    featuredImage.asset->url,
    primaryImage.asset->url,
    image.asset->url,
    // arrays of images
    images[0].asset->url,
    gallery[0].asset->url,
    photos[0].asset->url,
    pictures[0].asset->url,
    media[0].asset->url,
    // arrays of objects that contain {image}
    images[0].image.asset->url,
    gallery[0].image.asset->url,
    photos[0].image.asset->url,
    pictures[0].image.asset->url,
    media[0].image.asset->url
  )
}
`;

async function getFeatured(): Promise<Property[]> {
  try {
    const data = await client.fetch(QUERY, {}, { cache: "force-cache" });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function FeaturedProperties() {
  const items = await getFeatured();

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-neutral-500">
        No properties yet. Add some listings in Sanity to populate this section.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const img = p.heroUrl
          ? `${p.heroUrl}?w=800&h=600&fit=crop&auto=format`
          : undefined;
        return <PropertyCard key={p._id} property={p} imageUrl={img} />;
      })}
    </div>
  );
}
