import { mostVisitedListings } from "@/data/mockData";
import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";

const MostVisited = () => (
  <section className="pt-4 pb-16">
    <div className="container">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">Cele mai vizitate</h2>
        <Link to="/cautare?sort=views" className="text-xs font-semibold text-primary hover:underline transition-colors">
          Vezi toate →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mostVisitedListings.map((l) => (
          <ListingCard key={l.id} listing={l} compact />
        ))}
      </div>
    </div>
  </section>
);

export default MostVisited;
