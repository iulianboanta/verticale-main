

## Plan: Split Promo into two sub-columns with single spanning header

### Change in `src/pages/dashboard/DashboardListings.tsx`

**Header**: Replace the single `<th>Promo</th>` with `<th colSpan={2}>Promo</th>` so one "Promo" label spans two columns.

**Cells**: Replace the single Promo `<td>` with two `<td>` elements:
- **First td (Upgrade)**: Show Upgrade button if plan is "Gratuit" or "Intro", otherwise empty.
- **Second td (Prelungește)**: Show Prelungește button if plan is "Intro" or "Profesional", otherwise empty.

Each button is naturally aligned in its own column — no placeholders needed.

### Single file change
- `src/pages/dashboard/DashboardListings.tsx`

