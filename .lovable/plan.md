

## Modificare butoane in Dashboard Overview

### Context
Pe pagina `/dashboard` (overview), avem doua butoane de actiune in tabele/carduri care nu au navigare:
1. Butonul **Editare** din randurile listing-urilor (sectiunea "Listingurile mele")
2. Butonul **Raspunde** din cardurile de recenzii (sectiunea "Recenzii recente")

Le transformam in butoane de tip "Administreaza" care navigheaza catre paginile dedicate de management.

### Modificari in `src/pages/dashboard/DashboardOverview.tsx`

**1. Buton "Editare" → "Administreaza"** (linia ~135):
- Schimbam textul din `Editare` in `Administreaza`.
- Inlocuim `<Button>` simplu cu `<Link to="/dashboard/listinguri">` care wrap-uieste butonul (folosind `asChild`).
- Toate randurile duc la pagina centrala `Toate listingurile`.

**2. Buton "Raspunde" → "Administreaza"** (linia ~174):
- Schimbam textul din `Raspunde` in `Administreaza`.
- Eliminam conditia `!r.replied` (butonul apare la toate recenziile, fiind doar un shortcut catre pagina).
- Wrap in `<Link to="/dashboard/recenzii">` cu `asChild`.

### Fisiere atinse
- `src/pages/dashboard/DashboardOverview.tsx` — singura modificare

