---
name: project-context
description: Inspect an existing repository before maintenance, refactor, or embedded generation work. Use when the agent needs to understand the current stack, entrypoints, source roots, validation commands, and local conventions before changing code.
user-invokable: false
---

# Project Context

Use this skill before changing an existing repository.

## Workflow

1. Read the nearest manifests, lockfiles, and top-level config files first.
2. Identify the package manager, framework, source roots, routing entrypoints, and primary validation commands.
3. Inspect the local files around the requested change before proposing abstractions or migrations.
4. Summarize the repository facts that materially constrain the work.
5. For complex or risky work, write or update a concise plan under `plans/`.

## Guardrails

- Prefer facts discovered from the repository over assumptions.
- Do not assume the existing project already matches the recommended stack.
- Preserve local conventions unless the user explicitly asks to converge toward the bundle's recommended stack.
- Keep the inspection focused on the relevant area; do not scan the entire repository without need.
