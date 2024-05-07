import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

interface SortByProps {
  onChange: (value: string) => void;
}

export function SortBy({ onChange }: SortByProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
    console.log(selectedValue); // Call the onChange callback with the selected sorting value
  };

  return (
    <div>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="popularity.desc">More Popular</SelectItem>
            <SelectItem value="popularity.asc">Less Popular</SelectItem>
            <SelectItem value="primary_release_date.desc">Latest</SelectItem>
            <SelectItem value="primary_release_date.asc">Oldest</SelectItem>
            <SelectItem value="vote_average.desc">Rating Ascending</SelectItem>
            <SelectItem value="vote_average.asc">Rating Descending</SelectItem>
            <SelectItem value="title.asc">A-Z</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
