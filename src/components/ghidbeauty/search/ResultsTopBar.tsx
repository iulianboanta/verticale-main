import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ActiveFilters } from "./SearchFilters";

interface Props {
  totalResults: number;
  query: string;
  location: string;
  sort: string;
  onSortChange: (v: string) => void;
  filters: ActiveFilters;
  onRemoveFilter: (type: keyof ActiveFilters, value?: string) => void;
}

const ResultsTopBar = ({
  totalResults,
  query,
  location,
  sort,
  onSortChange,
  filters,
  onRemoveFilter,
}: Props) => {
  // Build pills from active filters
  const pills: { label: string; type: keyof ActiveFilters; value?: string }[] =
    [];

  filters.categories.forEach((c) =>
    pills.push({ label: c, type: "categories", value: c })
  );
  filters.localities.forEach((l) =>
    pills.push({ label: l, type: "localities", value: l })
  );
  if (filters.minRating > 0)
    pills.push({ label: `${filters.minRating}★+`, type: "minRating" });
  if (filters.openNow) pills.push({ label: "Deschis acum", type: "openNow" });
  filters.services.forEach((s) =>
    pills.push({ label: s, type: "services", value: s })
  );
  filters.facilities.forEach((f) =>
    pills.push({ label: f, type: "facilities", value: f })
  );
  if (filters.onlyRecommended)
    pills.push({ label: "Doar recomandate", type: "onlyRecommended" });
  if (filters.onlyCounty)
    pills.push({ label: "Doar din județ", type: "onlyCounty" });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[13px] text-muted-foreground">
          <span className="font-bold text-foreground">{totalResults}</span>{" "}
          rezultate
          {query && (
            <>
              {" "}
              pentru{" "}
              <span className="font-semibold text-foreground">{query}</span>
            </>
          )}
          {location && (
            <>
              {" "}
              în{" "}
              <span className="font-semibold text-foreground">{location}</span>
            </>
          )}
        </p>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[170px] h-8 text-xs">
            <SelectValue placeholder="Sortare" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevanță</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="reviews">Nr. recenzii</SelectItem>
            <SelectItem value="alpha">Alfabetic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {pills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {pills.map((pill, i) => (
            <Badge
              key={`${pill.type}-${pill.value ?? i}`}
              variant="secondary"
              className="text-xs font-normal flex items-center gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => onRemoveFilter(pill.type, pill.value)}
            >
              {pill.label}
              <X size={12} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsTopBar;
