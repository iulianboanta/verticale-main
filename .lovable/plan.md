

## Submeniu „Pagini Statice" în Administrare

### 1. Sidebar — `src/components/manage/AdminSidebar.tsx`
În secțiunea **ADMINISTRARE**, între `Servicii` și `Setări platformă`, adaug item:
- `Pagini Statice` → `/manage/admin/static-pages` (icon `FileText` din lucide-react).

### 2. Pagină nouă — `src/pages/manage/admin/StaticPages.tsx`
Pagină în `AdminLayout` cu titlu **„Pagini Statice"** și subtitlu „Editează conținutul paginilor statice ale site-ului".

**Layout: split view (Tabs verticale stânga + editor dreapta)** — pe `md+` afișez `Tabs orientation=vertical`, pe mobil colapsate sus.

Pagini incluse (4 tab-uri):
1. **Despre GhidBeauty** (corespunde `/despre-noi`) — slug afișat: `/despre-noi`
2. **Despre Companie** (corespunde `/despre-companie`) — slug afișat: `/despre-companie`
3. **Termeni și Condiții** (corespunde `/termeni-conditii`) — slug afișat: `/termeni-conditii`
4. **Politica de Confidențialitate** (corespunde `/privacy-policy`) — slug afișat: `/privacy-policy`

Pentru fiecare pagină, în panoul din dreapta, un `Card` care conține:
- Header card: titlul paginii + badge cu slug-ul (read-only)
- Câmp `Titlu pagină` (Input — meta/H1)
- Câmp `Meta descriere` (Textarea, max 160 chars, cu counter)
- `Conținut HTML` — `RichTextEditor` (existent în `src/components/manage/RichTextEditor.tsx`), pre-populat cu un draft HTML extras din pagina actuală (text simplu paragrafe + h2/h3 — versiune editabilă, fără iconițe/imagini layout-specifice).
- Buton vizual `Salvează modificările` (fără handler real) + buton `Previzualizează` (deschide ruta publică în tab nou prin `<a target="_blank">`).

State: un `useState` cu obiect `{ [key]: { title, metaDescription, html } }`. Toate inputurile controlate. Fără persistență, fără API.

### 3. Routing — `src/App.tsx`
- Import nou: `StaticPages` din `@/pages/manage/admin/StaticPages`.
- Rută nouă în `AdminProtected`: `/manage/admin/static-pages` → `<StaticPages />`.

### Layout pagină
```text
Pagini Statice
Editează conținutul paginilor statice ale site-ului
─────────────────────────────────────────────────────────────
┌──────────────────┬────────────────────────────────────────┐
│ • Despre GhidB.  │  Despre GhidBeauty   [/despre-noi]     │
│   Despre Comp.   │  ──────────────────────────────────────│
│   Termeni & C.   │  Titlu      [Despre noi ............]  │
│   Politica Conf. │  Meta desc. [............] (120/160)   │
│                  │  Conținut:                             │
│                  │  ┌─ B I H2 H3 • 1. 🔗 ❝ ──────────────┐│
│                  │  │ <text editabil HTML al paginii>    ││
│                  │  └────────────────────────────────────┘│
│                  │  [Previzualizează]  [Salvează modif.]  │
└──────────────────┴────────────────────────────────────────┘
```

### Notă
- Conținutul HTML inițial = draft text simplificat, fiindcă paginile reale au layout React complex (grid, imagini, secțiuni cu icon). Editorul oferă un câmp HTML pentru text-ul de bază — pattern identic cu Articole/Emails.
- Niciun apel API, doar UI.

### Fișiere atinse
- `src/components/manage/AdminSidebar.tsx` (1 item nou + import `FileText`)
- `src/pages/manage/admin/StaticPages.tsx` (fișier nou)
- `src/App.tsx` (1 import + 1 rută)

