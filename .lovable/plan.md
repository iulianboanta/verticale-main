

## Mutare Comenzi în Listings Management + filtre dropdown + acțiuni

### 1. Sidebar — `src/components/manage/AdminSidebar.tsx`
- În secțiunea **LISTINGS MANAGEMENT** adaug item: `Comenzi` → `/manage/orders` (icon `ShoppingCart`).
- Elimin întreaga secțiune **COMENZI & PLĂȚI** (4 submeniuri).
- Cleanup imports nefolosite (`FileText`, `CreditCard`, `CheckSquare`).

### 2. Date mock — `src/data/manageMockData.ts`
- **Elimin comenzile cu plan „Gratuit"** (gratuit nu necesită comandă).
- Adaug pe `ManageOrder` două câmpuri noi:
  ```ts
  validatedAt: string | null; // ISO — data validării plății (null dacă pending/cancelled)
  expiresAt: string | null;   // ISO — validatedAt + 365 zile (null dacă încă neachitat)
  ```
- Pentru comenzi `paid` → `validatedAt` = createdAt + 1-3 zile, `expiresAt` = validatedAt + 365 zile.
- Pentru `pending` / `cancelled` → ambele `null`.

### 3. Pagina Comenzi — `src/pages/manage/orders/OrdersPages.tsx`
- Titlu pagină: `Comenzi`.
- Cardul de filtre conține: **Search** + **Dropdown Status** (Toate / Achitat / În așteptare / Anulat) + **Dropdown Plan** (Toate planurile + listă unică din date). Default ambele: `Toate`.
- Elimin export-urile redundante: `UnpaidProforma`, `ConfirmedPayments`, `ConfirmPaymentLanding`.

**Coloană nouă `Zile rămase`** între `Data` și `Acțiuni`:
- Dacă `validatedAt === null` → afișez `—` (text muted).
- Calcul: `Math.ceil((expiresAt - now) / zi)`.
  - `> 30` → badge verde `N zile`.
  - `1–30` → badge ambră `N zile`.
  - `≤ 0` → badge roșu `Expirat`.

**Coloana Acțiuni — refactorizare:**
- `Vizualizează` (icon Eye) → link `/manage/orders/:id` (comportament actual păstrat).
- `Validează plată` (icon Check, vizibil DOAR dacă `status === "pending"`) → deschide **Dialog confirmare** cu titlu „Confirmă validarea plății", text: „Marchezi comanda {number} ({company}) ca achitată. Data validării: azi. Abonamentul va expira în 365 zile." → buton `Confirmă` setează `status: "paid"`, `validatedAt: now`, `expiresAt: now + 365d`.
- `Șterge` (icon Trash2, roșu) → deschide **AlertDialog** cu titlu „Șterge comanda?", text: „Comanda {number} pentru {company} va fi ștearsă definitiv. Acțiunea nu poate fi anulată." → buton `Șterge` (variant destructive) elimină rândul din lista locală.
- Elimin acțiunile vechi: `FileDown` (descarcă proformă) și `X` (anulează).

State local în componentă: `useState<ManageOrder[]>(manageOrders)` pentru a permite mutații (validare/ștergere) fără persistență.

### 4. Routing — `src/App.tsx`
- Elimin rutele: `/manage/orders/unpaid`, `/manage/orders/confirmed`, `/manage/orders/confirm`.
- Elimin imports aferente.
- Păstrez `/manage/orders` → `AllOrders` și `/manage/orders/:id` → `OrderDetail`.

### Flux UI rezultat
```text
Comenzi
┌──────────────────────────────────────────────────────────────────┐
│ 🔍 Caută...              [Status: Toate ▾]   [Plan: Toate ▾]    │
├──────────────────────────────────────────────────────────────────┤
│ Număr | Companie | Plan | Sumă | Metodă | Status | Data | Zile rămase | Acțiuni │
│ INV-… …          Intro  199    Card     Achitat  …      287 zile      👁 🗑   │
│ INV-… …          Profes 499    Transfer Aștept.  …      —             👁 ✓ 🗑 │
│ INV-… …          Premium 999   Card     Achitat  …      Expirat       👁 🗑   │
└──────────────────────────────────────────────────────────────────┘

Click ✓ → Dialog „Confirmă validarea plății" [Anulează] [Confirmă]
Click 🗑 → AlertDialog „Șterge comanda?"     [Anulează] [Șterge]
```

### Fișiere atinse
- `src/components/manage/AdminSidebar.tsx`
- `src/data/manageMockData.ts`
- `src/pages/manage/orders/OrdersPages.tsx`
- `src/App.tsx`

