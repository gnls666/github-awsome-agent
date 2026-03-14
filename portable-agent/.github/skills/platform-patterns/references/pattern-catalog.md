# Pattern Catalog

This skill currently owns six first-class patterns.

## 1. Async State

Use when a surface needs a stable loading, empty, error, and retry flow.

Typical surfaces:

- list page body
- detail body
- section panel
- table wrapper

## 2. Page Shell

Use when a page needs:

- title
- subtitle
- primary action area
- section framing
- predictable spacing rhythm

This is the default structural pattern for internal admin pages.

## 3. Filter Toolbar

Use when a list or operational page needs:

- search
- select filters
- optional date range
- reset action
- count or summary
- page-level actions near the working surface

## 4. Form Patterns

Use when the task needs a repeatable form structure, especially for:

- page forms
- dialog forms
- settings forms

## 5. MRT Admin Table

Use when the page needs a rich admin table surface with Material React Table, including:

- toolbar
- row actions
- status chips
- width containment
- empty/loading/error framing around the table

## 6. Table Operation Errors

Use when a page has a primary admin table and table-triggered operations can produce multiple persistent failures.

This pattern adds a bottom panel that behaves like an IDE terminal or output area:

- grouped by error type
- persistent while the page stays open
- collapsible
- vertically resizable
- suitable for batch-run or row-operation failures

Concrete example asset:

- `assets/patterns/UserManagementOperationErrorsExample.tsx`

## Not First-Class Yet

These are valid future patterns, but they are not part of the first batch:

- tree table
- master-detail split view
- permission matrix
- editable grid
- bulk selection workflows

Keep them out of the canonical first batch until the simpler patterns are stable.
