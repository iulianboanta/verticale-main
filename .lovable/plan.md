

## Plan: Scroll to top la navigare pe pagina de detalii

Când navighezi de pe homepage pe pagina de detalii, browser-ul păstrează poziția de scroll. Trebuie să facem scroll la top automat.

### Modificare

**`src/pages/CompanyDetail.tsx`**
- Adăugăm `window.scrollTo(0, 0)` în `useEffect` existent (sau unul nou) care rulează la montarea componentei, pentru a poziționa pagina sus la fiecare navigare.

