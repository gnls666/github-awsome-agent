---
name: migrate
description: Migrate an existing project or module toward the platform MUI stack with phased planning and execution
agent: ux-standard
argument-hint: "<target-area-and-migration-goal>"
---

# /migrate - Platform MUI Migration

Use this path for explicit migration work inside a target project.

1. Start with `project-context`.
2. Use `migration-to-platform-mui` to classify the scenario and create `plans/<task-id>/plan.md` plus `plans/<task-id>/migration.json`.
3. Prefer phased in-place migration over full rewrites.
4. Adopt the provider/theme layer before broad component replacement.
5. Use `material-react-table` when admin tables in the migrated scope need to converge on the platform table standard.
6. Use `mui-v6-design` when theme, layout, spacing, or MUI component guidance is needed during the migration.
7. Run `quality-gate` after meaningful migration phases.
8. Finish risky or broad migrations with `code-review`.

Always end with:

- the classified migration scenario
- the plan path under `plans/`
- the migration contract path under `plans/`
- the current migration phase
- the touched scope
- what was verified
