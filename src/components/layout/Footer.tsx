// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { SiInstagram, SiLinkedin } from "react-icons/si";

const LINKS = [
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/60 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="PM VILLAS logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-xl border border-neutral-300 object-cover"
              />
              <span className="text-base font-semibold tracking-wide text-[#D9B58B]">
                PM VILLAS
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Boutique luxury real-estate specialists helping you discover
              statement homes with transparent guidance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    className="hover:underline underline-offset-4"
                    href={l.href}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>Lagos Del Mar 26, Punta de Mita, Nayarit, Mexico 63734</li>
              <li>
                <a
                  className="hover:underline underline-offset-4"
                  href="tel:+18473400338"
                >
                  +1 847-340-0338
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4"
                  href="mailto:andrew.kubicek@pmvillas.com"
                >
                  andrew.kubicek@pmvillas.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Follow</h4>
            <div className="mt-3 flex gap-3">
              <a
                aria-label="Instagram — PM VILLAS"
                title="Instagram — PM VILLAS"
                href="https://www.instagram.com/pm.villas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E4405F] text-white hover:opacity-90 transition"
              >
                <SiInstagram size={18} />
              </a>
              <a
                aria-label="LinkedIn — PM VILLAS"
                title="LinkedIn — PM VILLAS"
                href="https://www.linkedin.com/company/pm-villas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition"
              >
                <SiLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
          <p>
            © <span suppressHydrationWarning>{year}</span> PM VILLAS. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
