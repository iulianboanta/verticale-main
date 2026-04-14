import { X, ChevronRight, List, LayoutGrid, Map } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ActiveFilters } from "./SearchFilters";

interface Props {
  totalResults: number;
  query: string;
  location: string;
  sort: string;
  onSortChange: (v: string) => void;
  filters: ActiveFilters;
  onRemoveFilter: (type: keyof ActiveFilters, value?: string) => void;
  view: "list" | "grid" | "map";
  onViewChange: (v: "list" | "grid" | "map") => void;
}

const ResultsTopBar = ({
  totalResults,
  query,
  location,
  sort,
  onSortChange,
  filters,
  onRemoveFilter,
  view,
  onViewChange,
}: Props) => {
  const navigate = useNavigate();

  const handleViewChange = (val: string) => {
    if (!val) return;
    if (val === "map") {
      navigate(`/cautare/harta?q=${encodeURIComponent(query)}&unde=${encodeURIComponent(location)}`);
      return;
    }
    onViewChange(val as "list" | "grid");
  };

  // Build pills from active filters
  const pills: { label: string; type: keyof ActiveFilters; value?: string }[] = [];

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
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          Acasă
        </Link>
        {query && (
          <>
            <ChevronRight size={12} />
            <span className="text-foreground">{query}</span>
          </>
        )}
        {location && (
          <>
            <ChevronRight size={12} />
            <span className="text-foreground">{location}</span>
          </>
        )}
      </nav>

      {/* Results count + sort + view toggle */}
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

        <div className="flex items-center gap-2">
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

          <ToggleGroup
            type="single"
            value={view}
            onValueChange={handleViewChange}
            className="shrink-0 flex"
          >
            <ToggleGroupItem
              value="list"
              aria-label="Listă"
              className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <List size={15} />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="grid"
              aria-label="Grid"
              className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <LayoutGrid size={15} />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="map"
              aria-label="Hartă"
              className="h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              <Map size={15} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
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
