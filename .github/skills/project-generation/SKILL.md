---
name: project-generation
description: Use when template and required parameters are confirmed; run generator safely, prefer dry-run first, and produce the generated project with clear next steps.
---

# Project Generation

Use this skill to execute the skillpack generator safely and consistently.

## Trigger Signals

- Template and required parameters are ready.
- User approves execution.

## Workflow

1. Read [references/generate-cli.md](references/generate-cli.md).
2. Run dry-run first for new/complex requests.
3. Generate project without `--dry-run` after validation.
4. If output directory exists, ask before removal or renaming.
5. Summarize generated files and next commands.

## Guardrails

- Never guess required parameters silently.
- Do not overwrite existing generated project without explicit confirmation.
- Keep commands copyable and minimal.
- Prefer `node .github/skills/_shared/scripts/generate.js ...` so the skill remains portable across repositories.
