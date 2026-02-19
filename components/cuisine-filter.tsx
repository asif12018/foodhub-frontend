"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  // Add other properties if needed
}

interface CuisineFilterProps {
  categories: Category[];
}

export function CuisineFilter({ categories }: CuisineFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCuisine = searchParams.get("cuisine");

  const handleFilter = (cuisine: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cuisine) {
      params.set("cuisine", cuisine);
    } else {
      params.delete("cuisine");
    }
    // Reset page to 1 when filtering
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 my-4 justify-center">
      <Button
        variant={!currentCuisine ? "default" : "outline"}
        onClick={() => handleFilter(null)}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={currentCuisine === category.name ? "default" : "outline"}
          onClick={() => handleFilter(category.name)}
          className="rounded-full"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
