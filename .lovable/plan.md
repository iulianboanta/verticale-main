

## Plan: Fix search bar hidden behind navbar + ensure toggle visibility

### Problem
The Navbar uses `position: fixed` (out of normal flow), so the flex column in `SearchMapView` starts at the top of the screen — the search bar renders *behind* the navbar. The view toggle also gets cut off.

### Changes

**`src/pages/SearchMapView.tsx`**

1. Add a spacer `div` after `<Navbar>` to push content below the fixed navbar (~64px), OR change the outer container to add `pt-16` (64px = navbar height) so the search bar starts below the navbar.

2. Remove `hidden sm:flex` from the ToggleGroup — make it always visible (or use a lower breakpoint if needed on mobile).

### Files modified
- `src/pages/SearchMapView.tsx`

