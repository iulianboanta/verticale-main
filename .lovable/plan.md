## Pilot CTA imagery — vertical `funerare`

Generez 2 imagini noi pentru blocurile CTA de pe home, aliniate cu hero-ul funerar (atmosferă sobră, demnă, lumină difuză) și cu paleta verticalei. Dacă îți place rezultatul, replicăm același tipar pentru celelalte 6 verticale într-un al doilea pas.

### Direcție vizuală (funerare)
- Ton: solemn, respectuos, calm — fără morbiditate. Lumină moale de dimineață/seară, paletă neutră (alb cald, gri piatră, verde-salvie estompat, accente bej).
- Compoziție lăsată pentru overlay-ul gradient primary care vine din stânga (textul stă pe partea stângă).
- Subiect non-literal: nu sicrie, nu cruci frontale, nu chipuri. Imagini atmosferice care sugerează sprijin, continuitate, respect.

### Cele 2 imagini

1. `cta-register-funerare.jpg` (1600×640, landscape)
   - Concept: mâini calde de adult care țin cu grijă o lumânare aprinsă într-un spațiu interior liniștit; lumină caldă centrală, fundal estompat în tonuri de piatră. Sugerează "case funerare profesioniste, prezente lângă familii".

2. `cta-upgrade-funerare.jpg` (1600×640, landscape)
   - Concept: aranjament floral sobru (crini albi / verdeață) pe o suprafață de marmură deschisă, lumină laterală difuză, mult spațiu negativ în stânga. Sugerează "vizibilitate, prezență premium, demnitate".

### Implementare cod

1. Generez ambele imagini cu `imagegen--generate_image` (model `standard`, 1600×640, salvate în `src/assets/`).
2. Extind `VerticalConfig` în `src/config/verticals.ts` cu un câmp opțional `ctaImages?: { register: string; upgrade: string }` și îl populez doar pentru `funerare` (pilot). Verticalele fără override păstrează imaginile actuale `cta-register.jpg` / `cta-upgrade.jpg`.
3. Actualizez `src/components/ghidbeauty/CtaBanner.tsx` să folosească `vertical.ctaImages?.[variant] ?? defaultImage`. Restul logicii (overlay, copy, buton) rămâne neschimbat — e doar o schimbare de sursă imagine.
4. Verific vizual pe ruta `/` cu vertical `funerare` selectat din `VerticalSwitcher`.

### Pasul următor (după aprobarea pilotului)
Dacă ești mulțumit de funerare, generez perechi similare pentru `beauty` (refresh), `veterinari`, `tractari`, `gradinite`, `usi`, `curatenie` — fiecare cu direcție vizuală proprie aliniată hero-ului corespunzător, și populez `ctaImages` pentru toate.
