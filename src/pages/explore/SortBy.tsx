import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";

export function SortBy() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="popularity.asc">More Popular</SelectItem>
            <SelectItem value="popularity.desc">Less Popular</SelectItem>
            <SelectItem value="primary_release_date.asc">Latest</SelectItem>
            <SelectItem value="primary_release_date.desc">Oldest</SelectItem>
            <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
            <SelectItem value="vote_average.desc">Rating Descending</SelectItem>
            <SelectItem value="title.asc">A-Z</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
