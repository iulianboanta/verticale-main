export type ListingStatus = "active" | "pending" | "expired" | "rejected";
export type Plan = "Gratuit" | "Intro" | "Profesional";

export type ManageListing = {
  id: string;
  name: string;
  city: string;
  category: string;
  plan: Plan;
  status: ListingStatus;
  ownerEmail: string;
  createdAt: string; // ISO
  expiresAt: string; // ISO
  views: number;
  thumb?: string;
  verified?: boolean;
  featured?: boolean;
};

const cities = ["București", "Cluj-Napoca", "Iași", "Brașov", "Timișoara", "Constanța", "Sibiu", "Oradea"];
const categories = ["Saloane înfrumusețare", "Coafor", "Manichiură", "Cosmetică", "Frizerie", "Spa & Wellness", "Estetică"];
const plans: Plan[] = ["Gratuit", "Intro", "Profesional"];
const statuses: ListingStatus[] = ["active", "pending", "expired", "rejected"];
const ownerEmails = ["maria@salon.ro", "ana@beauty.com", "ioana@nails.ro", "elena@hair.ro", "sofia@spa.ro"];

const pad = (n: number) => String(n).padStart(2, "0");
const dateOffset = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const manageListings: ManageListing[] = Array.from({ length: 28 }, (_, i) => {
  const status = statuses[i % statuses.length];
  return {
    id: `L-${1000 + i}`,
    name: `${["Salon", "Studio", "Beauty", "Hair Lab", "Lumiere"][i % 5]} ${["Eleganza", "Aurora", "Bella", "Glamour", "Luna", "Stella"][i % 6]}`,
    city: cities[i % cities.length],
    category: categories[i % categories.length],
    plan: plans[i % plans.length],
    status,
    ownerEmail: ownerEmails[i % ownerEmails.length],
    createdAt: dateOffset(-((i + 3) * 4)),
    expiresAt: dateOffset(status === "expired" ? -10 : 90 - i * 3),
    views: 50 + i * 37,
    verified: i % 3 === 0,
    featured: i % 5 === 0,
  };
});

// ORDERS
export type OrderStatus = "paid" | "pending" | "cancelled";
export type ManageOrder = {
  id: string;
  number: string;
  company: string;
  ownerEmail: string;
  plan: Plan;
  amount: number;
  vat: number;
  method: "Transfer bancar" | "Card";
  status: OrderStatus;
  createdAt: string;
  validatedAt: string | null;
  expiresAt: string | null;
  notes?: string;
};

const paidPlans: Plan[] = ["Intro", "Profesional"];

export const manageOrders: ManageOrder[] = Array.from({ length: 22 }, (_, i) => {
  const plan = paidPlans[i % paidPlans.length];
  const base = plan === "Profesional" ? 499 : 199;
  const statusKey: OrderStatus = (["paid", "pending", "cancelled"] as OrderStatus[])[i % 3];
  const createdAt = dateOffset(-((i + 1) * 18));
  let validatedAt: string | null = null;
  let expiresAt: string | null = null;
  if (statusKey === "paid") {
    const validated = new Date(createdAt);
    validated.setDate(validated.getDate() + ((i % 3) + 1));
    validatedAt = `${validated.getFullYear()}-${pad(validated.getMonth() + 1)}-${pad(validated.getDate())}`;
    const expires = new Date(validated);
    expires.setDate(expires.getDate() + 365);
    expiresAt = `${expires.getFullYear()}-${pad(expires.getMonth() + 1)}-${pad(expires.getDate())}`;
  }
  return {
    id: `O-${2000 + i}`,
    number: `INV-${2024}${pad(i + 1)}`,
    company: manageListings[i % manageListings.length].name,
    ownerEmail: ownerEmails[i % ownerEmails.length],
    plan,
    amount: base,
    vat: +(base * 0.19).toFixed(2),
    method: i % 2 === 0 ? "Transfer bancar" : "Card",
    status: statusKey,
    createdAt,
    validatedAt,
    expiresAt,
  };
});

// USERS
export type ManageUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Content Manager" | "Owner";
  listingsCount: number;
  registeredAt: string;
  lastLogin: string;
  status: "active" | "blocked";
};

