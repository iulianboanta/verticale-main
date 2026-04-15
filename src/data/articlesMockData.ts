export interface ArticleAuthor {
  name: string;
  avatar?: string;
  bio: string;
}

export interface ArticleFull {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readTime: number;
  views: number;
  image: string;
  author: ArticleAuthor;
  tags: string[];
  sponsored?: { companyName: string; companySlug: string };
  content: string; // HTML rich text
}

export type ArticleCategory =
  | "Tendințe"
  | "Sfaturi"
  | "Noutăți"
  | "Legislație"
  | "Interviuri"
  | "Evenimente";

export const articleCategoryColors: Record<ArticleCategory, { bg: string; text: string }> = {
  "Tendințe": { bg: "bg-primary/10", text: "text-primary" },
  "Sfaturi": { bg: "bg-amber-100", text: "text-amber-700" },
  "Noutăți": { bg: "bg-green-100", text: "text-green-700" },
  "Legislație": { bg: "bg-blue-100", text: "text-blue-700" },
  "Interviuri": { bg: "bg-purple-100", text: "text-purple-700" },
  "Evenimente": { bg: "bg-gray-100", text: "text-gray-600" },
};

export const articleCategories: ArticleCategory[] = [
  "Tendințe",
  "Sfaturi",
  "Noutăți",
  "Legislație",
  "Interviuri",
  "Evenimente",
];

const authors: ArticleAuthor[] = [
  { name: "Ana Marinescu", bio: "Redactor principal la GhidBeauty.ro, specialist în tendințe beauty și cosmetică profesională." },
  { name: "Elena Popescu", bio: "Jurnalist specializat în industria beauty, cu peste 8 ani de experiență în presă de profil." },
  { name: "Mihai Ionescu", bio: "Expert în legislație și consultanță pentru afaceri din domeniul beauty." },
];

export const popularTags = [
  "balayage", "extensii", "keratină", "manichiură gel", "spa",
  "bronzare", "PMU", "nail art", "tratamente", "colorare",
  "botox", "filler", "epilare laser", "microblading", "laminare",
];

const sampleContent = `
<h2 id="introducere">Introducere</h2>
<p>Industria beauty din România trece printr-o perioadă de transformare accelerată. Noile tehnologii, cerințele tot mai sofisticate ale clienților și schimbările legislative recente redefinesc modul în care saloanele și clinicile de beauty operează. În acest articol explorăm cele mai importante tendințe care vor marca anul 2025.</p>

<p>De la tratamente inovatoare la strategii de marketing digital, profesioniștii din beauty au la dispoziție instrumente și tehnici care pot transforma complet experiența clientului. Să vedem care sunt cele mai relevante direcții.</p>

<h2 id="tendinte-principale">Tendințe principale</h2>
<p>Prima și cea mai importantă tendință este personalizarea extremă a serviciilor. Clienții nu mai vor pachete standard — ei caută experiențe adaptate nevoilor lor specifice, de la consultanță de culoare bazată pe analiza tonului pielii, până la tratamente capilare formulate individual.</p>

<blockquote>„Personalizarea nu mai este un lux, ci o așteptare de bază a clientului modern. Saloanele care nu se adaptează vor pierde teren rapid." — Maria Dumitrescu, Beauty Business Consultant</blockquote>

<p>A doua tendință majoră este integrarea tehnologiei în procesul de consultanță. Aplicații de realitate augmentată pentru preview-ul culorilor de păr, scanere pentru analiza scalpului și sisteme de booking inteligente devin standard în saloanele premium.</p>

<h3 id="tehnici-noi">Tehnici noi de colorare</h3>
<p>Balayage-ul continuă să domine, dar varianta „lived-in blonde" câștigă teren rapid. Tehnica presupune un aspect mai natural, cu creștere imperceptibilă și întreținere minimă — exact ce caută clientele moderne.</p>

<h3 id="tratamente-inovatoare">Tratamente inovatoare</h3>
<p>Tratamentele cu keratină de ultimă generație, fără formaldehidă, oferă rezultate superioare cu impact minim asupra sănătății părului. De asemenea, terapiile cu plasmă pentru regenerarea scalpului devin tot mai accesibile.</p>

<h2 id="impact-business">Impact asupra business-ului</h2>
<p>Aceste tendințe au un impact direct asupra modului în care saloanele își structurează oferta și prețurile. Investiția în formare continuă și echipamente de ultimă generație devine esențială pentru competitivitate.</p>

<p>Saloanele care adoptă devreme aceste tendințe raportează creșteri de 20-35% în retenția clienților și o creștere medie de 15% a valorii medii per vizită.</p>

<h2 id="concluzii">Concluzii</h2>
<p>Anul 2025 aduce oportunități semnificative pentru profesioniștii din beauty care sunt dispuși să investească în inovație și adaptare. Cheia succesului constă în echilibrul între adoptarea tehnologiilor noi și menținerea acelei conexiuni personale care face diferența în experiența clientului.</p>
`;

