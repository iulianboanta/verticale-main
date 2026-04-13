

## Plan: Hover effects — buton video + buton "Adaugă companie"

### 1. Buton "Vezi prezentare video" (`CompanyBody.tsx`, linia 91)

Hover actual: `hover:bg-accent/50` (portocaliu slab). Schimbăm în `hover:bg-primary/10 hover:border-primary` — fundal violet ușor cu border primary, consistent cu tema.

### 2. Buton "Adaugă companie" — navbar (`Navbar.tsx`)

**Desktop scrolled** (linia 74-83): Acum e `bg-primary` fără hover vizibil. Adăugăm efect invert: `hover:bg-primary-foreground hover:text-primary hover:ring-2 hover:ring-primary` — fundal alb cu text violet și contur.

**Desktop transparent** (linia 79): La fel, adăugăm inversare la hover.

**Mobile** (linia 114-116 aprox): Același tratament invert pe hover.

### Fișiere modificate
- `src/components/ghidbeauty/company/CompanyBody.tsx` — hover buton video
- `src/components/ghidbeauty/Navbar.tsx` — hover buton "Adaugă companie" (desktop + mobile)

