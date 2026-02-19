

"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function SliderControlled({min, max, step}: {min: number, max: number, step: number}) {
  const [value, setValue] = React.useState([min, max])

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Price Range</Label>
        <span className="text-muted-foreground text-sm">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={setValue}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}
