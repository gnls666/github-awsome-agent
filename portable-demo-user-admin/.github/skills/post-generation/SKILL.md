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
4. Reuse existing templates, components, and generator conventions instead of inventing a parallel structure.
5. Keep edits proportional to the request and stop when the declared tasks are complete.

## Guardrails

- Do not re-open template selection or re-plan the project from scratch.
- Prefer editing generated files over introducing a second abstraction layer.
- If the requested follow-up is unclear, refine the spec first instead of improvising.
