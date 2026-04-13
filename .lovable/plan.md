

## Plan: Navbar pe fond violet (primary) pe pagini interioare

### Abordare
Navbar-ul detectează dacă pagina are hero (homepage) sau nu (pagini interioare). Pe pagini fără hero, fundalul inițial e `bg-primary` cu text alb, iar la scroll trece pe `bg-card` cu text întunecat — exact cum funcționează acum.

### Modificări

**`src/components/ghidbeauty/Navbar.tsx`**
- Adăugăm un prop opțional `variant?: "transparent" | "solid"` (default `"transparent"` pentru homepage)
- Când `variant="solid"` și `!scrolled`: fundal `bg-primary`, logo alb, linkuri albe
- Când `scrolled`: comportamentul rămâne identic (bg-card, logo color, linkuri dark)
- Actualizăm și butoanele CTA pentru consistență pe fond violet

**`src/pages/Index.tsx`**
- Navbar rămâne fără prop (default transparent) — comportament neschimbat

**`src/pages/CompanyDetail.tsx`**
- Navbar primește `variant="solid"`

### Rezultat
- Homepage: navbar transparent → alb la scroll (neschimbat)
- Pagini interioare: navbar violet → alb la scroll (fix)

