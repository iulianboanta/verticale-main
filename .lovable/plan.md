## Aliniere formular admin Edit/Add Listing cu StepForm (Pas 3 frontend)

### 1. `src/components/ghidbeauty/add-company/StepForm.tsx`
Adaug props opționale:
- `hideStickyFooter?: boolean` — ascunde footer-ul sticky cu „Continuă/Înapoi" și acceptarea termenilor (specifice flow-ului public).
- `hideTermsAcceptance?: boolean` — ascunde checkbox-ul de termeni.
- `submitLabel?: string` (opțional) — pentru contextul admin.

Toate câmpurile existente (slogan, categorii/subcategorii, descriere rich-text, program, date legale/CUI, galerie, social, etc.) rămân neatinse.

### 2. `src/pages/manage/listings/EditListing.tsx` (rewrite)
Layout 2 coloane pe `lg+`:
- **Stânga (`lg:col-span-2`)**: `<StepForm hideStickyFooter hideTermsAcceptance />` — formularul complet identic cu Pasul 3 din `/adauga-companie`.
- **Dreapta (sticky `top-4`)**: card „Panou Admin" cu:
  - Status (Activ / În așteptare / Suspendat / Respins)
  - Plan override (Gratuit / Intro / Profesional)
  - Dată expirare plan
  - Note interne admin (textarea)
  - Toggle Verified badge
  - Toggle Featured (Recomandat)
  - Butoane Salvează / Anulează

Detectez `id === "new"` pentru titlu („Adaugă listing nou" vs „Editează listing — {nume}") și pentru a popula sau lăsa gol formularul.

### 3. `src/App.tsx`
Adaug ruta lipsă `/manage/listings/new/edit` → `<EditListing />` în `AdminProtected`, ca butonul „Adaugă listing" din dashboard să funcționeze.

### Fișiere atinse
- `src/components/ghidbeauty/add-company/StepForm.tsx` (props noi, fără regresii pe flow-ul public)
- `src/pages/manage/listings/EditListing.tsx` (rewrite cu StepForm + sidebar admin)
- `src/App.tsx` (1 rută nouă)
