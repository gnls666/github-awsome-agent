---
applyTo: "src/**/*.ts,src/**/*.tsx,app/**/*.ts,app/**/*.tsx,pages/**/*.ts,pages/**/*.tsx,apps/**/*.ts,apps/**/*.tsx,apps/**/src/**/*.ts,apps/**/src/**/*.tsx,packages/**/*.ts,packages/**/*.tsx,packages/**/src/**/*.ts,packages/**/src/**/*.tsx,.github/skills/build-from-spec/assets/templates/**/*.ts.template,.github/skills/build-from-spec/assets/templates/**/*.tsx.template"
---

# React + TypeScript Code Standards

When editing React + TypeScript code or TSX templates:

- Use function components and named exports unless the local code strongly prefers another pattern.
- Define component props with `interface` when introducing typed props.
- Add explicit return types to exported React components when it helps readability and local style allows it.
- If a file renders JSX, name it with a `.tsx` extension instead of `.ts`.
- Keep imports grouped as React, third-party, then local modules.
- Prefer the repository's existing styling approach; if the project already uses MUI, prefer MUI v6 patterns such as `sx` and `@mui/material/Grid2` for new code.
- When using MUI components with typed callbacks, prefer the exact MUI event types such as `SelectChangeEvent` instead of generic `React.ChangeEvent` when the API requires it.
- Keep touched files typecheck-clean: remove unused imports, unused locals, and stale placeholder assertions before finishing.
- Keep async UI typed and include loading or error states when needed.