export const manageUsers: ManageUser[] = Array.from({ length: 14 }, (_, i) => ({
  id: `U-${100 + i}`,
  name: ["Maria Popescu", "Ana Ionescu", "Elena Stoica", "Radu Marin", "Sofia Vasilescu", "Ioana Dobre"][i % 6],
  email: `user${i + 1}@${["salon.ro", "beauty.ro", "nails.com", "hair.ro"][i % 4]}`,
  role: i === 0 ? "Admin" : i === 1 ? "Content Manager" : "Owner",
  listingsCount: i === 0 ? 0 : (i % 4) + 1,
  registeredAt: dateOffset(-((i + 1) * 14)),
  lastLogin: dateOffset(-(i % 7)),
  status: i % 9 === 0 ? "blocked" : "active",
}));

// REVIEWS
export type ReviewStatus = "pending" | "approved" | "rejected";
export type ManageReview = {
  id: string;
  company: string;
  reviewer: string;
  stars: number;
  text: string;
  status: ReviewStatus;
  createdAt: string;
};

export const manageReviews: ManageReview[] = Array.from({ length: 14 }, (_, i) => ({
  id: `R-${500 + i}`,
  company: manageListings[i % manageListings.length].name,
  reviewer: ["Andreea M.", "Cristina P.", "Diana V.", "Mihaela R.", "Larisa S."][i % 5],
  stars: ((i % 5) + 1) as number,
  text: i % 2 === 0
    ? "Servicii excelente, recomand cu încredere! Personalul a fost foarte amabil."
    : "Experiență ok, dar timpul de așteptare a fost destul de mare.",
  status: (["pending", "approved", "rejected"] as ReviewStatus[])[i % 3],
  createdAt: dateOffset(-((i + 1) * 2)),
}));

// ARTICLES
export type ArticleStatus = "published" | "draft" | "scheduled";
export type ManageArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: ArticleStatus;
  publishedAt: string;
  views: number;
  cover?: string;
  excerpt?: string;
  body?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  sponsored?: boolean;
};

export const articleCategories = [
  { id: "tendinte", name: "Tendințe", slug: "tendinte", articleCount: 5, color: "#9678B6" },
  { id: "ingrijire", name: "Îngrijire", slug: "ingrijire", articleCount: 8, color: "#E89B5C" },
  { id: "tutoriale", name: "Tutoriale", slug: "tutoriale", articleCount: 3, color: "#5CB8A8" },
  { id: "interviuri", name: "Interviuri", slug: "interviuri", articleCount: 2, color: "#D86B8E" },
  { id: "stiri", name: "Știri", slug: "stiri", articleCount: 4, color: "#6B82D8" },
];

export const manageArticles: ManageArticle[] = Array.from({ length: 10 }, (_, i) => ({
  id: `A-${300 + i}`,
  title: [
    "Tendințe de coafură pentru toamna 2024",
    "Cum alegi salonul potrivit",
    "Tratamente naturale pentru păr",
    "Manichiura sezonului — culori și tehnici",
    "Spa la domiciliu: ghid complet",
    "Cele mai bune produse cosmetice",
    "Frizeria modernă: ce trebuie să știi",
    "Skincare anti-aging: rutina ideală",
  ][i % 8],
  slug: `articol-${i + 1}`,
  category: articleCategories[i % articleCategories.length].name,
  author: ["Redacția GhidBeauty", "Maria Popescu", "Ana Ionescu"][i % 3],
  status: (["published", "draft", "scheduled"] as ArticleStatus[])[i % 3],
  publishedAt: dateOffset(-((i + 1) * 5)),
  views: 100 + i * 247,
}));

// BANNERS
export type ManageBanner = {
  id: string;
  slot: string;
  dimensions: string;
  status: "sold" | "available";
  advertiser?: string;
  validFrom?: string;
  validUntil?: string;
  url?: string;
  active?: boolean;
};

