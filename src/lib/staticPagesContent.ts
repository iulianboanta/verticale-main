import { useEffect, useState, useCallback } from "react";

// ============================================================
// Schemas
// ============================================================

export interface SeoMeta {
  title: string;
  metaDescription: string;
  slug: string;
}

export interface Benefit {
  title: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface DespreGhidBeautyContent {
  seo: SeoMeta;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaSearch: string;
    ctaRegister: string;
  };
  stats: Stat[];
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  forClients: {
    eyebrow: string;
    title: string;
    paragraph: string;
    benefits: Benefit[];
  };
  forPros: {
    eyebrow: string;
    title: string;
    paragraph: string;
    benefits: Benefit[];
    cta: string;
  };
  mission: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    ctaExplore: string;
    ctaRegister: string;
  };
}

export interface DespreCompanieContent {
  seo: SeoMeta;
  hero: {
    title: string;
    subtitle: string;
  };
  paginiNationale: {
    title: string;
    description: string;
  };
  roLocal: {
    title: string;
    description: string;
  };
  description: {
    paginiText: string;
    rolocalText: string;
  };
  retea: {
    title: string;
    paragraph: string;
  };
  expertMediu: {
    title: string;
    paragraph: string;
  };
  cta: string;
}

export interface SimpleHeroPageContent {
  seo: SeoMeta;
  hero: {
    title: string;
    subtitle: string;
    lastUpdated: string;
  };
}

export type StaticPagesContent = {
  "despre-ghidbeauty": DespreGhidBeautyContent;
  "despre-companie": DespreCompanieContent;
  termeni: SimpleHeroPageContent;
  politica: SimpleHeroPageContent;
};

export type PageKey = keyof StaticPagesContent;

export const PAGE_LABELS: Record<PageKey, string> = {
  "despre-ghidbeauty": "Despre GhidBeauty",
  "despre-companie": "Despre Companie",
  termeni: "Termeni și Condiții",
  politica: "Politica de Confidențialitate",
};

// ============================================================
// Defaults (extracted from current public-page JSX)
// ============================================================

