import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PropertyCard from "@/components/property-card";
import { sanityClient } from "@/sanity/client";
import { PROPERTIES_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { unstable_cache, revalidateTag } from "next/cache";

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
  heroImage?: any;
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
    const symbol = p.currency === "INR" ? "₹" : p.currency === "USD" ? "$" : "";
    return `${symbol}${p.price.toLocaleString()}`;
  }
  return "";
}

export default async function PropertiesPage() {
  const items = await getProperties();

  return (
    <>
      <SiteHeader />
      <main className="container pt-12 pb-20">
        <h1 className="h-serif text-3xl md:text-4xl mb-8">
          Featured Properties
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <PropertyCard
              key={p._id}
              title={p.title}
              location={[p.city, p.country].filter(Boolean).join(", ")}
              price={formatPrice(p) || "Price on request"}
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
      </main>
      <SiteFooter />
    </>
  );
}
