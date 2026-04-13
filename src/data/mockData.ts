import {
  Scissors,
  Sparkles,
  Hand,
  Palette,
  PenTool,
  Sun,
  Droplets,
  UserRound,
} from "lucide-react";

import listingSalon from "@/assets/listing-salon.jpg";
import listingSpa from "@/assets/listing-spa.jpg";
import listingNails from "@/assets/listing-nails.jpg";
import listingCosmetics from "@/assets/listing-cosmetics.jpg";
import listingTattoo from "@/assets/listing-tattoo.jpg";
import listingPmu from "@/assets/listing-pmu.jpg";
import listingTanning from "@/assets/listing-tanning.jpg";
import listingBarber from "@/assets/listing-barber.jpg";

export type PlanTier = "profesional" | "intro" | "gratuit";

export interface Listing {
  id: string;
  name: string;
  category: string;
  city: string;
  county: string;
  rating: number;
  reviewCount: number;
  plan: PlanTier;
  image: string;
  views?: number;
  isNew?: boolean;
  slug?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export const categories = [
  { name: "Saloane", icon: Scissors, slug: "saloane" },
  { name: "Spa & Wellness", icon: Droplets, slug: "spa" },
  { name: "Unghii", icon: Hand, slug: "unghii" },
  { name: "Cosmetică", icon: Sparkles, slug: "cosmetica" },
  { name: "Tatuaje", icon: PenTool, slug: "tatuaje" },
  { name: "PMU", icon: Palette, slug: "pmu" },
  { name: "Bronzare", icon: Sun, slug: "bronzare" },
  { name: "Barbershop", icon: UserRound, slug: "barbershop" },
];

export const featuredListings: Listing[] = [
  { id: "1", name: "Glamour Studio", category: "Saloane", city: "București", county: "București", rating: 4.9, reviewCount: 128, plan: "profesional", image: listingSalon, views: 12450 },
  { id: "2", name: "Zen Spa & Relax", category: "Spa & Wellness", city: "Cluj-Napoca", county: "Cluj", rating: 4.8, reviewCount: 95, plan: "profesional", image: listingSpa, views: 8340 },
  { id: "3", name: "NailArt Pro", category: "Unghii", city: "Timișoara", county: "Timiș", rating: 4.7, reviewCount: 67, plan: "intro", image: listingNails, views: 6500 },
  { id: "4", name: "Beauty Queens", category: "Cosmetică", city: "Iași", county: "Iași", rating: 4.6, reviewCount: 54, plan: "intro", image: listingCosmetics, views: 5120 },
  { id: "5", name: "Ink Master Studio", category: "Tatuaje", city: "Brașov", county: "Brașov", rating: 4.9, reviewCount: 112, plan: "profesional", image: listingTattoo, views: 9870 },
  { id: "6", name: "Perfect Brows", category: "PMU", city: "Constanța", county: "Constanța", rating: 4.5, reviewCount: 43, plan: "gratuit", image: listingPmu, views: 3200 },
  { id: "7", name: "SunKiss Tanning", category: "Bronzare", city: "Oradea", county: "Bihor", rating: 4.3, reviewCount: 31, plan: "gratuit", image: listingTanning, views: 2100 },
  { id: "8", name: "The Barber House", category: "Barbershop", city: "Sibiu", county: "Sibiu", rating: 4.8, reviewCount: 89, plan: "intro", image: listingBarber, views: 7210 },
];

export const mostVisitedListings: Listing[] = [
  { id: "v1", name: "Glamour Studio", category: "Saloane", city: "București", county: "București", rating: 4.9, reviewCount: 128, plan: "profesional", image: listingSalon, views: 12450 },
  { id: "v2", name: "Ink Master Studio", category: "Tatuaje", city: "Brașov", county: "Brașov", rating: 4.9, reviewCount: 112, plan: "profesional", image: listingTattoo, views: 9870 },
  { id: "v3", name: "Zen Spa & Relax", category: "Spa & Wellness", city: "Cluj-Napoca", county: "Cluj", rating: 4.8, reviewCount: 95, plan: "intro", image: listingSpa, views: 8340 },
  { id: "v4", name: "The Barber House", category: "Barbershop", city: "Sibiu", county: "Sibiu", rating: 4.8, reviewCount: 89, plan: "intro", image: listingBarber, views: 7210 },
  { id: "v5", name: "NailArt Pro", category: "Unghii", city: "Timișoara", county: "Timiș", rating: 4.7, reviewCount: 67, plan: "intro", image: listingNails, views: 6500 },
  { id: "v6", name: "Beauty Queens", category: "Cosmetică", city: "Iași", county: "Iași", rating: 4.6, reviewCount: 54, plan: "gratuit", image: listingCosmetics, views: 5120 },
];

export const recentListings: Listing[] = [
  { id: "r1", name: "Lash & Glow", category: "Cosmetică", city: "Pitești", county: "Argeș", rating: 0, reviewCount: 0, plan: "gratuit", image: listingCosmetics, isNew: true },
  { id: "r2", name: "Studio Mirage", category: "Saloane", city: "Galați", county: "Galați", rating: 0, reviewCount: 0, plan: "intro", image: listingSalon, isNew: true },
  { id: "r3", name: "InkZone Tattoo", category: "Tatuaje", city: "Ploiești", county: "Prahova", rating: 0, reviewCount: 0, plan: "gratuit", image: listingTattoo, isNew: true },
  { id: "r4", name: "Browistry", category: "PMU", city: "Craiova", county: "Dolj", rating: 0, reviewCount: 0, plan: "profesional", image: listingPmu, isNew: true },
];

import articleHair from "@/assets/article-hair.jpg";
import articleSalon from "@/assets/article-salon.jpg";
import articleNails from "@/assets/article-nails.jpg";

export const articles: Article[] = [
  { id: "a1", title: "Tendințe în coafură pentru vara 2025", excerpt: "Descoperă cele mai noi stiluri și tehnici de hairstyling care domină sezonul cald.", category: "Tendințe", date: "2025-06-10", image: articleHair },
  { id: "a2", title: "Cum să alegi salonul potrivit", excerpt: "Ghid complet pentru a găsi cel mai bun salon de beauty în orașul tău.", category: "Ghiduri", date: "2025-06-08", image: articleSalon },
  { id: "a3", title: "Îngrijirea unghiilor: 5 greșeli frecvente", excerpt: "Evită aceste greșeli comune pentru unghii sănătoase și frumoase.", category: "Sfaturi", date: "2025-06-05", image: articleNails },
];

export const articleCategories = ["Tendințe", "Ghiduri", "Sfaturi", "Interviuri", "Noutăți", "Evenimente"];

export const romanianCounties = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud",
  "Botoșani", "Brașov", "Brăila", "București", "Buzău", "Caraș-Severin",
  "Călărași", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj",
  "Galați", "Giurgiu", "Gorj", "Harghita", "Hunedoara", "Ialomița",
  "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț",
  "Olt", "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava",
  "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea", "Vrancea",
];
