import { useState, useRef, useEffect } from "react";

export const ceSuggestions = [
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

export const undeSuggestions = [
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
  /** Compact variant for inline search bars (no background/padding on wrapper) */
  variant?: "default" | "compact";
}

const AutosuggestInput = ({
  icon,
  placeholder,
  suggestions,
  value,
  onChange,
  variant = "default",
}: AutosuggestInputProps) => {
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

  const isCompact = variant === "compact";

  return (
    <div ref={ref} className="relative flex-1">
      <div
        className={
          isCompact
            ? "flex items-center gap-2"
            : "flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 sm:rounded-full"
        }
      >
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
          className={
            isCompact
              ? "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground min-w-0"
              : "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          }
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
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs ${
                  i === highlighted
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
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

export default AutosuggestInput;