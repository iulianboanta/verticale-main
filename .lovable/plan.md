

## Plan: Restructurare SearchTopBar și ResultsTopBar

### Rezumat
1. Scoatem breadcrumb-ul și view toggle din `SearchTopBar` — bara rămâne doar cu câmpurile de căutare, centrate.
2. Mutăm breadcrumb-ul în `ResultsTopBar`, deasupra liniei cu rezultate + sortare.
3. Mutăm view toggle în `ResultsTopBar`, pe aceeași linie cu dropdown-ul de sortare (la dreapta).

### Structura finală

```text
┌─────────────────────────────────────────────────┐
│  [🔍 Ce cauți?  |  📍 Unde?  🔍]              │ ← SearchTopBar (sticky, centrat, fără breadcrumb/toggle)
├─────────────────────────────────────────────────┤
│  Acasă › Coafură › Cluj-Napoca                  │ ← breadcrumb (mutat aici)
│  67 rezultate pentru "coafor" în "Cluj"   [Sort ▾] [☰ ⊞ 🗺] │ ← rezultate + sort + view toggle
│  [pill] [pill] [pill]                           │ ← filtre active
└─────────────────────────────────────────────────┘
```

### Modificări per fișier

**`SearchTopBar.tsx`**
- Ștergem blocul breadcrumb (liniile 62-75) și blocul ToggleGroup (liniile 77-105).
- Scoatem props `view` și `onViewChange` din interfață.
- Câmpul de căutare rămâne singur în bar → se centrează natural cu `max-w-2xl mx-auto`.

**`ResultsTopBar.tsx`**
- Adăugăm props: `view`, `onViewChange`, `query` (deja există), `location` (deja există) — pentru breadcrumb și toggle.
- Adăugăm breadcrumb deasupra liniei cu rezultate (Acasă › query › location).
- Pe linia cu "67 rezultate..." adăugăm ToggleGroup (Listă/Grid/Hartă) lângă dropdown-ul de sortare.

**`SearchResults.tsx`**
- Scoatem `view`/`onViewChange` din props-urile SearchTopBar.
- Adăugăm `view`/`onViewChange` la ResultsTopBar.

### Fișiere modificate
- `src/components/ghidbeauty/search/SearchTopBar.tsx`
- `src/components/ghidbeauty/search/ResultsTopBar.tsx`
- `src/pages/SearchResults.tsx`

