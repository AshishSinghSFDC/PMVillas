import { defineField, defineType } from "sanity";

export default defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["For Sale", "Pending", "Sold"] },
      initialValue: "For Sale",
    }),
    defineField({ name: "price", type: "number" }),
    defineField({
      name: "currency",
      type: "string",
      options: { list: ["USD", "EUR", "INR", "MXN"] },
      initialValue: "USD",
    }),
    defineField({
      name: "location",
      type: "object",
      fields: [
        { name: "area", type: "string" },
        { name: "city", type: "string" },
        { name: "state", type: "string" },
        { name: "country", type: "string" },
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
      ],
    }),
    defineField({ name: "bedrooms", type: "number" }),
    defineField({ name: "bathrooms", type: "number" }),
    defineField({
      name: "areaSqFt",
      type: "number",
      title: "Interior Area (sq ft)",
    }),
    defineField({ name: "lotSqFt", type: "number", title: "Lot (sq ft)" }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({ name: "amenities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "updatedAt", type: "datetime" }),
    defineField({
      name: "seo",
      type: "object",
      fields: [{ name: "description", type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "heroImage", subtitle: "status" },
  },
});
