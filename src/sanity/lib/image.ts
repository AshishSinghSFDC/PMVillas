import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "./client";

const builder = imageUrlBuilder({
  projectId: sanityClient.config().projectId!,
  dataset: sanityClient.config().dataset!,
});

export function urlForImage(source: any) {
  return builder.image(source);
}

export function toImageSrc(imgOrPath: string | any, w = 1600, h?: number) {
  if (typeof imgOrPath === "string") return imgOrPath;
  try {
    const b = urlForImage(imgOrPath).width(w);
    return (h ? b.height(h) : b).url();
  } catch {
    return "";
  }
}
