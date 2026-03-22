# AGENTS.md

This repository is the portable distribution workspace for `ux-standard`. It carries the agent system that is meant to be copied into a target workspace.

## Purpose

- Use this distribution when you want the agent system inside a target workspace.
- The target workspace may be empty or may already contain code.
- The target project's own `AGENTS.md` belongs in that target workspace, not in this distribution repository.
- Treat this file as bundle-repository guidance, not as the manual for the eventual target project.

## Core Behavior

- When copied into a target workspace, start by identifying whether that workspace is empty, a single project, or a multi-project repository.
- For maintenance or refactor work, inspect the target project before proposing broad changes.
- Treat the nearest workspace `AGENTS.md` files inside the target project as local project context. They describe the target project, not this distribution directory.
- Preserve local conventions unless the user explicitly asks to migrate toward the recommended stack.
- Prefer gradual convergence over hard rewrites.
- Use `plans/` inside the target workspace for durable plans when work is large, risky, or multi-step.
- Treat `plans/` as local agent state. It is gitignored by default and should only be committed when the user explicitly wants to preserve a plan as project documentation.
- When working on this bundle repository itself, edit the root `.github/`, `AGENTS.md`, and `README.md` directly.
- Use `migration-to-platform-mui` for phased migration toward the platform stack: shared provider, platform icons, Material UI v6, and Material React Table.
- Use `design-critique` when visual quality or generic-looking UI is the main concern.
- Use `design-polish` after UI work is functional but still needs refinement.
- Respond in the same language as the user.

## Generation

- Generation is available through `.github/skills/build-from-spec/scripts/generate.js`.
- In an empty target workspace, bootstrap generation may write directly to the current root.
- In an existing project workspace, only set `outputDir` when the user explicitly wants a new standalone generated subtree.
- Keep `spec.json` as the machine contract for generation requests and `plan.md` as the human-readable record.
- A generated project should carry its own root `AGENTS.md` after generation.

## Migration

- Migration work should stay in place by default and start with repository inspection.
- Let `project-context` identify `targetProjectRoot` before broad migration work.
- Non-trivial migration work should create `plans/<task-id>/plan.md` and `plans/<task-id>/migration.json`.
- For React repositories, prefer phased migration over full rewrites.
- For Angular or Vue repositories, first produce a migration plan and pilot path before attempting broad implementation.
