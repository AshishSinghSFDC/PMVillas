// components/sections/CTABand.tsx
export default function CTABand() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Ready to tour a property?
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Share what you’re looking for—we’ll shortlist homes and arrange
                a private viewing.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Contact an Advisor
              </a>
              <a
                href="/properties"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-2.5 text-sm hover:bg-neutral-100"
              >
                Browse Listings
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
