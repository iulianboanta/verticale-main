import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, SearchX } from "lucide-react";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import SearchTopBar from "@/components/ghidbeauty/search/SearchTopBar";
import ResultsTopBar from "@/components/ghidbeauty/search/ResultsTopBar";
import SearchFilters, {
  type ActiveFilters,
} from "@/components/ghidbeauty/search/SearchFilters";
import SearchResultCard from "@/components/ghidbeauty/search/SearchResultCard";
import SearchPagination from "@/components/ghidbeauty/search/SearchPagination";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { searchResults } from "@/data/searchMockData";

const ITEMS_PER_PAGE = 8;

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

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("unde") || "");
  const [view, setView] = useState<"list" | "grid" | "map">("list");
  const [sort, setSort] = useState("relevance");
  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [page, setPage] = useState(1);

  // Sort results
  const sorted = useMemo(() => {
    const arr = [...searchResults];
    switch (sort) {
      case "rating":
        return arr.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return arr.sort((a, b) => b.reviewCount - a.reviewCount);
      case "alpha":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      default:
        // Relevance: featured first
        return arr.sort((a, b) => {
          const pa = a.plan === "profesional" ? 0 : a.plan === "intro" ? 1 : 2;
          const pb = b.plan === "profesional" ? 0 : b.plan === "intro" ? 1 : 2;
          return pa - pb;
        });
    }
  }, [sort]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paged = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Insert ad banner after position 4
  const resultsWithAd = paged.flatMap((item, i) => {
    if (i === 4) {
      return ["ad-banner", item] as const;
    }
    return [item] as const;
  });

  const handleRemoveFilter = (type: keyof ActiveFilters, value?: string) => {
    const updated = { ...filters };
    if (type === "categories" && value)
      updated.categories = updated.categories.filter((c) => c !== value);
    else if (type === "localities" && value)
      updated.localities = updated.localities.filter((l) => l !== value);
    else if (type === "services" && value)
      updated.services = updated.services.filter((s) => s !== value);
    else if (type === "facilities" && value)
      updated.facilities = updated.facilities.filter((f) => f !== value);
    else if (type === "minRating") updated.minRating = 0;
    else if (type === "openNow") updated.openNow = false;
    else if (type === "onlyRecommended") updated.onlyRecommended = false;
    else if (type === "onlyCounty") updated.onlyCounty = false;
    setFilters(updated);
  };

  const filtersContent = (
    <SearchFilters
      filters={filters}
      onChange={setFilters}
      onReset={() => setFilters(emptyFilters)}
    />
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="solid" />

      <SearchTopBar
        query={query}
        location={location}
        onQueryChange={setQuery}
        onLocationChange={setLocation}
      />

      <main className="flex-1 container pt-3 mt-14 pb-6">
        <div className="flex gap-6">
          {/* Filters sidebar — desktop */}
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="sticky top-[8rem] max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">
              {filtersContent}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">

            <ResultsTopBar
              totalResults={sorted.length}
              query={query}
              location={location}
              sort={sort}
              onSortChange={setSort}
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              view={view}
              onViewChange={setView}
              mobileFilterSlot={
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal size={15} />
                      Filtre
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filtre</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">{filtersContent}</div>
                  </SheetContent>
                </Sheet>
              }
            />

            {/* Results */}
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SearchX
                  size={64}
                  className="text-muted-foreground/30 mb-4"
                />
                <h2 className="text-lg font-semibold text-foreground">
                  Niciun rezultat găsit
                </h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Încearcă să modifici filtrele sau caută în altă localitate
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters(emptyFilters)}
                >
                  Resetează filtrele
                </Button>
              </div>
            ) : (
              <div
                className={`mt-4 ${
                  view === "grid"
                    ? "grid grid-cols-2 lg:grid-cols-3 gap-3"
                    : "flex flex-col gap-3"
                }`}
              >
                {resultsWithAd.map((item) => {
                  if (item === "ad-banner") {
                    return (
                      <div
                        key="ad-banner"
                        className={`banner-slot flex items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 ${
                          view === "grid" ? "col-span-full h-[60px]" : "h-[60px] max-w-[600px] mx-auto w-full"
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">
                          600×60 · Banner publicitar
                        </span>
                      </div>
                    );
                  }
                  return (
                    <SearchResultCard
                      key={item.id}
                      listing={item}
                      view={view === "map" ? "list" : view}
                    />
                  );
                })}
              </div>
            )}

            <SearchPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
