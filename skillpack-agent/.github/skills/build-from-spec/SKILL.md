---
name: build-from-spec
description: Build a generated project from plans/<project-name>/spec.json, using plans/<project-name>/plan.md as the human memory of decisions, then write spec artifacts into the project and apply only the declared post-generation work.
user-invokable: false
---

# Build From Spec

Use this skill once the spec is ready enough to execute.

## Workflow

1. Read [references/build-checklist.md](references/build-checklist.md).
2. Run the generator with `--spec-file`, using `--dry-run` first when the request is new, risky, or may overwrite an existing directory.
3. Let the generator write `spec.json` and `spec.md` into the generated project.
4. If `postGeneration.tasks` is empty, stop after generation.
5. If follow-up work remains, hand off to `post-generation` and apply only the declared tasks.
6. Summarize what was generated and what extra customization was applied.

## Guardrails

- Do not overwrite an existing generated project without explicit approval.
- Keep the spec as the execution contract and `plan.md` as the readable memory; avoid re-planning in prose after they are settled.
- If generation fails, hand off to `troubleshooting`.
