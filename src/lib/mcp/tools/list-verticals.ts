import { defineTool } from "@lovable.dev/mcp-js";

const verticals = [
  { key: "beauty", brand: "Ghidul Beauty", domain: "ghidbeauty.ro" },
  { key: "veterinari", brand: "Ghidul Veterinarilor", domain: "ghidveterinari.ro" },
  { key: "funerare", brand: "Ghidul Funerare", domain: "ghidfunerare.ro" },
  { key: "tractari", brand: "Ghidul Tractari", domain: "ghidtractari.ro" },
  { key: "gradinite", brand: "Ghidul Gradinite", domain: "ghidgradinite.ro" },
  { key: "usi", brand: "Ghidul Usi", domain: "ghidusi.ro" },
  { key: "curatenie", brand: "Ghidul Curatenie", domain: "ghidcuratenie.ro" },
];

export default defineTool({
  name: "list_verticals",
  title: "List directory verticals",
  description: "List all business directory verticals available on the platform (beauty, veterinari, funerare, etc.).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(verticals, null, 2) }],
    structuredContent: { verticals },
  }),
});
