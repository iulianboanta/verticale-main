import { useEffect, useState } from "react";
import { useVertical } from "@/lib/vertical";

type Palette = "tractari" | "tractari-v2" | "tractari-v3";

const LABELS: Record<Palette, { name: string; desc: string; swatches: string[] }> = {
  "tractari": {
    name: "V1 · Navy & Amber",
    desc: "Actuală — încredere + urgență",
    swatches: ["#263354", "#F59E0B", "#F7F8FA", "#171D2D"],
  },
  "tractari-v2": {
    name: "V2 · Safety Red & Charcoal",
    desc: "Emergency / pompieri",
    swatches: ["#1F1F1F", "#E23B2E", "#F5F5F5", "#0A0A0A"],
  },
  "tractari-v3": {
    name: "V3 · Hi-Vis Yellow & Asphalt",
    desc: "Vestă reflectorizantă / wrecker",
    swatches: ["#1B1F27", "#FFD60A", "#F7F5EF", "#0F1116"],
  },
};

const STORAGE_KEY = "tractari-palette";

const TractariPaletteSwitcher = () => {
  const { vertical } = useVertical();
  const [palette, setPalette] = useState<Palette>(() => {
    if (typeof window === "undefined") return "tractari";
    return (window.localStorage.getItem(STORAGE_KEY) as Palette) || "tractari";
  });

  useEffect(() => {
    if (vertical.key !== "tractari") return;
    document.documentElement.setAttribute("data-theme", palette);
    try { window.localStorage.setItem(STORAGE_KEY, palette); } catch {}
  }, [palette, vertical.key]);

  if (vertical.key !== "tractari") return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur w-64">
      <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Paletă tractări
      </div>
      <div className="flex flex-col gap-1.5">
        {(Object.keys(LABELS) as Palette[]).map((p) => {
          const active = palette === p;
          return (
            <button
              key={p}
              onClick={() => setPalette(p)}
              className={`rounded-md px-2 py-2 text-left text-xs transition border ${
                active ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">{LABELS[p].name}</span>
              </div>
              <div className="flex gap-1 mb-1">
                {LABELS[p].swatches.map((c, i) => (
                  <span
                    key={i}
                    className="h-4 w-6 rounded-sm border border-border/50"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="text-[10px] text-muted-foreground">{LABELS[p].desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TractariPaletteSwitcher;
