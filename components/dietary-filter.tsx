"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

const snacks = [
   "HALAL",
   "VEG",
   "KETO",
   "GLUTEN_FREE",
   "DIARY_FREE"
];

const CheckboxDiateryPreference = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDietaryTags = searchParams.get("dietary_tags");

  const [selected, setSelected] = useState<string[]>(
    currentDietaryTags ? currentDietaryTags.split(",") : [],
  );

  const handleFilter = (dietary_tags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (dietary_tags.length > 0) {
      params.set("dietary_tags", dietary_tags.join(","));
    } else {
      params.delete("dietary_tags");
    }
    // Reset page to 1 when filtering
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {snacks.map((label) => (
        <Badge
          key={label}
          variant="secondary"
          className="relative gap-2 rounded-sm px-3 py-1.5"
        >
          <Checkbox
            id={label}
            checked={selected.includes(label)}
            onCheckedChange={(checked) => {
              const newSelected = checked
                ? [...selected, label]
                : selected.filter((item) => item !== label);
              setSelected(newSelected);
              handleFilter(newSelected);
            }}
            className="data-[state=unchecked]:hidden"
          />
          <label
            htmlFor={label}
            className="cursor-pointer select-none after:absolute after:inset-0"
          >
            {label}
          </label>
        </Badge>
      ))}
    </div>
  );
};

export default CheckboxDiateryPreference;
