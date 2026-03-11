---
name: migration-to-platform-mui
description: Plan and execute incremental migration of an existing React web app toward the platform MUI stack: React + Material UI v6 + the repository's ThemeProvider + platform icons + Material React Table. Use when requests explicitly involve replacing another UI library, standardizing an existing MUI project on the shared provider and icon entrypoints, incrementally upgrading JavaScript to TypeScript, or unifying admin tables on Material React Table. Do not use for greenfield project generation or full automatic Angular/Vue code translation.
user-invokable: true
---

# Migration To Platform MUI

Use this skill for high-intent migration and refactor work inside an existing repository.

## Trigger Signals

- The request explicitly mentions migration, refactor, standardization, or convergence toward the platform MUI stack.
- The current project already uses React but needs to adopt the shared `ThemeProvider`, platform icons, Material UI v6, or Material React Table.
- The work combines component-library replacement, theme normalization, icon replacement, table migration, or incremental JavaScript-to-TypeScript upgrades.
- The project uses Angular or Vue and the user wants a migration assessment or a React/MUI pilot plan rather than a full automatic rewrite.

## Workflow

1. Start with `project-context` and use repository facts instead of assumptions.
2. Read [references/migration-schema.md](references/migration-schema.md), [references/scenario-matrix.md](references/scenario-matrix.md), and [references/migration-phases.md](references/migration-phases.md).
3. Discover the current provider entrypoint, theme entry, icon entrypoint, UI libraries, and table libraries from the repository before asking the user. Ask only when those facts are missing or ambiguous after inspection.
4. Write or update `plans/<task-id>/plan.md` and `plans/<task-id>/migration.json` before making non-trivial changes.
5. If the migration touches theme or provider setup, read [references/provider-adoption.md](references/provider-adoption.md) and reuse `mui-v6-design`.
6. If the migration touches icons, read [references/icon-migration.md](references/icon-migration.md).
7. If the migration replaces admin tables, read [references/mrt-migration.md](references/mrt-migration.md) and reuse `material-react-table`.
8. If the migration upgrades JavaScript to TypeScript, read [references/js-to-ts-incremental.md](references/js-to-ts-incremental.md).
9. Execute in phases: inventory, foundation, pilot, expand, cleanup.
10. Run `quality-gate` after meaningful migration phases and finish with `code-review` for risky or broad migrations.

## Guardrails

- Treat the target as the platform MUI stack, not generic MUI alone: shared `ThemeProvider`, platform icon entrypoint, and Material React Table are part of the destination.
- First-class executable support is for React repositories. For Angular or Vue, produce a migration plan and pilot strategy before attempting any large code move.
- Prefer phased in-place migration over full rewrites.
- Default to at most two blocking questions. If the repository already contains enough facts to choose a safe pilot scope, provider path, icon entrypoint, or table strategy, continue without asking.
- Keep old and new UI layers coexisting only within the unavoidable transition window and only outside the fully migrated scope.
- Migrate the app shell and provider layer before broad component replacement.
- Standardize data-heavy admin tables on Material React Table, but do not force MRT onto trivial static tables.
- TypeScript is an optional migration track. Keep the current language mode unchanged unless the user explicitly asks for incremental TypeScript or the existing codebase already uses a mixed JS/TS path that the migrated scope must follow.
- Incremental TypeScript migration must preserve behavior and allow JS/TS coexistence.
- Use a standalone generated subtree only when the user explicitly wants a pilot implementation outside the current app structure.
