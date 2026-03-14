# UX Standard Portable Bundle

Use this bundle inside target workspaces that may be empty or may already contain application code.

## Core Rules

- `@ux-standard` should understand the current project before proposing large changes.
- `@ux-standard` should first identify `workspaceMode`, `repositoryRoot`, and `targetProjectRoot`.
- Treat the nearest workspace `AGENTS.md` files under the target project as local project context rather than bundle configuration.
- Default to maintenance and gradual refactor for existing projects, but allow full project generation when the workspace is empty.
- Use the repository's local conventions unless the user explicitly asks to migrate toward the recommended stack.
- Use `migration-to-platform-mui` for explicit migration requests toward the platform stack: shared provider, platform icons, Material UI v6, and Material React Table.
- Use generation when the workspace is empty or when the user explicitly asks for a new standalone module, page set, or app.
- Do not assume the current repository root is the project target until `project-context` confirms it.
- When generating in an existing project workspace, require an explicit output directory instead of assuming a nested app folder.
- For empty-workspace bootstrap, allow generation to the current root.
- Keep always-on context short; load detail from skills and path instructions.
- Respond in the same language as the user.
