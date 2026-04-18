

## Adăugare funcționalitate apelare + WhatsApp pe sticky bar (CompanyStickyBar)

### Context
În `CompanyStickyBar.tsx` (bara navigare apare la scroll pe pagina detalii companie) butoanele **Sună** și **WhatsApp** sunt momentan butoane fără handler. Trebuie făcute funcționale.

### Modificări in `src/components/ghidbeauty/company/CompanyStickyBar.tsx`

1. **Extindere props** — pe lângă `name`, `rating`, `reviewCount`, `phone`, adăugăm `whatsapp?: string` în interface.

2. **Buton "Sună"** (desktop + mobile variant):
   - `onClick={() => window.location.href = \`tel:${company.phone.replace(/\s/g, '')}\`}`
   - Construim numărul în runtime (consistent cu strategia anti-bot existentă din `CompanyHeader`).

3. **Buton "WhatsApp"** (desktop + mobile variant):
   - Înfășurat într-un `<a href={company.whatsapp} target="_blank" rel="noopener">` doar dacă `company.whatsapp` există.
   - Dacă lipsește → ascundem ambele variante (sm + sm:hidden).

4. **Buton "Trimite mesaj"** — rămâne fără handler activ (nu face parte din cerere) sau scroll la secțiunea de contact dacă există. Plan: scroll smooth la `#reviews-section` sau la sidebar-ul de contact — dar doar ca polish opțional. **Nu îl atingem acum** pentru a respecta strict scope-ul ("cele două butoane").

### Fișiere atinse
- `src/components/ghidbeauty/company/CompanyStickyBar.tsx` — singura modificare

Nu este nevoie de schimbări în `CompanyDetail.tsx` deoarece `company` (care conține `phone` și `whatsapp`) este deja transmis ca prop către `CompanyStickyBar`.

