import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-ivory/90 backdrop-blur">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="h-serif text-2xl tracking-wide">
          PM Estates
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/properties" className="hover:text-gold">
            Properties
          </Link>
          <Link href="/contact" className="hover:text-gold">
            Contact
          </Link>
        </nav>

        {/* mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="mt-10 grid gap-4 text-base">
                <Link href="/properties" className="hover:text-gold">
                  Properties
                </Link>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
