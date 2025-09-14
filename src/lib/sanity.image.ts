// lib/sanity.image.ts
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

export function urlFor(source: any) {
  try {
    return createImageUrlBuilder(client).image(source);
  } catch {
    return null as any;
  }
}
