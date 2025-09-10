import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="container pt-14 pb-10">
        <h1 className="h-serif text-4xl md:text-5xl leading-tight">
          Curated Luxury Villas & Residences
        </h1>
        <p className="mt-4 max-w-2xl opacity-80">
          Discover hand-picked properties with stunning views, refined
          interiors, and prime locations.
        </p>
        <div className="mt-8">
          <Button
            asChild
            className="bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition"
          >
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
