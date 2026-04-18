

## Aplicare funcționalitate apelare + WhatsApp pe butoanele din `CompanySidebar`

### Context
În `CompanySidebar.tsx` (formularul de contact din pagina detalii companie), butoanele **Sună**, **WhatsApp** și **Website** sunt momentan butoane fără handler/link. Aplicăm același pattern folosit cu succes pe sticky bar.

### Modificări în `src/components/ghidbeauty/company/CompanySidebar.tsx`

1. **Buton "Sună {company.phone}"**:
   - Folosim pattern-ul `asChild` + `<a href="tel:...">` pentru a fi tratat ca user gesture nativ.
   - `tel:` href construit prin `company.phone.replace(/[^0-9+]/g, "")`.

2. **Buton "WhatsApp"**:
   - Wrap în `<a href={company.whatsapp} target="_blank" rel="noopener noreferrer">` via `asChild`.
   - Afișat doar dacă `company.whatsapp` există.

3. **Buton "Website"**:
   - Wrap în `<a href={company.website} target="_blank" rel="noopener noreferrer">` via `asChild`.
   - Afișat doar dacă `company.website` există.

### Note
- Nu modificăm formularul de mesaj (rămâne `onSubmit preventDefault`) — nu face parte din scope.
- Nu schimbăm `CompanyHeader` în acest pas (același pattern este deja folosit acolo conform contextului anterior).

### Fișiere atinse
- `src/components/ghidbeauty/company/CompanySidebar.tsx` — singura modificare

