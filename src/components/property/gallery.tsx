import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function Gallery({ images }: { images?: SanityImageSource[] }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((img, i) => {
        const src = urlFor(img).width(1200).height(900).fit("crop").url();
        return (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          </div>
        );
      })}
    </div>
  );
}
