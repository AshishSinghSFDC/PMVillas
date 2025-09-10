import type { DefaultSeoProps } from "next-seo";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | PM Estates",
  defaultTitle: "PM Estates – Luxury Property Listings",
  description:
    "Curated luxury villas & residences with refined interiors and prime locations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pm-estates.example", // replace later
    siteName: "PM Estates",
  },
  twitter: { cardType: "summary_large_image" },
};
