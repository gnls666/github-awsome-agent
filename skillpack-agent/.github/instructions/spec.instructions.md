---
applyTo: "plans/**/*.md,plans/**/*.json,generated/**/spec.json,generated/**/spec.md"
---

# Plan And Spec Files Instructions

- `plan.md` is the human-readable memory of scope, decisions, assumptions, and phased work.
- `spec.json` is the machine source of truth for generation.
- Store plan and spec files under `plans/<project-name>/`.
- `<project-name>` should match `spec.json.projectName`.
- Keep `plan.md` concise, structured, and easy to update after clarifications.
- Keep the file concise, structured, and valid JSON.
- Required core keys: `projectName`, `template`, `title`.
- Use `entityName` for `list-page` and `detail-page` when the entity is known.
- Use `pages` only for `multi-page`.
- Put template-compatible requirements in core fields first.
- Put extra implementation work in `postGeneration.tasks`.
- Keep `plan.md` and `spec.json` aligned when one changes.
- `spec.md` is a readable summary derived from `spec.json`, not a second source of truth.
