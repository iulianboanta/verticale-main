Context
-------
Tema `funerare` folosește acum `215 25% 24%` (albastru-gri închis), aproape identic cu `tractări` (`220 35% 24%`). Utilizatorul a ales direcția **Aubergine & ivory** pentru a distanța vizual cele două branduri.

Plan de implementare
--------------------

1. **CSS tokens** (`src/index.css`)
   - Rescrie blocul `:root[data-theme="funerare"]` cu noua paletă:
     - Primary: `#4a2740` (aubergine profund, HSL ~315° 30% 21%)
     - Background: `#faf7f2` (ivoriu cald)
     - Accent: `#b08a4a` (auriu stins)
     - Dark: `#2e1826` (aubergine mai închis pentru hover/states)
     - Păstrează fonturile existente (Cormorant Garamond + Source Sans 3) și radius 0.25rem (clasic, nu jucăuș).

2. **Hero mock nou**
   - Generează `hero-funerare.jpg` în tonuri de aubergine/ivoriu (lumânări, flori, interior recepție pompe funebre cu lumină caldă, culoare dominată de mov-vinaceu și auriu stins, fără albastru).

3. **Verificare contrast**
   - Testează după scriere că primary + foreground și accent + foreground au WCAG AA.

4. **Preview**
   - Comută pe tema funerare în switcher și capturează screenshot pentru validare vizuală față de tractări.

Nu se modifică alte verticale. Uși rămâne pe lista de ajustat ulterior cu maro.