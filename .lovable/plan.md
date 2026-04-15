

## Plan: Enhance Address & Description Sections in StepForm

**File:** `src/components/ghidbeauty/add-company/StepForm.tsx`

### 1. Google Maps placeholder + manual positioning button (Section 3, after address fields ~line 336)

Add a map placeholder box below the address inputs:
- Gray rounded container (~200px height) with a map pin icon and "Google Maps" text centered
- Below it, a "Poziționare manuală" button (outline variant) with a MapPin icon
- This is a visual placeholder only (no actual Google Maps integration)

### 2. "Deservesc și alte județe" — county multi-select dropdown (lines 354-361)

When `serveOtherCounties` is checked, instead of just showing the "la nivel național" checkbox, add a multi-select county picker using the same badge+input pattern as keywords:
- Show a dropdown/popover on the right side of the checkbox row with all 42 Romanian counties
- Use the keyword-tag pattern: selected counties render as `Badge` chips with `X` to remove
- Input field with county options filtering on type — similar to the keywords field
- Keep the "Deservesc la nivel național" checkbox which, when checked, selects all counties

### 3. HTML editor for Description (Section 4, lines 366-380)

Replace the plain `<Textarea>` with a basic rich-text toolbar + contentEditable div:
- Toolbar row with buttons: **Bold**, *Italic*, Underline, Link, Bullet list, Numbered list
- Each button uses a small icon from lucide-react
- The editable area uses `contentEditable` with the same styling as the current textarea
- `onInput` handler updates an HTML string state
- Character count based on `innerText.length` (strips HTML tags)
- No external library needed — uses `document.execCommand` for simplicity

### Technical details

- New state variables: `selectedCounties: string[]`, `countySearch: string`
- Map placeholder is purely visual — a `div` with bg-muted, rounded-lg, centered icon
- Rich text toolbar buttons call `document.execCommand('bold')` etc.
- The contentEditable div gets the same border/focus ring classes as Textarea
- County multi-select uses filtered list from `counties` array already defined at line 28

