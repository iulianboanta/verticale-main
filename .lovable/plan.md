

## Corecție 404 pentru URL-uri dinamice nevalide

### Problema
Rutele dinamice `/:cat`, `/:cat/:sub`, `/:cat/:sub/:judet` prind orice segment în URL. Componenta `SearchResults` probabil nu verifică dacă slug-urile există în date, deci afișează rezultate goale în loc de 404.

### Soluție
Modifică `SearchResults.tsx` să valideze slug-urile contra datelor mock existente. Dacă vreun slug nu există (categorie/subcategorie/județ), redirecționează sau afișează componenta `NotFound`.

### Modificări în `src/pages/SearchResults.tsx`

1. **Verificare date existente**:
   - Caută `category` în `categoriesMockData` după slug
   - Caută `subcategory` în date dacă există
   - Caută `county` în `countiesMockData` dacă există

2. **Render condițional**:
   - Dacă orice slug din URL e invalid → returnează `<NotFound />`
   - Păstrează layout-ul curent pentru cazurile valide

### Modificări în `src/pages/CompanyDetail.tsx`

Similar, verifică dacă `slug` există în `companyMockData`. Dacă nu, afișează `<NotFound />`.

### Fișiere atinse
- `src/pages/SearchResults.tsx` — adaugă validare slug-uri
- `src/pages/CompanyDetail.tsx` — adaugă validare companie
- `src/pages/NotFound.tsx` — export default pentru import

