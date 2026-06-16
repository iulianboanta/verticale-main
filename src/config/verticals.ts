import heroBeauty from "@/assets/hero-bg.jpg";
import heroFunerare from "@/assets/hero-funerare.jpg";
import heroVeterinari from "@/assets/hero-veterinari.jpg";
import heroTractari from "@/assets/hero-tractari.jpg";

export type VerticalKey = "beauty" | "funerare" | "veterinari" | "tractari";

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
  veterinari: {
    key: "veterinari",
    brand: "GhidVeterinari.ro",
    domain: "ghidveterinari.ro",
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
    heroImage: heroVeterinari,
    footerDescription:
      "Director de servicii veterinare din România. Conectăm proprietarii de animale cu medici veterinari de încredere.",
    email: "contact@ghidveterinari.ro",
    phone: "0314044442",
  },
  tractari: {
    key: "tractari",
    brand: "GhidTractari.ro",
    domain: "ghidtractari.ro",
    tagline: {
      prefix: "Ajutor rapid când ai",
      highlight: "nevoie urgentă",
      suffix: "de tractare",
    },
    subtitle:
      "Tractări auto, asistență rutieră, depanări, remorci și transport vehicule — profesioniști disponibili non-stop în toată România.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: tractare, asistență rutieră)",
      unde: "Unde? (oraș sau județ)",
    },
    heroImage: heroTractari,
    footerDescription:
      "Director de servicii de tractare și asistență rutieră din România. Găsim rapid soluția potrivită pentru orice problemă auto.",
    email: "contact@ghidtractari.ro",
    phone: "0314044443",
  },
};

export const DEFAULT_VERTICAL: VerticalKey = "beauty";
