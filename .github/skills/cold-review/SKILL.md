---
name: cold-review
description: Perform a final cold review of generated or customized work by checking spec alignment, likely regressions, unnecessary complexity, and missing follow-through before handoff.
user-invokable: false
---

# Cold Review

Use this skill as a fresh second pass after meaningful generation or customization work.

## Workflow

1. Read [references/review-checklist.md](references/review-checklist.md).
2. Compare the current implementation against `plans/<project-name>/spec.json` and the generated project's `spec.md`.
3. Look for mismatched naming, missing states, half-finished customizations, dead config, and likely regressions.
4. Report concrete findings first. If there are no findings, say so and call out any residual risk or test gap.

## When To Use

- Multi-file post-generation edits
- Risky or broad customizations
- User explicitly asks for review
- Pre-handoff checks when the agent made non-trivial follow-up changes
