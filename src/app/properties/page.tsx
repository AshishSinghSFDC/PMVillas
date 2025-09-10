import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PropertyCard from "@/components/property-card";

const mock = [
  {
    title: "Porta Fortuna – Zen Casita X11",
    location: "Punta Mita, MX",
    price: "$2,950,000",
  },
  { title: "Oceanview Casa Aurora", location: "Goa, IN", price: "₹8.9 Cr" },
  {
    title: "Sierra Mar Estate",
    location: "Los Cabos, MX",
    price: "$3,600,000",
  },
  { title: "Palm Grove Residence", location: "Alibaug, IN", price: "₹5.2 Cr" },
];

export default function PropertiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="container pt-12 pb-20">
        <h1 className="h-serif text-3xl md:text-4xl mb-8">
          Featured Properties
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mock.map((p) => (
            <PropertyCard key={p.title} {...p} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
