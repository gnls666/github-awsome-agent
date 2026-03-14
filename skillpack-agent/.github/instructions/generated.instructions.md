---
applyTo: "generated/**"
---

# Generated Projects Instructions

These are generated React + Material UI v6 projects created by `.github/skills/build-from-spec/scripts/generate.js`.

## Rules

- Follow existing project patterns before introducing new abstractions.
- Keep TypeScript strict and prefer named exports.
- Use MUI v6 patterns such as `sx`, `ThemeProvider`, and `@mui/material/Grid2` where layout sizing is needed.
- Add loading and error handling for new async UI.
- Run `pnpm typecheck` after meaningful edits. Run `pnpm test` or `pnpm build` when the change affects those paths.

## Avoid

- Editing `node_modules/`
- Editing `pnpm-lock.yaml` unless dependency changes are explicitly required
