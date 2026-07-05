import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const listings: Record<string, { id: string; name: string; category: string; city: string; county: string; rating: number; reviewCount: number; plan: string; description: string }> = {
  "1": { id: "1", name: "Glamour Studio", category: "Saloane", city: "București", county: "București", rating: 4.9, reviewCount: 128, plan: "profesional", description: "Salon premium de înfrumusețare cu servicii complete de coafură, cosmetică și manichiură." },
  "2": { id: "2", name: "Zen Spa & Relax", category: "Spa & Wellness", city: "Cluj-Napoca", county: "Cluj", rating: 4.8, reviewCount: 95, plan: "profesional", description: "Centru de wellness și spa cu tratamente faciale, masaj și relaxare." },
  "3": { id: "3", name: "NailArt Pro", category: "Unghii", city: "Timișoara", county: "Timiș", rating: 4.7, reviewCount: 67, plan: "intro", description: "Studio profesional de nail art cu tehnici moderne și produse premium." },
  "4": { id: "4", name: "Beauty Queens", category: "Cosmetică", city: "Iași", county: "Iași", rating: 4.6, reviewCount: 54, plan: "intro", description: "Salon de cosmetică cu tratamente faciale avansate." },
  "5": { id: "5", name: "Ink Master Studio", category: "Tatuaje", city: "Brașov", county: "Brașov", rating: 4.9, reviewCount: 112, plan: "profesional", description: "Studio de tatuaje cu artiști premiați internațional." },
  "6": { id: "6", name: "Perfect Brows", category: "PMU", city: "Constanța", county: "Constanța", rating: 4.5, reviewCount: 43, plan: "gratuit", description: "Studio PMU cu tehnici microblading și powder brows." },
  "7": { id: "7", name: "SunKiss Tanning", category: "Bronzare", city: "Oradea", county: "Bihor", rating: 4.3, reviewCount: 31, plan: "gratuit", description: "Salon de bronzare cu aparate de ultimă generație." },
  "8": { id: "8", name: "The Barber House", category: "Barbershop", city: "Sibiu", county: "Sibiu", rating: 4.8, reviewCount: 89, plan: "intro", description: "Barbershop modern cu servicii complete de bărbierit clasic." },
};

export default defineTool({
  name: "get_listing",
  title: "Get listing details",
  description: "Fetch full details for a directory listing by its id.",
  inputSchema: { id: z.string().trim().min(1).describe("The listing id (e.g. '1').") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const listing = listings[id];
    if (!listing) {
      return { content: [{ type: "text", text: `No listing with id '${id}'.` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(listing, null, 2) }],
      structuredContent: { listing },
    };
  },
});
