

## Plan: Modificări modul info companie (dreapta galeriei)

### 1. Logo + Nume + Categorie/Locație pe un rând

Sub badge-uri, înlocuim layout-ul curent (h1 + paragraf separate) cu un **flex row**: logo circular în stânga, iar în dreapta numele companiei, categoria și locația.

```text
[Badges: Recomandat | Verificat]

[LOGO]  Salon Lumiere
        Coafură · Cluj-Napoca, Cluj
```

### 2. Eliminare badge "Profesional"

Ștergem linia `<Badge>Profesional</Badge>`.

### 3. Telefon cu click-to-reveal

Înlocuim afișarea directă a numărului cu un buton "Afișează telefonul". La click, se dezvăluie numărul ca link `tel:`. State nou: `phoneVisible`.

### 4. Program: ziua curentă + status + link scroll

Păstrăm rândul cu programul zilei curente și badge-ul "Deschis acum". Eliminăm dropdown-ul cu tot programul (scheduleOpen) și în loc punem un link "Vezi programul complet" care face smooth scroll la secțiunea din body. Adăugăm `id="program-section"` pe `SectionCard` din CompanyBody.

### 5. Link WhatsApp

Adăugăm câmp `whatsapp` în mock data și un link WhatsApp cu icon `MessageCircle` lângă celelalte contacte.

### Fișiere modificate

- **`src/data/companyMockData.ts`** — adăugăm `logo` (placeholder) și `whatsapp`
- **`src/components/ghidbeauty/company/CompanyHeader.tsx`** — layout logo+text, eliminare badge tier, phone reveal, program simplificat cu scroll link, link WhatsApp
- **`src/components/ghidbeauty/company/CompanyBody.tsx`** — `id="program-section"` pe secțiunea Program

