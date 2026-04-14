

## Plan: Fix Search Page Spacing & Mobile Filter Layout

### Problem 1 — Too much white space at the top
The `main` element has `mt-[112px]` (margin-top for fixed navbar + search bar). The SearchTopBar is `sticky top-16` and already accounts for the navbar. The `mt-[112px]` is excessive — reducing it to ~`mt-[56px]` (roughly 50% less) will close the gap while keeping content below the sticky search bar.

### Problem 2 — Mobile: Filtre button placement & results count on breadcrumb line
Currently the mobile filter button sits in its own `div` above ResultsTopBar. Instead, on mobile:
- Move the "Filtre" button into the ResultsTopBar, placed where the results count currently is (left side, below breadcrumb)
- Move the results count text to the **breadcrumb line** on the right side (same row as "Acasă > query > location")

### Changes

**`src/pages/SearchResults.tsx`**
- Change `mt-[112px]` to `mt-14` (~56px, half the current spacing)
- Remove the standalone mobile filter `div` block (lines 127-142)
- Pass the mobile filter trigger as a prop (or render slot) into `ResultsTopBar`

**`src/components/ghidbeauty/search/ResultsTopBar.tsx`**
- Accept a new `mobileFilterSlot` prop (ReactNode)
- Breadcrumb row: on mobile, add results count text to the right side using `flex justify-between`
- Results count + sort row: on mobile, show the Filtre button on the left (where count was), hide the count text (already shown in breadcrumb). Sort + view toggles stay on the right.

### Technical details
- Breadcrumb nav becomes `flex items-center justify-between` — left: breadcrumb links, right (mobile only): `"X rezultate"` as `<span className="lg:hidden">`
- The existing results count paragraph gets `hidden lg:block` so it only shows on desktop in its original position
- The mobile filter Sheet trigger moves inside ResultsTopBar's sort/view row with `lg:hidden`
