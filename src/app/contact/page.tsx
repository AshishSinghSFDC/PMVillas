import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-12">
        <h1 className="h-serif text-3xl md:text-4xl">Contact</h1>
        <p className="mt-4 opacity-80">Lead form coming soon...</p>
      </main>
      <SiteFooter />
    </>
  );
}
