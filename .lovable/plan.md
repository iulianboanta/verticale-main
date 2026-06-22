## Plan: Aplica nuanța „taupe-antracit cald" pentru tema funerare

### Obiectiv
Înlocuiesc paleta maro actuală a temei `:root[data-theme="funerare"]` cu varianta recomandată **taupe-antracit cald**, care adaugă gri antracit în maro pentru un look mai sobru, elegant și mai puțin pământiu, fără să devină rece/steril.

### Modificări
1. **Actualizez variabilele CSS pentru tema `funerare` în `src/index.css`**:
   - `--background`: taupe foarte deschis (`#F0EDE8`)
   - `--foreground`: antracit-maro închis (`#595049`)
   - `--primary`: antracit-maro închis (`#595049`) pentru butoane, linkuri, accente principale
   - `--primary-foreground`: alb-sidef (`#F7F6F4`)
   - `--primary-light`: taupe deschis (`#F0EDE8`)
   - `--primary-dark`: maro-antracit închis (`#3E3935`)
   - `--primary-glow`: bej-sidef cald (`#A8987E`) pentru elemente luminoase/hero highlight
   - `--accent`: bronz-antracit (`#7A6F66`)
   - `--secondary`, `--muted`, `--border`: nuanțe intermediate de taupe/gri cald
   - `--sidebar-*`: sincronizate cu aceeași paletă

2. **Păstrez ajustările existente pentru hero**:
   - Dimensiunea fontului hero (`clamp(2.5rem, 8vw, 3.75rem)` în CSS) și `leading-[1.1]` rămân neschimbate.

3. **Verificare vizuală**:
   - După aplicare, deschid ruta `/funerare` (sau subdomeniul corespunzător) în preview pe viewport mobil pentru a confirma contrastul titlului hero și calitatea generală a noii culori.

### Rezultat așteptat
Tema funerare devine mai sobră și mai urbană, cu maro „șters" spre gri antracit, păstrând totuși o căldură subtilă potrivită domeniului sensibil.

### Fișiere modificate
- `src/index.css`