import { useVertical } from "@/lib/vertical";
import { VET_LOGO_VARIANTS, useVetLogoVariant, type VetLogoVariantKey } from "@/lib/veterinariLogoVariant";

const VetLogoVariantSwitcher = () => {
  const { vertical } = useVertical();
  const { variant, setVariant } = useVetLogoVariant();

  if (vertical.key !== "veterinari") return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100] rounded-lg border bg-card/95 shadow-lg backdrop-blur p-3 text-xs">
      <div className="mb-2 font-semibold text-foreground">Logo variant</div>
      <div className="flex flex-col gap-1">
        {(Object.keys(VET_LOGO_VARIANTS) as VetLogoVariantKey[]).map((k) => {
          const v = VET_LOGO_VARIANTS[k];
          const active = variant === k;
          return (
            <button
              key={k}
              onClick={() => setVariant(k)}
              className={`text-left px-2 py-1 rounded transition-colors ${
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <div className="font-medium">{v.label}</div>
              <div className={`text-[10px] ${active ? "opacity-90" : "text-muted-foreground"}`}>
                {v.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VetLogoVariantSwitcher;
