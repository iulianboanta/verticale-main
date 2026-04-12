import { recentListings } from "@/data/mockData";
import ListingCard from "./ListingCard";

const RecentlyAdded = () => (
  <section className="py-16 bg-secondary/30">
    <div className="container">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Adăugate recent</h2>
      <p className="mt-1 text-sm text-muted-foreground">Cele mai noi afaceri din directorul nostru.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recentListings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  </section>
);

export default RecentlyAdded;
