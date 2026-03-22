# AGENTS.md Baseline

Use this as the minimal shape when `project-context` needs to create a root `AGENTS.md` for a target project.

```md
# AGENTS.md

## Project Identity

- project or app name
- framework and runtime
- package manager
- target project root

## Working Rules

- key source directories
- routing or entrypoint files
- validation commands
- migration or legacy boundaries
- approval boundaries for risky edits
```

## Baseline Rules

- Fill sections from verified repository facts, not guesses.
- Keep the file short and local to the target project.
- Do not copy `.github/agents/*`, `SKILL.md`, or prompt documentation into the generated file.
- Update the baseline only when project facts, boundaries, or validation commands materially change.
