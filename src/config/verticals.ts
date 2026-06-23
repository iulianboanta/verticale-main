import heroBeauty from "@/assets/hero-bg.jpg";
import heroFunerare from "@/assets/hero-funerare.jpg";
import heroVeterinari from "@/assets/hero-veterinari.jpg";
import heroTractari from "@/assets/hero-tractari.jpg";
import heroGradinite from "@/assets/hero-gradinite.jpg";
import heroUsi from "@/assets/hero-usi.jpg";
import heroCuratenie from "@/assets/hero-curatenie.jpg";
import funerareLogoFilled from "@/assets/funerare-logo-filled.png";
import funerareLogoWhite from "@/assets/funerare-logo-white.png";

export type VerticalKey =
  | "beauty"
  | "funerare"
  | "veterinari"
  | "tractari"
  | "gradinite"
  | "usi"
  | "curatenie";

export interface VerticalConfig {
  key: VerticalKey;
  brand: string;
  domain: string;
  logo?: string;
  logoWhite?: string;
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
    logo: funerareLogoFilled,
    logoWhite: funerareLogoWhite,
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
  gradinite: {
    key: "gradinite",
    brand: "GhidGradinite.ro",
    domain: "ghidgradinite.ro",
    tagline: {
      prefix: "Cea mai bună",
      highlight: "grădiniță",
      suffix: "pentru copilul tău",
    },
    subtitle:
      "Grădinițe private și de stat, creșe, after-school și programe educaționale — găsește locul perfect pentru copilul tău.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: grădiniță, creșă, after-school)",
      unde: "Unde? (oraș sau sector)",
    },
    heroImage: heroGradinite,
    footerDescription:
      "Director de grădinițe și creșe din România. Te ajutăm să găsești locul potrivit pentru copilul tău.",
    email: "contact@ghidgradinite.ro",
    phone: "0314044444",
  },
  usi: {
    key: "usi",
    brand: "GhidUsi.ro",
    domain: "ghidusi.ro",
    tagline: {
      prefix: "Uși și tâmplărie pe",
      highlight: "măsura casei tale",
      suffix: "",
    },
    subtitle:
      "Uși de interior și exterior, tâmplărie PVC și lemn, uși metalice, automatizări și montaj profesionist — direct de la specialiști.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: uși interior, tâmplărie PVC)",
      unde: "Unde? (oraș sau județ)",
    },
    heroImage: heroUsi,
    footerDescription:
      "Director de producători, distribuitori și montatori de uși din România. Soluții pentru orice tip de proiect.",
    email: "contact@ghidusi.ro",
    phone: "0314044445",
  },
  curatenie: {
    key: "curatenie",
    brand: "GhidCuratenie.ro",
    domain: "ghidcuratenie.ro",
    tagline: {
      prefix: "Servicii de curățenie",
      highlight: "impecabile",
      suffix: "lângă tine",
    },
    subtitle:
      "Firme de curățenie pentru locuințe, birouri, scări de bloc, post-construcție și curățenie industrială — profesioniști verificați.",
    searchPlaceholders: {
      ce: "Ce cauți? (ex: curățenie apartament, birouri)",
      unde: "Unde? (oraș sau județ)",
    },
    heroImage: heroCuratenie,
    footerDescription:
      "Director de firme de curățenie din România. Conectăm clienții cu echipe profesioniste, verificate și de încredere.",
    email: "contact@ghidcuratenie.ro",
    phone: "0314044446",
  },
};

export const DEFAULT_VERTICAL: VerticalKey = "beauty";
