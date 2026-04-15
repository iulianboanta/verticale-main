import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

const CategoryGrid = () => {
  return (
    <section id="categorii" className="relative z-10 -mt-16 pb-16">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/cautare?q=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center gap-3 rounded-xl bg-primary p-5 shadow-sm border border-primary transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-primary-dark hover:border-primary-dark"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-primary-foreground transition-colors group-hover:bg-white/30">
                  <Icon size={22} />
                </div>
                <span className="text-xs font-medium text-primary-foreground text-center">
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
