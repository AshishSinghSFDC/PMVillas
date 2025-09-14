import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — PM VILLAS",
  description:
    "Get in touch with PM VILLAS. Call, email, or find us in Punta de Mita, Mexico.",
};

const CONTACT = {
  phoneDisplay: "+1 847-340-0338",
  phoneHref: "tel:+18473400338",
  emailDisplay: "andrew.kubicek@pmvillas.com",
  emailHref: "mailto:andrew.kubicek@pmvillas.com",
  addressDisplay: "Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734",
  mapsHref:
    "https://maps.google.com/?q=Lagos+Del+Mar+26,+Punta+de+Mita,+Nayarit,+Mexico+63734",
} as const;

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Contact PM VILLAS
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          We’re here to help—reach out for property showings, availability, or
          local expertise in Punta Mita.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-medium text-neutral-900">Call</h2>
          <p className="mt-2 text-sm text-neutral-700">
            <a
              href={CONTACT.phoneHref}
              className="font-medium underline-offset-4 hover:underline"
            >
              {CONTACT.phoneDisplay}
            </a>
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-medium text-neutral-900">Email</h2>
          <p className="mt-2 text-sm text-neutral-700">
            <a
              href={CONTACT.emailHref}
              className="font-medium underline-offset-4 hover:underline"
            >
              {CONTACT.emailDisplay}
            </a>
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-medium text-neutral-900">Visit</h2>
          <p className="mt-2 text-sm text-neutral-700">
            <a
              href={CONTACT.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline-offset-4 hover:underline"
            >
              {CONTACT.addressDisplay}
            </a>
          </p>
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-medium text-neutral-900">
          Prefer messaging?
        </h2>
        <p className="mt-2 text-sm text-neutral-700">
          Send us an email and we’ll get back promptly:{" "}
          <a
            href={CONTACT.emailHref}
            className="font-medium underline-offset-4 hover:underline"
          >
            {CONTACT.emailDisplay}
          </a>
          .
        </p>
        <div className="mt-4">
          <Link
            href="/properties"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
          >
            Browse properties
          </Link>
        </div>
      </div>
    </main>
  );
}
