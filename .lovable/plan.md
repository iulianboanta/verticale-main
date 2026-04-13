

## Plan: Lightbox modal cu carousel pentru galeria de poze

### Abordare
Adăugăm un Dialog modal fullscreen care se deschide la click pe orice poză din galeria CompanyHeader. În modal, pozele se afișează cu `object-contain` pe fundal negru, cu navigare stânga/dreapta.

### Modificări

**`src/components/ghidbeauty/company/CompanyHeader.tsx`**
1. Importăm `Dialog`, `DialogContent` din UI + iconițe `ChevronLeft`, `ChevronRight`, `X`
2. Adăugăm state: `lightboxOpen` (boolean) și `lightboxIndex` (number)
3. La click pe orice imagine din grid → `setLightboxOpen(true)` + `setLightboxIndex(i)`
4. Butonul "Vezi toate fotografiile" → deschide lightbox-ul la index 0
5. Adăugăm componenta Dialog cu:
   - Overlay negru (`bg-black/90`)
   - Imagine centrată cu `object-contain` (se adaptează la orice aspect ratio)
   - Butoane săgeți stânga/dreapta pentru navigare
   - Counter "3 / 12" sus
   - Buton X de închidere
   - Suport taste keyboard (←, →, Escape)
   - Cursor pointer pe imagini în grid

### Rezultat
- Pozele se văd integral, indiferent de dimensiune
- Navigare fluidă între poze
- Pattern familiar (Airbnb/Google style)
- Funcționează pe desktop și mobile

