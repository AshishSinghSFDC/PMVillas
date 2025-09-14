// app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import ValueProps from "@/components/sections/ValueProps";
import CTABand from "@/components/sections/CTABand";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "PM Villas — Luxury Villas & Estates",
  description:
    "Discover curated luxury villas and estates. Handpicked listings, expert guidance, and seamless viewing experience.",
};

export default async function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ValueProps />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Featured Properties
          </h2>
          <a
            href="/properties"
            className="text-sm underline underline-offset-4 hover:opacity-80"
          >
            View all
          </a>
        </div>

        <div className="mt-8">
          <FeaturedProperties />
        </div>
      </section>

      <CTABand />
    </main>
  );
}
