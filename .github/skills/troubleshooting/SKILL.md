---
name: troubleshooting
description: Diagnose generation, build, install, or runtime failures only when an actual error is present, then provide the smallest concrete recovery sequence.
---

# Troubleshooting

Use this skill to diagnose and recover from common workflow failures.

## Trigger Signals

- Generator command fails.
- Module/dependency/runtime errors appear.
- User reports blank page, import errors, or typecheck failures.

## Workflow

1. Read [references/common-fixes.md](references/common-fixes.md).
2. Match symptoms to known issues first.
3. Provide minimal recovery sequence.
4. If not covered, isolate root cause with reproducible command steps.

## Output Contract

- `symptom`
- `probableCause`
- `fixSteps`
- `verificationCommand`
