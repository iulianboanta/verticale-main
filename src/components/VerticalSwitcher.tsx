import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { useVertical } from "@/lib/vertical";
import { VERTICALS, VerticalKey } from "@/config/verticals";

const VerticalSwitcher = () => {
  const { vertical, setVertical } = useVertical();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {open && (
        <div className="mb-2 w-56 rounded-xl border border-border bg-card p-2 shadow-2xl">
          <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Verticală
          </div>
          {(Object.keys(VERTICALS) as VerticalKey[]).map((k) => {
            const v = VERTICALS[k];
            const active = vertical.key === k;
            return (
              <button
                key={k}
                onClick={() => {
                  setVertical(k);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                }`}
              >
                <span>{v.brand}</span>
                {active && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-2 ring-background hover:scale-105 transition-transform"
        aria-label="Switch vertical"
        title={`Verticală activă: ${vertical.brand}`}
      >
        <Palette size={20} />
      </button>
    </div>
  );
};

export default VerticalSwitcher;
