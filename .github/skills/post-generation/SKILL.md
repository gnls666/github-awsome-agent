---
name: post-generation
description: Apply the custom work declared in plans/<project-name>/spec.json after the base project is generated. Use only when spec.postGeneration.tasks contains real follow-up work.
user-invokable: false
---

# Post Generation

Use this skill for spec-driven follow-up changes after base generation succeeds.

## Workflow

1. Read [references/post-generation-checklist.md](references/post-generation-checklist.md).
2. Read `plans/<project-name>/spec.json` and the generated project's `spec.md`.
3. Apply only the tasks listed in `spec.postGeneration.tasks`.
4. Reuse `platform-patterns` when the desired result is a known composed structure such as a shared shell, filter toolbar, form structure, async state surface, or admin table surface before inventing page-local structures.
5. Reuse existing templates, components, and generator conventions instead of inventing a parallel structure.
6. Keep edits proportional to the request and stop when the declared tasks are complete.
7. Hand off to `quality-gate` after the declared tasks are done.

## Guardrails

- Do not re-open template selection or re-plan the project from scratch.
- Prefer editing generated files over introducing a second abstraction layer.
- If a requested follow-up would require broad new app logic, multiple new subsystems, or a large redesign beyond the declared tasks, refine the spec first instead of improvising.
- If the requested follow-up is unclear, refine the spec first instead of improvising.
