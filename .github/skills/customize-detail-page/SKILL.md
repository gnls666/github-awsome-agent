---
name: customize-detail-page
description: Use when the user customizes generated detail-page projects, including form fields, validation rules, edit/view transitions, and save behavior.
---

# Customize Detail Page

Use this skill for post-generation detail form customization.

## Trigger Signals

- Requests mention field changes, validation, form UX, save/cancel, or entity detail behavior.

## Workflow

1. Read [references/detail-recipes.md](references/detail-recipes.md).
2. Update `types.ts` and form data contract first.
3. Implement validation and field rendering in `Form.tsx`.
4. Sync save payload and detail display in `DetailPage.tsx`.

## Primary Files

- `src/types.ts`
- `src/Form.tsx`
- `src/DetailPage.tsx`
- `src/api.ts`
