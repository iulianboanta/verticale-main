import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  articlesMock,
  articleCategories,
  articleCategoryColors,
  categoryCounts,
  popularTags,
  type ArticleCategory,
  type ArticleFull,
} from "@/data/articlesMockData";
import {
  Search,
  CalendarDays,
  Clock,
  Eye,
  Sparkles,
  Send,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                     */
/* ------------------------------------------------------------------ */

const CategoryBadge = ({ category }: { category: ArticleCategory }) => {
  const c = articleCategoryColors[category];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${c.bg} ${c.text}`}>
      {category}
    </span>
  );
};

const ArticleMeta = ({ article, small = false }: { article: ArticleFull; small?: boolean }) => (
  <div className={`flex items-center gap-3 ${small ? "text-[11px]" : "text-xs"} text-muted-foreground`}>
    <span className="flex items-center gap-1">
      <User size={small ? 11 : 13} />
      {article.author.name}
    </span>
    <span className="flex items-center gap-1">
      <CalendarDays size={small ? 11 : 13} />
      {new Date(article.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })}
    </span>
    <span className="flex items-center gap-1">
      <Clock size={small ? 11 : 13} />
      {article.readTime} min
    </span>
  </div>
);

const FeaturedCard = ({ article }: { article: ArticleFull }) => (
  <Link
    to={`/informatii/${article.slug}`}
    className="group grid gap-0 overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg md:grid-cols-[480px_1fr]"
  >
    <div className="aspect-[16/9] md:aspect-auto bg-secondary flex items-center justify-center overflow-hidden">
      {article.image ? (
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
      ) : (
        <Sparkles size={40} className="text-muted-foreground/20" />
      )}
    </div>
    <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
      <CategoryBadge category={article.category} />
      <h2 className="text-xl font-medium text-foreground leading-snug group-hover:text-primary transition-colors md:text-[22px]">
        {article.title}
      </h2>
      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{article.excerpt}</p>
      <ArticleMeta article={article} />
      <span className="mt-1 text-sm font-semibold text-primary">Citește articolul →</span>
    </div>
  </Link>
);

const ArticleCard = ({ article }: { article: ArticleFull }) => (
  <Link
    to={`/informatii/${article.slug}`}
    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md"
  >
    <div className="aspect-[16/9] bg-secondary flex items-center justify-center overflow-hidden">
      {article.image ? (
        <img src={article.image} alt={article.title} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <Sparkles size={28} className="text-muted-foreground/20" />
      )}
    </div>
    <div className="flex flex-1 flex-col gap-1.5 p-4">
      <CategoryBadge category={article.category} />
      <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{article.excerpt}</p>
      <div className="mt-auto pt-3">
        <ArticleMeta article={article} small />
      </div>
    </div>
  </Link>
);

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

const ArticlesLanding = () => {
  const [activeCategory, setActiveCategory] = useState<"Toate" | ArticleCategory>("Toate");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filterRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (filterRef.current) {
        setSticky(filterRef.current.getBoundingClientRect().top <= 64);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = articlesMock
    .filter((a) => activeCategory === "Toate" || a.category === activeCategory)
    .filter((a) => !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => (sortBy === "popular" ? b.views - a.views : new Date(b.date).getTime() - new Date(a.date).getTime()));

  const featured = filtered[0];
  const grid = filtered.slice(1);
  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(grid.length / perPage));
  const pagedGrid = grid.slice((page - 1) * perPage, page * perPage);

  const allCategories: ("Toate" | ArticleCategory)[] = ["Toate", ...articleCategories];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="solid" />

      {/* HERO */}
      <section className="pt-24 pb-10 border-b border-border bg-card">
        <div className="container text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
            <Sparkles size={13} /> Informații & Sfaturi
          </span>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Descoperă cele mai noi articole din industria beauty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
            Tendințe, sfaturi practice, legislație și interviuri cu specialiști
          </p>
        </div>
      </section>

      {/* FILTERS BAR */}
      <div ref={filterRef} className={`sticky top-16 z-40 border-b border-border bg-card transition-shadow ${sticky ? "shadow-sm" : ""}`}>
        <div className="container flex items-center gap-4 py-3 overflow-x-auto">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as "recent" | "popular")}>
              <SelectTrigger className="h-8 w-[170px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Cele mai recente</SelectItem>
                <SelectItem value="popular">Cele mai citite</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Caută în articole..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="h-8 w-48 pl-8 text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN + SIDEBAR */}
      <section className="py-10">
        <div className="container">
          <div className="mx-auto max-w-[1080px] grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* LEFT */}
            <div className="flex flex-col gap-8">
              {featured && <FeaturedCard article={featured} />}

              {pagedGrid.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {pagedGrid.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search size={32} className="text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">Nu am găsit articole cu aceste criterii.</p>
                </div>
              )}

              {totalPages > 1 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(page - 1); }} />
                      </PaginationItem>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink href="#" isActive={p === page} onClick={(e) => { e.preventDefault(); setPage(p); }}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(page + 1); }} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="flex flex-col gap-6 self-start lg:sticky lg:top-28">
              {/* Categories */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Categorii</h3>
                <ul className="flex flex-col gap-1">
                  {articleCategories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => { setActiveCategory(cat); setPage(1); }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                          activeCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {cat}
                        <span className="text-xs opacity-70">{categoryCounts[cat]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Articole populare</h3>
                <ol className="flex flex-col gap-2.5">
                  {[...articlesMock].sort((a, b) => b.views - a.views).slice(0, 5).map((a, i) => (
                    <li key={a.id}>
                      <Link to={`/informatii/${a.slug}`} className="flex items-start gap-2.5 group">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {a.title}
                          </p>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                            <Eye size={10} /> {a.views.toLocaleString("ro-RO")} vizualizări
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Newsletter */}
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Send size={14} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Newsletter</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Primește articole direct în inbox — gratuit, fără spam.</p>
                <Input placeholder="Adresa ta de email" className="h-9 text-xs mb-2" />
                <Button size="sm" className="w-full text-xs">Abonează-te</Button>
              </div>

              {/* Tags */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Etichete populare</h3>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setSearch(tag); setActiveCategory("Toate"); setPage(1); }}
                      className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticlesLanding;
