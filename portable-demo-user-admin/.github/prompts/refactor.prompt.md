---
name: refactor
description: Safely refactor the current repository with phased changes and verification
agent: ux-standard
argument-hint: "<target-area-and-goal>"
---

# /refactor - Safe Refactor

Use this path for structural cleanup, migration, or technical-debt reduction inside the current repository.

1. Start with `project-context` to map the current architecture, dependencies, and verification entrypoints.
2. Produce a phased plan before editing.
3. Prefer safe, incremental refactors over large rewrites.
4. Preserve behavior unless the task explicitly changes it.
5. Use `quality-gate` for focused validation after each meaningful change.
6. Finish with `code-review`.

Always end with:

- the refactor goal
- the affected area
- the verification run
- the remaining risks
