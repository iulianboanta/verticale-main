import { featuredListings } from "@/data/mockData";
import ListingCard from "./ListingCard";

const FeaturedListings = () => (
  <section className="pt-8 pb-16 bg-secondary/30">
    <div className="container">
      <h2 className="text-2xl font-bold text-foreground md:text-3xl">Afaceri recomandate</h2>
      <p className="mt-1 text-sm text-muted-foreground">Profesioniști verificați, aleși pentru tine.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredListings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedListings;
