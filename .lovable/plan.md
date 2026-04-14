

## Plan: Create Contact Page for GhidBeauty.ro

### New files
**`src/pages/Contact.tsx`** — Full contact page with:

1. **Company info card** — Directories Management Systems SRL, address (Iuliu Maniu 18-20, Sector 6, București), CUI RO30832163, phone 031.404.44.40. Logo placeholder (image slot ready for future upload).

2. **"Despre noi" button** — Link styled as outline button pointing to `/despre-noi`.

3. **Info notice** — Styled alert/callout: "Pentru contactarea companiilor de pe site, vă rugăm folosiți formularul de contact din pagina companiei respective."

4. **Contact form** with fields:
   - Nume / Prenume (two inputs, side by side)
   - Telefon
   - Dropdown "Tip solicitare" with options: Vreau să mă listez / Cerere informații / Actualizare date companie / Financiar
   - Mesaj (textarea)
   - Checkbox: Accept termenii și condițiile + politica de confidențialitate
   - Button: Trimite mesaj

5. **Additional elements I'll include:**
   - Email address (contact@ghidbeauty.ro)
   - Social media links row (Facebook, Instagram — placeholder hrefs)
   - Program de lucru (Luni-Vineri 09:00-18:00)

Page layout: Navbar (solid) + container with two-column grid on desktop (company info left, form right), single column on mobile. Footer at bottom.

### Route registration
**`src/App.tsx`** — Add route `/contact` → `<Contact />`.

### Technical details
- Uses existing components: Navbar, Footer, Card, Input, Textarea, Button, Checkbox, Label, Select, Separator
- Follows same page structure as CompanyDetail (Navbar solid, pt-16 for fixed nav, container layout)
- Form uses `onSubmit` with `e.preventDefault()` + toast notification on submit
- Responsive: stacked on mobile, side-by-side on desktop

### Files modified
- `src/pages/Contact.tsx` (new)
- `src/App.tsx` (add route)

