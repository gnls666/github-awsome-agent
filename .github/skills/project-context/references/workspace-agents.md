# Workspace AGENTS.md Guidance

Use project-workspace `AGENTS.md` files to understand the target project, not to replace the bundle's own `.github/*` capabilities.

## What A Workspace AGENTS.md Should Contain

- project identity and current state
- local stack facts
- directory boundaries
- migration or legacy boundaries
- validation expectations
- approval or risk boundaries when they are project-specific

## What It Should Not Contain

- full copies of `.github/agents/*`
- long copies of `SKILL.md` workflows
- prompt file documentation
- repeated generic React, MUI, or TypeScript tutorials

## Layering Rules

- Root `AGENTS.md` should describe workspace-wide facts and boundaries for the target project.
- In a monorepo, the repository root `AGENTS.md` may be a repo manual while `apps/<name>/AGENTS.md` is the actual project manual.
- Nested `AGENTS.md` should exist only when a sub-app, package, or legacy area has materially different rules.
- Do not add a nested `AGENTS.md` just to repeat style trivia that already belongs in instructions.

## How To Use It During Target-Project Work

1. Identify `targetProjectRoot` first.
2. If the target project lacks a usable root `AGENTS.md`, create a concise baseline one as soon as the target root and core project facts are confirmed.
3. Read the root `AGENTS.md` that applies to that target project if it exists.
4. If the requested change is inside a scoped area with its own `AGENTS.md`, apply the nearest one as a narrower local boundary.
5. When local `AGENTS.md` and repository facts disagree, prefer verified repository facts and flag the mismatch.
6. For broad maintenance or migration work, update `AGENTS.md` only when the local project boundary or workflow has actually changed.

## Important Boundary

- The portable distribution workspace may contain its own `AGENTS.md`, but that file documents the distribution workspace itself.
- The target project's `AGENTS.md` belongs in the project the agent is actually generating, maintaining, or migrating.