export const manageBanners: ManageBanner[] = [
  { id: "B-1", slot: "Homepage Leaderboard", dimensions: "970x250", status: "sold", advertiser: "Wella Professionals", validFrom: dateOffset(-10), validUntil: dateOffset(50), active: true, url: "https://wella.com" },
  { id: "B-2", slot: "Homepage Leaderboard", dimensions: "970x250", status: "available" },
  { id: "B-3", slot: "Results Rectangle", dimensions: "300x250", status: "sold", advertiser: "L'Oréal Paris", validFrom: dateOffset(-20), validUntil: dateOffset(40), active: true, url: "https://loreal.ro" },
  { id: "B-4", slot: "Results Rectangle", dimensions: "300x250", status: "available" },
  { id: "B-5", slot: "Detail Skyscraper", dimensions: "160x600", status: "sold", advertiser: "OPI Romania", validFrom: dateOffset(-5), validUntil: dateOffset(85), active: true, url: "https://opi.ro" },
  { id: "B-6", slot: "Detail Skyscraper", dimensions: "160x600", status: "available" },
];

// COUNTIES (SIRUTA)
export const counties = [
  "Alba","Arad","Argeș","Bacău","Bihor","Bistrița-Năsăud","Botoșani","Brașov","Brăila","București",
  "Buzău","Caraș-Severin","Călărași","Cluj","Constanța","Covasna","Dâmbovița","Dolj","Galați","Giurgiu",
  "Gorj","Harghita","Hunedoara","Ialomița","Iași","Ilfov","Maramureș","Mehedinți","Mureș","Neamț",
  "Olt","Prahova","Satu Mare","Sălaj","Sibiu","Suceava","Teleorman","Timiș","Tulcea","Vaslui","Vâlcea","Vrancea",
].map((name, i) => ({
  name,
  code: `RO-${pad(i + 1)}`,
  listingsCount: 5 + (i * 7) % 80,
  servedListingsCount: 8 + (i * 11) % 60,
}));

// SETTINGS
export const platformSettings = {
  general: { siteName: "GhidBeauty.ro", contactEmail: "contact@ghidbeauty.ro", address: "București, România" },
  seo: { metaTitle: "GhidBeauty.ro — Catalogul saloanelor de înfrumusețare", metaDescription: "Cel mai mare catalog de saloane de înfrumusețare din România." },
  email: { host: "smtp.example.com", port: 587, user: "noreply@ghidbeauty.ro", pass: "********" },
  payments: { iban: "RO12BTRL1234567890", bank: "Banca Transilvania", beneficiary: "GhidBeauty SRL" },
  maintenance: { enabled: false, message: "Site-ul este în mentenanță. Revenim curând." },
};

// DASHBOARD HELPERS
export const monthlyListings = [
  { month: "Mai", count: 12 },
  { month: "Iun", count: 18 },
  { month: "Iul", count: 24 },
  { month: "Aug", count: 21 },
  { month: "Sep", count: 32 },
  { month: "Oct", count: 28 },
];

export const planDistribution = [
  { name: "Gratuit", value: manageListings.filter((l) => l.plan === "Gratuit").length, color: "hsl(var(--muted-foreground))" },
  { name: "Intro", value: manageListings.filter((l) => l.plan === "Intro").length, color: "hsl(30 85% 55%)" },
  { name: "Profesional", value: manageListings.filter((l) => l.plan === "Profesional").length, color: "hsl(var(--primary))" },
];

export type Activity = { id: string; type: "listing" | "payment" | "review" | "user"; text: string; time: string };
export const recentActivity: Activity[] = [
  { id: "1", type: "listing", text: "Listing nou adăugat — Salon Lumiere", time: "acum 5 min" },
  { id: "2", type: "payment", text: "Plată primită — Intro #INV-202412", time: "acum 23 min" },
  { id: "3", type: "review", text: "Recenzie nouă — 5★ pentru Hair Lab", time: "acum 1h" },
  { id: "4", type: "user", text: "Utilizator nou înregistrat — ana@beauty.com", time: "acum 2h" },
  { id: "5", type: "listing", text: "Listing aprobat — Studio Aurora", time: "acum 3h" },
  { id: "6", type: "payment", text: "Proformă emisă — Profesional #INV-202413", time: "acum 4h" },
  { id: "7", type: "review", text: "Recenzie de moderat — 2★ pentru Beauty Bella", time: "acum 5h" },
  { id: "8", type: "listing", text: "Listing expirat — Salon Glamour", time: "acum 6h" },
  { id: "9", type: "user", text: "Utilizator nou — sofia@spa.ro", time: "acum 8h" },
  { id: "10", type: "payment", text: "Plată confirmată — Intro #INV-202411", time: "acum 12h" },
];

