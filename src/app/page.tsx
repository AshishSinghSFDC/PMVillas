import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="container py-12">
      <h1 className="h-serif text-4xl md:text-5xl">
        Curated Luxury Villas & Residences
      </h1>
      <p className="mt-4 max-w-2xl opacity-80">
        Discover hand-picked properties with stunning views, refined interiors,
        and prime locations.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button className="bg-charcoal text-ivory hover:bg-gold hover:text-charcoal transition">
          Browse Properties
        </Button>
        <span className="inline-flex items-center gap-1 text-sm opacity-80">
          <MapPin size={16} /> Icons OK
        </span>
      </div>
    </main>
  );
}
