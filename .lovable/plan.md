

## Plan: Fix sidebar active state tracking on scroll and click

### Problem
1. **Click**: `scrollTo()` scrolls to the section but never calls `setActiveSection(id)`, so the sidebar highlight doesn't update on click.
2. **Scroll**: The `IntersectionObserver` picks the entry with the smallest `top` among visible entries, which is unreliable with 18 sections of varying heights. Some sections may never become the "top" entry.

### Fix in `src/pages/TermeniConditii.tsx`

**1. Immediate update on click** — add `setActiveSection(id)` inside `scrollTo`:
```tsx
const scrollTo = (id: string) => {
  setActiveSection(id);
  sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  setTocOpen(false);
};
```

**2. Reliable scroll tracking** — replace the observer logic to find the topmost section that has scrolled past the top of the viewport (classic "last section above threshold" pattern):
```tsx
useEffect(() => {
  const handleScroll = () => {
    const offset = 150;
    let current = sections[0].id;
    for (const s of sections) {
      const el = sectionRefs.current[s.id];
      if (el && el.getBoundingClientRect().top <= offset) {
        current = s.id;
      }
    }
    setActiveSection(current);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

This replaces the `IntersectionObserver` with a scroll listener that iterates sections top-to-bottom and picks the last one whose top has crossed the 150px threshold — simple and reliable for long pages with many sections.

### Single file change
- `src/pages/TermeniConditii.tsx`

