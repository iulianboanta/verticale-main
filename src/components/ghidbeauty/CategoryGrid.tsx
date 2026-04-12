import { categories } from "@/data/mockData";

const CategoryGrid = () => {
  return (
    <section id="categorii" className="relative z-10 -mt-16 pb-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl bg-card p-5 shadow-sm border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={22} />
                </div>
                <span className="text-xs font-medium text-foreground text-center">
                  {cat.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
