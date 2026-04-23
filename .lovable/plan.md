

## Adăugare submeniu „Servicii" în Administrare cu form pentru chei externe

### 1. Sidebar — `src/components/manage/AdminSidebar.tsx`
În secțiunea **ADMINISTRARE** adaug item nou între `Bannere publicitare` și `Setări platformă`:
- `Servicii` → `/manage/admin/services-keys` (icon `KeyRound` din lucide-react).

> Notă: folosesc ruta `/manage/admin/services-keys` ca să evit coliziunea cu existentul `/manage/admin/services` (care e „Servicii & Facilități" sub Listings Management).

### 2. Pagină nouă — `src/pages/manage/admin/ServicesKeys.tsx`
Pagină în `AdminLayout` cu titlu **„Servicii"** și subtitlu „Configurează cheile pentru integrări externe". Conține 3 carduri (`Card` shadcn), fiecare cu form propriu — fără logică de salvare în cod (doar UI/markup):

**Card 1 — Google Maps**
- Icon: `MapPin`
- Câmp: `Google Maps API Key` (Input type=password cu toggle vizibilitate prin icon Eye/EyeOff)
- Helper text: „Folosit pentru afișarea hărților și autocomplete adrese."
- Buton: `Salvează cheia` (disabled vizual / fără handler real)

**Card 2 — Google reCAPTCHA**
- Icon: `ShieldCheck`
- Câmpuri:
  - `Site Key` (Input text — public)
  - `Secret Key` (Input password cu toggle)
  - `Versiune` (Select: `v2 Checkbox` / `v2 Invisible` / `v3`, default `v3`)
- Helper text: „Protejează formularele publice împotriva spam-ului."
- Buton: `Salvează cheile`

**Card 3 — Google Analytics**
- Icon: `BarChart3`
- Câmpuri:
  - `Measurement ID` (Input text, placeholder `G-XXXXXXXXXX`)
  - `API Secret` (Input password cu toggle, opțional pentru Measurement Protocol)
- Helper text: „Tracking trafic și evenimente pentru întreg site-ul."
- Buton: `Salvează configurarea`

Toate butoanele rămân vizuale — fără persistență, fără apeluri API. State local doar pentru toggle-ul de vizibilitate parolă și valorile inputurilor (controlled inputs cu `useState`).

### 3. Routing — `src/App.tsx`
- Import nou: `ServicesKeys`.
- Rută nouă în interiorul `AdminProtected`: `/manage/admin/services-keys` → `<ServicesKeys />`.

### Layout pagină
```text
Servicii
Configurează cheile pentru integrări externe
─────────────────────────────────────────────
┌─ 📍 Google Maps ──────────────────────────┐
│ API Key  [••••••••••••••••]  👁           │
│ Folosit pentru hărți și autocomplete.     │
│                          [Salvează cheia] │
└───────────────────────────────────────────┘
┌─ 🛡 Google reCAPTCHA ─────────────────────┐
│ Site Key    [..........................]  │
│ Secret Key  [••••••••••••••]  👁          │
│ Versiune    [v3 ▾]                        │
│                         [Salvează cheile] │
└───────────────────────────────────────────┘
┌─ 📊 Google Analytics ─────────────────────┐
│ Measurement ID  [G-XXXXXXXXXX]            │
│ API Secret      [••••••••••]  👁          │
│                  [Salvează configurarea]  │
└───────────────────────────────────────────┘
```

### Fișiere atinse
- `src/components/manage/AdminSidebar.tsx` (1 item nou)
- `src/pages/manage/admin/ServicesKeys.tsx` (fișier nou)
- `src/App.tsx` (1 import + 1 rută)

