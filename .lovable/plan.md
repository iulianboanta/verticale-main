

## Plan: Fix content hidden under sticky navbar + search bar

The issue is that `<main>` has only `pt-10` (40px) of top padding, but the Navbar (64px, fixed) + SearchTopBar (~48px, sticky below navbar) together occupy ~112px. Content starts behind them.

### Changes

**`src/pages/SearchResults.tsx`** — line 117:
- Change `pt-10` → `pt-6 mt-[112px]` or simply increase to `pt-28` (112px) to push content below both sticky bars.

**`src/components/ghidbeauty/search/SearchFilters.tsx`** — sticky sidebar:
- Update `top-[7.5rem]` to match the combined height so the sidebar doesn't scroll behind the bars.

### Files modified
- `src/pages/SearchResults.tsx`
- `src/components/ghidbeauty/search/SearchFilters.tsx` (sticky top value)

