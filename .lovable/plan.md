

## Plan: Dashboard refinements

### 1. Remove plan badge under name in sidebar
**File**: `DashboardLayout.tsx` — Delete lines 96-98 (the `<span>` with plan badge below user info).

### 2. Remove green plan status banner from Dashboard Overview
**File**: `DashboardOverview.tsx` — Delete lines 97-108 (the green `Card` with "Plan activ" and "Reinnoieste").

### 3. Replace "Afisari" column with "Data expirare" in Overview listings table
**File**: `DashboardOverview.tsx` — Change header from "Afisari" to "Data expirare" (line 126), change cell from `l.viewsThisMonth` to `l.expiryDate`, showing "Nelimitat" when plan is "Gratuit".

### 4. Same change in DashboardListings table
**File**: `DashboardListings.tsx` — Replace "Afisari" header/column with "Data expirare". Show "Nelimitat" for Gratuit plan listings.

### 5. Fix logo in sidebar/topbar
**File**: `DashboardLayout.tsx` — The logo import `src/assets/ghidbeauty-logo.png` is already used. Will verify asset exists; if missing, ensure it matches the site Navbar logo source.

### 6. All "Adauga listing" links → StepPlans comparison page
Change all dashboard "Adauga listing" links (sidebar nav, overview quick action, listings page button) from `/adauga-companie` to `/adauga-companie?step=plans` or directly to the plans comparison step. Since the AddCompany flow has steps, the simplest approach: link to `/adauga-companie` but skip to step 2 (plans). I'll check how AddCompany handles this — likely need to add URL param support.

**Files**: `DashboardLayout.tsx`, `DashboardOverview.tsx`, `DashboardListings.tsx` — update hrefs. `AddCompany.tsx` — support `?step=plans` to start at plan selection directly.

### 7. Add "Raporteaza recenzie" button + popup in Reviews
**File**: `DashboardReviews.tsx` — Add a "Raporteaza" button on each review card. On click, open a Dialog with:
- Dropdown: Motiv raportare (Recenzie falsa, User fals, Limbaj trivial, Alte motive)
- Textarea: Descrie motivul
- Submit button

### 8. Subscriptions page: remove plan comparison, add active listings table
**File**: `DashboardSubscriptions.tsx`:
- Remove the "Compara planurile" section (plans grid)
- Add a table of active listings showing: name, current plan, expiry date, and action buttons:
  - "Prelungeste" for Intro and Profesional
  - "Upgradeaza" for Gratuit and Intro

### 9. Fix favorites images
**File**: `DashboardFavorites.tsx` — The mock data uses `/placeholder.svg`. Update mock favorites in `dashboardMockData.ts` to use proper sample images (same pattern as search results), and ensure the card image rendering matches the SearchResultCard style with fallback.

### Files summary
- `src/components/ghidbeauty/dashboard/DashboardLayout.tsx` — remove plan badge, fix "Adauga listing" href
- `src/pages/dashboard/DashboardOverview.tsx` — remove green banner, swap Afisari→Data expirare, fix "Adauga listing" href
- `src/pages/dashboard/DashboardListings.tsx` — swap Afisari→Data expirare, Gratuit="Nelimitat", fix "Adauga listing" href
- `src/pages/dashboard/DashboardReviews.tsx` — add report button + dialog
- `src/pages/dashboard/DashboardSubscriptions.tsx` — remove plan comparison, add listings table with upgrade/extend buttons
- `src/pages/dashboard/DashboardFavorites.tsx` — fix image display
- `src/data/dashboardMockData.ts` — update favorite images
- `src/pages/AddCompany.tsx` — support direct entry to plans step via URL param

