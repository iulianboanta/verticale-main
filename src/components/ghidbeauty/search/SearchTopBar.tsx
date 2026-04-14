import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AutosuggestInput, { ceSuggestions, undeSuggestions } from "./AutosuggestInput";

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
            <AutosuggestInput
              icon={<Search size={15} />}
              placeholder="Ce cauți?"
              suggestions={ceSuggestions}
              value={query}
              onChange={onQueryChange}
              variant="compact"
            />
            <div className="w-px h-5 bg-border shrink-0" />
            <AutosuggestInput
              icon={<MapPin size={15} />}
              placeholder="Unde?"
              suggestions={undeSuggestions}
              value={location}
              onChange={onLocationChange}
              variant="compact"
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