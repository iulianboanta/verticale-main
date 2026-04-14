

## Plan: Ajustări pagina de rezultate căutare

### 1. Fix poziționare conținut sub navbar (`SearchResults.tsx`, linia 117)
Conținutul este acoperit de SearchTopBar-ul sticky. Schimbăm `py-6` → `pt-10 pb-6` pe `<main>` pentru a crea spațiu suficient.

### 2. Hover pe butonul "Profil →" (`SearchResultCard.tsx`)
Adăugăm `hover:bg-primary/10 hover:text-primary` pe butonul ghost "Profil →".

### 3. Banner — format orizontal (`SearchResults.tsx`, liniile 188-197)
Schimbăm din `300×250 h-[250px]` → `max-w-[600px] h-[60px] w-full`, text "600×60 · Banner publicitar". În grid view: `col-span-full`.

### 4. Fix grid view — banner dimensiune corectă
Bannerul în grid primește `col-span-full h-[60px]` (nu `h-[250px]`), eliminând spațiul gol.

### 5. Sidebar filtre — Rating sub Facilități (`SearchFilters.tsx`)
Mutăm blocul "Rating minim" după "Facilități". Ordinea nouă: Categorie → Localitate → Program → Servicii → Facilități → Rating minim → Vizibilitate.

### 6. "Doar din județ" sub Localitate (`SearchFilters.tsx`)
Extragem toggle-ul "Doar din județ" din Vizibilitate și îl plasăm imediat sub filtrul Localitate.

### Fișiere modificate
- `src/pages/SearchResults.tsx` — padding + banner
- `src/components/ghidbeauty/search/SearchResultCard.tsx` — hover profil
- `src/components/ghidbeauty/search/SearchFilters.tsx` — reordonare filtre

