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

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> =
    await sanityClient.fetch(PROPERTY_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const prop = await sanityClient.fetch<Property>(
    PROPERTY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate } }
  );
  if (!prop) return {};
  const price =
    prop.price && prop.currency
      ? formatPrice(prop.price, prop.currency)
      : undefined;
  const title = price ? `${prop.title} | ${price}` : prop.title;
  const description =
    prop.seo?.description ||
    (typeof prop.description === "string" ? prop.description : prop.tagline) ||
    prop.title;
  const ogImage = toImageSrc(prop.heroImage, 1200, 630);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

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

  const price =
    prop.price && prop.currency
      ? formatPrice(prop.price, prop.currency)
      : undefined;
  const hero = toImageSrc(prop.heroImage, 1920, 1080);
  const highlights: string[] = prop.highlights ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            {prop.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600">{prop.tagline}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-700">
            <span className="rounded-full bg-zinc-100 px-3 py-1">
              {prop.status}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1">
              {prop.bedrooms ? `${prop.bedrooms} bd` : ""}
              {prop.bedrooms && prop.bathrooms ? " • " : ""}
              {prop.bathrooms ? `${prop.bathrooms} ba` : ""}
            </span>
            {prop.areaSqFt ? (
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                {formatAreaSqFt(prop.areaSqFt)}
              </span>
            ) : null}
            {prop.location?.area ? (
              <span className="rounded-full bg-zinc-100 px-3 py-1">
                📍 {prop.location.area}
              </span>
            ) : null}
          </div>
        </div>

        <div className="text-right">
          {price ? (
            <div className="text-2xl font-semibold text-zinc-900 md:text-3xl">
              {price}
            </div>
          ) : null}
          <a
            href="/contact"
            className="mt-3 inline-block rounded-xl border border-zinc-200 bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Request details
          </a>
        </div>
      </div>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl md:mb-10">
        {hero ? (
          <Image
            src={hero}
            alt={
              typeof prop.heroImage === "string"
                ? prop.title
                : (prop.heroImage as any)?.alt || prop.title
            }
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          {/* Description — handle Portable Text OR plain string */}
          {Array.isArray(prop.description) ? (
            <PT value={prop.description as any[]} />
          ) : prop.description ? (
            <p className="text-base leading-7 text-zinc-700">
              {prop.description}
            </p>
          ) : null}

          {highlights.length ? (
            <ul className="mt-6 grid list-disc gap-2 pl-5 text-zinc-700">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10">
            <h2 className="mb-3 text-lg font-semibold text-zinc-900">
              Gallery
            </h2>
            <Gallery images={prop.gallery} />
          </div>
        </div>

        <aside className="space-y-6 rounded-2xl border border-zinc-200 p-5">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">
              At a glance
            </h3>
            <dl className="grid grid-cols-2 gap-3 text-sm text-zinc-700">
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
                  <dt className="text-zinc-500">Interior</dt>
                  <dd>{formatAreaSqFt(prop.areaSqFt)}</dd>
                </>
              ) : null}
              {prop.lotSqFt ? (
                <>
                  <dt className="text-zinc-500">Lot</dt>
                  <dd>{prop.lotSqFt.toLocaleString()} sq ft</dd>
                </>
              ) : null}
              {prop.amenities?.length ? (
                <>
                  <dt className="text-zinc-500">Amenities</dt>
                  <dd className="col-span-1 col-start-2">
                    {prop.amenities.slice(0, 6).join(" • ")}
                  </dd>
                </>
              ) : null}
            </dl>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
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
