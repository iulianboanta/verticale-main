import { Star, Eye, MapPin, Sparkles } from "lucide-react";
import type { Listing } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const planStyles: Record<string, string> = {
  premium: "card-premium",
  pro: "card-pro",
  free: "",
};

const planBadge: Record<string, { label: string; className: string } | null> = {
  premium: { label: "Premium", className: "bg-primary text-primary-foreground" },
  pro: { label: "Pro", className: "bg-primary/15 text-primary border border-primary/30" },
  free: null,
};

interface Props {
  listing: Listing;
  compact?: boolean;
}

const ListingCard = ({ listing, compact = false }: Props) => {
  const badge = planBadge[listing.plan];

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${planStyles[listing.plan]}`}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/10] w-full bg-secondary">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
          <Sparkles size={32} />
        </div>
        {badge && (
          <span
            className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${badge.className}`}
          >
            {listing.plan === "premium" && <Star size={10} />}
            {badge.label}
          </span>
        )}
        {listing.isNew && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px]">
            NOU
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col p-4 ${compact ? "p-3" : ""}`}>
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {listing.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{listing.category}</p>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={12} />
          <span>
            {listing.city}, {listing.county}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          {listing.rating > 0 ? (
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-accent text-accent" />
              <span className="text-xs font-semibold text-foreground">
                {listing.rating}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({listing.reviewCount})
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-muted-foreground italic">
              Fără recenzii
            </span>
          )}

          {listing.views != null && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Eye size={12} />
              <span>{listing.views.toLocaleString("ro-RO")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
