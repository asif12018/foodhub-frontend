"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";

export function SliderControlled({
  min,
  max,
  step,
}: {
  min: number;
  max: number;
  step: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const initialMin = minPrice ? Number(minPrice) : min;
  const initialMax = maxPrice ? Number(maxPrice) : max;

  const [value, setValue] = React.useState([initialMin, initialMax]);

  React.useEffect(() => {
    const nextMin = minPrice ? Number(minPrice) : min;
    const nextMax = maxPrice ? Number(maxPrice) : max;
    setValue([nextMin, nextMax]);
  }, [minPrice, maxPrice, min, max]);

  //function to handle the value of min max price range

  const handleValueCommit = (val: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", val[0].toString());
    params.set("maxPrice", val[1].toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Price Range</Label>
        <span className="text-muted-foreground text-sm">
          {value.join(" - ")} BDT
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={setValue}
        onValueCommit={handleValueCommit}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
