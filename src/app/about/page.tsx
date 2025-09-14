import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — PM VILLAS",
  description:
    "PM VILLAS curates luxury villas and estates with a focus on quality, location, and design.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          About PM VILLAS
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          We curate exceptional villas and estates across sought-after
          destinations. Our team evaluates each property for build quality,
          design, and long-term value so you can buy with confidence.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-medium text-neutral-900">Our ethos</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Discerning selection over volume. We highlight only the homes that
            meet high standards for architecture, location, and lifestyle.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-medium text-neutral-900">
            How we work
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Transparent details, high-quality imagery, and responsive guidance.
            From viewing to closing, we keep the process simple and clear.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-medium text-neutral-900">
            Get in touch
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            Have a specific brief or want private showings?{" "}
            <a
              href="/contact"
              className="font-medium text-neutral-900 underline underline-offset-4 hover:opacity-80"
            >
              Contact us
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
