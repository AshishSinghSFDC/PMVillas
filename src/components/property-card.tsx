import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  slug: string;
  title: string;
  location: string;
  price: string;
  image?: string; // public path or remote
};

export default function PropertyCard({
  slug,
  title,
  location,
  price,
  image,
}: Props) {
  return (
    <Link href={`/properties/${slug}`} className="block">
      <Card className="overflow-hidden rounded-2xl hover:shadow-lg transition">
        <div className="relative aspect-[4/3]">
          <Image
            src={image || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={false}
          />
        </div>
        <CardContent className="p-4">
          <div className="h-serif text-lg">{title}</div>
          <div className="text-sm opacity-80">{location}</div>
          <div className="mt-2 font-medium text-gold">{price}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
