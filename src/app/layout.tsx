// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PM VILLAS — Luxury Villas & Estates",
  description:
    "Curated luxury villas & estates. Handpicked listings, white-glove guidance, and a seamless viewing experience.",
  metadataBase: new URL("https://pmvillas.com"),
  openGraph: {
    title: "PM VILLAS — Luxury Villas & Estates",
    description:
      "Curated luxury villas & estates. Handpicked listings, white-glove guidance, and a seamless viewing experience.",
    type: "website",
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0a0a0a" },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning prevents noisy dev warnings caused by extensions adding attributes (e.g., data-*).
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased font-sans">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
