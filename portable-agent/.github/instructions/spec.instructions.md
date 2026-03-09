---
applyTo: "plans/**/*.md,plans/**/*.json,apps/**/spec.json,apps/**/spec.md,generated/**/spec.json,generated/**/spec.md"
---

# Plan And Spec Files Instructions

- `plan.md` is the human-readable memory of scope, decisions, assumptions, and phased work.
- `spec.json` is the machine source of truth for generation tasks.
- Store plan and spec files under `plans/<project-name>/`.
- `<project-name>` should match `spec.json.projectName`.
- In portable mode, do not guess a nested app directory.
- Use `outputDir` only when the user explicitly wants a standalone generated subtree.
- Keep `plan.md` concise, structured, and easy to update after clarifications.
- Keep `spec.json` valid, terse, and machine-readable.
- Keep `plan.md` and `spec.json` aligned when one changes.
- `spec.md` is a readable summary derived from `spec.json`, not a second source of truth.
