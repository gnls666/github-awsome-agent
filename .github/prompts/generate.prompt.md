---
name: generate
description: Generate a standalone Material UI v6 page, module, or app inside an empty workspace or as an explicit subtree inside an existing repository
agent: ux-standard
argument-hint: "<project-name> [template] [--entity User] [--title 标题] [--pages Dashboard,Users] [--output relative/path]"
---

# /generate - Portable Generation

Use this path when the user wants a new standalone page, module, or app.

1. If the repository already has code, inspect the relevant structure with `project-context` first.
2. Create or update `plans/<project-name>/plan.md` and `plans/<project-name>/spec.json` with `plan-to-spec`.
3. If `project-context` classifies the workspace as empty and the user wants a full bootstrap, let the spec target the current root.
4. If the workspace already contains project code, require an explicit `outputDir` for any standalone generated subtree.
5. Ask at most two blocking clarification questions if required generator inputs are still missing.
6. Once the spec is coherent, use `build-from-spec`.
7. Invoke `post-generation` only if `spec.postGeneration.tasks` is non-empty.
8. Use `design-polish` when the generated UI is functionally complete but needs a stronger visual pass.
9. Use `design-critique` when the user explicitly asks for a design review or the result still feels generic after customization.
10. Use `code-review` only for complex or risky post-generation work, or when the user explicitly asks for review.
11. Prefer `--dry-run` first when the destination is new, risky, or may overlap with existing code.

Always end with:

- the resolved plan path under `plans/`
- the resolved spec path under `plans/`
- the selected template
- the resolved generator command
- the resolved output path
- the detected workspace mode
- the next command the user should run, if any
