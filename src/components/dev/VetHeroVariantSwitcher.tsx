import { useVetHeroVariant, VET_HERO_LABELS, VetHeroVariant } from "@/lib/veterinariHeroVariant";
import { useVertical } from "@/lib/vertical";

const VetHeroVariantSwitcher = () => {
  const { vertical } = useVertical();
  const { variant, setVariant } = useVetHeroVariant();

  if (vertical.key !== "veterinari") return null;

  const variants: VetHeroVariant[] = ["v1", "v2", "v3", "v4"];

  return (
    <div className="fixed bottom-4 left-4 z-[100] rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 text-xs font-semibold text-muted-foreground">Hero veterinari</div>
      <div className="flex flex-col gap-1">
        {variants.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-md px-2 py-1 text-left text-xs transition ${
              variant === v ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {VET_HERO_LABELS[v]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VetHeroVariantSwitcher;
