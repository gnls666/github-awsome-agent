---
name: plan-to-spec
description: Convert an explicit generation request into a stored plan at plans/<project-name>/plan.md plus a reusable spec at plans/<project-name>/spec.json and plans/<project-name>/spec.md. Use when the agent needs to clarify or refine inputs before generating a standalone module or app.
user-invokable: false
---

# Plan to Spec

Use this skill to turn a free-form generation request into a small, executable contract.

## Workflow

1. Read [references/spec-schema.md](references/spec-schema.md).
2. Reuse `plans/<project-name>/plan.md` and `plans/<project-name>/spec.json` if they already exist; update them instead of starting over when possible.
3. Resolve only the inputs the generator and post-generation steps need.
4. Capture `outputDir` only when the user explicitly wants a standalone generated subtree.
5. Ask at most two blocking questions when required generator inputs are still missing.
6. Write `plans/<project-name>/plan.md`, `plans/<project-name>/spec.json`, and `plans/<project-name>/spec.md`.

## Guardrails

- Use `projectName` as the directory name under `plans/`.
- Keep `plan.md` human-readable and decision-oriented.
- Keep `spec.json` terse and machine-readable.
- Prefer enumerated `postGeneration.tasks` over long prose.
- Do not speculate about requirements that meaningfully change the generated template choice.
