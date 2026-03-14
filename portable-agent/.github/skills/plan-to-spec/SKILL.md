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
4. If `project-context` has classified the workspace as `empty-workspace` and the request is for a full project bootstrap, set `outputDir` to `.`.
5. If the workspace already contains project code, capture `outputDir` only when the user explicitly wants a standalone generated subtree.
6. Ask at most two blocking questions when required generator inputs are still missing.
7. Treat a root workspace `AGENTS.md` as a standard artifact for any generated app or module. It should describe the generated project's local facts and working rules, not duplicate `.github/*`.
8. Write `plans/<project-name>/plan.md`, `plans/<project-name>/spec.json`, and `plans/<project-name>/spec.md`.

## Guardrails

- Use `projectName` as the directory name under `plans/`.
- Keep `plan.md` human-readable and decision-oriented.
- Keep `spec.json` terse and machine-readable.
- For empty-workspace bootstrap, `outputDir: "."` is valid.
- For generation inside an existing project workspace, do not leave `outputDir` implicit.
- Prefer enumerated `postGeneration.tasks` over long prose.
- Do not confuse the generated project's workspace `AGENTS.md` with `.github/agents/*`; they serve different roles.
- Do not speculate about requirements that meaningfully change the generated template choice.
