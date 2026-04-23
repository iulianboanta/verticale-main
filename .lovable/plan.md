

## Adăugare toggle Activ/Inactiv pentru fiecare șablon email

### Modificare în `src/pages/manage/content/EmailsPages.tsx`
La fiecare card de șablon email (atât în tab-ul **Public** cât și **Admin**) adaug un control de activare în header-ul cardului, lângă titlu:

- Folosesc componenta `Switch` (shadcn — toggle modern, mai potrivit decât radio pentru on/off binar) cu label `Activ` alături.
- Poziționare: în partea dreaptă a header-ului cardului (titlu+descriere stânga, switch dreapta).
- State local: extind structura șabloanelor cu un câmp `active: boolean` (default `true`), gestionat prin `useState`.
- Vizual: când `active=false`, conținutul cardului (subiect + editor + buton salvează) primește `opacity-60` ca să sugereze starea inactivă, fără să-l dezactiveze complet (admin-ul poate edita textul chiar dacă e oprit).

### Layout card actualizat
```text
┌─ Bun venit · Trimis după înregistrare    [●━ Activ] ─┐
│ Subiect:  [Bine ai venit pe GhidBeauty, {nume}!]      │
│ ┌─ editor HTML ──────────────────────────────────────┐│
│ │ ...                                                 ││
│ └─────────────────────────────────────────────────────┘│
│                                  [Salvează șablonul]  │
└────────────────────────────────────────────────────────┘
```

### Notă
- Tab-ul **Settings** rămâne neatins (acolo sunt setări SMTP, nu șabloane).
- Fără persistență — doar state local controlat, conform pattern-ului existent al paginii.

### Fișier atins
- `src/pages/manage/content/EmailsPages.tsx`

