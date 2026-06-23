import { useEffect, useState } from "react";
import { useVertical } from "@/lib/vertical";

type Variant = "usi" | "usi-v1" | "usi-v2" | "usi-v3";

const VARIANTS: { key: Variant; label: string; hint: string }[] = [
  { key: "usi", label: "Original", hint: "Maro warm" },
  { key: "usi-v1", label: "V1", hint: "Cărămidă & negru" },
  { key: "usi-v2", label: "V2", hint: "Rubin & grafit" },
  { key: "usi-v3", label: "V3", hint: "Negru & accent roșu" },
];

const UsiThemeSwitcher = () => {
  const { vertical } = useVertical();
  const [active, setActive] = useState<Variant>("usi");

  // Only show on usi vertical
  if (vertical.key !== "usi") return null;

  const apply = (key: Variant) => {
    document.documentElement.setAttribute("data-theme", key);
    setActive(key);
  };

  // Re-apply on mount if user clicked one then re-rendered
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
  }, [active]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] rounded-lg border border-border bg-card/95 backdrop-blur shadow-lg p-2 flex flex-col gap-1 text-xs">
      <div className="px-2 pt-1 pb-1 font-semibold text-foreground">Temă usi</div>
      {VARIANTS.map((v) => (
        <button
          key={v.key}
          onClick={() => apply(v.key)}
          className={`text-left px-3 py-1.5 rounded transition ${
            active === v.key
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted text-foreground"
          }`}
        >
          <div className="font-medium">{v.label}</div>
          <div className="opacity-70 text-[10px]">{v.hint}</div>
        </button>
      ))}
    </div>
  );
};

export default UsiThemeSwitcher;
