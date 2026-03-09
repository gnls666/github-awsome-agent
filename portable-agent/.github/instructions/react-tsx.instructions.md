---
applyTo: "src/**/*.ts,src/**/*.tsx,app/**/*.ts,app/**/*.tsx,pages/**/*.ts,pages/**/*.tsx,apps/**/*.ts,apps/**/*.tsx,apps/**/src/**/*.ts,apps/**/src/**/*.tsx,packages/**/*.ts,packages/**/*.tsx,packages/**/src/**/*.ts,packages/**/src/**/*.tsx,.github/skills/_shared/templates/**/*.ts.template,.github/skills/_shared/templates/**/*.tsx.template"
---

# React + TypeScript Code Standards

When editing React + TypeScript code or TSX templates:

- Use function components and named exports unless the local code strongly prefers another pattern.
- Define component props with `interface` when introducing typed props.
- Add explicit return types to exported React components when it helps readability and local style allows it.
- Keep imports grouped as React, third-party, then local modules.
- Prefer the repository's existing styling approach; if the project already uses MUI, prefer `sx` for new MUI code.
- Keep async UI typed and include loading or error states when needed.
