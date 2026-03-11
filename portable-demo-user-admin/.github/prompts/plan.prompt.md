---
agent: ux-standard
description: Plan-only mode for maintenance, refactor, or generation work
---

# /plan - Portable Plan Mode

You are in Plan Only Mode. Analyze the user's request and output a structured plan, but do not execute anything.

## Rules

1. Do not run commands, create files, or make changes.
2. Read the relevant repository context before planning.
3. For existing-project work, center the plan on touched areas, risks, local conventions, and verification.
4. For generation work, include a draft `plans/<project-name>/plan.md` and a draft `plans/<project-name>/spec.json`.
5. Ask only the questions that materially change the plan.
6. End by asking the user to confirm or adjust the plan.
