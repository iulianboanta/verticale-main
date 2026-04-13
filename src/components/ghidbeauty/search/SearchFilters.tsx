import { useState } from "react";
import { Search, Star, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  filterCategories,
  filterLocalities,
  filterServices,
  filterFacilities,
} from "@/data/searchMockData";

export interface ActiveFilters {
  categories: string[];
  localities: string[];
  minRating: number;
  openNow: boolean;
  services: string[];
  facilities: string[];
  onlyRecommended: boolean;
  onlyCounty: boolean;
}

interface Props {
  filters: ActiveFilters;
  onChange: (f: ActiveFilters) => void;
  onReset: () => void;
}

const FilterGroup = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {title}
    </h4>
    {children}
    <Separator />
  </div>
);

const CheckboxList = ({
  items,
  selected,
  onToggle,
  maxVisible = 5,
}: {
  items: { name: string; count: number }[];
  selected: string[];
  onToggle: (name: string) => void;
  maxVisible?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, maxVisible);

  return (
    <div className="space-y-2">
      {visible.map((item) => (
        <label
          key={item.name}
          className="flex items-center gap-2 cursor-pointer text-sm"
        >
          <Checkbox
            checked={selected.includes(item.name)}
            onCheckedChange={() => onToggle(item.name)}
          />
          <span className="flex-1 text-foreground">{item.name}</span>
          <span className="text-xs text-muted-foreground">{item.count}</span>
        </label>
      ))}
      {items.length > maxVisible && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:underline"
        >
          {expanded ? "Arată mai puțin" : `Vezi toate (${items.length})`}
        </button>
      )}
    </div>
  );
};

const SearchFilters = ({ filters, onChange, onReset }: Props) => {
  const hasActive =
    filters.categories.length > 0 ||
    filters.localities.length > 0 ||
    filters.minRating > 0 ||
    filters.openNow ||
    filters.services.length > 0 ||
    filters.facilities.length > 0 ||
    filters.onlyRecommended ||
    filters.onlyCounty;

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const ratingOptions = [
    { label: "★★★★★", value: 5, count: 8 },
    { label: "★★★★+", value: 4, count: 23 },
    { label: "★★★+", value: 3, count: 45 },
    { label: "Toate", value: 0, count: 67 },
  ];

  const today = new Date().toLocaleDateString("ro-RO", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filtre</h3>
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <RotateCcw size={12} />
            Resetează toate
          </button>
        )}
      </div>
      <Separator />

      {/* Categorie */}
      <FilterGroup title="Categorie">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Caută categorie..."
            className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-xs text-foreground outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
          />
        </div>
        <CheckboxList
          items={filterCategories}
          selected={filters.categories}
          onToggle={(n) =>
            onChange({ ...filters, categories: toggle(filters.categories, n) })
          }
        />
      </FilterGroup>

      {/* Localitate */}
      <FilterGroup title="Localitate">
        <CheckboxList
          items={filterLocalities}
          selected={filters.localities}
          onToggle={(n) =>
            onChange({ ...filters, localities: toggle(filters.localities, n) })
          }
        />
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Rating minim">
        <div className="space-y-1.5">
          {ratingOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === opt.value}
                onChange={() =>
                  onChange({ ...filters, minRating: opt.value })
                }
                className="accent-primary h-3.5 w-3.5"
              />
              <span className="flex-1 text-foreground">
                {opt.value > 0 ? (
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={
                          s <= opt.value
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/30"
                        }
                      />
                    ))}
                    {opt.value < 5 && (
                      <span className="text-xs text-muted-foreground ml-0.5">
                        +
                      </span>
                    )}
                  </span>
                ) : (
                  "Toate"
                )}
              </span>
              <span className="text-xs text-muted-foreground">{opt.count}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Program */}
      <FilterGroup title="Program">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-foreground">Deschis acum</span>
            <p className="text-[10px] text-muted-foreground">{today}</p>
          </div>
          <Switch
            checked={filters.openNow}
            onCheckedChange={(v) => onChange({ ...filters, openNow: v })}
          />
        </div>
      </FilterGroup>

      {/* Servicii */}
      <FilterGroup title="Servicii oferite">
        <CheckboxList
          items={filterServices}
          selected={filters.services}
          onToggle={(n) =>
            onChange({ ...filters, services: toggle(filters.services, n) })
          }
          maxVisible={4}
        />
      </FilterGroup>

      {/* Facilități */}
      <FilterGroup title="Facilități">
        <CheckboxList
          items={filterFacilities}
          selected={filters.facilities}
          onToggle={(n) =>
            onChange({
              ...filters,
              facilities: toggle(filters.facilities, n),
            })
          }
        />
      </FilterGroup>

      {/* Vizibilitate */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Vizibilitate
        </h4>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <Checkbox
            checked={filters.onlyRecommended}
            onCheckedChange={(v) =>
              onChange({ ...filters, onlyRecommended: !!v })
            }
          />
          <span className="flex items-center gap-1.5 text-foreground">
            Doar recomandate
            <Badge className="bg-primary text-primary-foreground text-[9px] px-1.5 py-0">
              Pro
            </Badge>
          </span>
        </label>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-foreground">Doar din județ</span>
            <p className="text-[10px] text-muted-foreground">
              Exclude zone deservite
            </p>
          </div>
          <Switch
            checked={filters.onlyCounty}
            onCheckedChange={(v) => onChange({ ...filters, onlyCounty: v })}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
export { type Props as SearchFiltersProps };
