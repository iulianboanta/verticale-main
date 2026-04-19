

## Admin Panel pentru GhidBeauty.ro la `/manage`

### Context & Scope
Construiesc un panou complet de administrare cu ~30 de pagini, layout dedicat (top bar + sidebar), pattern de date mock (consistent cu restul proiectului) și o protecție simplă de tip "logged in" pe baza unui flag în `localStorage` (mock — nu auth real). Tot UI-ul folosește componentele shadcn deja prezente: `Table`, `Dialog`, `Sheet`, `Tabs`, `Card`, `Badge`, `Select`, `Input`, etc. Pentru charts folosesc `recharts` (deja prezent prin `chart.tsx`). Pentru rich-text editor folosesc un textarea simplu cu toolbar minimal (bold/italic/headings/lists) — fără dependență grea (TipTap), pentru a păstra bundle-ul mic; pot upgrade ulterior dacă vrei.

### Arhitectură

```text
src/
  pages/manage/
    Login.tsx                       (/manage/login)
    Dashboard.tsx                   (/manage)
    listings/
      AllListings.tsx               (/manage/listings)
      PendingListings.tsx           (/manage/listings/pending)
      ActiveListings.tsx
      ExpiredListings.tsx
      RejectedListings.tsx
      EditListing.tsx               (/manage/listings/:id/edit)
    orders/
      AllOrders.tsx                 (/manage/orders)
      UnpaidProforma.tsx
      ConfirmedPayments.tsx
      OrderDetail.tsx               (/manage/orders/:id)
    users/
      AllUsers.tsx                  (/manage/users)
    reviews/
      PendingReviews.tsx
      AllReviews.tsx
    articles/
      ArticlesList.tsx
      EditArticle.tsx
      ArticleCategories.tsx
    admin/
      ListingCategories.tsx
      Subcategories.tsx
      ServicesFacilities.tsx
      Counties.tsx
      Banners.tsx
      Settings.tsx
    reports/
      PlatformStats.tsx
      ListingsReport.tsx
      RevenueReport.tsx
  components/manage/
    AdminLayout.tsx                 (top bar + sidebar wrapper)
    AdminTopBar.tsx
    AdminSidebar.tsx
    AdminProtected.tsx              (redirect → /manage/login dacă nu logat)
    StatCard.tsx
    StatusPill.tsx
    DataTable.tsx                   (helper peste shadcn Table)
    RichTextEditor.tsx              (toolbar simplu + textarea)
  data/
    manageMockData.ts               (listings, orders, users, reviews, articles, banners, settings)
  lib/
    adminAuth.ts                    (login/logout/isLoggedIn helpers pe localStorage)
```

### Layout Admin
- **Top bar** (52px, bg `#1A1918`): logo + badge violet "Admin" la stânga; nume user + role badge + buton Logout la dreapta.
- **Sidebar** (220px, alb, sticky, secțiuni cu titluri uppercase mici): GENERAL / LISTINGS / COMENZI & PLĂȚI / UTILIZATORI / RECENZII / CONȚINUT SITE / ADMINISTRARE / RAPOARTE. Active state = border-stânga violet + text violet + bg `purple-50` (aprox `bg-primary/5`).
- **Main**: bg `gray-50` (aprox `bg-muted/30`), padding 32px, fluid.
- **Mobile**: sidebar devine `Sheet` declanșat dintr-un buton hamburger din top bar; tabele primesc `overflow-x-auto`.

### Auth mock
- `lib/adminAuth.ts`: `login(email, pass)` setează `localStorage.adminUser = {name, role}`; `logout()` îl șterge; `isLoggedIn()` îl citește.
- `AdminProtected` wrapper: dacă nu logat → `<Navigate to="/manage/login" />`.
- Login form pre-completat cu `admin@ghidbeauty.ro` / `admin123` — orice valoare nu-goală e acceptată (mock).
- **Notă**: este auth-mock pentru prototip; pentru producție recomand Lovable Cloud + RLS + tabel `user_roles` cu rolul `admin`. Putem adăuga ulterior.

### Mock data (în `manageMockData.ts`)
- ~25 listinguri cu statusuri mixte (activ/pending/expirat/respins), planuri (Gratuit/Intro/Profesional), owner email, dată creare, dată expirare.
- ~20 comenzi cu statusuri (Achitat/În așteptare/Anulat), metode (Transfer/Card), sume + TVA.
- ~15 utilizatori cu roluri (Admin/Content Manager/Owner).
- ~12 recenzii cu statusuri.
- ~8 articole cu statusuri (Publicat/Draft/Programat) + 5 categorii articole.
- ~6 bannere cu sloturi.
- 41 județe + București derivate dintr-un array static.
- Setări platformă (object simplu).

