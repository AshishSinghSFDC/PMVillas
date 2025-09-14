import Image from "next/image";
import { notFound } from "next/navigation";
import Gallery from "../../../components/Gallery";
import PT from "../../../components/portable-text";
import { sanityClient } from "../../../sanity/lib/client";
import {
  PROPERTY_BY_SLUG_QUERY,
  PROPERTY_SLUGS_QUERY,
} from "../../../sanity/queries";
import type { Property } from "../../../types/property";
import { formatAreaSqFt, formatPrice } from "../../../lib/format";
import { toImageSrc } from "../../../sanity/lib/image";

export const revalidate = 60;

/**
 * Helper: best-effort location label
 * - Prefer explicit locationLabel
 * - Fallback to short lat,lng if GeoPoint present
 * - Fallback to plain string location
 */
function getLocationLabel(p: Property): string | undefined {
  if (p.locationLabel && typeof p.locationLabel === "string") {
    return p.locationLabel;
  }
  const loc = p.location as any;
  if (
    loc &&
    typeof loc === "object" &&
    typeof loc.lat === "number" &&
    typeof loc.lng === "number"
  ) {
    const lat = Number.isFinite(loc.lat) ? loc.lat.toFixed(3) : undefined;
    const lng = Number.isFinite(loc.lng) ? loc.lng.toFixed(3) : undefined;
    if (lat && lng) return `${lat}, ${lng}`;
  }
  if (typeof p.location === "string") return p.location;
  return undefined;
}

/* ----------------------------- Static params ----------------------------- */

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(
    PROPERTY_SLUGS_QUERY,
    {},
    { next: { revalidate } }
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

/* ----------------------------- Metadata (SEO) ---------------------------- */

type RouteParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { slug } = await params;

  const prop = await sanityClient.fetch<Property>(
    PROPERTY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate } }
  );
  if (!prop) return {};

  const title = `${prop.title} | ${formatPrice(prop.price, prop.currency)}`;
  const description =
    (prop as any)?.seo?.description ||
    (typeof (prop as any)?.description === "string"
      ? (prop as any).description
      : (prop as any)?.tagline) ||
    prop.title;

  const ogImage = toImageSrc((prop as any)?.heroImage, 1200, 630);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* --------------------------------- Page --------------------------------- */

export default async function PropertyDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;

  const prop = await sanityClient.fetch<Property>(
    PROPERTY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate, tags: ["properties", `property:${slug}`] } }
  );

  if (!prop) return notFound();

  const hero = toImageSrc((prop as any)?.heroImage, 1920, 1080);
  const highlights: string[] = (prop as any)?.highlights ?? [];
  const locationText = getLocationLabel(prop);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      {/* Header section */}
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            {prop.title}
          </h1>
          {(prop as any)?.tagline ? (
            <p className="mt-2 text-sm text-zinc-600">
              {(prop as any).tagline}
            </p>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-700">
            {(prop as any)?.status ? (
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                {(prop as any).status}
              </span>
            ) : null}

            {(prop.bedrooms || prop.bathrooms) && (
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                {prop.bedrooms ? `${prop.bedrooms} bd` : ""}
                {prop.bedrooms && prop.bathrooms ? " • " : ""}
                {prop.bathrooms ? `${prop.bathrooms} ba` : ""}
              </span>
            )}

            {prop.areaSqFt ? (
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                {formatAreaSqFt(prop.areaSqFt)}
              </span>
            ) : null}

            {/* Location chip (robust across string/GeoPoint) */}
            {locationText ? (
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                📍 {locationText}
              </span>
            ) : null}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-semibold text-zinc-900 md:text-3xl">
            {formatPrice(prop.price, (prop as any)?.currency)}
          </div>
          <a
            href="/contact"
            className="mt-3 inline-block rounded-xl border border-zinc-200 bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Request details
          </a>
        </div>
      </div>

      {/* Hero image */}
      {hero ? (
        <div className="mb-10 overflow-hidden rounded-2xl border border-zinc-200">
          <div className="relative aspect-[16/9] w-full bg-zinc-100">
            <Image src={hero} alt={prop.title} fill className="object-cover" />
          </div>
        </div>
      ) : null}

      {/* Content grid */}
      <section className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2">
          {/* Portable Text description or plain string */}
          {Array.isArray((prop as any)?.description) ? (
            <PT value={(prop as any).description as any[]} />
          ) : (prop as any)?.description ? (
            <p className="text-base leading-relaxed text-zinc-700">
              {(prop as any).description}
            </p>
          ) : null}

          {/* Gallery */}
          {(prop as any)?.gallery && (prop as any).gallery.length > 0 ? (
            <div className="mt-8">
              <Gallery images={(prop as any).gallery} />
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick specs */}
          <div className="rounded-2xl border border-zinc-200 p-5">
            <h2 className="mb-3 text-sm font-medium text-zinc-900">
              Key details
            </h2>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-zinc-700">
              {prop.bedrooms ? (
                <>
                  <dt className="text-zinc-500">Bedrooms</dt>
                  <dd>{prop.bedrooms}</dd>
                </>
              ) : null}
              {prop.bathrooms ? (
                <>
                  <dt className="text-zinc-500">Bathrooms</dt>
                  <dd>{prop.bathrooms}</dd>
                </>
              ) : null}
              {prop.areaSqFt ? (
                <>
                  <dt className="text-zinc-500">Area</dt>
                  <dd>{formatAreaSqFt(prop.areaSqFt)}</dd>
                </>
              ) : null}
              {(prop as any)?.lotSqFt ? (
                <>
                  <dt className="text-zinc-500">Lot</dt>
                  <dd>
                    {Number((prop as any).lotSqFt).toLocaleString()} sq ft
                  </dd>
                </>
              ) : null}
              {locationText ? (
                <>
                  <dt className="text-zinc-500">Location</dt>
                  <dd>{locationText}</dd>
                </>
              ) : null}
            </dl>
          </div>

          {/* Highlights */}
          {highlights.length ? (
            <div className="rounded-2xl border border-zinc-200 p-5">
              <h2 className="mb-3 text-sm font-medium text-zinc-900">
                Highlights
              </h2>
              <ul className="list-inside list-disc text-sm text-zinc-700">
                {highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Contact card */}
          <div className="rounded-2xl border border-zinc-200 p-5">
            <h2 className="mb-2 text-sm font-medium text-zinc-900">
              Interested?
            </h2>
            <p className="text-sm text-zinc-700">
              Want a private showing or more info?
            </p>
            <a
              href="/contact"
              className="mt-3 inline-block w-full rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white"
            >
              Contact sales
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
