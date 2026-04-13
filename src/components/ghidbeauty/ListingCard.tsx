import { Star, Eye, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { Listing } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const planStyles: Record<string, string> = {
  profesional: "card-premium",
  intro: "",
  gratuit: "",
};

const planBadge: Record<string, { label: string; className: string } | null> = {
  profesional: { label: "Recomandat", className: "bg-primary text-primary-foreground" },
  intro: null,
  gratuit: null,
};

interface Props {
  listing: Listing;
  compact?: boolean;
}

const ListingCard = ({ listing, compact = false }: Props) => {
  const badge = planBadge[listing.plan];

  return (
    <Link
      to={`/companie/${listing.slug ?? listing.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${planStyles[listing.plan]}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full bg-secondary overflow-hidden">
        {listing.image ? (
          <img src={listing.image} alt={listing.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <Sparkles size={32} />
          </div>
        )}
        {badge && (
          <span
            className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${badge.className}`}
          >
            {listing.plan === "profesional" && <Star size={10} />}
            {badge.label}
          </span>
        )}
        {listing.isNew && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px]">
            NOU
          </Badge>
        )}
      </div>

      {/* Content – compact: name, category + location + rating + views on fewer lines */}
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {listing.name}
          </h3>
          {listing.rating > 0 && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Star size={12} className="fill-accent text-accent" />
              <span className="text-xs font-semibold text-foreground">{listing.rating}</span>
              <span className="text-[10px] text-muted-foreground">({listing.reviewCount})</span>
            </div>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 min-w-0">
            <span className="truncate">{listing.category}</span>
            <span className="text-muted-foreground/40">·</span>
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{listing.city}</span>
          </div>
          {listing.views != null && (
            <div className="flex items-center gap-0.5 shrink-0 text-[10px]">
              <Eye size={11} />
              <span>{listing.views.toLocaleString("ro-RO")}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
