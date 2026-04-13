import { articles, articleCategories } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Sparkles } from "lucide-react";
import bannerPublish from "@/assets/banner-article-publish.jpg";
import bannerPress from "@/assets/banner-press-release.jpg";

const BlogSection = () => (
  <section id="blog" className="py-16">
    <div className="container">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Articole</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sfaturi, tendințe și noutăți din lumea beauty.</p>
        </div>
        <a href="#" className="text-xs font-semibold text-primary hover:underline transition-colors">
          Vezi toate →
        </a>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
        {/* Articles grid + banner below */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[16/8] bg-secondary overflow-hidden">
                  {a.image ? (
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30"><Sparkles size={28} /></div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="text-xs font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
                    {a.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {a.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <CalendarDays size={11} />
                      {new Date(a.date).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Banner placeholders */}
          <div className="grid grid-cols-2 gap-4">
            <a href="#" className="block overflow-hidden rounded-xl transition-shadow hover:shadow-md">
              <img src={bannerPublish} alt="Publică un articol" className="h-[90px] w-full object-cover" loading="lazy" width={1024} height={512} />
            </a>
            <a href="#" className="block overflow-hidden rounded-xl transition-shadow hover:shadow-md">
              <img src={bannerPress} alt="Comunicate de presă" className="h-[90px] w-full object-cover" loading="lazy" width={1024} height={512} />
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="rounded-xl border border-border bg-gradient-to-b from-primary/5 to-card p-5 shadow-sm self-start">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles size={16} className="text-primary" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Categorii articole</h3>
          </div>
          <ul className="flex flex-col gap-1.5">
            {articleCategories.map((c, i) => (
              <li key={c}>
                <a
                  href="#"
                  className="group/cat flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[10px] font-semibold text-primary transition-colors group-hover/cat:bg-white/20 group-hover/cat:text-primary-foreground">
                      {i + 1}
                    </span>
                    {c}
                  </span>
                  <span className="text-xs opacity-0 transition-opacity group-hover/cat:opacity-100">→</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  </section>
);

export default BlogSection;
