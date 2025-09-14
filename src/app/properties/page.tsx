// app/properties/page.tsx
import type { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/types/property";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Properties | PM VILLAS",
  description: "Browse luxury villas and estates curated by PM VILLAS.",
};

const QUERY = `
*[_type == "property" && defined(slug.current)] 
| order(_createdAt desc)[0...24]{
  _id,
  title,
  "slug": slug.current,
  price,
  bedrooms,
  bathrooms,
  areaSqFt,
  location,
  "locationLabel": coalesce(locationLabel, locationName, address, city, location.city, location.name),
  "heroUrl": coalesce(
    coverImage.asset->url,
    mainImage.asset->url,
    heroImage.asset->url,
    featuredImage.asset->url,
    primaryImage.asset->url,
    image.asset->url,
    images[0].asset->url,
    gallery[0].asset->url,
    photos[0].asset->url,
    pictures[0].asset->url,
    media[0].asset->url,
    images[0].image.asset->url,
    gallery[0].image.asset->url,
    photos[0].image.asset->url,
    pictures[0].image.asset->url,
    media[0].image.asset->url
  )
}
`;

async function getProperties(): Promise<Property[]> {
  try {
    const data = await client.fetch(QUERY, {}, { cache: "force-cache" });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function PropertiesPage() {
  const items = await getProperties();

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Properties
          </h1>
          <span className="text-sm text-neutral-500">
            {items.length} listing{items.length === 1 ? "" : "s"}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-neutral-500">
            No properties yet. Add listings in Sanity to populate this page.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const img = p.heroUrl
                ? `${p.heroUrl}?w=800&h=600&fit=crop&auto=format`
                : undefined;
              return <PropertyCard key={p._id} property={p} imageUrl={img} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
