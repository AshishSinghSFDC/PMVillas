import { notFound } from "next/navigation";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RichText from "@/components/portable-text";
import Gallery from "@/components/property/gallery";
import ContactForm from "@/components/contact-form";
import { sanityClient } from "@/sanity/client";
import { PROPERTY_BY_SLUG_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { unstable_cache } from "next/cache";
import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "sanity";
import { Badge } from "@/components/ui/badge";

type Property = {
  _id: string;
  title: string;
  slug: string;
  status?: string;
  isFeatured?: boolean;
  highlightTags?: string[];
  description?: PortableTextBlock[];
  heroImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  videoUrl?: string | null;
  tourUrl?: string | null;
  floorplans?: { asset?: any }[];
  currency?: string;
  price?: number;
  displayPrice?: string;
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  lotSizeSqft?: number;
  propertyType?: string;
  yearBuilt?: number;
  hoaFees?: number;
  amenities?: string[];
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  location?: { lat: number; lng: number };
  mapUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageSource;
};

async function fetchProperty(slug: string): Promise<Property | null> {
  const get = unstable_cache(
    async (s: string) =>
      sanityClient.fetch(PROPERTY_BY_SLUG_QUERY, { slug: s }),
    ["property", slug],
    { tags: ["properties"] }
  );
  return get(slug);
}

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await fetchProperty(params.slug);
  if (!p) return {};
  const title = p.seoTitle || `${p.title} — PM Villas`;
  const description =
    p.seoDescription ||
    `${p.title} in ${[p.city, p.country].filter(Boolean).join(", ")}`;
  const og = p.seoImage || p.heroImage;
  const ogUrl = og
    ? urlFor(og).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : [],
      type: "article",
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = await fetchProperty(params.slug);
  if (!p) notFound();

  const heroUrl = p.heroImage
    ? urlFor(p.heroImage).width(1800).height(1200).fit("crop").url()
    : "/placeholder.jpg";
  const locationStr = [p.city, p.state, p.country].filter(Boolean).join(", ");

  return (
    <>
      <SiteHeader />

      <section className="relative aspect-[16/9] w-full">
        <Image
          src={heroUrl}
          alt={p.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container py-6 text-ivory">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {p.status && (
                <Badge className="bg-gold text-charcoal">
                  {p.status.replace("-", " ")}
                </Badge>
              )}
              {p.isFeatured && <Badge variant="secondary">Featured</Badge>}
              {p.highlightTags?.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="h-serif text-3xl md:text-5xl">{p.title}</h1>
            <p className="opacity-90">{locationStr}</p>
          </div>
        </div>
      </section>

      <main className="container py-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Fact label="Price" value={formatPrice(p)} />
            <Fact label="Beds" value={p.bedrooms ?? "-"} />
            <Fact label="Baths" value={p.bathrooms ?? "-"} />
            <Fact
              label="Area (sq ft)"
              value={p.areaSqft?.toLocaleString() ?? "-"}
            />
          </div>

          {p.description && (
            <section>
              <h2 className="h-serif text-2xl mb-3">About this property</h2>
              <RichText value={p.description} />
            </section>
          )}

          {p.gallery && p.gallery.length > 0 && (
            <section>
              <h2 className="h-serif text-2xl mb-3">Gallery</h2>
              <Gallery images={p.gallery as SanityImageSource[]} />
            </section>
          )}

          {(p.mapUrl || p.location) && (
            <section>
              <h2 className="h-serif text-2xl mb-3">Location</h2>
              <div className="rounded-xl overflow-hidden border">
                <iframe
                  title="Map"
                  className="w-full h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={
                    p.mapUrl
                      ? p.mapUrl
                      : `https://www.google.com/maps?q=${p.location?.lat},${p.location?.lng}&z=14&output=embed`
                  }
                />
              </div>
              <div className="mt-2 text-sm opacity-80">
                {[p.addressLine1, p.city, p.state, p.postalCode, p.country]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-1 space-y-8">
          <section className="rounded-2xl border p-5 bg-white/60">
            <h3 className="h-serif text-xl mb-4">Key Details</h3>
            <ul className="text-sm grid grid-cols-1 gap-2">
              <Li label="Property Type" value={p.propertyType ?? "-"} />
              <Li label="Year Built" value={p.yearBuilt ?? "-"} />
              <Li
                label="Lot Size (sq ft)"
                value={p.lotSizeSqft?.toLocaleString() ?? "-"}
              />
              <Li
                label="HOA / Fees"
                value={p.hoaFees ? `$${p.hoaFees.toLocaleString()}` : "-"}
              />
              <Li
                label="Amenities"
                value={(p.amenities || []).join(", ") || "-"}
              />
            </ul>
          </section>

          <section className="rounded-2xl border p-5 bg-white/60">
            <h3 className="h-serif text-xl mb-4">Request more info</h3>
            <ContactForm property={p.title} />
          </section>

          {(p.videoUrl || p.tourUrl) && (
            <section className="rounded-2xl border p-5 bg-white/60">
              <h3 className="h-serif text-xl mb-4">Tours</h3>
              {p.videoUrl && (
                <a
                  className="block text-gold underline"
                  href={p.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video Tour
                </a>
              )}
              {p.tourUrl && (
                <a
                  className="block text-gold underline mt-2"
                  href={p.tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open 3D/Matterport
                </a>
              )}
            </section>
          )}
        </aside>
      </main>

      <SiteFooter />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border p-4 bg-white/60">
      <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
      <div className="text-lg font-medium">{value}</div>
    </div>
  );
}

function Li({ label, value }: { label: string; value: string | number }) {
  return (
    <li className="flex justify-between gap-3">
      <span className="opacity-70">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </li>
  );
}
