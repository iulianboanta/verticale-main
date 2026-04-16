

## Plan: Add "Promo" column to listings table

### Change in `src/pages/dashboard/DashboardListings.tsx`

Add a new "Promo" column after "Plan" in the table:

**Header**: Add `<th>Promo</th>` after the Plan column header (line 86).

**Cell logic** per plan type:
- **Gratuit**: Single button "Upgrade" (link to `/adauga-companie?step=plans`)
- **Intro**: Two buttons — "Prelungește" + "Upgrade" (both link to `/adauga-companie?step=plans`)
- **Profesional**: Single button "Prelungește" (link to `/adauga-companie?step=plans`)

Buttons will be small `Link`-wrapped `Button` components with `size="sm"` and `variant="outline"` styling, using `ArrowUpCircle` icon for Upgrade and `RefreshCw` for Prelungește.

Column hidden on small screens (`hidden md:table-cell`) same as Plan column.

### Single file change
- `src/pages/dashboard/DashboardListings.tsx`