export const articlesMock: ArticleFull[] = [
  {
    id: "a1",
    slug: "tendinte-coafura-vara-2025",
    title: "Tendințe în coafură pentru vara 2025: Ce stiluri vor domina sezonul",
    subtitle: "De la balayage evoluat la texturi naturale — descoperă ce vor clientele în acest sezon",
    excerpt: "Descoperă cele mai noi stiluri și tehnici de hairstyling care domină sezonul cald, de la balayage evoluat la texturi naturale și culorile statement.",
    category: "Tendințe",
    date: "2025-06-10",
    readTime: 8,
    views: 3240,
    image: "",
    author: authors[0],
    tags: ["balayage", "colorare", "tendințe", "coafură", "vara 2025"],
    content: sampleContent,
  },
  {
    id: "a2",
    slug: "cum-sa-alegi-salonul-potrivit",
    title: "Cum să alegi salonul potrivit: Ghid complet pentru clienți",
    subtitle: "Factori esențiali de care să ții cont înainte de a alege un salon de beauty",
    excerpt: "Ghid complet pentru a găsi cel mai bun salon de beauty în orașul tău — de la verificarea recenziilor la vizita de evaluare.",
    category: "Sfaturi",
    date: "2025-06-08",
    readTime: 6,
    views: 2180,
    image: "",
    author: authors[1],
    tags: ["salon", "sfaturi", "recenzii", "beauty"],
    content: sampleContent,
  },
  {
    id: "a3",
    slug: "ingrijirea-unghiilor-5-greseli",
    title: "Îngrijirea unghiilor: 5 greșeli frecvente pe care le faci",
    subtitle: "Evită aceste greșeli comune pentru unghii sănătoase și frumoase tot anul",
    excerpt: "Evită aceste greșeli comune pentru unghii sănătoase și frumoase. De la tehnica greșită de pilire la produse inadecvate.",
    category: "Sfaturi",
    date: "2025-06-05",
    readTime: 5,
    views: 1850,
    image: "",
    author: authors[0],
    tags: ["unghii", "manichiură gel", "nail art", "sfaturi"],
    content: sampleContent,
  },
  {
    id: "a4",
    slug: "legislatie-saloane-2025",
    title: "Noile reglementări pentru saloane beauty: Ce trebuie să știi în 2025",
    subtitle: "Modificări legislative importante care afectează industria beauty din România",
    excerpt: "Modificările legislative recente aduc cerințe noi pentru saloanele de beauty. Află ce trebuie să faci pentru a fi în conformitate.",
    category: "Legislație",
    date: "2025-06-01",
    readTime: 10,
    views: 4120,
    image: "",
    author: authors[2],
    tags: ["legislație", "reglementări", "salon", "conformitate"],
    content: sampleContent,
  },
  {
    id: "a5",
    slug: "interviu-maria-dumitrescu",
    title: "Interviu cu Maria Dumitrescu: Viitorul industriei beauty în România",
    subtitle: "O conversație despre provocări, oportunități și viziunea pe termen lung",
    excerpt: "Maria Dumitrescu, consultant de top în industria beauty, vorbește despre tendințe, provocări și oportunitățile din piață.",
    category: "Interviuri",
    date: "2025-05-28",
    readTime: 12,
    views: 2890,
    image: "",
    author: authors[1],
    tags: ["interviu", "business", "industrie beauty", "consultanță"],
    content: sampleContent,
  },
  {
    id: "a6",
    slug: "beauty-expo-bucuresti-2025",
    title: "Beauty Expo București 2025: Cele mai importante noutăți de la eveniment",
    subtitle: "Recap complet al celui mai mare târg beauty din sud-estul Europei",
    excerpt: "Recap complet de la Beauty Expo 2025 — cele mai importante lansări, workshop-uri și tendințe prezentate.",
    category: "Evenimente",
    date: "2025-05-25",
    readTime: 7,
    views: 1560,
    image: "",
    author: authors[0],
    tags: ["evenimente", "expo", "București", "noutăți"],
    content: sampleContent,
  },
  {
    id: "a7",
    slug: "tratamente-keratina-ghid-complet",
    title: "Tratamente cu keratină: Ghid complet pentru profesioniști și clienți",
    subtitle: "Tot ce trebuie să știi despre tratamentele cu keratină — tipuri, beneficii și riscuri",
    excerpt: "De la tipurile de keratină disponibile pe piață la tehnicile corecte de aplicare — un ghid exhaustiv.",
    category: "Sfaturi",
    date: "2025-05-20",
    readTime: 9,
    views: 3670,
    image: "",
    author: authors[1],
    tags: ["keratină", "tratamente", "păr", "salon"],
    content: sampleContent,
  },
  {
    id: "a8",
    slug: "pmu-tendinte-2025",
    title: "PMU în 2025: Microblading, powder brows și tehnicile care câștigă teren",
    subtitle: "Evoluția pigmentării permanente și ce preferă clientele anul acesta",
    excerpt: "Pigmentarea permanentă evoluează rapid. Descoperă ce tehnici sunt cele mai cerute și cum se diferențiază.",
    category: "Tendințe",
    date: "2025-05-15",
    readTime: 6,
    views: 2340,
    image: "",
    author: authors[0],
    tags: ["PMU", "microblading", "tendințe", "sprâncene"],
    content: sampleContent,
  },
  {
    id: "a9",
    slug: "marketing-digital-saloane",
    title: "Marketing digital pentru saloane: Strategii care funcționează în 2025",
    subtitle: "De la Instagram Reels la Google Business — ghid practic de promovare online",
    excerpt: "Ghid practic de marketing digital pentru saloane — social media, SEO local și strategii de fidelizare online.",
    category: "Noutăți",
    date: "2025-05-10",
    readTime: 8,
    views: 1980,
    image: "",
    author: authors[2],
    tags: ["marketing", "digital", "social media", "salon"],
    content: sampleContent,
    sponsored: { companyName: "Glamour Studio", companySlug: "glamour-studio" },
  },
  {
    id: "a10",
    slug: "epilare-laser-noutati",
    title: "Epilare laser: Noutăți tehnologice și ce trebuie să știe clienții",
    subtitle: "Noi generații de lasere, rezultate mai rapide și experiență îmbunătățită",
    excerpt: "Noile generații de echipamente laser promit rezultate mai bune, mai rapide și mai confortabile. Ce s-a schimbat?",
    category: "Noutăți",
    date: "2025-05-05",
    readTime: 7,
    views: 2750,
    image: "",
    author: authors[1],
    tags: ["epilare laser", "tehnologie", "tratamente", "noutăți"],
    content: sampleContent,
  },
];

export const categoryCounts: Record<ArticleCategory, number> = {
  "Tendințe": 24,
  "Sfaturi": 31,
  "Noutăți": 18,
  "Legislație": 9,
  "Interviuri": 14,
  "Evenimente": 7,
};
