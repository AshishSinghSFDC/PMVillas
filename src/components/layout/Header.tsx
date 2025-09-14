"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Route } from "next";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="PM VILLAS Home"
      className="inline-flex items-center gap-2 rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
    >
      <Image src="/logo.png" alt="PM VILLAS" width={36} height={36} />
      <span className="text-sm font-semibold tracking-wide text-[#D9B58B]">
        PM VILLAS
      </span>
    </Link>
  );
}

// Menu (Home is via Logo)
const NAV = [
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const satisfies ReadonlyArray<{ name: string; href: Route }>;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition ${
        isScrolled
          ? "backdrop-blur bg-white/70 border-b border-neutral-200"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 ${
                  active ? "text-neutral-900" : "text-neutral-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-200">
          <nav className="px-4 py-3">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
              >
                Enquire
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
