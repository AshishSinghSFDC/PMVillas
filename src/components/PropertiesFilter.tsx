"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { useCallback, useMemo } from "react";

type Props = {
  areas: string[];
  defaults?: {
    q?: string;
    status?: string;
    area?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
    sort?: string;
  };
};

export default function PropertiesFilter({ areas, defaults }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const current = useMemo(() => {
    const get = (k: string) =>
      sp.get(k) ?? defaults?.[k as keyof NonNullable<Props["defaults"]>] ?? "";
    return {
      q: get("q"),
      status: get("status"),
      area: get("area"),
      minPrice: get("minPrice"),
      maxPrice: get("maxPrice"),
      beds: get("beds"),
      baths: get("baths"),
      sort: get("sort") || "newest",
    };
  }, [sp, defaults]);

  // Typed base route for this filter (component is used on /properties)
  const BASE_ROUTE: Route = "/properties";

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(sp.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      // Reset to first page if pagination is added later
      next.delete("page");

      // With typedRoutes on, give router.replace a typed URL
      router.replace(
        `${BASE_ROUTE}?${next.toString()}` as `${Route}?${string}`
      );
    },
    [router, pathname, sp]
  );

  const clearAll = () => {
    router.replace(BASE_ROUTE);
  };

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        <input
          type="text"
          placeholder="Search by name or location"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.q}
          onBlur={(e) => update("q", e.target.value.trim())}
        />

        <select
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.status}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="For Sale">For Sale</option>
          <option value="Pending">Pending</option>
          <option value="Sold">Sold</option>
        </select>

        <select
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.area}
          onChange={(e) => update("area", e.target.value)}
        >
          <option value="">All areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={0}
          placeholder="Min price"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.minPrice}
          onBlur={(e) => update("minPrice", e.target.value)}
        />

        <input
          type="number"
          min={0}
          placeholder="Max price"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.maxPrice}
          onBlur={(e) => update("maxPrice", e.target.value)}
        />

        <select
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.beds}
          onChange={(e) => update("beds", e.target.value)}
        >
          <option value="">Any beds</option>
          <option value="1">1+ bed</option>
          <option value="2">2+ beds</option>
          <option value="3">3+ beds</option>
          <option value="4">4+ beds</option>
        </select>

        <select
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.baths}
          onChange={(e) => update("baths", e.target.value)}
        >
          <option value="">Any baths</option>
          <option value="1">1+ bath</option>
          <option value="2">2+ baths</option>
          <option value="3">3+ baths</option>
          <option value="4">4+ baths</option>
        </select>

        <select
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          defaultValue={current.sort}
          onChange={(e) => update("sort", e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="area_desc">Area: Large to Small</option>
        </select>

        <button
          type="button"
          onClick={clearAll}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-50"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
