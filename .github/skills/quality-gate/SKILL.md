---
name: quality-gate
description: Validate a generated project after generation or customization is complete by running the smallest relevant verification set and reporting actionable failures.
---

# Quality Gate

Use this skill to run verification checks for generated projects.

## Trigger Signals

- Generation or customization work is complete.
- User asks to validate or review project health.

## Workflow

1. Read [references/verification-checklist.md](references/verification-checklist.md).
2. Ensure dependencies are installed when needed.
3. Read `spec.json` when present and honor its `verification` contract.
4. For empty-workspace bootstrap or full generated apps, default to `typecheck`, `test`, and `build` when verification is missing.
5. Run checks in this order: `typecheck`, `test`, `build`.
6. Report failures with exact command and likely fix path.
7. Do not report generation complete until the requested checks pass or an explicit blocker is recorded.

## Reporting

- `status`: pass/fail by command
- `errors`: concise summary
- `nextAction`: exact file or command to resolve
