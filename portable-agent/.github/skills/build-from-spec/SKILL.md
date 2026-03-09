---
name: build-from-spec
description: Build a standalone page, module, or app from plans/<project-name>/spec.json inside an existing repository. Use only when the user explicitly wants generation rather than in-place maintenance.
user-invokable: false
---

# Build From Spec

Use this skill once the generation spec is ready enough to execute.

## Workflow

1. Read [references/build-checklist.md](references/build-checklist.md).
2. Run the generator with `--spec-file`. Pass `--output` only when the spec declares `outputDir` for a standalone generated subtree.
3. Use `--dry-run` first when the request is new, risky, or may overlap with existing code.
4. Let the generator write `spec.json` and `spec.md` into the generated project.
5. If `postGeneration.tasks` is empty, stop after generation.
6. If follow-up work remains, hand off to `post-generation` and apply only the declared tasks.
7. Summarize what was generated and what extra customization was applied.

## Guardrails

- Do not overwrite an existing destination without explicit approval.
- Keep the spec as the execution contract and `plan.md` as the readable memory.
- If generation fails, hand off to `troubleshooting`.
