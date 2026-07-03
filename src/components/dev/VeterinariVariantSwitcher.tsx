import { useVertical } from "@/lib/vertical";
import {
  useVeterinariVariant,
  VET_VARIANTS,
  VetVariantKey,
} from "@/lib/veterinariVariant";

const VeterinariVariantSwitcher = () => {
  const { vertical } = useVertical();
  const { variant, setVariant } = useVeterinariVariant();

  if (vertical.key !== "veterinari") return null;

  return (
    <div className="fixed bottom-4 right-20 z-[100] flex flex-col gap-1 rounded-xl border border-border bg-card p-2 shadow-2xl">
      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Veterinari — variante
      </div>
      {(Object.keys(VET_VARIANTS) as VetVariantKey[]).map((k) => {
        const v = VET_VARIANTS[k];
        const active = variant.key === k;
        return (
          <button
            key={k}
            onClick={() => setVariant(k)}
            className={`rounded-lg px-3 py-1.5 text-left text-xs transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
};

export default VeterinariVariantSwitcher;
