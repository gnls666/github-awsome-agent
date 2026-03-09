---
name: generate
description: Fast path to generate a React + MUI project with the repository generator
agent: ux-standard
argument-hint: "<project-name> [template] [--entity User] [--title 标题] [--pages Dashboard,Users]"
---

# /generate - Fast Project Generation

Use the minimum relevant workflow for project generation:

1. Create or update `plans/<project-name>/plan.md` and `plans/<project-name>/spec.json` with `plan-to-spec`.
2. Ask at most two blocking clarification questions if the spec is missing required generator inputs.
3. Once the spec is coherent, use `build-from-spec`.
4. Invoke `post-generation` only if `spec.postGeneration.tasks` is non-empty.
5. Use `code-review` only for complex or risky post-generation work, or when the user explicitly asks for review.
6. Prefer `--dry-run` first when the request is new, risky, or likely to overwrite an existing directory.

Always end with:

- the resolved plan path under `plans/`
- the resolved spec path under `plans/`
- the selected template
- the resolved generator command
- the output path under `generated/`
- the next command the user should run, if any
