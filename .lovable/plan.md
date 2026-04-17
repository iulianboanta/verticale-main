

## Pagina de editare listing

### Obiectiv
Cand utilizatorul apasa pe iconita "Editeaza" din `/dashboard/listinguri`, sa fie dus pe o pagina de editare cu aceeasi structura si logica de formular ca pasul 3 din "Adauga companie", dar adaptata pentru editarea unui listing existent.

### Strategie
Refolosim componenta `StepForm.tsx` extragand logica formularului intr-o componenta reutilizabila — fara a sparge fluxul de adaugare existent. Solutia minim invaziva: pastram `StepForm` neschimbat si cream o pagina noua care randeaza acelasi formular intr-un context "edit", in interiorul layout-ului de dashboard.

### Modificari

1. **Refactor `StepForm.tsx`** — adaugam props optionale pentru a permite reutilizarea in modul "editare":
   - `mode?: "create" | "edit"` (default `"create"`)
   - `submitLabel?: string` 
   - `onBack?` devine optional
   - In modul `edit`: ascundem `ProgressIndicator`, ascundem header-ul "Completează profilul...", schimbam butonul "Continuă" in "Salvează modificările", iar `handleSubmit` afiseaza un toast de succes si redirectioneaza la `/dashboard/listinguri` (in loc de checkout/confirmare).
   - Footer-ul sticky in modul edit afiseaza doar butoanele "Anuleaza" + "Salvează modificările" (fara "Pasul 3 din 3").

2. **Pagina noua: `src/pages/dashboard/DashboardEditListing.tsx`**
   - Citeste `:id` din URL (`useParams`).
   - Cauta listing-ul in `mockListings` din `dashboardMockData` pentru a determina `plan` (Gratuit/Intro/Profesional → mapat la `"gratuit" | "intro" | "profesional"`).
   - Daca listing-ul nu exista → afiseaza un mesaj "Listing inexistent" cu buton de intoarcere.
   - Header propriu in stilul dashboard-ului: titlu "Editeaza listing — {nume}", breadcrumb scurt "Listinguri / Editeaza", badge cu planul curent.
   - Randeaza `<StepForm mode="edit" plan={plan} />`.

3. **Routing in `src/App.tsx`**
   - Adauga `/dashboard/listinguri/:id/editeaza` ca ruta protejata sub `DashboardLayout`.

4. **Link in `DashboardListings.tsx`**
   - Iconita "Editeaza" (`<Edit />`) devine `<Link to={\`/dashboard/listinguri/${l.id}/editeaza\`}>` infasurand butonul ghost.

### Note design
- Reutilizam exact aceleasi sectiuni colapsabile, validari si campuri ca in pasul 3 → consistenta totala intre add si edit.
- In viitor, datele initiale ale listing-ului se vor preincarca prin props (`initialData`); in mock-ul curent campurile raman goale, iar planul listing-ului determina structura formularului (ca in StepForm).
- Footer-ul sticky ramane in interiorul zonei de continut a dashboard-ului (nu peste sidebar) folosind acelasi pattern de pozitionare.

### Fisiere atinse
- `src/components/ghidbeauty/add-company/StepForm.tsx` — props `mode`, ajustari condiționale pentru header/footer/submit
- `src/pages/dashboard/DashboardEditListing.tsx` — **nou**
- `src/App.tsx` — ruta noua
- `src/pages/dashboard/DashboardListings.tsx` — link pe iconita Edit

