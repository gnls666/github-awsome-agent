# UX Standard Portable Bundle

Use this bundle inside repositories that already contain application code and need Material UI v6-compatible changes or generated modules.

## Core Rules

- `@ux-standard` should understand the current project before proposing large changes.
- Default to maintenance and gradual refactor, not full regeneration.
- Use the repository's local conventions unless the user explicitly asks to migrate toward the recommended stack.
- Use `migration-to-platform-mui` for explicit migration requests toward the platform stack: shared provider, platform icons, Material UI v6, and Material React Table.
- Use generation only for explicit new standalone modules, pages, or apps.
- Treat the current repository root as the main project target.
- When generating in an existing repository, require an explicit output directory instead of assuming a nested app folder.
- Keep always-on context short; load detail from skills and path instructions.
- Respond in the same language as the user.
