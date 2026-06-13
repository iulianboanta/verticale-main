
## Obiectiv

Pornind de la designul GhidBeauty existent, creăm un **sistem de teme** care permite lansarea rapidă a încă 6 verticale (tractări, veterinari, uși, funerare, curățenie, grădinițe) păstrând aceeași structură de produs, dar cu **identitate vizuală proprie** per verticală: culoare, tipografie, set de iconuri și tonalitate fotografică.

## Cele 7 verticale + direcție de mood

Pentru fiecare am ales un mood care se potrivește publicului și emoției serviciului. Toate folosesc HSL (compatibil cu sistemul actual din `index.css`).

| # | Verticală | Mood | Accent (HSL) | Tipografie (Display / Body) |
|---|---|---|---|---|
| 1 | **Beauty** (existent) | Elegant, feminin, premium | `270 28% 59%` mov | DM Sans / DM Sans |
| 2 | **Tractări auto** | Robust, urgent, încredere 24/7 | `18 90% 52%` portocaliu-roșu | Barlow Condensed / Inter |
| 3 | **Veterinari** | Cald, prietenos, sigur | `170 55% 38%` teal-verde | Nunito / Nunito Sans |
| 4 | **Uși & tâmplărie** | Solid, artizanal, premium-mat | `25 25% 30%` maro cald + alamă | Fraunces / Inter |
| 5 | **Servicii funerare** | Discret, demn, liniștit | `215 20% 35%` gri-albastru profund | Cormorant Garamond / Source Sans |
| 6 | **Curățenie** | Curat, proaspăt, eficient | `200 85% 50%` cyan-bleu | Manrope / Manrope |
| 7 | **Grădinițe** | Cald, jucăuș, sigur pentru părinți | `35 90% 58%` galben-piersică + verde-secundar | Quicksand / Nunito |

Logo-ul tău se va aplica peste fiecare temă (vom face automat o variantă monocromă albă + una pe accent). Dacă logo-ul are deja o culoare proprie, o putem folosi ca accent pentru verticala "mamă" și deriva celelalte 6.

## Arhitectura tehnică

### 1. Sistem de tokens per temă

Fiecare verticală = un set de CSS variables într-un fișier propriu:

```
src/themes/
  beauty.css        (deja există, doar îl extragem din index.css)
  tractari.css
  veterinari.css
  usi.css
  funerare.css
  curatenie.css
  gradinite.css
  _shared.css       (spacing, radius scale, shadow scale, typography scale)
```

Fiecare fișier definește **același set de tokens semantice** (deja folosite în proiect):
`--primary`, `--primary-glow`, `--primary-light`, `--primary-dark`, `--accent`, `--background`, `--foreground`, `--muted`, `--border`, `--radius`, `--font-display`, `--font-body`, plus gradient-uri și shadow-uri.

### 2. Theme provider

`src/lib/theme.ts` — detectează verticala din:
1. ENV (`VITE_VERTICAL=tractari`) la build → fiecare verticală = un deploy separat cu domeniu propriu, **recomandat pentru SEO**
2. Fallback: subdomeniu / path (pentru preview/staging)

Apoi încarcă `themes/{vertical}.css` și setează `<html data-theme="tractari">`.

### 3. Conținut variabil per verticală

`src/config/verticals.ts` — un singur obiect cu:
- nume brand, tagline, descriere SEO
- categorii (Beauty: saloane/spa; Veterinari: cabinete/urgență; Tractări: 24h/non-stop etc.)
- set de iconuri (Lucide) mapate semantic
- imagini hero (1 per verticală, generate sau stock)
- microcopy specific (CTA-uri, placeholder search)

Componentele existente (Navbar, HeroSection, ListingCard, CategoryGrid etc.) **rămân neschimbate** — citesc din `useVertical()`.

### 4. Iconuri & imagini

- **Iconuri**: rămânem pe Lucide (consistent), dar mapăm seturi diferite per verticală în config.
- **Imagini hero**: generăm 7 hero backgrounds prin imagegen, în stilul moodului fiecărei verticale.

## Livrabile

### A. Prototipuri HTML (înainte de implementare)
Generez 7 mockup-uri statice ale homepage-ului — câte unul per verticală — ca să vezi look & feel-ul **înainte** să atingem codul aplicației. Le prezint într-un singur view side-by-side. Aici poți cere ajustări pe paletă/tipografie/mood per verticală.

### B. Sistem de tokens în cod (după aprobarea prototipurilor)
- 7 fișiere CSS în `src/themes/` cu tokens HSL
- `src/lib/theme.ts` cu `ThemeProvider` + `useVertical()` hook
- `src/config/verticals.ts` cu configul de conținut
- `index.css` refactorizat să importe tema activă
- Documentație scurtă în `src/themes/README.md` cum adaugi a 8-a verticală

## Etape de execuție

1. **(Opțional, dar recomandat)** Încarci logo-ul în chat → îl folosesc ca referință pentru rafinarea paletelor.
2. Generez **7 prototipuri HTML** (homepage simplificat: navbar + hero + grid categorii + 1 listing card). Le vezi într-un singur ecran.
3. Iterezi pe ce vrei schimbat (ex: "fă funerare mai puțin sumbru", "veterinari mai jucăuș").
4. După aprobare, implementez sistemul de tokens + theme provider în proiect, fără să stric verticala Beauty existentă.
5. Generez 6 imagini hero noi (una per verticală nouă).

## Ce NU facem acum (rămân pentru iterații ulterioare)
- Deploy multi-domain / config Vercel-Netlify per verticală
- Conținut SEO complet per verticală (categorii, articole seed, FAQ)
- Logo-uri derivate per verticală (dacă vrei variante, le facem separat)
- Migrare backend / DB multi-tenant

## Fișiere atinse (estimare)
- **Nou**: `src/themes/*.css` (7), `src/lib/theme.ts`, `src/config/verticals.ts`, `src/themes/README.md`, 7 prototipuri HTML în `/mnt/documents/prototypes/`
- **Modificate**: `src/index.css` (extragere tokens), `src/main.tsx` (ThemeProvider wrap), `src/components/ghidbeauty/HeroSection.tsx` + `Navbar.tsx` + `Footer.tsx` (citesc din `useVertical()` în loc de hardcoded "GhidBeauty")
- **Neschimbate**: toată logica de listings, admin, search, dashboard
