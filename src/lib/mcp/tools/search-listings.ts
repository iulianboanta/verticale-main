import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

type Listing = {
  id: string;
  name: string;
  category: string;
  city: string;
  county: string;
  rating: number;
  reviewCount: number;
  plan: "profesional" | "intro" | "gratuit";
};

const listings: Listing[] = [
  { id: "1", name: "Glamour Studio", category: "Saloane", city: "București", county: "București", rating: 4.9, reviewCount: 128, plan: "profesional" },
  { id: "2", name: "Zen Spa & Relax", category: "Spa & Wellness", city: "Cluj-Napoca", county: "Cluj", rating: 4.8, reviewCount: 95, plan: "profesional" },
  { id: "3", name: "NailArt Pro", category: "Unghii", city: "Timișoara", county: "Timiș", rating: 4.7, reviewCount: 67, plan: "intro" },
  { id: "4", name: "Beauty Queens", category: "Cosmetică", city: "Iași", county: "Iași", rating: 4.6, reviewCount: 54, plan: "intro" },
  { id: "5", name: "Ink Master Studio", category: "Tatuaje", city: "Brașov", county: "Brașov", rating: 4.9, reviewCount: 112, plan: "profesional" },
  { id: "6", name: "Perfect Brows", category: "PMU", city: "Constanța", county: "Constanța", rating: 4.5, reviewCount: 43, plan: "gratuit" },
  { id: "7", name: "SunKiss Tanning", category: "Bronzare", city: "Oradea", county: "Bihor", rating: 4.3, reviewCount: 31, plan: "gratuit" },
  { id: "8", name: "The Barber House", category: "Barbershop", city: "Sibiu", county: "Sibiu", rating: 4.8, reviewCount: 89, plan: "intro" },
];

export default defineTool({
  name: "search_listings",
  title: "Search business listings",
  description: "Search directory listings by free-text query, category, or city. All filters are optional; when none are provided, returns the top listings.",
  inputSchema: {
    query: z.string().trim().min(1).optional().describe("Free-text query matched against listing name and category."),
    category: z.string().trim().min(1).optional().describe("Category name to filter by (e.g. Saloane, Spa & Wellness)."),
    city: z.string().trim().min(1).optional().describe("City name to filter by."),
    limit: z.number().int().min(1).max(50).optional().describe("Max number of results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, city, limit }) => {
    const q = query?.toLowerCase();
    const cat = category?.toLowerCase();
    const cty = city?.toLowerCase();
    const results = listings
      .filter((l) => !q || l.name.toLowerCase().includes(q) || l.category.toLowerCase().includes(q))
      .filter((l) => !cat || l.category.toLowerCase() === cat)
      .filter((l) => !cty || l.city.toLowerCase() === cty)
      .slice(0, limit ?? 10);
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { results, count: results.length },
    };
  },
});
