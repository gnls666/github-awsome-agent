---
name: build-from-spec
description: Build a standalone page, module, or app from plans/<project-name>/spec.json inside a target workspace. Use only when the user explicitly wants generation rather than in-place maintenance.
user-invokable: false
---

# Build From Spec

Use this skill once the generation spec is ready enough to execute.

## Workflow

1. Read [references/build-checklist.md](references/build-checklist.md).
2. Confirm whether the request is an empty-workspace bootstrap or a generation subtree inside an existing project.
3. Run the bundled generator at `scripts/generate.js` with `--spec-file`. Use the bundled templates under `assets/templates/`.
4. Pass `--output .` when the spec declares `outputDir: "."` for empty-workspace bootstrap. Pass `--output <dir>` when the spec declares an explicit subtree.
5. Use `--dry-run` first when the request is new, risky, or may overlap with existing code.
6. Let the generator write `spec.json` and `spec.md` into the generated project.
7. Reuse `platform-patterns` when follow-up work needs a known composed result such as a page shell, async state surface, filter toolbar, form structure, or admin table surface.
8. If `postGeneration.tasks` is empty, stop after generation.
9. If follow-up work remains, hand off to `post-generation` and apply only the declared tasks.
10. Summarize what was generated and what extra customization was applied.

## Guardrails

- Do not overwrite an existing destination without explicit approval.
- For generation inside an existing project workspace, do not rely on the generator's default output path. The spec should resolve an explicit `outputDir`.
- Keep the spec as the execution contract and `plan.md` as the readable memory.
- Do not bypass the bundled templates with ad-hoc scaffolding when an existing template fits the request.
- If generation fails, hand off to `troubleshooting`.
