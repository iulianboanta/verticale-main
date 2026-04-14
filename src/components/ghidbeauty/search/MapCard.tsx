import { Star, MapPin, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SearchListing } from "@/data/searchMockData";

interface Props {
  listing: SearchListing;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const MapCard = ({ listing, index, isActive, onClick }: Props) => {
  const isFeatured = listing.plan === "profesional";

  return (
    <div
      id={`map-card-${listing.id}`}
      onClick={onClick}
      className={`flex gap-3 rounded-lg border p-2.5 cursor-pointer transition-all ${
        isFeatured ? "border-l-[3px] border-l-primary" : ""
      } ${
        isActive
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:shadow-sm"
      }`}
    >
      {/* Number badge */}
      <div
        className={`flex items-center justify-center shrink-0 w-5 h-5 rounded-full text-[10px] font-bold mt-0.5 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {index + 1}
      </div>

      {/* Thumbnail */}
      <div className="shrink-0 w-[72px] h-[60px] rounded-md overflow-hidden bg-secondary">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/30 text-[10px]">
            Foto
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          {listing.category}
        </p>
        <Link
          to={`/companie/${listing.slug ?? listing.id}`}
          className="text-[13px] font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
          onClick={(e) => e.stopPropagation()}
        >
          {listing.name}
        </Link>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          {listing.rating > 0 && (
            <span className="flex items-center gap-0.5">
              <Star size={10} className="fill-accent text-accent" />
              <span className="font-semibold text-foreground">{listing.rating}</span>
              <span className="text-[9px]">({listing.reviewCount})</span>
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <MapPin size={9} />
            {listing.city}
          </span>
          <span
            className={`flex items-center gap-0.5 ${
              listing.isOpen ? "text-green-600" : "text-destructive"
            }`}
          >
            <Clock size={9} />
            {listing.isOpen ? "Deschis" : "Închis"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 mt-1">
          <Button size="sm" className="text-[10px] h-6 px-2.5">
            <Phone size={10} className="mr-0.5" />
            Sună
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[10px] h-6 px-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
            asChild
          >
            <Link
              to={`/companie/${listing.slug ?? listing.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              Profil →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
