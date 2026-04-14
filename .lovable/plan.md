

## Plan: Hover vizibil pe Badge-ul "Răspuns" din recenzii

### Modificare în `CompanyBody.tsx` (linia 315)

Badge-ul `Răspuns {author}` are acum `bg-primary/10 text-primary` fără hover distinct. Adăugăm `hover:bg-primary/20 hover:text-primary cursor-default transition-colors` pentru un efect vizibil la hover, păstrând tema violet.

### Fișier modificat
- `src/components/ghidbeauty/company/CompanyBody.tsx` — linia 315, clasa Badge-ului

