

## Plan: Buton "Vezi prezentare video" între secțiuni + overlay

### Plasare
Un buton full-width între secțiunile "Despre salon" și "Servicii oferite" din `CompanyBody.tsx`. Înălțime compactă (h-16/h-18), cu text "Vezi prezentare video" și opțional iconul YouTube. La click → Dialog overlay cu iframe YouTube autoplay.

```text
┌─────────────────────────────────┐
│ Despre salon                    │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ ▶ Vezi prezentare video    [YT] │  ← NOU (h-16, full width)
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ Servicii oferite                │
└─────────────────────────────────┘
```

### Fișiere modificate

**`src/data/companyMockData.ts`**
- Adăugăm `videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"`

**`src/components/ghidbeauty/company/CompanyBody.tsx`**
- Helper `getYouTubeId(url)` — extrage ID-ul din URL YouTube
- State `videoOpen` pentru dialog
- Între "Despre salon" și "Servicii oferite": buton stilizat full-width, `h-16`, cu icon Play + text "Vezi prezentare video" + logo YouTube mic la dreapta
- `Dialog` cu iframe YouTube embed (autoplay=1, 16:9 aspect ratio)
- Se afișează doar dacă `company.videoUrl` există

