

## Plan: Fix grid view to fill all columns fluidly

### Problem
In grid view, the ad banner after position 4 breaks the grid flow — it uses `col-span-full` which pushes items to the next row, leaving empty cells. On desktop the second row should be fully occupied.

### Changes in `src/pages/SearchResults.tsx`

1. **Change grid classes** from `grid-cols-2 lg:grid-cols-3` to `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` for denser packing on desktop.

2. **Ad banner in grid**: Keep `col-span-full` but move it outside the grid flow — insert it **between two separate grid containers** instead of inside one grid. Split results into "before ad" (first 4) and "after ad" (rest), each in their own grid, with the ad banner rendered between them as a standalone element.

This ensures every row in both grids is fully packed with no empty cells caused by the `col-span-full` banner.

### Single file change
- `src/pages/SearchResults.tsx`

