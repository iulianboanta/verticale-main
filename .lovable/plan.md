

## Plan: Add 2 supplementary category rows with category + subcategory selects

**File:** `src/components/ghidbeauty/add-company/StepForm.tsx`

### Current state
Lines 187-198: When `isPro`, there's a single select for "Categorii suplimentare (max 2)". It only has one category dropdown — no subcategory, and no proper two-row structure.

### Changes

Replace the current supplementary categories block (lines 187-198) with two identical category+subcategory row pairs, mirroring the main category structure (lines 162-186):

**Row 1 — Categorie suplimentară 1 (opțional)**
- Grid `grid-cols-1 sm:grid-cols-2 gap-4`
- Left: "Categorie suplimentară 1" label with same category options as main category
- Right: "Subcategorie" select (dependent on left selection, placeholder "Selectează categoria întâi")

**Row 2 — Categorie suplimentară 2 (opțional)**
- Same structure as row 1, labeled "Categorie suplimentară 2"

Both rows remain gated behind `isPro`. Labels will include "(opțional)" suffix to indicate they are not required.

