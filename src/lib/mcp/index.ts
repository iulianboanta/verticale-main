import { defineMcp } from "@lovable.dev/mcp-js";
import listVerticalsTool from "./tools/list-verticals";
import searchListingsTool from "./tools/search-listings";
import getListingTool from "./tools/get-listing";

export default defineMcp({
  name: "ghid-directory-mcp",
  title: "Ghid Directory MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Ghid business directory platform (beauty, veterinari, funerare and more). Use `list_verticals` to see available directories, `search_listings` to find businesses by query/category/city, and `get_listing` to fetch full details for a specific listing id.",
  tools: [listVerticalsTool, searchListingsTool, getListingTool],
});
