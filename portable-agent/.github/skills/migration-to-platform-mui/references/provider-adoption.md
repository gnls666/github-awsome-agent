# Provider Adoption

The platform target is not plain MUI in isolation. The destination includes:

- the shared `ThemeProvider`
- the shared theme entry
- the platform icon entrypoint

## Provider-First Rule

Adopt the provider and theme layer before broad component replacement.

Typical touched areas:

- app bootstrap (`main.tsx`, `main.jsx`)
- root app shell
- top-level layout provider composition
- shared theme exports

## Guidance

- Discover the actual provider and theme entrypoints from repository imports, app bootstrap files, and shared UI packages before asking the user.
- Prefer the repository's established provider entrypoint over ad hoc local theme creation.
- Consolidate new palette, spacing, typography, or surface rules into the shared theme path instead of scattering `sx` overrides everywhere.
- If the repository already has a provider layer, compose the platform provider into it instead of duplicating wrapper trees.
- Keep the provider migration minimal: enough to establish the target platform shell, not a full app rewrite.

## Anti-Patterns

- Replacing leaf components first while the app still uses the old provider stack.
- Copy-pasting a local `createTheme()` into the pilot scope instead of adopting the shared theme entry.
- Migrating pages to MUI while icons still come from multiple unrelated libraries in the same scope.
