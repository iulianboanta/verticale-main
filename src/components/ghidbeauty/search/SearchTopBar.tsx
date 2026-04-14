import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  query: string;
  location: string;
  onQueryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
}

const SearchTopBar = ({
  query,
  location,
  onQueryChange,
  onLocationChange,
}: Props) => {
  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border">
      <div className="container py-2.5">
        <div className="flex items-center justify-center">
          <div className="flex flex-1 max-w-2xl items-center gap-2 rounded-lg border border-input bg-card px-3 py-1.5">
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
        </div>
      </div>
    </div>
  );
};

export default SearchTopBar;
