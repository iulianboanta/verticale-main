import { useState, useMemo } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
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
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { searchResults } from "@/data/searchMockData";
import { useRobotsMeta } from "@/hooks/use-robots-meta";
import {
  slugToCategory,
  slugToCounty,
  slugToSubcategory,
} from "@/lib/slugs";
import NotFound from "@/pages/NotFound";

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

export type SearchMode =
  | "query"        // /cautare?q=&unde=
  | "county"       // /judet/[judet]
  | "category"     // /[cat]
  | "cat-sub"      // /[cat]/[sub]
  | "cat-county"   // /[cat]/[judet]
  | "cat-sub-county"; // /[cat]/[sub]/[judet]

interface Props {
  mode?: SearchMode;
}

const SearchResultsPage = ({ mode: modeProp = "query" }: Props) => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  // Resolve URL segments → display values
  const segCategory = params.cat ? slugToCategory(params.cat) : null;

  // /:cat/:sub may actually be /[cat]/[judet] — detect via slug lookup
  let mode: SearchMode = modeProp;
  if (modeProp === "cat-sub" && params.sub && slugToCounty(params.sub)) {
    mode = "cat-county";
  }

  const segSubcategory =
    (mode === "cat-sub" || mode === "cat-sub-county") && params.cat && params.sub
      ? slugToSubcategory(params.cat, params.sub)
      : null;

  const segCounty = params.judet
    ? slugToCounty(params.judet)
    : mode === "cat-county" && params.sub
    ? slugToCounty(params.sub)
    : null;

  const initialQuery = mode === "query"
    ? searchParams.get("q") || ""
    : segSubcategory ?? "";
  const initialLocation = mode === "query"
    ? searchParams.get("unde") || ""
    : segCounty ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [view, setView] = useState<"list" | "grid" | "map">("list");
  const [sort, setSort] = useState(
    searchParams.get("sort") === "views"
      ? "reviews"
      : searchParams.get("sort") === "recent"
      ? "alpha"
      : "relevance",
  );
  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [page, setPage] = useState(1);

  // SEO: static URL pages → index. Search query page → noindex.
  useRobotsMeta(mode === "query" ? "noindex, follow" : "index, follow");

  // Ad banner visibility flags
  const showSquareBanner = true;
  const showSkyscraperBanner = true;

  // Pre-filter by URL segments (best-effort against mock data)
  const segmentFiltered = useMemo(() => {
    let arr = [...searchResults];
    if (segCategory) {
      arr = arr.filter((r) => r.category === segCategory);
    }
    if (segCounty) {
      arr = arr.filter((r) => r.county === segCounty);
    }
    return arr.length ? arr : searchResults; // graceful: if 0, show all
  }, [segCategory, segCounty]);

  // Sort results
  const sorted = useMemo(() => {
    const arr = [...segmentFiltered];
    switch (sort) {
      case "rating":
        return arr.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return arr.sort((a, b) => b.reviewCount - a.reviewCount);
      case "alpha":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return arr.sort((a, b) => {
          const pa = a.plan === "profesional" ? 0 : a.plan === "intro" ? 1 : 2;
          const pb = b.plan === "profesional" ? 0 : b.plan === "intro" ? 1 : 2;
          return pa - pb;
        });
    }
  }, [sort, segmentFiltered]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paged = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

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

  // ---------- Breadcrumb ----------
  const renderBreadcrumb = () => {
    const items: { label: string; href?: string }[] = [{ label: "Acasă", href: "/" }];

    if (mode === "query") {
      items.push({ label: "Rezultate" });
    } else if (mode === "county" && segCounty) {
      items.push({ label: "Județe", href: "/judete" });
      items.push({ label: segCounty });
    } else if (mode === "category" && segCategory) {
      items.push({ label: segCategory });
    } else if (mode === "cat-sub" && segCategory && params.cat) {
      items.push({ label: segCategory, href: `/${params.cat}` });
      items.push({ label: segSubcategory ?? params.sub ?? "" });
    } else if (mode === "cat-county" && segCategory && params.cat) {
      items.push({ label: segCategory, href: `/${params.cat}` });
      items.push({ label: segCounty ?? params.judet ?? "" });
    } else if (mode === "cat-sub-county" && segCategory && params.cat) {
      items.push({ label: segCategory, href: `/${params.cat}` });
      items.push({
        label: segSubcategory ?? params.sub ?? "",
        href: `/${params.cat}/${params.sub}`,
      });
      items.push({ label: segCounty ?? params.judet ?? "" });
    }

    return (
      <Breadcrumb className="mb-3">
        <BreadcrumbList>
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <span key={i} className="contents">
                <BreadcrumbItem>
                  {isLast || !it.href ? (
                    <BreadcrumbPage>{it.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={it.href}>{it.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

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
        {renderBreadcrumb()}

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
                {paged.map((item) => (
                  <SearchResultCard
                    key={item.id}
                    listing={item}
                    view={view === "map" ? "list" : view}
                  />
                ))}
              </div>
            )}

            {/* Mobile ad banner */}
            <div className="lg:hidden flex items-center justify-center my-4">
              <div className="w-[320px] h-[100px] rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">320×100 · Banner publicitar</span>
              </div>
            </div>

            <SearchPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>

          {/* Ad sidebar — desktop */}
          <aside className="hidden lg:block w-[120px] shrink-0">
            <div className="sticky top-[8rem] flex flex-col gap-4">
              {showSquareBanner && (
                <div className="w-[120px] h-[120px] rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground text-center">120×120</span>
                </div>
              )}
              {showSkyscraperBanner && (
                <div className="w-[120px] h-[600px] rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground text-center">120×600</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
