---
name: project-context
description: Inspect a target workspace before maintenance, refactor, migration, or generation work. Use when the agent needs to identify workspace mode, target project root, stack facts, validation commands, and local conventions before changing code.
user-invokable: false
---

# Project Context

Use this skill before changing or generating code in a target workspace.

## Workflow

1. Read the nearest manifests, lockfiles, and top-level config files first.
2. Read [references/workspace-modes.md](references/workspace-modes.md) and [references/workspace-agents.md](references/workspace-agents.md).
3. Identify `repositoryRoot`, then classify the workspace as `empty-workspace`, `single-project`, or `multi-project`.
4. Determine `targetProjectRoot`. Use the current root only when it is clearly the app root or when an empty workspace is being used to bootstrap a new project.
5. Read the root `AGENTS.md` that applies to the target project and any narrower nested `AGENTS.md` files that actually apply to the requested area.
6. Identify the package manager, framework, source roots, routing entrypoints, and primary validation commands for the target project.
7. Inspect the local files around the requested change before proposing abstractions, generation, or migrations.
8. If the target project lacks a usable root `AGENTS.md`, create a concise baseline version. If it exists but is materially stale, update it.
9. Summarize `repositoryRoot`, `workspaceMode`, `targetProjectRoot`, applicable `AGENTS.md` files, and the project facts that materially shape the work.
10. For complex or risky work, write or update a concise plan under `plans/`.

## Guardrails

- Prefer facts discovered from the repository over assumptions.
- Treat workspace `AGENTS.md` files as local project context for the target project, not as a substitute for `.github/agents`, `.github/skills`, or `.github/prompts`.
- Do not assume the current repository root is the target project root until the workspace mode and candidate project roots have been checked.
- In an empty workspace, root-level generation is valid when the user wants a full project bootstrap.
- Do not assume the existing project already matches the recommended stack.
- Preserve local conventions unless the user explicitly asks to converge toward the bundle's recommended stack.
- Keep the inspection focused on the relevant area; do not scan the entire repository without need.
