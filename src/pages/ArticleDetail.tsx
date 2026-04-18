import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/ghidbeauty/Navbar";
import Footer from "@/components/ghidbeauty/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  articlesMock,
  articleCategoryColors,
  popularTags,
  type ArticleFull,
  type ArticleCategory,
} from "@/data/articlesMockData";
import { featuredListings } from "@/data/mockData";
import ListingCard from "@/components/ghidbeauty/ListingCard";
import {
  CalendarDays,
  Clock,
  User,
  Facebook,
  Link2,
  Sparkles,
  Send,
  Eye,
  ChevronRight,
  MessageSquare,
  Lock,
} from "lucide-react";
import { articleCategoryToSlug } from "@/lib/slugs";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const CategoryBadge = ({ category }: { category: ArticleCategory }) => {
  const c = articleCategoryColors[category];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${c.bg} ${c.text}`}>
      {category}
    </span>
  );
};

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(html: string): Heading[] {
  const re = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  const result: Heading[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    result.push({ id: m[2], text: m[3].replace(/<[^>]*>/g, ""), level: parseInt(m[1]) });
  }
  return result;
}

const ArticleCard = ({ article }: { article: ArticleFull }) => (
  <Link
    to={`/informatii/${article.slug}`}
    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-md"
  >
    <div className="aspect-[16/9] bg-secondary flex items-center justify-center">
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
      <p className="text-xs text-muted-foreground line-clamp-2">{article.excerpt}</p>
      <div className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><User size={11} />{article.author.name}</span>
        <span className="flex items-center gap-1"><CalendarDays size={11} />{new Date(article.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}</span>
        <span className="flex items-center gap-1"><Clock size={11} />{article.readTime} min</span>
      </div>
    </div>
  </Link>
);

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articlesMock.find((a) => a.slug === slug);
  const headings = useMemo(() => (article ? extractHeadings(article.content) : []), [article]);
  const [activeHeading, setActiveHeading] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection observer for ToC highlighting
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar variant="solid" />
        <div className="flex-1 flex items-center justify-center pt-20">
          <p className="text-muted-foreground">Articolul nu a fost găsit.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const related = articlesMock.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
  if (related.length < 3) {
    const extra = articlesMock.filter((a) => a.id !== article.id && !related.find((r) => r.id === a.id)).slice(0, 3 - related.length);
    related.push(...extra);
  }

  const relatedListings = featuredListings.slice(0, 3);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // Split content to inject related listings after 2nd paragraph
  const paragraphs = article.content.split("</p>");
  let contentBefore = "";
  let contentAfter = "";
  if (paragraphs.length > 3) {
    contentBefore = paragraphs.slice(0, 3).join("</p>") + "</p>";
    contentAfter = paragraphs.slice(3).join("</p>");
  } else {
    contentBefore = article.content;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="solid" />

      {/* BREADCRUMB */}
      <div className="pt-20 pb-3 border-b border-border bg-card">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Acasă</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/informatii">Informații</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to={`/informatii/categorie/${articleCategoryToSlug(article.category)}`}>{article.category}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="py-8">
        <div className="container">
          <div className="mx-auto max-w-[1080px] grid gap-10 lg:grid-cols-[1fr_300px]">
            {/* ARTICLE CONTENT */}
            <article className="min-w-0">
              {/* Cover image */}
              <div className="aspect-[21/9] rounded-xl bg-secondary mb-6 overflow-hidden flex items-center justify-center">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
                ) : (
                  <Sparkles size={48} className="text-muted-foreground/20" />
                )}
              </div>

              {/* Header */}
              <CategoryBadge category={article.category} />
              <h1 className="mt-3 text-2xl font-medium text-foreground leading-snug md:text-[28px]">
                {article.title}
              </h1>
              <p className="mt-2 text-base text-muted-foreground">{article.subtitle}</p>

              {/* Author row */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {article.author.name.charAt(0)}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{article.author.name}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={13} />
                    {new Date(article.date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={13} />{article.readTime} min citire</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Share on Facebook">
                    <Facebook size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={copyLink} title="Copiază link">
                    <Link2 size={14} />
                  </Button>
                </div>
              </div>

              {/* Sponsored */}
              {article.sponsored && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Conținut sponsorizat de{" "}
                  <Link to={`/companie/${article.sponsored.companySlug}`} className="text-primary hover:underline">
                    {article.sponsored.companyName}
                  </Link>
                </p>
              )}

              <hr className="my-6 border-border" />

              {/* Mobile ToC */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-6">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="toc" className="border rounded-lg px-4">
                      <AccordionTrigger className="text-sm font-semibold py-3">Cuprins</AccordionTrigger>
                      <AccordionContent>
                        <nav className="flex flex-col gap-1 pb-2">
                          {headings.map((h) => (
                            <a
                              key={h.id}
                              href={`#${h.id}`}
                              className={`text-xs text-muted-foreground hover:text-primary transition-colors ${h.level === 3 ? "pl-4" : ""}`}
                            >
                              {h.text}
                            </a>
                          ))}
                        </nav>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {/* Body content — before injection point */}
              <div
                ref={contentRef}
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: contentBefore }}
              />

              {/* Related Listings inline block */}
              {contentAfter && (
                <>
                  <div className="my-8 rounded-xl border border-border bg-secondary/30 p-5">
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <Sparkles size={14} className="text-primary" />
                      Saloane recomandate pentru {article.tags[0] || article.category.toLowerCase()}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-3 overflow-x-auto">
                      {relatedListings.map((l) => (
                        <ListingCard key={l.id} listing={l} compact />
                      ))}
                    </div>
                  </div>

                  {/* Related categories inline */}
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">Explorează categoria:</span>
                    {["Coafură", "Colorare", "Tratamente păr"].map((c) => (
                      <Link
                        key={c}
                        to={`/cautare?q=${c.toLowerCase()}`}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>

                  {/* Body content — after injection point */}
                  <div
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: contentAfter }}
                  />
                </>
              )}

              <hr className="my-8 border-border" />

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-foreground">Etichete:</span>
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/informatii?search=${tag}`}
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs font-semibold text-foreground">Distribuie articolul:</span>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                  <Facebook size={12} /> Facebook
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5" onClick={copyLink}>
                  <Link2 size={12} /> Copiază link
                </Button>
              </div>

              <hr className="mb-8 border-border" />

              {/* Author box */}
              <div className="rounded-xl border border-border bg-card p-6 flex gap-4 items-start mb-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{article.author.bio}</p>
                  <Link to="#" className="text-xs text-primary hover:underline mt-2 inline-block">
                    Vezi toate articolele autorului →
                  </Link>
                </div>
              </div>

              {/* Comments placeholder */}
              <div className="rounded-xl border border-border bg-card p-6 text-center mb-8">
                <MessageSquare size={28} className="mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm font-medium text-foreground mb-1">Lasă un comentariu</p>
                <p className="text-xs text-muted-foreground mb-3">Trebuie să fii autentificat pentru a lăsa un comentariu.</p>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Lock size={12} /> Autentificare
                </Button>
              </div>

              {/* Related articles */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Articole similare</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="hidden lg:flex flex-col gap-6 self-start sticky top-28">
              {/* ToC */}
              {headings.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground mb-3">Cuprins</h3>
                  <nav className="flex flex-col gap-1.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`text-xs transition-colors ${h.level === 3 ? "pl-4" : ""} ${
                          activeHeading === h.id
                            ? "text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Newsletter */}
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Send size={14} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Newsletter</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Primește articole direct în inbox.</p>
                <Input placeholder="Email" className="h-9 text-xs mb-2" />
                <Button size="sm" className="w-full text-xs">Abonează-te</Button>
              </div>

              {/* Ad banner */}
              <div className="flex h-[250px] w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 text-xs text-muted-foreground banner-slot">
                300×250 · Banner publicitar
              </div>

              {/* Popular */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Articole populare</h3>
                <ol className="flex flex-col gap-2.5">
                  {[...articlesMock].sort((a, b) => b.views - a.views).slice(0, 3).map((a, i) => (
                    <li key={a.id}>
                      <Link to={`/informatii/${a.slug}`} className="flex items-start gap-2.5 group">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {a.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