### Pagini — note specifice

**Dashboard** — 5 `StatCard` colorate; panou amber "Pending actions" cu 3 linkuri; feed activitate (10 entries cu icon + timp relativ); 2 charts recharts: bar (listinguri/lună, 6 luni) + donut (distribuție planuri).

**Listings (toate variantele)** — un singur component reutilizabil `ListingsTable` cu prop `statusFilter`. Filters bar: search + status select + plan select + date range (popover Calendar). Coloane conform brief. Bulk actions cu `Checkbox` pe rânduri + bara de acțiuni care apare când există selecție. Actions: View deschide `Sheet` drawer dreapta cu detalii; Edit → `/manage/listings/:id/edit`; Aprobă/Respinge cu `Dialog` confirmare (Respinge are textarea motiv).

**Edit listing** — formă în 2 coloane: stânga câmpuri standard (nume, descriere, contact, locație, categorii, servicii, facilități, poze placeholder); dreapta panou admin: Status select, Plan override, expiry date picker, admin notes textarea, toggle Verified, toggle Featured.

**Orders** — tabel + modal "Confirmă plată" cu summary + buton verde + textarea note + upload proof (input file mock).

**Users** — tabel + Add/Edit user dialog (nume, email, role select, status, reset password buton mock).

**Reviews — pending** — listă card-uri cu Aprobă/Respinge inline + textarea pentru motiv respingere.
**Reviews — all** — tabel standard.

**Articles** — listă tabel + buton "Adaugă articol nou".
**Edit article** — 2 coloane: stânga `RichTextEditor` (toolbar bold/italic/h2/h3/ul/ol/link/quote acționează pe `document.execCommand` într-un `contenteditable` div — simplu, fără deps); dreapta sidebar 280px cu status, dată publicare, categorie, tags input, cover image upload, excerpt, SEO meta title/desc, sponsored toggle + listing autocomplete (folosesc `Command` shadcn).
**Article categories** — tabel cu color picker (`<input type="color">`).

**Admin → Categorii listing** — 2 panouri: stânga tree expandabil (folosesc `Collapsible`); dreapta formă edit cu toate câmpurile + tags input.
**Subcategorii** — tabel similar.
**Servicii & Facilități** — `Tabs` cu 2 tab-uri (Servicii / Facilități); fiecare cu tabel + modal add/edit.
**Zone & Județe** — tabel read-only + info panel.
**Bannere** — tabel + edit modal cu upload + URL + date range + toggle.
**Setări platformă** — secțiuni cu `Card`-uri: General / SEO / Email SMTP (parolă masked) / Plăți (IBAN) / Mentenanță (toggle + textarea).

**Reports — stats** — date range picker + KPI row (5 carduri) + 5 charts (line growth, bar revenue, stacked bar plans, horizontal bar top categories, horizontal bar top counties).
**Reports — listings** & **Reports — revenue** — tabele + buton "Export CSV" (generează CSV client-side din mock data și declanșează download via `Blob`).

### Routing & integrare
- Adaug toate rutele în `src/App.tsx` **înainte** de catch-all-urile dinamice `/:cat`, `/:cat/:sub`, `/:cat/:sub/:judet` — altfel `/manage` ar fi capturat de `/:cat`.
- Toate rutele `/manage/*` (exceptând `/manage/login`) sunt înfășurate în `AdminProtected` + `AdminLayout`.
- Adaug temporar un link "Admin" în `Navbar.tsx` care duce la `/manage` (atât pe desktop cât și pe mobile menu).

### Tehnologie & dependențe
- Toate dependențele necesare există deja (`recharts`, `lucide-react`, `react-router-dom`, shadcn complet, `date-fns`).
- **Nu** instalez librării noi (no TipTap, no react-table) pentru a păstra build-ul rapid — dacă vrei rich-text full pot adăuga ulterior TipTap.

### Limitări asumate
- Tot e mock — fără backend real, fără persistență între reload (excepție: flag-ul de login în `localStorage`).
- Upload-urile (imagini, proof plată) sunt UI-only (afișează numele fișierului, nu se salvează nicăieri).
- Roluri / permisiuni granulare nu sunt implementate — orice user "logat" vede tot panoul.
- Pentru producție va trebui Lovable Cloud + tabel `user_roles` cu rolul `admin` + RLS — vei primi recomandarea explicit la final.

