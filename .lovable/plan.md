

## Plan: Logo mai mare, rating simplificat pe linia badge-urilor

### Modificări în `CompanyHeader.tsx`

**1. Logo dublu** — schimbăm `w-14 h-14` → `w-28 h-28` (linia 116)

**2. Eliminare bloc recenzii** — ștergem complet secțiunea "Rating block" (liniile 126-167): scorul mare, stelele, distribuția pe bare

**3. Scor + stele pe linia badge-urilor, aliniat dreapta** — în div-ul de badges (linia 101), adăugăm `justify-between items-center` și inserăm la dreapta un buton clickable cu scorul (ex: `4.8`), 5 stele și textul `142 recenzii`. La click face smooth scroll la secțiunea de recenzii (`#reviews-section`).

Layout rezultat:
```text
[Recomandat] [Verificat]          4.8 ★★★★★ 142 recenzii →
```

**4. Eliminare `totalRatings`** — ștergem calculul (liniile 33-36) care nu mai e necesar

**5. `id="reviews-section"`** — adăugăm pe secțiunea de recenzii din `CompanyBody.tsx` (trebuie verificat dacă există deja)

### Fișiere
- `src/components/ghidbeauty/company/CompanyHeader.tsx`
- `src/components/ghidbeauty/company/CompanyBody.tsx` (adăugare id anchor)

