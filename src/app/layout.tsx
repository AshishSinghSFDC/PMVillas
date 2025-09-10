import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pm-estates.example"), // change after deploy
  title: {
    default: "PM Estates – Luxury Property Listings",
    template: "%s | PM Estates",
  },
  description:
    "Curated luxury villas & residences with refined interiors and prime locations.",
  openGraph: {
    type: "website",
    siteName: "PM Estates",
    url: "https://pm-estates.example",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ivory text-charcoal antialiased">{children}</body>
    </html>
  );
}
