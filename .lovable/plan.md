## Obiectiv

Aplicăm 3 variante cromatice diferite pe tema **usi** (înrudită vizual cu usi.ro — roșu/negru, mai vie decât paleta actuală maro-warm), cu un switcher rapid pentru a le compara live și a o alege pe cea finală.

## Cele 3 variante

**V1 — Roșu cărămidă & negru (industrial-premium)**
- Fundal: off-white cald `#F5F2EC`
- Foreground/primary: negru carbune `#111111`
- Accent: roșu cărămidă profund `#C8201C`
- Glow: crem cald `#E8E2D6`
- Vibe: solid, premium, asemănător cu usi.ro clasic.

**V2 — Roșu rubin & grafit (vibrant modern)**
- Fundal: alb cald `#FAFAF7`
- Foreground: grafit `#2A2A2D`
- Primary: grafit închis `#1A1A1D`
- Accent: roșu rubin saturat `#D72638`
- Glow secundar: galben chihlimbar `#F2B544`
- Vibe: mai energic, contrast bold, cea mai „vie".

**V3 — Negru mat & roșu accent (bold minimal)**
- Fundal: off-white `#F5F5F2`
- Foreground/primary: negru `#111111` / antracit `#2D2D2D`
- Accent CTA: roșu coral `#E63946`
- Vibe: dominantă neagră, roșul folosit doar punctual pe butoane/highlight — cel mai sobru-bold.

## Implementare

1. În `src/index.css` adaug 3 blocuri de teme noi pe lângă cea existentă:
   - `:root[data-theme="usi-v1"]`
   - `:root[data-theme="usi-v2"]`
   - `:root[data-theme="usi-v3"]`
   
   Fiecare suprascrie aceleași tokens ca tema curentă `usi`: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--primary-light/dark/glow`, `--secondary`, `--muted`, `--accent`, `--border`, `--ring`, `--sidebar-*`. Tipografia (Inter + Playfair Display) și `--radius` rămân.

2. Adaug un mic **theme switcher** vizibil doar când vertical-ul activ e `usi` (sau una din variante): un panou fix bottom-right cu 3 butoane „V1 / V2 / V3" care setează `document.documentElement.setAttribute("data-theme", ...)`. Componentă nouă: `src/components/dev/UsiThemeSwitcher.tsx`, montată în layout-ul aplicației și self-hiding când nu e relevant. Nu modifică `VerticalProvider` — doar override temporar pe atributul DOM, pentru preview.

3. Tema implicită pentru vertical-ul `usi` rămâne neschimbată până alegi varianta finală. După ce alegi, mutăm tokenii aleși în blocul `:root[data-theme="usi"]` și ștergem switcher-ul + variantele neutilizate.

## Fișiere modificate

- `src/index.css` — adăugare 3 blocuri tematice noi
- `src/components/dev/UsiThemeSwitcher.tsx` — componentă nouă (switcher)
- `src/App.tsx` (sau layout-ul global) — montare switcher

## Verificare

Navighez la `/usi` în preview, comut între V1/V2/V3 din colțul ecranului, captură pe mobil + desktop pentru hero + butoane CTA.
