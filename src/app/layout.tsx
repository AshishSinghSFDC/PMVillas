import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://pmvillas.vercel.app"),
  title: {
    default: "PM Villas – Luxury Property Listings",
    template: "%s | PM Villas",
  },
  description:
    "Curated luxury villas & residences with refined interiors and prime locations.",
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
