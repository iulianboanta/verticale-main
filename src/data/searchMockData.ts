import { type Listing, featuredListings, mostVisitedListings, recentListings } from "./mockData";

export interface SearchListing extends Listing {
  description?: string;
  phone?: string;
  isOpen?: boolean;
  services?: string[];
  facilities?: string[];
  recommended?: boolean;
}

const descriptions: Record<string, string> = {
  "1": "Salon premium de înfrumusețare cu servicii complete de coafură, cosmetică și manichiură. Experiență de top în centrul Bucureștiului.",
  "2": "Centru de wellness și spa cu tratamente faciale, masaj și relaxare. Atmosferă zen într-un ambient deosebit.",
  "3": "Studio profesional de nail art cu tehnici moderne și produse premium. Specialiști în manichiură și pedichiură.",
  "4": "Salon de cosmetică cu tratamente faciale avansate, curățare și întinerire. Aparatură de ultimă generație.",
  "5": "Studio de tatuaje cu artiști premiați internațional. Specialități: realism, watercolor, geometric.",
  "6": "Studio PMU cu tehnici microblading și powder brows. Rezultate naturale și durabile.",
  "7": "Salon de bronzare cu aparate de ultimă generație. Bronz uniform și sănătos.",
  "8": "Barbershop modern cu servicii complete de bărbierit clasic, tunsori și îngrijire barbă.",
};

const allListings: Listing[] = [...featuredListings, ...mostVisitedListings, ...recentListings];

// Deduplicate by name
const seen = new Set<string>();
const unique: Listing[] = [];
for (const l of allListings) {
  if (!seen.has(l.name)) {
    seen.add(l.name);
    unique.push(l);
  }
}

export const searchResults: SearchListing[] = unique.map((l) => ({
  ...l,
  description: descriptions[l.id] || "Servicii profesionale de beauty într-un ambient plăcut și modern.",
  phone: "07" + Math.floor(10000000 + Math.random() * 90000000).toString(),
  isOpen: Math.random() > 0.3,
  recommended: l.plan === "profesional",
  services: ["Coafură", "Vopsit", "Balayage", "Tuns", "Manichiură", "Pedichiură", "Tratamente faciale"].slice(0, 3 + Math.floor(Math.random() * 4)),
  facilities: ["Parcare", "Plată card", "WiFi", "Rezervări online"].filter(() => Math.random() > 0.4),
}));

// Extend to ~15 results for pagination demo
const extraNames = [
  "Bella Vita Salon", "StyleZone Studio", "Aura Beauty", "Elite Hair",
  "Diamond Nails", "Royal Spa", "Charm Studio",
];

import listingSalon from "@/assets/listing-salon.jpg";
import listingSpa from "@/assets/listing-spa.jpg";
import listingNails from "@/assets/listing-nails.jpg";

const extraImages = [listingSalon, listingSpa, listingNails];

for (let i = 0; i < extraNames.length; i++) {
  searchResults.push({
    id: `s${i + 20}`,
    name: extraNames[i],
    category: ["Saloane", "Cosmetică", "Unghii", "Spa & Wellness"][i % 4],
    city: ["Cluj-Napoca", "București", "Timișoara", "Brașov"][i % 4],
    county: ["Cluj", "București", "Timiș", "Brașov"][i % 4],
    rating: +(3.5 + Math.random() * 1.5).toFixed(1),
    reviewCount: Math.floor(10 + Math.random() * 100),
    plan: (["profesional", "intro", "gratuit"] as const)[i % 3],
    image: extraImages[i % 3],
    views: Math.floor(1000 + Math.random() * 10000),
    description: "Servicii profesionale de beauty într-un ambient plăcut și modern.",
    phone: "07" + Math.floor(10000000 + Math.random() * 90000000).toString(),
    isOpen: Math.random() > 0.3,
    recommended: i % 3 === 0,
    services: ["Coafură", "Vopsit", "Balayage", "Tuns"].slice(0, 2 + (i % 3)),
    facilities: ["Parcare", "Plată card", "WiFi"].filter(() => Math.random() > 0.4),
  });
}

export const filterCategories = [
  { name: "Saloane", count: 24 },
  { name: "Cosmetică", count: 18 },
  { name: "Unghii", count: 15 },
  { name: "Spa & Wellness", count: 12 },
  { name: "Barbershop", count: 9 },
  { name: "Tatuaje", count: 7 },
  { name: "PMU", count: 5 },
  { name: "Bronzare", count: 3 },
];

export const filterLocalities = [
  { name: "Cluj-Napoca", count: 32 },
  { name: "București", count: 28 },
  { name: "Timișoara", count: 14 },
  { name: "Brașov", count: 11 },
  { name: "Iași", count: 9 },
  { name: "Constanța", count: 7 },
];

export const filterServices = [
  { name: "Coafură", count: 45 },
  { name: "Balayage", count: 23 },
  { name: "Vopsit", count: 31 },
  { name: "Tuns", count: 38 },
  { name: "Manichiură", count: 28 },
  { name: "Pedichiură", count: 22 },
  { name: "Tratamente faciale", count: 19 },
  { name: "Extensii gene", count: 14 },
  { name: "Epilare", count: 17 },
];

export const filterFacilities = [
  { name: "Parcare", count: 34 },
  { name: "Plată card", count: 52 },
  { name: "WiFi", count: 41 },
  { name: "Rezervări online", count: 29 },
];
