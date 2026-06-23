## Rezultat

Am aplicat varianta **V3 — Negru mat & roșu accent** ca temă finală pentru verticalul **usi**.

### Ce s-a modificat

- `src/index.css` — blocul `:root[data-theme="usi"]` a fost înlocuit cu paleta V3:
  - fundal off-white `#F5F5F2` (`60 7% 96%`)
  - foreground/primary negru `#111111` (`0 0% 7%`)
  - accent/roșu CTA coral `#E63946` (`355 78% 56%`)
  - sidebar fundal antracit închis, cu CTA roșu
- Switcher-ul temporar V1/V2/V3 a fost eliminat:
  - `src/components/dev/UsiThemeSwitcher.tsx` — șters
  - `src/App.tsx` — importul și montarea componentei eliminate

Tema implicită pentru `usi` este acum V3, fără necesitatea unui override pe `data-theme`.
