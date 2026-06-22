Plan pentru ajustarea temei **funerare**:

1. **Actualizează paleta de culori în `src/index.css`** pentru `:root[data-theme="funerare"]`:
   - `primary`: maro-închis cald (aprox. `#4A3B32`, HSL ~22 22% 25%).
   - `primary-dark`: maro profund pentru hover/stări active (aprox. `#32261F`, HSL ~18 26% 16%).
   - `primary-light`: crem-sidef cald pentru suprafețe (aprox. `#EFEBE6`, HSL ~35 18% 93%).
   - `primary-glow`: nuanță de bronz sidefat pentru accente (aprox. `#C4B095`, HSL ~34 30% 62%).
   - `accent`: maro-mijlociu/bronz (`#9E8A6E`, HSL ~34 24% 52%).
   - Ajustează `secondary`, `muted`, `border`, `sidebar-*` pentru a rămâne în aceeași familie caldă, sobră.
   - Păstrează fonturile existente: `Cormorant Garamond` pentru titluri și `Source Sans 3` pentru body.

2. **Îmbunătățește lizibilitatea hero-ului pe mobile**:
   - În `src/components/ghidbeauty/HeroSection.tsx`, adaugă o clasă suplimentară pe `<h1>` (ex. `hero-title`) și ridică ușor opacitatea overlay-ului pentru funerare (`bg-black/55` în loc de `bg-black/50` doar pe tema funerare, sau uniform pentru mai bun contrast).
   - În `src/index.css`, adaugă o regulă dedicată temei funerare care mărește fontul hero-ului pe ecrane mici:
     ```css
     :root[data-theme="funerare"] .hero-title {
       font-size: clamp(2.25rem, 7vw, 3.5rem);
     }
     ```
   - Opțional: crește shadow-ul textului (`drop-shadow-2xl` / `text-shadow`) doar pentru tema funerare pentru contrast îmbunătățit.

3. **Verificare**:
   - Comută pe verticala funerare cu switcher-ul existent.
   - Testează pe viewport mobile (în preview, ~375–414 px) că titlul hero-ului se citește confortabil și paleta maro se vede coerent pe toată pagina.