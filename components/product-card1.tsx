import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

export interface Product {
  id?: string | number;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  description: string;
  price: ProductPrice;
  badge?: {
    text: string;
    backgroundColor?: string;
  };
  cuisine: string;
  dietary_tags: string[];
  preparation_time: number;
  restaurant?: string;
}

interface ProductCard1Props {
  className?: string;
  product: Product;
}

const ProductCard1 = ({ className, product }: ProductCard1Props) => {
  const { regular, sale, currency } = product.price;
  // console.log(product)
  return (
    <div
      className={cn(
        "block max-w-md transition-opacity hover:opacity-80 w-full",
        className,
      )}
    >
      <Card className="h-full overflow-hidden p-0">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
          {product.badge && (
            <Badge
              style={{
                background: product.badge.backgroundColor,
              }}
              className="absolute start-4 top-4"
            >
              {product.badge.text}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">
            {product.name}
          </CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            {product.description}
          </CardDescription>
          <div className="mt-auto">
            <p>
              <span className="font-bold">Restaurant: </span>
              {product.restaurant}
            </p>
            <p>
              <span className="font-bold">Price: </span>
              {product.price.regular} tk
            </p>

            {product.price.sale && (
              <p>
                <span className="font-bold">Discount Price: </span>
                {product.price.sale} tk
              </p>
            )}

            <p>
              <span className="font-bold">Cuisne: </span>
              {product.cuisine}
            </p>
            <p>
              <span className="font-bold">Preparation time: </span>
              {product.preparation_time} Minutes
            </p>
            <p>
              <span className="font-bold">Dietary Tags: </span>
              {product.dietary_tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </p>

            <Button asChild className="w-full mt-2">
              <Link href={`/allFood/${product.id}`}>View and Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ProductCard1 };
