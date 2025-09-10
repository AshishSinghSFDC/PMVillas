import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  location: string;
  price: string;
  image?: string; // public path or remote (we’ll add remote config later)
};

export default function PropertyCard({ title, location, price, image }: Props) {
  return (
    <Card className="overflow-hidden rounded-2xl">
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
  );
}
