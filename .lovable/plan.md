

## Recomandare: varianta cu **câmpuri separate per secțiune** (boxes)

### De ce această variantă (vs dropdown)

| Criteriu | Boxes per secțiune (RECOMANDAT) | Dropdown cu selecție |
|---|---|---|
| Vizibilitate conținut | Vezi tot pe-o pagină, scroll natural | Trebuie să deschizi fiecare bloc |
| Editare rapidă a 2-3 bucăți | Direct, fără click-uri | Multe click-uri, schimbi contextul |
| Comparație vizuală între blocuri | Da (totul deasupra) | Nu |
| Risc de a uita o modificare | Mic — vezi badge-uri „modificat" | Mare — blocurile închise par neschimbate |
| Pattern UX consacrat | WordPress, Webflow CMS, Sanity | Mai rar, mai obositor |
| Aliniere cu codul existent | Mapare 1:1 între secțiuni JSX și boxes | Mapare identică, dar UI mai greoi |

Concluzie: **boxes**. Dropdown-ul ar avea sens doar dacă ar fi peste ~30 de blocuri sau dacă fiecare ar fi foarte voluminos — la `Termeni` (18 secțiuni) e la limită, dar boxes colapsabile rezolvă și aglomerarea.

### Hibrid pe care îl propun: **boxes + colapsare opțională**
Fiecare secțiune = un `Card` separat cu accordion (toate închise default). Adaugi:
- Header cu titlu secțiune + slug intern + buton expand/collapse + buton „Resetează la default".
- Câmpuri controlate pentru fiecare element textual din secțiune (nu HTML liber — câmpuri tipate: `Eyebrow`, `Titlu`, `Paragraf`, listă de `Beneficii {icon, titlu, text}`, etc.).
- Buton global „Expand all / Collapse all" + buton „Salvează modificările" sticky jos.

Astfel ai vizibilitatea boxes + compactitatea dropdown-ului, fără dezavantajele celui din urmă.

### Structură pe pagină

**Despre GhidBeauty / Despre Companie** (layout cu secțiuni + grid icon-uri)
- `Hero` → eyebrow, titlu H1, subtitlu
- `Stats bar` → 4 perechi `{value, label}`
- `Ce este GhidBeauty` → titlu + 2 paragrafe
- `Pentru clienți` → eyebrow, titlu, paragraf, 4 beneficii `{titlu, text}` (icon rămâne fix)
- `Pentru profesioniști` → idem
- `Misiune` → titlu + 2 paragrafe
- `CTA final` → titlu + subtitlu + 2 etichete butoane

**Termeni / Politica** (lista lungă de articole)
- `Hero` → titlu, subtitlu, „Ultima actualizare"
- Pentru fiecare secțiune: `{titlu, intro paragraph?, sub-articole: [{cod, text}]}` cu add/remove pe sub-articole

**SEO** (un card sus)
- Titlu pagină (`<title>`) + Meta descriere (counter 160) + slug read-only.

### Date & cod

1. **`src/lib/staticPagesContent.ts`** (nou) — schema TypeScript per pagină + valori default extrase din JSX-ul actual + helper `useStaticPageContent(key)` și `useStaticPagesAdmin()` (persistență `localStorage`, event cross-tab — la fel ca pattern-urile mock din proiect).
2. **`src/pages/manage/admin/StaticPages.tsx`** (rewrite) — înlocuiesc tab-urile cu HTML liber cu **4 sub-pagini** (sau tab-uri mari) per pagină statică. În interior, `Accordion` shadcn cu un item per secțiune; conținutul fiecărui item = câmpuri controlate (`Input`, `Textarea`, listă editabilă pentru beneficii / sub-articole). Badge „Modificat" pe item-urile schimbate față de default.
3. **Pagini publice** (`DespreNoi`, `DespreCompanie`, `TermeniConditii`, `PrivacyPolicy`) — păstrează tot layout-ul (hero, iconițe, grid-uri, TOC), dar înlocuiesc string-urile hardcodate cu `content.<secțiune>.<câmp>`. Iconițele și clasele rămân în cod — doar textul vine din store.
4. **Buton „Resetează tot"** per pagină + per secțiune (re-aplică default-urile).

### UI editor (mock)
```text
Despre GhidBeauty                              [Salvează ▸]
─────────────────────────────────────────────────────────
SEO                                              [v]
  Titlu pagină   [Despre noi — GhidBeauty............]
  Meta descriere [................................] 142/160

▾ Hero                                  [● modificat] [↺]
  Eyebrow   [Despre GhidBeauty]
  Titlu H1  [Directorul #1 de beauty din România]
  Subtitlu  [textarea: GhidBeauty.ro conectează...]

▸ Stats bar (4 elemente)                              [↺]
▸ Ce este GhidBeauty                                  [↺]
▸ Pentru clienți (4 beneficii)                        [↺]
▸ Pentru profesioniști (4 beneficii)                  [↺]
▸ Misiune                                             [↺]
▸ CTA final                                           [↺]
```

### Avantaje finale
- Designul paginilor publice rămâne 100% intact (iconițe, layout, gradient).
- Editorul are exact câmpurile care există vizual — fără surprize, fără HTML stricat de admin.
- Reset granular per secțiune.
- Scalabil: adăugarea unei noi secțiuni = 1 obiect în schema + 1 binding în pagina publică.

### Fișiere atinse
- `src/lib/staticPagesContent.ts` (nou — schema + defaults + hooks)
- `src/pages/manage/admin/StaticPages.tsx` (rewrite — boxes/accordion per secțiune)
- `src/pages/DespreNoi.tsx` (citește din store)
- `src/pages/DespreCompanie.tsx` (idem)
- `src/pages/TermeniConditii.tsx` (idem)
- `src/pages/PrivacyPolicy.tsx` (idem)

