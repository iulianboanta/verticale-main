

## Plan: Remove crossed-out features from plan cards

**File:** `src/components/ghidbeauty/add-company/StepPlans.tsx`

1. Remove the `notIncluded` arrays from all three plan objects in the `plans` data (lines ~39-42, ~56-60, ~73)
2. Remove the `notIncluded` property from the TypeScript type definition
3. Remove the JSX block that renders `notIncluded` items with the `X` icon and `line-through` styling (~lines 131-136)
4. Remove the `X` import from lucide-react since it's no longer needed

