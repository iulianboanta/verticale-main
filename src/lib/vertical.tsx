import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { VERTICALS, VerticalKey, VerticalConfig, DEFAULT_VERTICAL } from "@/config/verticals";

const STORAGE_KEY = "active-vertical";

interface Ctx {
  vertical: VerticalConfig;
  setVertical: (k: VerticalKey) => void;
}

const VerticalContext = createContext<Ctx | null>(null);

const applyTheme = (key: VerticalKey) => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", key);
};

export const VerticalProvider = ({ children }: { children: ReactNode }) => {
  const [key, setKey] = useState<VerticalKey>(() => {
    if (typeof window === "undefined") return DEFAULT_VERTICAL;
    const stored = window.localStorage.getItem(STORAGE_KEY) as VerticalKey | null;
    return stored && stored in VERTICALS ? stored : DEFAULT_VERTICAL;
  });

  useEffect(() => {
    applyTheme(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch {}
  }, [key]);

  return (
    <VerticalContext.Provider value={{ vertical: VERTICALS[key], setVertical: setKey }}>
      {children}
    </VerticalContext.Provider>
  );
};

export const useVertical = () => {
  const ctx = useContext(VerticalContext);
  if (!ctx) {
    return { vertical: VERTICALS[DEFAULT_VERTICAL], setVertical: () => {} };
  }
  return ctx;
};
