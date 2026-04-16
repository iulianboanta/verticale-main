

## Plan: Stacked ad banners with conditional positioning

### Change in `src/pages/SearchResults.tsx`

Update the right-side ad sidebar so the two banners (120×120 square and 120×600 skyscraper) are stacked in a flex column. Add a visibility flag for each banner (e.g. `showSquareBanner` and `showSkyscraperBanner` constants). When the square banner is hidden, the skyscraper naturally moves up to the top position since it's a flex column layout — no extra logic needed.

The sidebar markup:
```tsx
<aside className="hidden lg:block w-[120px] shrink-0">
  <div className="sticky top-[8rem] flex flex-col gap-4">
    {showSquareBanner && (
      <div className="w-[120px] h-[120px] ...">120×120</div>
    )}
    {showSkyscraperBanner && (
      <div className="w-[120px] h-[600px] ...">120×600</div>
    )}
  </div>
</aside>
```

Both flags default to `true`. When `showSquareBanner = false`, the skyscraper slides up automatically via flexbox. Mobile banner between results and pagination remains unchanged.

Also remove the old 600×60 inline banner logic (`resultsWithAd`) and render results directly from `paged`.

### Single file change
- `src/pages/SearchResults.tsx`

