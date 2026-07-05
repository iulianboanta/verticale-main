import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import heroV1 from "@/assets/hero-veterinari.jpg";
import heroV2 from "@/assets/hero-veterinari-v2.jpg";
import heroV3 from "@/assets/hero-veterinari-v3.jpg";
import heroV4 from "@/assets/hero-veterinari-v4.jpg";

export type VetHeroVariant = "v1" | "v2" | "v3" | "v4";

export const VET_HERO_IMAGES: Record<VetHeroVariant, string> = {
  v1: heroV1,
  v2: heroV2,
  v3: heroV3,
  v4: heroV4,
};

export const VET_HERO_LABELS: Record<VetHeroVariant, string> = {
  v1: "V1 · Original",
  v2: "V2 · Veterinar & câini",
  v3: "V3 · Pisoi tandru",
  v4: "V4 · Grup animăluțe",
};

const STORAGE_KEY = "vet-hero-variant";

interface Ctx {
  variant: VetHeroVariant;
  setVariant: (v: VetHeroVariant) => void;
  heroImage: string;
}

const VetHeroCtx = createContext<Ctx | null>(null);

export const VetHeroVariantProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariantState] = useState<VetHeroVariant>(() => {
    if (typeof window === "undefined") return "v2";
    const stored = window.localStorage.getItem(STORAGE_KEY) as VetHeroVariant | null;
    return stored && stored in VET_HERO_IMAGES ? stored : "v2";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, variant);
    } catch {}
  }, [variant]);

  return (
    <VetHeroCtx.Provider value={{ variant, setVariant: setVariantState, heroImage: VET_HERO_IMAGES[variant] }}>
      {children}
    </VetHeroCtx.Provider>
  );
};

export const useVetHeroVariant = () => {
  const ctx = useContext(VetHeroCtx);
  if (!ctx) throw new Error("useVetHeroVariant must be used within VetHeroVariantProvider");
  return ctx;
};
