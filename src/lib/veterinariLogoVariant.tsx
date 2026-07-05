import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import v1Light from "@/assets/vetlogo/v1-light.svg";
import v1Dark from "@/assets/vetlogo/v1-dark.svg";
import v2Light from "@/assets/vetlogo/v2-light.svg";
import v2Dark from "@/assets/vetlogo/v2-dark.svg";
import v3Light from "@/assets/vetlogo/v3-light.svg";
import v3Dark from "@/assets/vetlogo/v3-dark.svg";

export type VetLogoVariantKey = "v1" | "v2" | "v3";

export const VET_LOGO_VARIANTS: Record<
  VetLogoVariantKey,
  { light: string; dark: string; label: string; description: string }
> = {
  v1: { light: v1Light, dark: v1Dark, label: "Un rând", description: "Simbol + Ghidul Veterinarilor" },
  v2: { light: v2Light, dark: v2Dark, label: "Două rânduri", description: "Simbol + Ghidul / Veterinarilor" },
  v3: { light: v3Light, dark: v3Dark, label: "Domeniu", description: "Simbol + ghidulveterinarilor.ro" },
};

type Ctx = {
  variant: VetLogoVariantKey;
  setVariant: (v: VetLogoVariantKey) => void;
  light: string;
  dark: string;
};

const VetLogoCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "vet_logo_variant";

export function VetLogoVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<VetLogoVariantKey>("v1");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as VetLogoVariantKey | null;
      if (saved && VET_LOGO_VARIANTS[saved]) setVariantState(saved);
    } catch {}
  }, []);

  const setVariant = (v: VetLogoVariantKey) => {
    setVariantState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {}
  };

  const value = useMemo<Ctx>(
    () => ({ variant, setVariant, light: VET_LOGO_VARIANTS[variant].light, dark: VET_LOGO_VARIANTS[variant].dark }),
    [variant],
  );

  return <VetLogoCtx.Provider value={value}>{children}</VetLogoCtx.Provider>;
}

export function useVetLogoVariant() {
  const ctx = useContext(VetLogoCtx);
  if (!ctx) throw new Error("useVetLogoVariant must be used inside VetLogoVariantProvider");
  return ctx;
}
