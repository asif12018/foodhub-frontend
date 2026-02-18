import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

interface Hero1Props {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string | StaticImageData;
    alt: string;
  };
  className?: string;
}

const Hero1 = ({
  badge = "",
  heading = "Hungry? We’ve Got You Covered",
  description = "Discover nearby restaurants, customize your meals, and get them delivered hot and fresh — all in just a few clicks",
  buttons = {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
  image = {
    src: "/food-img-2.png",
    alt: "Hero section demo image showing interface components",
  },
  className,
}: Hero1Props) => {
  return (
    <section className={cn("py-32  ", className)}>
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href="#">View All Food</a>
                </Button>
              )}
              
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
