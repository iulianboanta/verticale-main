

## Plan: Fix butoane navigare și închidere în lightbox

### Problema
Butoanele de navigare (stânga/dreapta) și butonul X de închidere există deja în cod, dar sunt ascunse de clasa CSS `[&>button]:hidden` aplicată pe `DialogContent`. Această clasă este menită să ascundă butonul default de close al Dialog-ului, dar ascunde și butoanele custom.

### Modificare

**`src/components/ghidbeauty/company/CompanyHeader.tsx`**
1. Înlocuim `[&>button]:hidden` cu un selector mai specific care ascunde doar butonul default de close al Radix Dialog: `[&>button[class*="absolute"][class*="right-4"][class*="top-4"]]:hidden` — sau mai simplu, mutăm butoanele custom într-un `<div>` wrapper ca să nu mai fie direct children ai `DialogContent`.
2. Alternativ, facem butoanele mai vizibile cu dimensiuni mai mari și fundal semi-transparent mai pronunțat.

### Rezultat
- Butonul X de închidere vizibil în colțul dreapta-sus
- Săgețile stânga/dreapta vizibile pe laterale
- Navigare funcțională între poze

