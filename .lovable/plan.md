

## Plan: Link category cards to search page with category parameter

**What**: Change the category grid cards on the homepage from `href="#slug"` anchors to proper links to `/cautare?q={categoryName}` (no `unde` parameter).

**File**: `src/components/ghidbeauty/CategoryGrid.tsx`

### Changes

1. Import `Link` from `react-router-dom`
2. Replace the `<a href={`#${cat.slug}`}>` with `<Link to={`/cautare?q=${encodeURIComponent(cat.name)}`}>` 
3. Keep all existing classes and children identical

This will navigate users to the search results page with the category name pre-filled as the search query, matching how `SearchResults` reads `searchParams.get("q")`.

