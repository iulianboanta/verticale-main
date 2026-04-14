import { Star, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SearchListing } from "@/data/searchMockData";

interface Props {
  listing: SearchListing;
  view: "list" | "grid";
}

const planLabel: Record<string, string | null> = {
  profesional: "Profesional",
  intro: "Intro",
  gratuit: null,
};

const SearchResultCard = ({ listing, view }: Props) => {
  const isFeatured = listing.plan === "profesional";
  const isGratuit = listing.plan === "gratuit";

  if (view === "grid") {
    return (
      <Link
        to={`/companie/${listing.slug ?? listing.id}`}
        className={`group flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all hover:-translate-y-1 hover:shadow-lg ${
          isFeatured ? "border-t-[3px] border-t-primary" : ""
        }`}
      >
        <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/40 text-sm">
              Fără foto
            </div>
          )}
          {listing.recommended && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px]">
              <Star size={10} className="mr-0.5" />
              Recomandat
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-1 p-3">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {listing.name}
          </h3>
          <p className="text-xs text-muted-foreground">{listing.category}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={11} />
            <span>{listing.city}</span>
          </div>
          {listing.rating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={12} className="fill-accent text-accent" />
              <span className="text-xs font-semibold text-foreground">
                {listing.rating}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({listing.reviewCount})
              </span>
            </div>
          )}
          {planLabel[listing.plan] && (
            <Badge
              variant="outline"
              className="text-[10px] w-fit mt-1 border-primary/30 text-primary"
            >
              {planLabel[listing.plan]}
            </Badge>
          )}
        </div>
      </Link>
    );
  }

  // List view
  return (
    <div
      className={`flex gap-4 rounded-xl bg-card border border-border p-3 transition-all hover:shadow-md ${
        isFeatured
          ? "border-l-[3px] border-l-primary shadow-sm"
          : ""
      } ${isGratuit ? "opacity-75" : ""}`}
    >
      {/* Thumbnail */}
      <Link
        to={`/companie/${listing.slug ?? listing.id}`}
        className="shrink-0 w-[120px] h-[90px] rounded-lg overflow-hidden bg-secondary"
      >
        {listing.image && !isGratuit ? (
          <img
            src={listing.image}
            alt={listing.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/30 text-xs bg-muted">
            {isGratuit ? "—" : "Foto"}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {listing.category}
        </p>
        <Link
          to={`/companie/${listing.slug ?? listing.id}`}
          className="text-[15px] font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
        >
          {listing.name}
        </Link>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {planLabel[listing.plan] && (
            <Badge
              variant="outline"
              className="text-[10px] border-primary/30 text-primary py-0"
            >
              {planLabel[listing.plan]}
            </Badge>
          )}
          {listing.recommended && (
            <Badge className="bg-primary text-primary-foreground text-[10px] py-0">
              <Star size={9} className="mr-0.5" />
              Recomandat
            </Badge>
          )}
        </div>

        {/* Description */}
        {!isGratuit && listing.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {listing.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground mt-auto">
          {listing.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <Star size={12} className="fill-accent text-accent" />
              <span className="font-semibold text-foreground">
                {listing.rating}
              </span>
              <span className="text-[10px]">({listing.reviewCount})</span>
            </div>
          )}
          <div className="flex items-center gap-0.5">
            <MapPin size={11} />
            <span>{listing.city}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Clock size={11} />
            <span
              className={
                listing.isOpen ? "text-green-600" : "text-destructive"
              }
            >
              {listing.isOpen ? "Deschis" : "Închis"}
            </span>
          </div>
          {listing.phone && (
            <div className="flex items-center gap-0.5">
              <Phone size={11} />
              <span>{listing.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="hidden sm:flex flex-col items-end gap-2 shrink-0 justify-center">
        <Button size="sm" className="text-xs h-8">
          <Phone size={13} className="mr-1" />
          Sună
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
          asChild
        >
          <Link to={`/companie/${listing.slug ?? listing.id}`}>
            Profil →
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchResultCard;
