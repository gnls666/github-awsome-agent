---
name: platform-patterns
description: Provide preferred React + MUI v6 composed pattern references for existing-project surgery, post-generation refinement, and migration work. Use when the task needs a known multi-component result such as a page shell, async state surface, filter toolbar, form structure, rich MRT admin table composition, or persistent grouped operation-error panel.
user-invokable: false
---

# Platform Patterns

Use this skill when the task needs a known composed result inside an existing project or as a focused follow-up to generation.

This skill provides preferred references for recurring composed outcomes that sit between:

- full project/page templates
- the component building-block layer

## Use This Skill When

- The request needs a reusable page shell, not a whole page template.
- The task needs a consistent loading / empty / error / retry pattern.
- The task needs a standard filter toolbar for admin list pages.
- The task needs a form structure that can be dropped into an existing page or dialog.
- The task needs a production-grade rich admin table surface around Material React Table.
- The task needs a persistent bottom error panel for table operations, batch runs, or grouped mutation failures.
- The task is migration, maintenance, or post-generation work where copying a full template would be too heavy.

Do not use this skill for whole-project scaffolding or for routine component-level questions that are better handled by `.github/skills/_shared/components/`, `mui-v6-design`, or `material-react-table`.

## Pattern Catalog

Read `references/pattern-catalog.md` first, then load only the relevant pattern reference files:

- `references/async-state.md`
- `references/page-shell.md`
- `references/filter-toolbar.md`
- `references/form-patterns.md`
- `references/mrt-admin-table.md`
- `references/table-operation-errors.md`
- `references/adoption-rules.md`

## Assets

Code assets live under `assets/patterns/`:

- `AsyncStatePanel.tsx`
- `PageShell.tsx`
- `FilterToolbar.tsx`
- `SectionForm.tsx`
- `MrtAdminTable.tsx`
- `TableOperationErrorsPanel.tsx`
- `UserManagementOperationErrorsExample.tsx`

Reuse these assets as implementation starting points when they fit the task. Adapt them to local types, route structure, and data flow instead of rewriting the pattern from scratch.

## Workflow

1. Identify whether the task is generation, post-generation, migration, or existing-project surgery.
2. Read `references/pattern-catalog.md` and pick the narrowest matching pattern.
3. Read `references/adoption-rules.md`.
4. If the work is visual or theme-sensitive, also load `../mui-v6-design/references/visual-rules.md`.
5. If the pattern includes rich tables, also load `../material-react-table/references/table-patterns.md`.
6. Reuse the closest asset under `assets/patterns/` when the target result clearly matches a known composed structure.
7. Keep the local project's state shape, route boundaries, and API shape intact unless the task explicitly asks for broader restructuring.

## Guardrails

- Prefer pattern adoption over page replacement.
- Do not use a full template when a pattern-level change will do.
- Keep patterns composable and local; do not introduce a new framework layer for a single page.
- Treat this skill as the preferred reference layer for recurring composed outcomes built from the component layer.
- Start with `.github/skills/_shared/components/` for routine additions and localized edits, then use this skill when the desired result is a known multi-component structure.
