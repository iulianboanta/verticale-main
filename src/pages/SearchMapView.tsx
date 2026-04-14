import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, MapPin, List, LayoutGrid, Map, SlidersHorizontal, X, SearchX } from "lucide-react";
import Navbar from "@/components/ghidbeauty/Navbar";
import MapCard from "@/components/ghidbeauty/search/MapCard";
import MapPlaceholder from "@/components/ghidbeauty/search/MapPlaceholder";
import SearchFilters, { type ActiveFilters } from "@/components/ghidbeauty/search/SearchFilters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { searchResults } from "@/data/searchMockData";

const emptyFilters: ActiveFilters = {
  categories: [],
  localities: [],
  minRating: 0,
  openNow: false,
  services: [],
  facilities: [],
  onlyRecommended: false,
  onlyCounty: false,
};

const SearchMapView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("unde") || "");
  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [activeId, setActiveId] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Sort: featured first
  const sorted = useMemo(() => {
    const arr = [...searchResults];
    return arr.sort((a, b) => {
      const pa = a.plan === "profesional" ? 0 : a.plan === "intro" ? 1 : 2;
      const pb = b.plan === "profesional" ? 0 : b.plan === "intro" ? 1 : 2;
      return pa - pb;
    });
  }, []);

  const handlePinClick = useCallback((id: string) => {
    setActiveId(id);
    const el = document.getElementById(`map-card-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleCardClick = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleViewChange = (val: string) => {
    if (!val || val === "map") return;
    navigate(`/cautare?q=${encodeURIComponent(query)}&unde=${encodeURIComponent(location)}`);
  };

  // Filter pills
  const pills: { label: string; type: keyof ActiveFilters; value?: string }[] = [];
  filters.categories.forEach((c) => pills.push({ label: c, type: "categories", value: c }));
  filters.localities.forEach((l) => pills.push({ label: l, type: "localities", value: l }));
  if (filters.minRating > 0) pills.push({ label: `${filters.minRating}★+`, type: "minRating" });
  if (filters.openNow) pills.push({ label: "Deschis acum", type: "openNow" });
  filters.services.forEach((s) => pills.push({ label: s, type: "services", value: s }));
  filters.facilities.forEach((f) => pills.push({ label: f, type: "facilities", value: f }));
  if (filters.onlyRecommended) pills.push({ label: "Doar recomandate", type: "onlyRecommended" });
  if (filters.onlyCounty) pills.push({ label: "Doar din județ", type: "onlyCounty" });

  const handleRemoveFilter = (type: keyof ActiveFilters, value?: string) => {
    const updated = { ...filters };
    if (type === "categories" && value) updated.categories = updated.categories.filter((c) => c !== value);
    else if (type === "localities" && value) updated.localities = updated.localities.filter((l) => l !== value);
    else if (type === "services" && value) updated.services = updated.services.filter((s) => s !== value);
    else if (type === "facilities" && value) updated.facilities = updated.facilities.filter((f) => f !== value);
    else if (type === "minRating") updated.minRating = 0;
    else if (type === "openNow") updated.openNow = false;
    else if (type === "onlyRecommended") updated.onlyRecommended = false;
    else if (type === "onlyCounty") updated.onlyCounty = false;
    setFilters(updated);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Navbar */}
      <Navbar variant="solid" />

      {/* Search bar */}
      <div className="shrink-0 z-40 bg-background border-b border-border">
        <div className="container py-2">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 max-w-2xl items-center gap-2 rounded-lg border border-input bg-card px-3 py-1.5">
              <Search size={15} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ce cauți?"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground min-w-0"
              />
              <div className="w-px h-5 bg-border shrink-0" />
              <MapPin size={15} className="text-muted-foreground shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Unde?"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground min-w-0"
              />
              <Button size="sm" className="h-7 px-3 text-xs shrink-0">
                <Search size={13} />
              </Button>
            </div>

            {/* Results count */}
            <span className="hidden sm:inline text-[13px] text-muted-foreground whitespace-nowrap">
              <span className="font-bold text-foreground">{sorted.length}</span> rezultate
            </span>

            {/* View toggle */}
            <ToggleGroup
              type="single"
              value="map"
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

      {/* Main content — fills remaining viewport */}
      <div className="flex-1 flex min-h-0">
        {/* MOBILE: map full screen + bottom drawer */}
        {isMobile ? (
          <div className="relative flex-1">
            <MapPlaceholder
              listings={sorted}
              activeId={activeId}
              onPinClick={handlePinClick}
            />
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  size="sm"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 shadow-lg"
                >
                  {sorted.length} rezultate · Vezi lista
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[70vh]">
                <DrawerHeader>
                  <DrawerTitle className="text-sm">
                    {sorted.length} rezultate
                    {query && ` pentru "${query}"`}
                    {location && ` în ${location}`}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="overflow-y-auto px-3 pb-4 space-y-2.5">
                  {sorted.map((listing, i) => (
                    <MapCard
                      key={listing.id}
                      listing={listing}
                      index={i}
                      isActive={activeId === listing.id}
                      onClick={() => handleCardClick(listing.id)}
                    />
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <>
            {/* LEFT PANEL — cards */}
            <div className="w-[360px] shrink-0 border-r border-border bg-card flex flex-col">
              {/* Panel header — fixed */}
              <div className="shrink-0 p-3 border-b border-border space-y-2">
                <p className="text-[13px] text-muted-foreground">
                  <span className="font-bold text-foreground">{sorted.length}</span> rezultate
                  {query && (
                    <> pentru <span className="font-semibold text-foreground">{query}</span></>
                  )}
                  {location && (
                    <> în <span className="font-semibold text-foreground">{location}</span></>
                  )}
                </p>

                {/* Filter pills + filter button */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {pills.map((pill, i) => (
                    <Badge
                      key={`${pill.type}-${pill.value ?? i}`}
                      variant="secondary"
                      className="text-[10px] font-normal flex items-center gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={() => handleRemoveFilter(pill.type, pill.value)}
                    >
                      {pill.label}
                      <X size={10} />
                    </Badge>
                  ))}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] gap-1">
                        <SlidersHorizontal size={11} />
                        Filtre
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filtre</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <SearchFilters
                          filters={filters}
                          onChange={setFilters}
                          onReset={() => setFilters(emptyFilters)}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Scrollable cards */}
              <div ref={cardsRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {sorted.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <SearchX size={48} className="text-muted-foreground/30 mb-3" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Niciun rezultat în această zonă
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Încearcă să extinzi căutarea
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 text-xs">
                      Extinde căutarea
                    </Button>
                  </div>
                ) : (
                  sorted.map((listing, i) => (
                    <MapCard
                      key={listing.id}
                      listing={listing}
                      index={i}
                      isActive={activeId === listing.id}
                      onClick={() => handleCardClick(listing.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* RIGHT PANEL — Map */}
            <div className="flex-1 min-w-0">
              <MapPlaceholder
                listings={sorted}
                activeId={activeId}
                onPinClick={handlePinClick}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchMapView;
