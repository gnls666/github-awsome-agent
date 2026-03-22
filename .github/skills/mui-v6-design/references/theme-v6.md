# Theme Guidance

Use these patterns for reusable styling and visual consistency in Material UI v6.

## Preferred Theme Setup

- Use `ThemeProvider` with `createTheme`.
- Enable `cssVariables: true` when creating app-level themes.
- Prefer `colorSchemes` for light and dark mode support instead of manually branching on palette mode.
- Use `theme.applyStyles()` for mode-specific styling when a component needs different surface treatment in dark mode.

## Where Styling Belongs

- Use `sx` for one-off layout or view-specific styling.
- Use `components.defaultProps` for repeatable prop defaults.
- Use `components.styleOverrides` for shared visual adjustments such as paper borders, card shadows, and button heights.
- Use `components.variants` when the same visual pattern appears across multiple pages.

## Recommended Shared Adjustments

- Set a consistent `shape.borderRadius`.
- Standardize paper and card borders instead of mixing shadows and borders arbitrarily.
- Disable button elevation by default for admin surfaces unless emphasis is needed.
- Keep a consistent toolbar and content background relationship.

## Reusable Primitives

When a pattern appears more than once, prefer a shared primitive such as:

- `AppShell`
- `PageHeader`
- `SectionCard`
- `FilterBar`
- `EmptyState`
- `LoadingState`