// LISTING CATEGORIES TREE
export type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  listingsCount: number;
  active: boolean;
  children?: CategoryNode[];
};

export const listingCategoriesTree: CategoryNode[] = [
  {
    id: "cat-1", name: "Saloane înfrumusețare", slug: "saloane-infrumusetare", listingsCount: 45, active: true,
    children: [
      { id: "cat-1-1", name: "Saloane mixte", slug: "saloane-mixte", parentId: "cat-1", listingsCount: 20, active: true },
      { id: "cat-1-2", name: "Saloane de lux", slug: "saloane-lux", parentId: "cat-1", listingsCount: 12, active: true },
    ],
  },
  {
    id: "cat-2", name: "Coafor", slug: "coafor", listingsCount: 38, active: true,
    children: [
      { id: "cat-2-1", name: "Coafor damă", slug: "coafor-dama", parentId: "cat-2", listingsCount: 25, active: true },
      { id: "cat-2-2", name: "Coafor bărbați", slug: "coafor-barbati", parentId: "cat-2", listingsCount: 13, active: true },
    ],
  },
  { id: "cat-3", name: "Manichiură & Pedichiură", slug: "manichiura", listingsCount: 32, active: true },
  { id: "cat-4", name: "Cosmetică", slug: "cosmetica", listingsCount: 27, active: true },
  { id: "cat-5", name: "Spa & Wellness", slug: "spa-wellness", listingsCount: 18, active: true },
];

export const services = [
  { id: "s-1", name: "Tuns damă", slug: "tuns-dama", category: "Coafor", listingsUsing: 28 },
  { id: "s-2", name: "Vopsit păr", slug: "vopsit-par", category: "Coafor", listingsUsing: 24 },
  { id: "s-3", name: "Manichiură semipermanentă", slug: "manichiura-semi", category: "Manichiură", listingsUsing: 22 },
  { id: "s-4", name: "Pedichiură", slug: "pedichiura", category: "Manichiură", listingsUsing: 19 },
  { id: "s-5", name: "Tratament facial", slug: "tratament-facial", category: "Cosmetică", listingsUsing: 16 },
  { id: "s-6", name: "Masaj relaxare", slug: "masaj-relaxare", category: "Spa", listingsUsing: 12 },
];

export const facilities = [
  { id: "f-1", name: "Wi-Fi gratuit", icon: "Wifi", listingsUsing: 45 },
  { id: "f-2", name: "Parcare", icon: "Car", listingsUsing: 32 },
  { id: "f-3", name: "Acces persoane cu dizabilități", icon: "Accessibility", listingsUsing: 18 },
  { id: "f-4", name: "Plata cu cardul", icon: "CreditCard", listingsUsing: 50 },
  { id: "f-5", name: "Programare online", icon: "Calendar", listingsUsing: 40 },
];

// REVENUE REPORT
export const revenueByMonth = [
  { month: "Mai", newOrders: 5, renewals: 8, total: 13, revenue: 4200, vat: 798, totalWithVat: 4998 },
  { month: "Iun", newOrders: 7, renewals: 9, total: 16, revenue: 5100, vat: 969, totalWithVat: 6069 },
  { month: "Iul", newOrders: 9, renewals: 11, total: 20, revenue: 6300, vat: 1197, totalWithVat: 7497 },
  { month: "Aug", newOrders: 6, renewals: 12, total: 18, revenue: 5800, vat: 1102, totalWithVat: 6902 },
  { month: "Sep", newOrders: 11, renewals: 14, total: 25, revenue: 7900, vat: 1501, totalWithVat: 9401 },
  { month: "Oct", newOrders: 8, renewals: 13, total: 21, revenue: 6700, vat: 1273, totalWithVat: 7973 },
];
