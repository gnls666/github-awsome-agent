---
applyTo: "generated/**/*.ts,generated/**/*.tsx,.github/skills/_shared/templates/**/*.ts.template,.github/skills/_shared/templates/**/*.tsx.template"
---

# React + TypeScript Code Standards

When editing generated React + TypeScript code or TSX templates in this repository:

- Use function components and named exports.
- Define component props with `interface`.
- Add explicit return types to exported React components.
- Keep imports grouped as React, third-party, then local modules.
- Use MUI `sx` instead of inline styles or styled-components.
- Keep async UI typed and include loading or error states when needed.
