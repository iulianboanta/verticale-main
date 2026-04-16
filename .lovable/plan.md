

## Plan: Move progress bar to full-width row underneath each listing

### Concept

Remove the "Zile rămase" column from the table. Instead, render a thin full-width progress bar beneath each listing row, spanning all columns. This gives a clear visual timeline per listing without taking up a dedicated column.

### Implementation in `src/pages/dashboard/DashboardSubscriptions.tsx`

1. **Remove** the "Zile rămase" `<th>` header (line 45) and the corresponding `<td>` cell (lines 74-82).

2. **After each `<tr>` row**, add a second `<tr>` containing a single `<td colSpan={total columns}>` with:
   - A thin `Progress` bar (`h-1`) spanning 100% width, no padding
   - For "Gratuit" plan: show a full green bar or skip entirely
   - For paid plans: show progress based on days remaining
   - A tiny label on the right showing "{daysRemaining} zile rămase" in `text-[10px]`

3. **Styling**: The progress row has no vertical padding (`py-0`), no border, and a subtle background so it visually "belongs" to the row above. The bar uses `h-1` for a thin line look.

### Structure per listing

```text
┌─────────────────────────────────────────────────────┐
│ Companie │ Plan │ Preț │ Activat │ Expirare │ Acțiuni│
├─────────────────────────────────────────────────────┤
│ ██████████████████████░░░░░░░  72 zile rămase       │  ← progress row
├─────────────────────────────────────────────────────┤
│ Companie │ Plan │ Preț │ Activat │ Expirare │ Acțiuni│
├─────────────────────────────────────────────────────┤
│ ██████████░░░░░░░░░░░░░░░░░░  24 zile rămase       │
└─────────────────────────────────────────────────────┘
```

### Single file change
- `src/pages/dashboard/DashboardSubscriptions.tsx`

