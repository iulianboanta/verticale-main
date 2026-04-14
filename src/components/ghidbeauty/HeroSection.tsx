import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AutosuggestInput, { ceSuggestions, undeSuggestions } from "@/components/ghidbeauty/search/AutosuggestInput";
import heroBg from "@/assets/hero-bg.jpg";

const ceSuggestions = [
  "Salon de înfrumusețare",
  "Manichiură",
  "Coafor",
  "Cosmetică",
  "Masaj",
  "Extensii gene",
  "Epilare",
  "Tatuaje",
  "Barbershop",
  "Makeup artist",
];

const undeSuggestions = [
  "București",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Brașov",
  "Sibiu",
  "Oradea",
  "Craiova",
  "Galați",
];

interface AutosuggestInputProps {
  icon: React.ReactNode;
  placeholder: string;
  suggestions: string[];
  value: string;
  onChange: (v: string) => void;
}

const AutosuggestInput = ({ icon, placeholder, suggestions, value, onChange }: AutosuggestInputProps) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = value.trim()
    ? suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    : suggestions;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      onChange(filtered[highlighted]);
      setOpen(false);
      setHighlighted(-1);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative flex-1">
      <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 sm:rounded-full">
        <span className="shrink-0 text-muted-foreground">{icon}</span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setHighlighted(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-56 overflow-auto rounded-xl border border-border bg-card p-1 shadow-lg animate-in fade-in-0 slide-in-from-top-1 duration-150">
          {filtered.map((item, i) => (
            <button
              key={item}
              type="button"
              onMouseDown={() => {
                onChange(item);
                setOpen(false);
              }}
              onMouseEnter={() => setHighlighted(i)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                i === highlighted
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs ${
                i === highlighted ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {item[0]}
              </span>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const HeroSection = () => {
  const [ceValue, setCeValue] = useState("");
  const [undeValue, setUndeValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (ceValue.trim()) params.set("q", ceValue.trim());
    if (undeValue.trim()) params.set("unde", undeValue.trim());
    navigate(`/cautare?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-36 md:pt-40 md:pb-48">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] drop-shadow-lg">
          Găsește profesioniștii din{" "}
          <span className="text-primary-glow">beauty</span> lângă tine
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg drop-shadow">
          Saloane, spa-uri, studiouri de unghii, cosmetică, tatuaje și mai mult
          — toate într-un singur loc.
        </p>

        {/* Search bar */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex flex-col gap-3 rounded-2xl bg-card p-2 shadow-lg sm:flex-row sm:items-center sm:rounded-full">
            <AutosuggestInput
              icon={<Search size={18} />}
              placeholder="Ce cauți? (ex: salon, manichiură)"
              suggestions={ceSuggestions}
              value={ceValue}
              onChange={setCeValue}
            />
            <AutosuggestInput
              icon={<MapPin size={18} />}
              placeholder="Unde? (oraș sau județ)"
              suggestions={undeSuggestions}
              value={undeValue}
              onChange={setUndeValue}
            />
            <Button className="rounded-xl sm:rounded-full px-6" onClick={handleSearch}>
              <Search size={18} />
              <span className="sm:hidden md:inline ml-1">Caută</span>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-xs text-white/70">
          Peste <span className="font-semibold text-primary-glow">2.500</span> de
          afaceri listate &bull; Acoperire națională
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
