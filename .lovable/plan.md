

## Plan: Create FAQ Page (`/faq`)

**Summary**: Build an FAQ page with dummy content, matching the Privacy Policy page's design pattern (Navbar solid, hero header, sidebar + accordion layout, Footer).

### Structure

Same layout as PrivacyPolicy: sticky sidebar with category navigation on desktop, collapsible ToC on mobile, and Accordion components for Q&A items.

### Files

**1. Create `src/pages/FAQ.tsx`**
- Navbar variant="solid" + Footer
- Compact hero with icon (HelpCircle), title "Întrebări frecvente", subtitle
- FAQ categories in sidebar (e.g., Cont & Autentificare, Listare companie, Plăți & Abonamente, Recenzii, Confidențialitate, Contact)
- Each category = a section with Accordion items (3-4 dummy Q&As per category)
- Sticky sidebar with scroll-tracking (same IntersectionObserver pattern as PrivacyPolicy)
- Mobile: collapsible ToC at top
- Use existing `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` components

**2. Edit `src/App.tsx`**
- Add route: `/faq` → `<FAQ />`

**3. Edit `src/components/ghidbeauty/Footer.tsx`**
- Add "FAQ" link pointing to `/faq`