export const defaultContent: StaticPagesContent = {
  "despre-ghidbeauty": {
    seo: {
      title: "Despre noi — GhidBeauty",
      metaDescription:
        "Află povestea GhidBeauty, platforma care conectează clienții cu cele mai bune saloane și specialiști din industria beauty.",
      slug: "/despre-noi",
    },
    hero: {
      eyebrow: "Despre GhidBeauty",
      title: "Directorul #1 de beauty din România",
      subtitle:
        "GhidBeauty.ro conectează clienții cu cele mai bune saloane, studiourile și profesioniștii din industria frumuseții — rapid, simplu și gratuit.",
      ctaSearch: "Caută un salon",
      ctaRegister: "Înscrie-ți afacerea",
    },
    stats: [
      { value: "5.000+", label: "Saloane listate" },
      { value: "42", label: "Județe acoperite" },
      { value: "50+", label: "Categorii beauty" },
      { value: "100K+", label: "Căutări lunare" },
    ],
    about: {
      title: "Ce este GhidBeauty?",
      paragraph1:
        "GhidBeauty.ro este cel mai cuprinzător director online dedicat industriei de beauty din România. Platforma reunește saloane de coafură, studiourile de manichiură, centre de estetică, barbershopuri, clinici de beauty și toți profesioniștii care te ajută să arăți și să te simți extraordinar.",
      paragraph2:
        "Fie că ești client în căutarea unui serviciu de calitate sau profesionist care dorește mai multă vizibilitate, GhidBeauty este locul unde cererea întâlnește oferta — organizat, transparent și ușor de folosit.",
    },
    forClients: {
      eyebrow: "Pentru clienți",
      title: "Găsește salonul perfect pentru tine",
      paragraph:
        "Nu mai pierde timpul cu căutări nesfârșite. Pe GhidBeauty poți filtra după locație, serviciu, preț sau recenzii și descoperi rapid saloanele potrivite nevoilor tale.",
      benefits: [
        { title: "Găsești rapid", text: "Caută după serviciu, locație sau nume și găsește salonul perfect în câteva secunde." },
        { title: "Recenzii reale", text: "Citește opiniile altor clienți și alege în cunoștință de cauză." },
        { title: "Aproape de tine", text: "Filtrează după oraș sau județ și descoperă profesioniști din zona ta." },
        { title: "Informații verificate", text: "Detalii de contact, program, servicii — totul actualizat și la un click distanță." },
      ],
    },
    forPros: {
      eyebrow: "Pentru profesioniști",
      title: "Crește-ți afacerea cu GhidBeauty",
      paragraph:
        "Peste 100.000 de căutări lunare fac din GhidBeauty locul ideal pentru a-ți promova salonul sau studioul. Creează-ți un profil complet și lasă clienții să te descopere.",
      benefits: [
        { title: "Vizibilitate online", text: "Fii prezent acolo unde clienții tăi caută — în cel mai mare director beauty din România." },
        { title: "Clienți noi", text: "Atrage clienți care caută exact serviciile pe care le oferi." },
        { title: "Profil complet", text: "Prezintă-ți serviciile, prețurile, portofoliul foto și recenziile într-un singur loc." },
        { title: "Credibilitate", text: "Un profil profesional pe GhidBeauty transmite încredere și seriozitate." },
      ],
      cta: "Înscrie-ți afacerea gratuit",
    },
    mission: {
      title: "Misiunea noastră",
      paragraph1:
        "Credem că fiecare persoană merită acces ușor la servicii de beauty de calitate, indiferent de oraș sau buget. Misiunea GhidBeauty este să digitalizeze industria de frumusețe din România, oferind o platformă unde transparența, calitatea și accesibilitatea sunt pe primul loc.",
      paragraph2:
        "De la marile orașe până în localitățile mici, ne dorim ca fiecare salon, studio sau freelancer din beauty să aibă o prezență online profesională — iar fiecare client să găsească serviciul potrivit la un click distanță.",
    },
    finalCta: {
      title: "Intră în comunitatea GhidBeauty",
      subtitle: "Fie că ești client sau profesionist, GhidBeauty te ajută să faci alegeri mai bune în beauty.",
      ctaExplore: "Explorează saloane",
      ctaRegister: "Înscrie-ți afacerea",
    },
  },

  "despre-companie": {
    seo: {
      title: "Despre companie — GhidBeauty",
      metaDescription:
        "Informații despre compania din spatele GhidBeauty: echipă, valori și viziunea noastră pentru industria beauty.",
      slug: "/cine-suntem-noi",
    },
    hero: {
      title: "Despre Companie",
      subtitle:
        "Descoperiți povestea din spatele Directories Management Systems — operatorul platformei GhidBeauty.ro și al unei rețele de ghiduri de afaceri cu tradiție.",
    },
    paginiNationale: {
      title: "Pagini Naționale",
      description: "Ghid Național B2B",
    },
    roLocal: {
      title: "roLOCAL",
      description: "Ghid Local B2C București",
    },
    description: {
      paginiText:
        "Pagini Naționale este cel mai longeviv ghid de afaceri B2B din România cu 28 de ani de apariție continuă.",
      rolocalText:
        "roLOCAL este un produs nou, local, B2C, cu apariție în București.",
    },
    retea: {
      title: "Rețea de site-uri specializate",
      paragraph:
        "Operăm o rețea de site-uri specializate pe diferite segmente de activitate. Targhetare B2B locală și națională.",
    },
    expertMediu: {
      title: "Platforma Expert Mediu",
      paragraph:
        "Aici găsești platforma cu care îți îndeplinești toate obligațiile legale privind deșeurile. Vei găsi aici toate calculele, evidențele și rapoartele solicitate de autorități (Agenția de mediu, Garda de mediu, Fondul de mediu). Ai asistență și consultanță.",
    },
    cta: "Contactează-ne",
  },

  termeni: {
    seo: {
      title: "Termeni și Condiții — GhidBeauty",
      metaDescription:
        "Termenii și condițiile de utilizare a platformei GhidBeauty. Citește înainte de a folosi serviciile noastre.",
      slug: "/termeni",
    },
    hero: {
      title: "Termeni și condiții",
      subtitle:
        "Contract cadru privind prestarea de servicii de publicitate pe platforma GhidBeauty.ro",
      lastUpdated: "Ultima actualizare: 03.04.2026",
    },
  },

  politica: {
    seo: {
      title: "Politica de Confidențialitate — GhidBeauty",
      metaDescription:
        "Cum colectăm, folosim și protejăm datele tale personale pe platforma GhidBeauty.",
      slug: "/politica-de-confidentialitate",
    },
    hero: {
      title: "Politica de confidențialitate și cookies",
      subtitle:
        "Această politică descrie modul în care GhidBeauty.ro colectează, utilizează și protejează datele cu caracter personal, în conformitate cu GDPR.",
      lastUpdated: "Ultima actualizare: 03.04.2026",
    },
  },
};

