---
name: troubleshooting
description: Use when generation, build, or runtime errors occur; diagnose quickly with repository troubleshooting guidance and provide concrete recovery steps.
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
