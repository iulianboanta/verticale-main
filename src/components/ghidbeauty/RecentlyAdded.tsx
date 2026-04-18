import { recentListings } from "@/data/mockData";
import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";

const RecentlyAdded = () => (
  <section className="py-16 bg-secondary/30">
    <div className="container">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Adăugate recent</h2>
          <p className="text-sm text-muted-foreground">Cele mai noi afaceri din directorul nostru.</p>
        </div>
        <Link to="/cautare?sort=recent" className="text-xs font-semibold text-primary hover:underline transition-colors">
          Vezi toate →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recentListings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  </section>
);

export default RecentlyAdded;
