import { Search, MapPin, List, LayoutGrid, Map, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  query: string;
  location: string;
  onQueryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  view: "list" | "grid" | "map";
  onViewChange: (v: "list" | "grid" | "map") => void;
}

const SearchTopBar = ({
  query,
  location,
  onQueryChange,
  onLocationChange,
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

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border">
      <div className="container py-2.5">
        <div className="flex items-center gap-3">
          {/* Compact search fields */}
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-card px-3 py-1.5">
            <Search size={15} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Ce cauți?"
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground min-w-0"
            />
            <div className="w-px h-5 bg-border shrink-0" />
            <MapPin size={15} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="Unde?"
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground min-w-0"
            />
            <Button size="sm" className="h-7 px-3 text-xs shrink-0">
              <Search size={13} />
            </Button>
          </div>

          {/* Breadcrumb — hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
            <Link to="/" className="hover:text-primary transition-colors">
              Acasă
            </Link>
            <ChevronRight size={12} />
            <span className="text-foreground">{query || "Căutare"}</span>
            {location && (
              <>
                <ChevronRight size={12} />
                <span className="text-foreground">{location}</span>
              </>
            )}
          </nav>

          {/* View toggle */}
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={handleViewChange}
            className="shrink-0 hidden sm:flex"
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
    </div>
  );
};

export default SearchTopBar;
