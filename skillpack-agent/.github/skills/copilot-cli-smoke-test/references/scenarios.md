# Scenarios

## `portable-empty`

Use this when the workspace is intentionally almost empty and only contains the portable `.github/` setup plus housekeeping files.

Expected conclusions:

- `workspaceMode` should resolve to an empty-workspace shape.
- `targetProjectRoot` should resolve to the current workspace root.
- The next major path should be generation.
- `AGENTS.md` should be treated as belonging to the target project, not the portable capability package.
- `plans/*` should be treated as task memory, not long-term project docs.

## `portable-existing`

Use this when the workspace is already a single existing application.

Expected conclusions:

- `workspaceMode` should resolve to a single-project shape.
- The next major path should be maintain, refactor, or migrate.
- `targetProjectRoot` should be the current app root.
- `AGENTS.md` should be treated as the project manual for that app.

## `portable-multi`

Use this when the workspace is a monorepo or multi-project repository.

Expected conclusions:

- `workspaceMode` should resolve to a multi-project shape.
- Copilot should not assume the repository root is automatically the target project root.
- It should identify or reason about a narrower `targetProjectRoot`.

## `custom`

Use this when you only want a transcript and summary without strict keyword assertions.
