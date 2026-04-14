

## Plan: Highlight first feature line in Intro & Profesional plans

**File:** `src/components/ghidbeauty/add-company/StepPlans.tsx`

In the feature list rendering loop, detect when the feature text starts with "Tot ce include" and render it with bold font weight and primary color instead of the default style. This makes the inheritance line visually distinct from the rest of the features.

**Change:** In the JSX mapping `plan.included`, wrap the `<span>` with conditional styling:
```tsx
<span className={f.startsWith("Tot ce include") ? "font-semibold text-primary" : ""}>
  {f}
</span>
```

Single file, single line change.

