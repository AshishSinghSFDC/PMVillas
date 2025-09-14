import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    slug: "porta-fortuna-zen-casita-x11",
    title: "Porta Fortuna – Zen Casita X11",
    tagline: "Ocean-view luxury casita with private plunge pool",
    status: "For Sale",
    price: 3250000,
    currency: "USD",
    location: { area: "Punta Mita", country: "Mexico" },
    bedrooms: 3,
    bathrooms: 3.5,
    areaSqFt: 2800,
    lotSqFt: 0,
    heroImage: "/images/properties/porta-fortuna-zen-casita-x11/hero.jpg",
    gallery: [
      "/images/properties/porta-fortuna-zen-casita-x11/1.jpg",
      "/images/properties/porta-fortuna-zen-casita-x11/2.jpg",
      "/images/properties/porta-fortuna-zen-casita-x11/3.jpg",
      "/images/properties/porta-fortuna-zen-casita-x11/4.jpg",
    ],
    highlights: [
      "Expansive ocean views",
      "Private plunge pool & terrace",
      "Gated community with beach clubs",
      "Turn-key, designer-finished interiors",
    ],
    description:
      "A serene, design-forward casita in Porta Fortuna with panoramic ocean views, seamless indoor-outdoor living, and premium community amenities. Perfect for refined coastal living or a vacation rental with strong returns.",
    amenities: [
      "Ocean View",
      "Pool",
      "Gated Community",
      "Chef’s Kitchen",
      "Daily Security",
    ],
    updatedAt: "2025-09-10T12:00:00.000Z",
    seo: {
      description:
        "Luxury ocean-view casita in Porta Fortuna, Punta Mita. 3BR, 3.5BA, private plunge pool, designer finishes, beach club access.",
    },
  },
  {
    slug: "marina-bay-villa-a2",
    title: "Marina Bay Villa A2",
    tagline: "Yacht-side residence with sunset deck",
    status: "For Sale",
    price: 2180000,
    currency: "USD",
    location: { area: "Punta Mita", country: "Mexico" },
    bedrooms: 2,
    bathrooms: 2,
    areaSqFt: 1800,
    heroImage: "/images/properties/marina-bay-villa-a2/hero.jpg",
    gallery: [
      "/images/properties/marina-bay-villa-a2/1.jpg",
      "/images/properties/marina-bay-villa-a2/2.jpg",
      "/images/properties/marina-bay-villa-a2/3.jpg",
    ],
    highlights: ["Marina frontage", "Sunset deck", "Smart-home ready"],
    description:
      "A contemporary villa steps from the marina, featuring floor-to-ceiling glass, high-end appliances, and a wrap-around sunset deck.",
    amenities: ["Marina Access", "Smart Home", "Concierge"],
    updatedAt: "2025-09-10T15:30:00.000Z",
    seo: {
      description:
        "Modern marina-front villa with sunset deck and premium finishes.",
    },
  },
];
