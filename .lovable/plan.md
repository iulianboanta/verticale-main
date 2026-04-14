

## Plan: Show view toggle on mobile in search results

### Problem
The `ToggleGroup` in `ResultsTopBar.tsx` has class `hidden sm:flex`, hiding it below 640px.

### Fix
**`src/components/ghidbeauty/search/ResultsTopBar.tsx`** line 130:
- Change `hidden sm:flex` → `flex` to make the toggle always visible.

### Files modified
- `src/components/ghidbeauty/search/ResultsTopBar.tsx`

