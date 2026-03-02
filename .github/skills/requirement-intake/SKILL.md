---
name: requirement-intake
description: Use when the user asks to create, generate, or build a page/app and requirements are missing or ambiguous; extract required inputs and ask only critical clarifying questions before implementation.
---

# Requirement Intake

Use this skill to convert free-form requests into implementation-ready inputs.

## Trigger Signals

- User asks to "create/build/generate" a page or admin UI.
- Required parameters are incomplete.
- Request mixes template choice, fields, behaviors, and naming.

## Workflow

1. Read [references/checklist.md](references/checklist.md).
2. Identify candidate template (`list-page`, `detail-page`, `multi-page`).
3. Fill known parameters from user text.
4. Ask only high-impact missing questions.
5. Return a concise intake summary that downstream skills can use directly.

## Output Contract

Always produce a structured summary:

- `template`
- `projectName`
- `title`
- `entityName` (if applicable)
- `pages` (for multi-page)
- `customizations`
- `constraints`
- `language`
- `openQuestions`

Keep questions minimal and execution-focused.
