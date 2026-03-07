---
applyTo: ".github/skills/_shared/templates/**"
---

# Template Files Instructions

These are generation templates processed by `.github/skills/_shared/scripts/generate.js`.

## Rules

- Keep `{{VARIABLE_NAME}}` placeholders intact.
- Do not replace placeholders with concrete project values in template files.
- Keep template code generic, reusable, and aligned with generated project conventions.
- Preserve the `.template` naming pattern so the generator can map outputs correctly.

Common variables include `{{PROJECT_NAME}}`, `{{ENTITY_NAME}}`, `{{ENTITY_NAME_LOWER}}`, `{{TITLE}}`, and multi-page routing placeholders.
