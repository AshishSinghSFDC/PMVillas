import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ACCENT = "#D9B58B";

const LINKS = [
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const satisfies ReadonlyArray<{ name: string; href: Route }>;

const CONTACT = {
  phoneDisplay: "+1 847-340-0338",
  phoneHref: "tel:+18473400338",
  emailDisplay: "andrew.kubicek@pmvillas.com",
  emailHref: "mailto:andrew.kubicek@pmvillas.com",
  addressDisplay: "Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734",
  mapsHref:
    "https://maps.google.com/?q=Lagos+Del+Mar+26,+Punta+de+Mita,+Nayarit,+Mexico+63734",
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-neutral-50">
      {/* luxe hairline */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--accent) 20%, var(--accent) 80%, rgba(0,0,0,0) 100%)",
          ["--accent" as any]: ACCENT,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* 4 even columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* (1) PM VILLAS */}
          <section className="md:col-span-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="PM VILLAS"
                width={44}
                height={44}
                className="rounded-xl"
                priority
              />
              <div className="leading-tight">
                <p
                  className="text-lg font-semibold tracking-wide"
                  style={{ color: ACCENT }}
                >
                  PM VILLAS
                </p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Estates &amp; Residences
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-[15px] leading-7 text-neutral-700">
              We curate exceptional villas in the most sought-after locations —
              with a focus on craftsmanship, design integrity, and effortless
              living.
            </p>
          </section>

          {/* (2) Explore */}
          <section className="md:col-span-3">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Explore
            </h2>
            <ul className="space-y-2 text-[15px]">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 rounded-lg px-1 py-1 text-neutral-700 transition hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                  >
                    <span className="h-px w-5 shrink-0 bg-neutral-300 transition group-hover:bg-neutral-900" />
                    <span>{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* (3) Contact — no card, no border */}
          <section className="md:col-span-3">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Contact
            </h2>

            <ul className="space-y-3 text-[15px] text-neutral-700">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group inline-flex items-center gap-3 hover:text-neutral-900"
                >
                  <FiPhone className="h-[18px] w-[18px] text-neutral-400 transition group-hover:text-neutral-800" />
                  <span className="font-medium">{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li className="break-words">
                <a
                  href={CONTACT.emailHref}
                  className="group inline-flex items-center gap-3 hover:text-neutral-900"
                >
                  <FiMail className="h-[18px] w-[18px] text-neutral-400 transition group-hover:text-neutral-800" />
                  <span className="font-medium">{CONTACT.emailDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-3 hover:text-neutral-900"
                >
                  <FiMapPin className="mt-0.5 h-[18px] w-[18px] text-neutral-400 transition group-hover:text-neutral-800" />
                  <span className="font-medium">{CONTACT.addressDisplay}</span>
                </a>
              </li>
            </ul>
          </section>

          {/* (4) Follow Us On */}
          <section className="md:col-span-3">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Follow Us On
            </h2>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/pm.villas"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                title="@pm.villas"
              >
                <SiInstagram className="h-5 w-5" style={{ color: "#E4405F" }} />
              </a>
              <a
                href="https://www.linkedin.com/company/pm-villas/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                title="PM VILLAS on LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" style={{ color: "#0A66C2" }} />
              </a>
            </div>

            <p className="mt-4 text-[13px] leading-6 text-neutral-500">
              Join us for new listings, market notes, and design insights.
            </p>
          </section>
        </div>

        {/* divider + bottom bar */}
        <div className="mt-14 h-px w-full bg-neutral-200" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[12px] text-neutral-500 sm:flex-row">
          <p>
            © <span suppressHydrationWarning>{year}</span> PM VILLAS. All
            rights reserved.
          </p>
          <p className="text-neutral-500">
            Crafted with{" "}
            <span aria-hidden style={{ color: ACCENT }}>
              ◆
            </span>{" "}
            for prime living.
          </p>
        </div>
      </div>
    </footer>
  );
}
