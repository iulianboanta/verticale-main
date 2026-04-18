/**
 * Slug helpers for static category/county URL structure:
 *   /[categorie]                         e.g. /coafura
 *   /[categorie]/[subcategorie]          e.g. /coafura/colorare
 *   /[categorie]/[judet]                 e.g. /coafura/cluj
 *   /[categorie]/[subcategorie]/[judet]  e.g. /coafura/colorare/cluj
 *   /judet/[judet]                       e.g. /judet/cluj
 */

import { categories, romanianCounties } from "@/data/mockData";

// ---------- Generic ----------

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ț/g, "t")
    .replace(/ș/g, "s")
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- Counties ----------

export const countyToSlug = (county: string) => slugify(county);

const countiesBySlug: Record<string, string> = Object.fromEntries(
  romanianCounties.map((c) => [countyToSlug(c), c]),
);

export const slugToCounty = (slug: string): string | null =>
  countiesBySlug[slug] ?? null;

// ---------- Categories ----------

export const categoryToSlug = (cat: string) => slugify(cat);

// Category aliases — map prettier URL slugs to display names.
// Falls back to slugified display name if not present.
const categoryAliases: Record<string, string> = {
  coafura: "Saloane",
  saloane: "Saloane",
  spa: "Spa & Wellness",
  unghii: "Unghii",
  cosmetica: "Cosmetică",
  tatuaje: "Tatuaje",
  pmu: "PMU",
  bronzare: "Bronzare",
  barbershop: "Barbershop",
};

const categoriesBySlug: Record<string, string> = {
  ...Object.fromEntries(categories.map((c) => [categoryToSlug(c.name), c.name])),
  ...categoryAliases,
};

export const slugToCategory = (slug: string): string | null =>
  categoriesBySlug[slug] ?? null;

// ---------- Subcategories ----------

// Demo subcategory map — used for breadcrumb display only.
export const subcategoriesByCategorySlug: Record<string, { slug: string; name: string }[]> = {
  coafura: [
    { slug: "colorare", name: "Colorare" },
    { slug: "balayage", name: "Balayage" },
    { slug: "tuns", name: "Tuns" },
    { slug: "tratamente-par", name: "Tratamente păr" },
  ],
  saloane: [
    { slug: "colorare", name: "Colorare" },
    { slug: "tuns", name: "Tuns" },
  ],
  unghii: [
    { slug: "manichiura", name: "Manichiură" },
    { slug: "pedichiura", name: "Pedichiură" },
    { slug: "nail-art", name: "Nail Art" },
  ],
  cosmetica: [
    { slug: "tratamente-faciale", name: "Tratamente faciale" },
    { slug: "epilare", name: "Epilare" },
  ],
};

export const slugToSubcategory = (
  catSlug: string,
  subSlug: string,
): string | null => {
  const list = subcategoriesByCategorySlug[catSlug];
  if (!list) return null;
  return list.find((s) => s.slug === subSlug)?.name ?? null;
};

// ---------- Article categories ----------

export const articleCategoryToSlug = (cat: string) => slugify(cat);
