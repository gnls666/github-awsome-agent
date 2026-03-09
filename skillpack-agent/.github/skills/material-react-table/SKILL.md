---
name: material-react-table
description: Use Material React Table v3 with Material UI v6 for advanced admin tables in this repository. Use when requests need rich data tables, toolbar customization, row actions, sticky headers, column filters, editable rows, or server-side sorting, filtering, and pagination. Do not use for simple static tables or when an existing codebase is intentionally standardized on MUI DataGrid.
---

# Material React Table

Use this skill when a request needs a production-grade admin table that goes beyond a basic MUI Table or a lightweight DataGrid setup.

## Trigger Signals

- The request needs a table-heavy admin page with filters, density controls, column visibility, sticky headers, or row actions.
- The request needs server-side pagination, sorting, or filtering with React Query or another stable remote-data flow.
- The request needs editable rows, detail panels, selection, or richer toolbar behavior.
- The request should stay inside the repository's Material UI v6 design system.

## Workflow

1. Read [references/installation-and-guardrails.md](references/installation-and-guardrails.md) and [references/table-patterns.md](references/table-patterns.md).
2. For layout, spacing, or visual polish decisions, also read `../mui-v6-design/references/visual-rules.md` and `../mui-v6-design/references/design-anti-patterns.md`.
3. Load the shared guides in `.github/skills/_shared/components/table.md`, `.github/skills/_shared/components/layout.md`, and `.github/skills/_shared/components/form.md` when needed.
4. Prefer `useMaterialReactTable` with stable `MRT_ColumnDef<T>[]` column definitions.
5. Keep page-level actions, filter surfaces, toolbar behavior, and table density aligned with the repository's admin UI patterns.
6. Use server-side table state intentionally. Do not bolt remote data onto a purely client-side table config.

## Design Stance

- Prefer full-width working tables for dashboard, list, and management pages.
- Keep global page actions outside the table when they affect the whole page.
- Use the table toolbar for view controls, column controls, density, export, and selection-aware actions.
- Treat Material React Table as the default rich admin table layer. Fall back to MUI DataGrid only when an existing codebase is already committed to it or the requirements clearly fit it better.
