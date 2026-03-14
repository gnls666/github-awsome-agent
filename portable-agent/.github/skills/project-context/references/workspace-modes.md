# Workspace Mode Detection

Use this guide to decide whether the current workspace should be treated as a bootstrap location or as an existing project.

## Modes

### `empty-workspace`

Use this mode when the current root has no meaningful application code yet.

Typical signals:

- only `.github/`, `.git/`, `README*`, `LICENSE*`, `.gitignore`, or similar housekeeping files exist
- there is no application `package.json`
- there are no `src/`, `app/`, `pages/`, `apps/`, or `packages/` directories containing app code

Default behavior:

- if the user wants a new project, treat the current root as `targetProjectRoot`
- generation may write to the current root

### `single-project`

Use this mode when the current root is clearly one application.

Typical signals:

- the root has an app `package.json`
- the root has `src/`, `app/`, or `pages/`
- there is no strong monorepo signal

Default behavior:

- treat the current root as `targetProjectRoot`
- default to maintenance, refactor, or migration
- use generation only for explicit standalone additions

### `multi-project`

Use this mode when the current root is a monorepo or a multi-app repository.

Typical signals:

- `pnpm-workspace.yaml`, `turbo.json`, or `nx.json`
- root `package.json` declares `workspaces`
- app candidates live under `apps/`, `packages/`, `frontend/`, or similar directories

Default behavior:

- identify candidate project roots
- select `targetProjectRoot` based on repository facts and the user's requested area
- ask only if more than one candidate remains materially ambiguous

## Selection Rules

1. Prefer verified repository facts over assumptions.
2. Prefer the current root only when it is clearly the application root.
3. In `multi-project`, select the project root that best matches the user's requested scope.
4. Do not invent a nested `app` or `apps` target for generation unless the user explicitly wants a standalone subtree.
