// components/PropertyCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";

// Local formatting for the cards (₹ with Indian grouping)
function formatPrice(n?: number | null) {
  if (n === undefined || n === null) return "";
  try {
    return n.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  } catch {
    return `₹${n}`;
  }
}

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

export default function PropertyCard({
  property,
  imageUrl,
}: {
  property: Property;
  imageUrl?: string;
}) {
  const specs: string[] = [];
  if (property.bedrooms) specs.push(`${property.bedrooms} bed`);
  if (property.bathrooms) specs.push(`${property.bathrooms} bath`);
  if (property.areaSqFt) specs.push(`${property.areaSqFt} sqft`);

  const locationText = getLocationLabel(property);
  const imgSrc = imageUrl || (property as any)?.heroUrl || undefined;

  // Concrete string href for App Router + typed as `/properties/${string}` for typedRoutes.
  const href = `/properties/${property.slug}` as `/properties/${string}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-md focus:outline-none"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-neutral-400">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-medium text-neutral-900">
            {property.title}
          </h3>

          {property.price ? (
            <span className="shrink-0 rounded-lg bg-neutral-900 px-2 py-1 text-xs font-medium text-white">
              {formatPrice(property.price)}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          {locationText && <span>{locationText}</span>}
          {specs.length ? <span>•</span> : null}
          {specs.length ? <span>{specs.join(" • ")}</span> : null}
        </div>
      </div>
    </Link>
  );
}
