// components/sections/Hero.tsx
"use client";

import SearchBar from "@/components/sections/SearchBar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 70% 0%, rgba(0,0,0,0.08), rgba(0,0,0,0) 60%), linear-gradient(180deg, #fafafa 0%, #ffffff 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Curated Luxury Listings
          </div>

          <h1 className="mt-6 text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">
            Find your next
            <span className="block text-neutral-700">statement address.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-600">
            Boutique homes, iconic views, white-glove guidance. Explore
            handpicked villas & estates that blend design, privacy, and
            location.
          </p>

          <div className="mt-8 sm:mt-10">
            <SearchBar />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
            <span>Transparent pricing</span>
            <span>•</span>
            <span>Verified photos & floor plans</span>
            <span>•</span>
            <span>Local experts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
