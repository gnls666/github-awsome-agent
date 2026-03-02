---
name: customize-list-page
description: Use when the user wants to customize generated list-page projects, including columns, filters, pagination behavior, and API mapping.
---

# Customize List Page

Use this skill for post-generation customization of list-style pages.

## Trigger Signals

- Requests mention table columns, filtering, search, sorting, pagination, or row actions.
- Target files are under generated list-page projects.

## Workflow

1. Read [references/list-recipes.md](references/list-recipes.md).
2. Update types first, then API mapping, then UI columns/filters.
3. Keep DataGrid behavior aligned with server-side pagination contract.
4. Add/loading and error states for new async logic.

## Primary Files

- `src/types.ts`
- `src/api.ts`
- `src/ListPage.tsx`
