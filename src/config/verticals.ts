import heroBeauty from "@/assets/hero-bg.jpg";
import heroFunerare from "@/assets/hero-funerare.jpg";

export type VerticalKey = "beauty" | "funerare";

export interface VerticalConfig {
  key: VerticalKey;
  brand: string;
  domain: string;
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
  heroImage: string;
  footerDescription: string;
  email: string;
  phone: string;
}

export const VERTICALS: Record<VerticalKey, VerticalConfig> = {
  beauty: {
    key: "beauty",
    brand: "GhidBeauty.ro",
    domain: "ghidbeauty.ro",
    tagline: {
      prefix: "Găsește profesioniștii din",
      highlight: "beauty",
      suffix: "lângă tine",
    },
    subtitle:
      "Saloane, spa-uri, studiouri de unghii, cosmetică, tatuaje și mai mult — toate într-un singur loc.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: salon, manichiură)",
      unde: "Unde? (oraș sau județ)",
    },
    heroImage: heroBeauty,
    footerDescription:
      "Directorul #1 de beauty din România. Conectăm clienții cu profesioniștii din industria frumuseții.",
    email: "contact@ghidbeauty.ro",
    phone: "0314044440",
  },
  funerare: {
    key: "funerare",
    brand: "GhidFunerare.ro",
    domain: "ghidfunerare.ro",
    tagline: {
      prefix: "Sprijin și demnitate în",
      highlight: "momentele dificile",
      suffix: "",
    },
    subtitle:
      "Servicii funerare, capele, transport, florării, pietre funerare — profesioniști de încredere, disponibili 24/7.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: pompe funebre, capelă)",
      unde: "Unde? (oraș sau județ)",
    },
    heroImage: heroFunerare,
    footerDescription:
      "Director de servicii funerare din România. Vă oferim sprijin discret și profesionist în momentele dificile.",
    email: "contact@ghidfunerare.ro",
    phone: "0314044441",
  },
};

export const DEFAULT_VERTICAL: VerticalKey = "beauty";
