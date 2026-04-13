

## Plan: Link "Sesizează neregularitate" pe linia vizualizărilor

### Modificare în `CompanyHeader.tsx` (linia 229)

Transformăm div-ul de vizualizări într-un `flex` cu `justify-between` și adăugăm un link text aliniat la dreapta:

```text
👁 2.840 vizualizări luna aceasta          Sesizează neregularitate →
```

- Link stilizat cu `text-xs text-muted-foreground hover:text-destructive` și icon `Flag` (din lucide-react, size 12)
- La click — deocamdată `#` sau scroll la un formular (poate fi extins ulterior)

### Fișier modificat
- `src/components/ghidbeauty/company/CompanyHeader.tsx` — linia 229-232

