---
applyTo: "generated/**"
---

# Generated Projects Instructions

These are generated React + MUI projects created by `.github/skills/_shared/scripts/generate.js`.

## Rules

- Follow existing project patterns before introducing new abstractions.
- Keep TypeScript strict and prefer named exports.
- Use MUI `sx` for styling.
- Add loading and error handling for new async UI.
- Run `pnpm typecheck` after meaningful edits. Run `pnpm test` or `pnpm build` when the change affects those paths.

## Avoid

- Editing `node_modules/`
- Editing `pnpm-lock.yaml` unless dependency changes are explicitly required
