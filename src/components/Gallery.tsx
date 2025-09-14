"use client";

import Image from "next/image";
import { toImageSrc } from "../sanity/lib/image";

export default function Gallery({ images }: { images: Array<string | any> }) {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {images.map((img, i) => {
        const src = toImageSrc(img, 1200, 900);
        if (!src) return null;
        return (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={
                typeof img === "string"
                  ? `Gallery image ${i + 1}`
                  : img?.alt || `Gallery image ${i + 1}`
              }
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
