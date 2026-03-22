# Installation and Guardrails

## Official Baseline

- Material React Table v3 is built on Material UI v6 and TanStack Table v8.
- Current package line: `material-react-table@^3.2.1`
- Peer dependencies include:
  - `@mui/material >=6`
  - `@mui/icons-material >=6`
  - `@mui/x-date-pickers >=7.15`
  - `@emotion/react >=11.13`
  - `@emotion/styled >=11.13`
  - `react >=18`
  - `react-dom >=18`

## Recommended Install

```bash
pnpm add material-react-table @mui/icons-material @mui/x-date-pickers
```

The TanStack table and virtualization packages are internal dependencies of MRT and do not need separate installation.

## Required Coding Pattern

```tsx
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
```

- Prefer `MRT_ColumnDef<T>[]` for column typing.
- Prefer `accessorKey` for direct fields.
- If using `accessorFn`, provide an explicit `id`.
- Keep `columns` stable with `useMemo`.
- Keep `data` stable via `useState`, `useMemo`, or React Query results.

## Admin UI Guardrails

- Do not squeeze a management table into a narrow centered column when a sidebar already exists.
- Keep the page shell, filter surface, and table surface visually coordinated.
- Use page-level primary actions in the page header; use table toolbars for table-scoped actions.
- Prefer sticky headers, density control, column visibility, and row actions for large operational tables.
- For server data, use `manualPagination`, `manualSorting`, and `manualFiltering` instead of pretending the table is local-only.
- Use MRT localization instead of hardcoding every table string where possible.

## When Not to Use MRT

- A tiny read-only comparison table with no admin interactions.
- A codebase already standardized on MUI DataGrid where consistency matters more than new capability.
- A layout where the table is not the primary interaction surface.
