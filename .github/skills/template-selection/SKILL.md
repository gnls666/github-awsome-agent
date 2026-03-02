---
name: template-selection
description: Use when the user intent is known but the correct template is not explicit; select list-page, detail-page, or multi-page with rationale and parameters.
---

# Template Selection

Use this skill to map intent to the most suitable generator template.

## Trigger Signals

- User describes capabilities without naming template.
- Multiple templates seem plausible.

## Workflow

1. Read [references/template-matrix.md](references/template-matrix.md).
2. Pick one template as default path.
3. Explain why alternatives are not primary.
4. Produce parameter draft for generation.

## Output Contract

- `selectedTemplate`
- `why`
- `parameterDraft`
- `optionalAlternatives`

Use deterministic selection rules; avoid subjective style preferences.
