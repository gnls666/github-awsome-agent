---
name: generate
description: Generate a standalone page, module, or app inside an existing repository
agent: ux-standard
argument-hint: "<project-name> [template] [--entity User] [--title 标题] [--pages Dashboard,Users] [--output relative/path]"
---

# /generate - Portable Generation

Use this path only when the user explicitly wants a new standalone page, module, or app.

1. If the repository already has code, inspect the relevant structure with `project-context` first.
2. Create or update `plans/<project-name>/plan.md` and `plans/<project-name>/spec.json` with `plan-to-spec`.
3. Include `outputDir` only when the user explicitly wants a standalone generated subtree.
4. Ask at most two blocking clarification questions if required generator inputs are still missing.
5. Once the spec is coherent, use `build-from-spec`.
6. Invoke `post-generation` only if `spec.postGeneration.tasks` is non-empty.
7. Use `code-review` only for complex or risky post-generation work, or when the user explicitly asks for review.
8. Prefer `--dry-run` first when the destination is new, risky, or may overlap with existing code.

Always end with:

- the resolved plan path under `plans/`
- the resolved spec path under `plans/`
- the selected template
- the resolved generator command
- the resolved output path
- the next command the user should run, if any
