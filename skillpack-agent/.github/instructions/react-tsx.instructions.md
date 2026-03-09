---
applyTo: "generated/**/*.ts,generated/**/*.tsx,.github/skills/_shared/templates/**/*.ts.template,.github/skills/_shared/templates/**/*.tsx.template"
---

# React + TypeScript Code Standards

When editing generated React + TypeScript code or TSX templates in this repository:

- Use function components and named exports.
- Define component props with `interface`.
- Add explicit return types to exported React components.
- Keep imports grouped as React, third-party, then local modules.
- Use MUI v6 `sx` instead of inline styles or styled-components.
- Prefer `@mui/material/Grid2` for new grid layouts that rely on `size`.
- Keep async UI typed and include loading or error states when needed.
