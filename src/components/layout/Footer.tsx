import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { SiInstagram, SiLinkedin } from "react-icons/si";

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
    <footer className="relative mt-8 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* subtle gold accent inside container */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--accent) 25%, var(--accent) 75%, transparent 100%)",
            ["--accent" as any]: ACCENT,
          }}
        />

        <div className="py-6 md:py-7">
          {/* 12-col grid -> 5/2/3/2 distribution for perfect balance */}
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-8 lg:gap-x-10">
            {/* (1) PM VILLAS — wider column, continuous paragraph */}
            <section className="md:col-span-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="PM VILLAS"
                  width={30}
                  height={30}
                  className="rounded-md"
                />
                <div className="leading-tight">
                  <p
                    className="text-sm font-semibold tracking-wide"
                    style={{ color: ACCENT }}
                  >
                    PM VILLAS
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    Estates &amp; Residences
                  </p>
                </div>
              </div>

              {/* full-width paragraph stretches to the column edge */}
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                We curate exceptional villas in sought-after locations with a
                focus on craftsmanship, design integrity and effortless living,
                delivering a refined end-to-end buying experience.
              </p>
            </section>

            {/* (2) Explore */}
            <section className="md:col-span-2">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Explore
              </h2>
              <ul className="space-y-2 text-sm text-neutral-700">
                {LINKS.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center rounded px-1 py-1 transition hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* (3) Contact */}
            <section className="md:col-span-3">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Contact
              </h2>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="group inline-flex items-center gap-2 hover:text-neutral-900"
                  >
                    <FiPhone className="h-4 w-4 text-neutral-400 transition group-hover:text-neutral-800" />
                    <span>{CONTACT.phoneDisplay}</span>
                  </a>
                </li>
                <li className="break-words">
                  <a
                    href={CONTACT.emailHref}
                    className="group inline-flex items-center gap-2 hover:text-neutral-900"
                  >
                    <FiMail className="h-4 w-4 text-neutral-400 transition group-hover:text-neutral-800" />
                    <span>{CONTACT.emailDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-start gap-2 hover:text-neutral-900"
                  >
                    <FiMapPin className="mt-0.5 h-4 w-4 text-neutral-400 transition group-hover:text-neutral-800" />
                    <span>{CONTACT.addressDisplay}</span>
                  </a>
                </li>
              </ul>
            </section>

            {/* (4) Follow Us On */}
            <section className="md:col-span-2">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Follow Us On
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/pm.villas"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="@pm.villas"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                >
                  <SiInstagram
                    className="h-4 w-4"
                    style={{ color: "#E4405F" }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/pm-villas/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="PM VILLAS on LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                >
                  <SiLinkedin
                    className="h-4 w-4"
                    style={{ color: "#0A66C2" }}
                  />
                </a>
              </div>
            </section>
          </div>

          {/* compact bottom bar */}
          <div className="mt-6 border-t border-neutral-200 pt-3">
            <div className="flex flex-col items-start justify-between gap-1.5 text-xs text-neutral-500 sm:flex-row">
              <p>
                © <span suppressHydrationWarning>{year}</span> PM VILLAS. All
                rights reserved.
              </p>
              <p>
                Crafted with{" "}
                <span aria-hidden style={{ color: ACCENT }}>
                  ◆
                </span>{" "}
                for prime living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
