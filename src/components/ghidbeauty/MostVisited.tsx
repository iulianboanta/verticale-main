import { mostVisitedListings } from "@/data/mockData";
import ListingCard from "./ListingCard";

const MostVisited = () => (
  <section className="py-16">
    <div className="container">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Cele mai vizitate</h2>
      <p className="mt-1 text-sm text-muted-foreground">Top afaceri după numărul de vizualizări lunare.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mostVisitedListings.map((l) => (
          <ListingCard key={l.id} listing={l} compact />
        ))}
      </div>
    </div>
  </section>
);

export default MostVisited;
