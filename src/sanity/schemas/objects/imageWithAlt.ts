import { defineType } from "sanity";

export default defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for accessibility & SEO",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
});
