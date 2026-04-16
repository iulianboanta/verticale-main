

## Plan: Remove top widget, integrate its info into the listings table

### What changes

**File: `src/pages/dashboard/DashboardSubscriptions.tsx`**

1. **Remove** the "Current plan" widget card (lines 17-42) — the plan info, price, dates, progress bar, and buttons.

2. **Enhance the listings table** to include the previously widget-only information per listing:
   - Add columns: **Preț** (price based on plan: Gratuit=0, Intro=99, Profesional=199 RON/lună), **Activat** (activation date), **Zile rămase** (days remaining with a small progress bar).
   - Keep existing columns: Companie, Plan curent, Data expirare, Acțiuni (colSpan=2 with Upgrade/Prelungește).
   - For "Gratuit" plan: Preț shows "Gratuit", Zile rămase shows "Nelimitat", no activation date needed.

3. **Mock data**: Add `activationDate` field to each listing in `src/data/dashboardMockData.ts` to support the new column, and compute days remaining from expiry date.

### Files modified
- `src/pages/dashboard/DashboardSubscriptions.tsx` — remove widget, expand table
- `src/data/dashboardMockData.ts` — add `activationDate` to mockListings

