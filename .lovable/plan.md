
## Eliminare submeniuri din AdminSidebar

### Modificări în `src/components/manage/AdminSidebar.tsx`

1. **Secțiunea UTILIZATORI** — elimină itemul "Adaugă utilizator":
   - Rândul 61: `{ to: "/manage/users/new", label: "Adaugă utilizator", icon: UserPlus }` — șters
   - Se păstrează doar "Toți utilizatorii"

2. **Secțiunea CONȚINUT SITE** — elimină itemul "Adaugă articol":
   - Rândul 76: `{ to: "/manage/articles/new/edit", label: "Adaugă articol", icon: Plus }` — șters
   - Se păstrează "Articole" și "Categorii articole"

3. **Clean-up imports** — elimină iconurile nefolosite `UserPlus` și `Plus` din importurile `lucide-react` dacă nu mai sunt folosite în altă parte în fișier.
