import { defineField, defineType } from "sanity";
import {
  House,
  MapPin,
  Image as ImageIcon,
  Settings2,
  Globe,
} from "lucide-react"; // icons show in Studio if using icon prop

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: House as any,
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "media", title: "Media" },
    { name: "specs", title: "Specs" },
    { name: "location", title: "Location" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    // OVERVIEW
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "overview",
      validation: (r) => r.required().min(6),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "overview",
      options: {
        list: [
          { title: "For Sale", value: "for-sale" },
          { title: "Pending", value: "pending" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "for-sale",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      group: "overview",
      description: "Show on homepage featured carousel/section",
    }),
    defineField({
      name: "highlightTags",
      title: "Highlight Tags",
      type: "array",
      group: "overview",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "New", value: "New" },
          { title: "Beachfront", value: "Beachfront" },
          { title: "Ocean View", value: "Ocean View" },
          { title: "Golf", value: "Golf" },
          { title: "Gated", value: "Gated" },
          { title: "Price Reduced", value: "Price Reduced" },
        ],
        layout: "tags",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
      group: "overview",
    }),

    // MEDIA
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "imageWithAlt",
      group: "media",
      icon: ImageIcon as any,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      group: "media",
      description: "YouTube/Vimeo link",
    }),
    defineField({
      name: "tourUrl",
      title: "3D / Matterport URL",
      type: "url",
      group: "media",
    }),
    defineField({
      name: "floorplans",
      title: "Floorplans",
      type: "array",
      group: "media",
      of: [{ type: "file" }],
    }),

    // SPECS / PRICING
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      group: "specs",
      options: {
        list: [
          { title: "USD", value: "USD" },
          { title: "INR", value: "INR" },
          { title: "MXN", value: "MXN" },
          { title: "EUR", value: "EUR" },
        ],
      },
      initialValue: "USD",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "specs",
      description: "Numeric price for sorting/filters",
    }),
    defineField({
      name: "displayPrice",
      title: "Display Price",
      type: "string",
      group: "specs",
      description:
        "Optional: e.g. “Price on Request”, overrides numeric price in UI",
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      group: "specs",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      group: "specs",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "areaSqft",
      title: "Area (sq ft)",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "lotSizeSqft",
      title: "Lot Size (sq ft)",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      group: "specs",
      options: {
        list: [
          { title: "Villa", value: "villa" },
          { title: "House", value: "house" },
          { title: "Apartment", value: "apartment" },
          { title: "Penthouse", value: "penthouse" },
          { title: "Plot/Land", value: "land" },
        ],
      },
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "hoaFees",
      title: "HOA / Maintenance Fees",
      type: "number",
      group: "specs",
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      group: "specs",
      of: [{ type: "string" }],
      options: {
        list: [
          "Infinity Pool",
          "Private Beach",
          "Gym",
          "Spa",
          "Home Theatre",
          "Smart Home",
          "Solar",
          "Parking",
          "Furnished",
          "Staff Quarters",
          "Security",
        ].map((x) => ({ title: x, value: x })),
        layout: "tags",
      },
    }),

    // LOCATION
    defineField({
      name: "addressLine1",
      title: "Address Line 1",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "addressLine2",
      title: "Address Line 2",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "state",
      title: "State/Region",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "postalCode",
      title: "Postal Code",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      group: "location",
      icon: Globe as any,
    }),
    defineField({
      name: "location",
      title: "Map (Lat/Lng)",
      type: "geopoint",
      group: "location",
      icon: MapPin as any,
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "url",
      group: "location",
      description: "Optional: shareable map link",
    }),

    // SEO
    defineField({
      name: "seoTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "seoImage",
      title: "OpenGraph Image",
      type: "imageWithAlt",
      group: "seo",
    }),
  ],

  orderings: [
    {
      title: "Price (High → Low)",
      name: "priceDesc",
      by: [{ field: "price", direction: "desc" }],
    },
    {
      title: "Price (Low → High)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "heroImage",
      city: "city",
      country: "country",
      price: "price",
      currency: "currency",
      status: "status",
    },
    prepare({ title, media, city, country, price, currency, status }) {
      const loc = [city, country].filter(Boolean).join(", ");
      const priceStr =
        typeof price === "number"
          ? `${currency || ""} ${price.toLocaleString()}`
          : "";
      const subtitle = [
        loc,
        priceStr,
        status && String(status).replace("-", " "),
      ]
        .filter(Boolean)
        .join(" • ");
      return { title, media, subtitle };
    },
  },
});
