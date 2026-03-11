# AGENTS.md

This portable bundle provides `ux-standard` for existing repositories and keeps new UI work on Material UI v6 patterns.

## Purpose

- Use this bundle when the repository already contains code.
- Default to understanding and improving the current project before generating anything new.
- Treat generation as an explicit action for new standalone modules, pages, or apps.
- Use explicit migration workflows when the goal is to converge the current project on the platform MUI stack.

## Core Behavior

- For maintenance or refactor work, inspect the current repository first.
- Preserve local conventions unless the user explicitly asks to migrate toward the recommended stack.
- Prefer gradual convergence over hard rewrites.
- Use `plans/` for durable plans when work is large, risky, or multi-step.
- Treat `plans/` as local workspace state for the agent. It is gitignored by default and should only be committed when the user explicitly wants to preserve a plan as project documentation.
- Use `migration-to-platform-mui` for phased migration toward the platform stack: shared provider, platform icons, Material UI v6, and Material React Table.
- Use `design-critique` when visual quality or generic-looking UI is the main concern.
- Use `design-polish` after UI work is functional but still needs refinement.
- Respond in the same language as the user.

## Generation

- Generation is available through `.github/skills/_shared/scripts/generate.js`.
- The existing repository root is usually the primary target; do not assume a nested `app` or `apps` directory.
- Only set `outputDir` when the user explicitly wants a new standalone generated subtree.
- Keep `spec.json` as the machine contract for generation requests and `plan.md` as the human-readable record.

## Migration

- Migration work should stay in place by default and start with repository inspection.
- Non-trivial migration work should create `plans/<task-id>/plan.md` and `plans/<task-id>/migration.json`.
- For React repositories, prefer phased migration over full rewrites.
- For Angular or Vue repositories, first produce a migration plan and pilot path before attempting broad implementation.
