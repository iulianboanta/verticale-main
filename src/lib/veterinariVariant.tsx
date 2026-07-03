import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import heroV1 from "@/assets/hero-veterinari.jpg";
import heroV2 from "@/assets/hero-veterinari-v2.jpg";
import heroV3 from "@/assets/hero-veterinari-v3.jpg";

export type VetVariantKey = "v1" | "v2" | "v3";

export interface VetVariant {
  key: VetVariantKey;
  label: string;
  heroImage: string;
  tagline: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  subtitle: string;
  searchPlaceholders: {
    ce: string;
    unde: string;
  };
}

export const VET_VARIANTS: Record<VetVariantKey, VetVariant> = {
  v1: {
    key: "v1",
    label: "V1 — Original (blănoși)",
    heroImage: heroV1,
    tagline: {
      prefix: "Grijă și încredere pentru",
      highlight: "prietenii blănoși",
      suffix: "",
    },
    subtitle:
      "Cabinete veterinare, clinici, urgențe 24/7, toaletaj, pet shops și farmacii veterinare — toți specialiștii într-un singur loc.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: veterinar, urgențe, toaletaj)",
      unde: "Unde? (oraș sau județ)",
    },
  },
  v2: {
    key: "v2",
    label: "V2 — Companioni de familie",
    heroImage: heroV2,
    tagline: {
      prefix: "Medici veterinari pentru",
      highlight: "toți companionii tăi",
      suffix: "",
    },
    subtitle:
      "De la câini și pisici, până la iepuri, păsări, rozătoare sau reptile — cabinete veterinare, clinici, urgențe 24/7, toaletaj, pet shops și farmacii veterinare, toți specialiștii într-un singur loc.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: veterinar, urgențe, exotice, toaletaj)",
      unde: "Unde? (oraș sau județ)",
    },
  },
  v3: {
    key: "v3",
    label: "V3 — De la companie la fermă",
    heroImage: heroV3,
    tagline: {
      prefix: "Medici veterinari pentru",
      highlight: "orice fel de animal",
      suffix: "",
    },
    subtitle:
      "De la animale de companie și exotice, până la cabaline și animale de fermă — găsești rapid specialiștii potriviți, cu urgențe non-stop și servicii complete.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: veterinar, exotice, cabaline)",
      unde: "Unde? (oraș sau județ)",
    },
  },
};

const STORAGE_KEY = "veterinari-variant";
const EVT = "veterinari-variant-changed";

interface Ctx {
  variant: VetVariant;
  setVariant: (k: VetVariantKey) => void;
}

const VetVariantContext = createContext<Ctx | null>(null);

export const VeterinariVariantProvider = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState<VetVariantKey>(() => {
    if (typeof window === "undefined") return "v1";
    const stored = window.localStorage.getItem(STORAGE_KEY) as VetVariantKey | null;
    return stored && stored in VET_VARIANTS ? stored : "v1";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
      window.dispatchEvent(new Event(EVT));
    } catch {}
  }, [key]);

  useEffect(() => {
    const handler = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY) as VetVariantKey | null;
      if (stored && stored in VET_VARIANTS && stored !== key) setKey(stored);
    };
    window.addEventListener(EVT, handler);
    return () => window.removeEventListener(EVT, handler);
  }, [key]);

  return (
    <VetVariantContext.Provider value={{ variant: VET_VARIANTS[key], setVariant: setKey }}>
      {children}
    </VetVariantContext.Provider>
  );
};

export const useVeterinariVariant = () => {
  const ctx = useContext(VetVariantContext);
  if (!ctx) return { variant: VET_VARIANTS.v1, setVariant: () => {} };
  return ctx;
};
