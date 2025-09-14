// components/sections/SearchBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [beds, setBeds] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q.trim());
    if (min) params.set("minPrice", min.trim());
    if (max) params.set("maxPrice", max.trim());
    if (beds) params.set("beds", beds.trim());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl border border-neutral-200 bg-white/80 p-3 sm:p-4 backdrop-blur supports-[backdrop-filter]:bg-white/70"
    >
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {/* Keyword / Location */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-neutral-500">
            Location / Keyword
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Punta Mita, oceanfront, golf…"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="mb-1 block text-xs text-neutral-500">
            Min Price
          </label>
          <input
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="₹"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="mb-1 block text-xs text-neutral-500">
            Max Price
          </label>
          <input
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="₹"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>

        {/* Beds */}
        <div>
          <label className="mb-1 block text-xs text-neutral-500">Beds</label>
          <input
            inputMode="numeric"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            placeholder="3+"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-800"
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 active:translate-y-[1px] transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
