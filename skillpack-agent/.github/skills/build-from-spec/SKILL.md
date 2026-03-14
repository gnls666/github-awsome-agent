---
name: build-from-spec
description: Build a generated project from plans/<project-name>/spec.json, using plans/<project-name>/plan.md as the human memory of decisions, then write spec artifacts into the project and apply only the declared post-generation work.
user-invokable: false
---

# Build From Spec

Use this skill once the spec is ready enough to execute.

## Workflow

1. Read [references/build-checklist.md](references/build-checklist.md).
2. Run the bundled generator at `scripts/generate.js --spec-file ...`.
3. Use the bundled templates under `assets/templates/`.
4. Use `--dry-run` first when the request is new, risky, or may overwrite an existing directory.
5. Let the generator write `spec.json` and `spec.md` into the generated project.
6. Reuse `platform-patterns` when follow-up work needs a known composed result such as a page shell, async state surface, filter toolbar, form structure, or admin table surface.
7. If `postGeneration.tasks` is empty, stop after generation.
8. If follow-up work remains, hand off to `post-generation` and apply only the declared tasks.
9. Summarize what was generated and what extra customization was applied.

## Guardrails

- Do not overwrite an existing generated project without explicit approval.
- Keep the spec as the execution contract and `plan.md` as the readable memory; avoid re-planning in prose after they are settled.
- Do not bypass the bundled templates with ad-hoc scaffolding when an existing template fits the request.
- If generation fails, hand off to `troubleshooting`.
