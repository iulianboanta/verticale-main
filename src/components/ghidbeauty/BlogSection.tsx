import { articles, articleCategories } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Sparkles } from "lucide-react";

const BlogSection = () => (
  <section id="blog" className="py-16">
    <div className="container">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Blog & Articole</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sfaturi, tendințe și noutăți din lumea beauty.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
        {/* Articles grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[16/9] bg-secondary flex items-center justify-center text-muted-foreground/30">
                <Sparkles size={28} />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <Badge variant="secondary" className="w-fit text-[10px]">
                  {a.category}
                </Badge>
                <h3 className="mt-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {a.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-1 pt-3 text-[10px] text-muted-foreground">
                  <CalendarDays size={11} />
                  {new Date(a.date).toLocaleDateString("ro-RO", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Categorii articole</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {articleCategories.map((c) => (
              <li key={c}>
                <a
                  href="#"
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {c}
                  <span className="text-[10px]">→</span>
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
