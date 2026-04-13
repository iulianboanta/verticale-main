import { romanianCounties } from "@/data/mockData";
import { MapPin } from "lucide-react";

const CountiesGrid = () => (
  <section id="judete" className="py-16 bg-secondary/30">
    <div className="container">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Caută specialiști direct în județul tău</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Explorează afaceri din beauty în toate cele 42 de județe ale României.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {romanianCounties.map((county) => (
          <a
            key={county}
            href={`#judet-${county.toLowerCase().replace(/[ăâîșț\s-]/g, "")}`}
            className="group flex items-center gap-2.5 rounded-xl border border-border bg-gradient-to-b from-primary/5 to-card px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-sm hover:-translate-y-0.5"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-primary-foreground shrink-0">
              <MapPin size={12} />
            </span>
            {county}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CountiesGrid;
