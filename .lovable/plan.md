

## Filtre pe tipuri în pagina Listings Management

### Context
Pagina principală Listings va avea **tab-uri filtru** pentru status (default: All), eliminând nevoia de submeniuri separate în sidebar — consistent cu restructurarea aprobată anterior.

### Modificări

**1. `src/components/manage/ListingsTable.tsx`**
- Adaug un rând de **tabs/pills** deasupra cardului de filtre pentru status:
  - `Toate` (default, activ inițial) | `Active` | `În așteptare` | `Expirate` | `Respinse`
- Fiecare tab afișează **count-ul** total per status (ex: `Active (24)`).
- Click pe tab → setează `statusFilter` intern → tabela se filtrează instant.
- Tab-ul activ are styling distinct (background primary subtil + border-bottom).
- Ascund vechiul `Select` de status (rămâne doar Search + filtru Plan în card).
- Prop nou opțional `defaultTab?: ListingStatus | "all"` (default: `"all"`).

**2. `src/pages/manage/listings/ListingsPages.tsx`**
- Păstrez doar `AllListings` ca pagină principală (titlu: „Listings Management").
- Elimin export-urile `PendingListings`, `ActiveListings`, `ExpiredListings`, `RejectedListings` (devin redundante — acces prin tab-uri).

**3. `src/components/manage/AdminSidebar.tsx`** (aplicare plan anterior, neaplicat încă)
- Redenumesc secțiunea `LISTINGS` → `LISTINGS MANAGEMENT`.
- Elimin submeniurile: `În așteptare aprobare`, `Listinguri active`, `Listinguri expirate`, `Listinguri respinse`.
- Mut `Categorii listing` din ADMINISTRARE în LISTINGS MANAGEMENT, redenumit `Categorii Listinguri`.
- Elimin `Subcategorii` din ADMINISTRARE.
- Cleanup imports nefolosite (`Clock`, `CheckCircle2`, `XCircle`, `AlertOctagon`, `Layers`).

**4. `src/App.tsx`**
- Elimin rutele: `/manage/listings/pending`, `/manage/listings/active`, `/manage/listings/expired`, `/manage/listings/rejected`.
- Elimin ruta `/manage/admin/subcategories` și import-ul aferent.
- Păstrez `/manage/listings` → `AllListings`.

### Flux UI rezultat
```text
Listings Management
┌──────────────────────────────────────────────────────┐
│ [Toate (87)] [Active (52)] [Așteptare (12)] [Expirate (15)] [Respinse (8)] │
├──────────────────────────────────────────────────────┤
│ 🔍 Search...                          [Plan ▾]       │
├──────────────────────────────────────────────────────┤
│ Tabel listinguri filtrate                            │
└──────────────────────────────────────────────────────┘
```

### Fișiere atinse
- `src/components/manage/ListingsTable.tsx`
- `src/pages/manage/listings/ListingsPages.tsx`
- `src/components/manage/AdminSidebar.tsx`
- `src/App.tsx`

