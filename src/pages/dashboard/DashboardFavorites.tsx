import { Link } from "react-router-dom";
import { Heart, Star, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockFavorites } from "@/data/dashboardMockData";

const DashboardFavorites = () => {
  if (mockFavorites.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-foreground">Favorite</h1>
        <Card className="border-border/50">
          <CardContent className="py-16 text-center">
            <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Nu ai salvat niciun listing</h3>
            <p className="text-sm text-muted-foreground mb-4">Exploreaza directorul si salveaza listingurile preferate.</p>
            <Link to="/cautare"><Button>Exploreaza directorul</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Favorite</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockFavorites.map((f) => (
          <Card key={f.id} className="border-border/50 overflow-hidden hover:shadow-md transition-shadow">
            <img src={f.image} alt={f.name} className="w-full h-32 object-cover bg-muted" />
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-0.5">{f.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{f.category} &middot; {f.city}</p>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-foreground">{f.rating}</span>
                <span className="text-xs text-muted-foreground">({f.reviewCount} recenzii)</span>
              </div>
              <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
                <Heart className="w-3.5 h-3.5 mr-1 fill-current" /> Sterge din favorite
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardFavorites;
