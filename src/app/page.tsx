import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold">Hello</h1>
      <div className="mt-6 flex items-center gap-3">
        <Button>Primary Button</Button>
        <span className="inline-flex items-center gap-1 text-sm opacity-80">
          <MapPin size={16} /> Icons OK
        </span>
      </div>
    </main>
  );
}
