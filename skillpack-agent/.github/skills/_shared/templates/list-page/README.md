# List Page Template

A runnable admin list-page template built around Material React Table, with a wide content layout, explicit search controls, and a Vite/Vitest scaffold.

## Features

- Material React Table as the default rich admin grid
- Dedicated search and filter surface above the table
- Sticky header, row actions, density toggle, and server-style pagination state
- Loading, empty, and error handling patterns
- TypeScript strict-mode types and mock API helpers
- Vite app scaffold with a baseline Vitest smoke test

## Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name (kebab-case) | `user-admin` |
| `{{ENTITY_NAME}}` | Entity name (PascalCase) | `User` |
| `{{ENTITY_NAME_LOWER}}` | Entity name (lowercase) | `user` |
| `{{TITLE}}` | Page title | `User Management` |

## Parameter Contract

- `{{PROJECT_NAME}}` controls package metadata and the default output directory name.
- `{{ENTITY_NAME}}` controls exported type names, component names, and API helper names.
- `{{ENTITY_NAME_LOWER}}` controls lowercase API/resource strings and mock email data.
- `{{TITLE}}` controls visible page copy and the baseline smoke test assertion.
- File names stay stable, while exported symbols and text are parameterized.

## Files

- `index.html.template` - HTML entry
- `package.json.template` - Dependencies and scripts
- `AGENTS.md.template` - Workspace-level project guidance for the generated app
- `tsconfig.json.template` - TypeScript config
- `tsconfig.node.json.template` - Node-side TypeScript config
- `vite.config.ts.template` - Vite config
- `vitest.config.ts.template` - Vitest config
- `src/App.tsx.template` - App shell entry
- `src/App.test.tsx.template` - Baseline smoke test
- `src/ListPage.tsx.template` - Main list-page component with MRT
- `src/api.ts.template` - Mock API functions
- `src/main.tsx.template` - React bootstrap
- `src/test/setup.ts.template` - Test setup
- `src/types.ts.template` - Entity and pagination types
- `src/vite-env.d.ts.template` - Vite type declarations

## Usage

Generate from the embedded generator:

```bash
node .github/skills/_shared/scripts/generate.js list-page user-admin --entity User --title "用户管理"
```

Use `--output <dir>` when you need a non-default destination.

## Example Output

For `--entity User --title "User Management"` the template generates:

- `AGENTS.md` describing the generated workspace, local rules, and validation expectations
- `src/ListPage.tsx` exporting `UserListPage`
- `src/types.ts` with the `User` interfaces
- `src/api.ts` with `fetchUserList()`, `createUser()`, and related helpers