// ============================================================
// Persistence (localStorage + cross-tab sync)
// ============================================================

const STORAGE_KEY = "ghidbeauty:static-pages-content";
const UPDATE_EVENT = "static-pages-content:updated";

function readStorage(): Partial<StaticPagesContent> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<StaticPagesContent>) : {};
  } catch {
    return {};
  }
}

function writeStorage(data: Partial<StaticPagesContent>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  } catch {
    /* noop */
  }
}

function mergedContent(): StaticPagesContent {
  const stored = readStorage();
  return {
    "despre-ghidbeauty": {
      ...defaultContent["despre-ghidbeauty"],
      ...(stored["despre-ghidbeauty"] ?? {}),
    } as DespreGhidBeautyContent,
    "despre-companie": {
      ...defaultContent["despre-companie"],
      ...(stored["despre-companie"] ?? {}),
    } as DespreCompanieContent,
    termeni: {
      ...defaultContent.termeni,
      ...(stored.termeni ?? {}),
    } as SimpleHeroPageContent,
    politica: {
      ...defaultContent.politica,
      ...(stored.politica ?? {}),
    } as SimpleHeroPageContent,
  };
}

// ============================================================
// Public hooks
// ============================================================

/**
 * Read-only hook for public pages — returns the merged content
 * for a given page key and re-renders when admin saves.
 */
export function useStaticPageContent<K extends PageKey>(key: K): StaticPagesContent[K] {
  const [content, setContent] = useState<StaticPagesContent[K]>(
    () => mergedContent()[key],
  );

  useEffect(() => {
    const refresh = () => setContent(mergedContent()[key]);
    window.addEventListener(UPDATE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(UPDATE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [key]);

  return content;
}

/**
 * Admin hook — gives full content + setters per page.
 * `updatePage` mutates only the local draft state.
 * `savePage` persists the page to localStorage (broadcast).
 * `resetPage` removes overrides for a page (back to defaults).
 */
export function useStaticPagesAdmin() {
  const [draft, setDraft] = useState<StaticPagesContent>(() => mergedContent());

  const updatePage = useCallback(
    <K extends PageKey>(key: K, patch: StaticPagesContent[K]) => {
      setDraft((prev) => ({ ...prev, [key]: patch }));
    },
    [],
  );

  const savePage = useCallback(<K extends PageKey>(key: K) => {
    const stored = readStorage();
    const next = { ...stored, [key]: draft[key] };
    writeStorage(next);
  }, [draft]);

  const resetPage = useCallback(<K extends PageKey>(key: K) => {
    const stored = readStorage();
    delete stored[key];
    writeStorage(stored);
    setDraft((prev) => ({ ...prev, [key]: defaultContent[key] }));
  }, []);

  return { draft, updatePage, savePage, resetPage };
}
