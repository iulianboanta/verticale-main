

## GhidBeauty.ro — Homepage Build Plan

### Overview
Build a complete, production-quality homepage for a Romanian beauty industry directory. Primary color #9678B6 (violet/lavender), DM Sans font, fully responsive, Romanian language.

### Architecture
Single `Index.tsx` page composed of modular section components. All mock data defined in a constants file for easy swapping later.

### File Structure
```text
src/
├── pages/Index.tsx              — Page shell, assembles all sections
├── data/mockData.ts             — All mock listings, categories, articles, counties
├── components/ghidbeauty/
│   ├── Navbar.tsx               — Sticky nav: logo, links, Login/Register CTAs
│   ├── HeroSection.tsx          — Full-width hero, decorative bg, search bar (What + Where)
│   ├── CategoryGrid.tsx         — Icon grid for beauty categories
│   ├── ListingCard.tsx          — Reusable card (photo, name, category, city, stars, plan badge)
│   ├── FeaturedListings.tsx     — Featured businesses grid
│   ├── MostVisited.tsx          — Top businesses by views
│   ├── RecentlyAdded.tsx        — Newest listings
│   ├── CtaBanner.tsx            — Reusable CTA banner (register / upgrade variants)
│   ├── AdBanner.tsx             — 728×90 leaderboard ad slot, collapsible
│   ├── BlogSection.tsx          — Articles grid + category sidebar
│   ├── CountiesGrid.tsx         — All 42 Romanian counties as clickable cards
│   └── Footer.tsx               — Logo, description, 3 nav columns, copyright
```

### Design System Updates
- **Font**: DM Sans via Google Fonts (added to `index.html`)
- **Colors**: Extend CSS variables with violet palette — primary `#9678B6`, darker/lighter shades, complementary warm accent for CTAs
- **Border radius**: Rounded (12px cards, 24px hero search bar)
- **Shadows**: Soft layered shadows for card depth; plan-tier cards get progressively stronger glows

### Section Details

1. **Navbar** — Sticky top, white bg with shadow on scroll. Logo left, nav center (Acasă, Categorii, Județe, Blog, Contact), right: outlined Login + filled Înregistrare button in violet.

2. **Hero** — Gradient overlay on decorative SVG/pattern background (single `bg-hero` class to swap). Large heading "Găsește profesioniștii din beauty lângă tine", subheading, and a pill-shaped search bar: text input "Ce cauți?" + text input "Unde?" + violet search button with icon.

3. **Category Grid** — 8 categories (Saloane, Spa, Unghii, Cosmetică, Tatuaje, PMU, Bronzare, Barbershop) with Lucide icons, hover lift animation.

4. **Featured Listings** — 4-col grid of `ListingCard`. Plan badges: ⭐ Premium (violet border + glow), Pro (subtle violet accent), Free (plain). Star ratings 1-5.

5. **CTA Banner #1** — "Ai un salon? Înscrie-te gratuit!" — violet gradient bg, white text, CTA button.

6. **Most Visited** — Compact horizontal cards with view count badge.

7. **Ad Banner** — Centered 728×90 placeholder, dashed border, "Spațiu publicitar" label, hidden when empty via prop.

8. **Recently Added** — Same `ListingCard` grid, "NOU" badge.

9. **CTA Banner #2** — "Upgrade la Premium" for existing businesses.

10. **Blog Section** — 3 article cards (image, category tag, title, excerpt, date) + sidebar with category list.

11. **Counties Grid** — 6-col grid of all 42 counties, each a rounded card with county name, hover effect.

12. **Footer** — Dark bg, logo + short description, 3 columns (Despre noi, Linkuri utile, Contact), copyright bar.

### Visual Polish
- Subtle fade-in animations on scroll (CSS `@keyframes` + Intersection Observer or simple Tailwind animate classes)
- Card hover: translateY(-4px) + shadow increase
- Plan tier differentiation: Premium = violet left border + shimmer badge, Pro = subtle accent, Free = no extras
- Mobile: hamburger nav, single-column grids, full-width search bar

### Technical Notes
- No backend needed — all data is mock/static
- DM Sans loaded from Google Fonts CDN
- All text in Romanian
- Responsive breakpoints: mobile (<768), tablet (768-1024), desktop (1024+)

