// src/app/properties/page.tsx
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PropertyCard from "@/components/property-card";
import { sanityClient } from "@/sanity/client";
import { PROPERTIES_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { unstable_cache } from "next/cache";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Property = {
  _id: string;
  title: string;
  slug: string;
  status?: string;
  currency?: string;
  price?: number;
  displayPrice?: string;
  city?: string;
  country?: string;
  heroImage?: SanityImageSource;
};

const getProperties = unstable_cache(
  async (): Promise<Property[]> => {
    return sanityClient.fetch(PROPERTIES_QUERY);
  },
  ["properties-list"],
  { tags: ["properties"] }
);

function formatPrice(p: Property) {
  if (p.displayPrice) return p.displayPrice;
  if (typeof p.price === "number") {
    const symbol =
      p.currency === "INR"
        ? "₹"
        : p.currency === "USD"
          ? "$"
          : p.currency === "MXN"
            ? "MX$"
            : "";
    return `${symbol}${p.price.toLocaleString()}`;
  }
  return "Price on request";
}

export default async function PropertiesPage() {
  const items = await getProperties();
  const hasItems = items && items.length > 0;

  return (
    <>
      <SiteHeader />
      <main className="container pt-12 pb-20">
        <h1 className="h-serif text-3xl md:text-4xl mb-8">
          Featured Properties
        </h1>

        {hasItems ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <PropertyCard
                key={p._id}
                title={p.title}
                location={[p.city, p.country].filter(Boolean).join(", ")}
                price={formatPrice(p)}
                image={
                  p.heroImage
                    ? urlFor(p.heroImage)
                        .width(1200)
                        .height(900)
                        .fit("crop")
                        .url()
                    : "/placeholder.jpg"
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white/60 p-6 text-sm opacity-80">
            No properties published yet. Add one in{" "}
            <span className="font-medium">/studio</span> and publish to see it
            here.
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
