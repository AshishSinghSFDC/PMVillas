// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="PM VILLAS Home"
      className="
        inline-flex items-center gap-2 rounded-lg px-2 py-1
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[#D9B58B]/40
        focus-visible:ring-offset-2 focus-visible:ring-offset-white
      "
    >
      <Image
        src="/logo.png"
        alt="PM VILLAS logo"
        width={28}
        height={28}
        className="h-7 w-7 rounded-xl border border-neutral-300 object-cover"
        priority
      />
      <span className="text-sm font-semibold tracking-wide text-[#D9B58B]">
        PM VILLAS
      </span>
    </Link>
  );
}

// 3-item menu; Home via logo
const NAV = [
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

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

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition ${
        isScrolled
          ? "backdrop-blur bg-white/70 border-b border-neutral-200"
          : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm transition hover:bg-neutral-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300
                  ${active ? "font-medium" : "text-neutral-600"}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Single CTA: Enquire */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 hover:bg-neutral-100
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-neutral-200 transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-4 py-3">
          <div className="flex flex-col">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm transition hover:bg-neutral-100
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300
                    ${active ? "font-medium" : "text-neutral-700"}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-3">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2"
            >
              Enquire
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
