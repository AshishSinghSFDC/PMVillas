// src/sanity/image.ts
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

// Accept SanityImageSource instead of `any`
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
