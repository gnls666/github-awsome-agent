# MUI v6 Guardrails

Use these rules to keep examples and generated code on a correct Material UI v6 path.

## Version Boundaries

- Treat `@mui/material` and `@mui/icons-material` as v6 packages.
- MUI X packages do not follow the same major version as Material UI. Keep `@mui/x-data-grid` and `@mui/x-date-pickers` on the repository's chosen compatible major instead of forcing them to `6.x`.
- When the app stays on React 18, keep `react-is` aligned through `pnpm.overrides`.

## Preferred APIs

- Use `Grid` from `@mui/material/Grid2` for layouts that rely on `size`.
- Use `Button` with its built-in `loading` prop instead of legacy `LoadingButton`.
- Use `ListItemButton` instead of `ListItem button`.
- Use `sx` and theme overrides instead of deprecated system props or `@mui/styles`.

## Avoid

- `@mui/styles`
- `CssVarsProvider` for new app themes when `ThemeProvider` with `cssVariables` covers the use case
- Legacy Grid item syntax when the rest of the page uses Grid2 sizing
- Per-component ad hoc spacing that bypasses the shared scale
