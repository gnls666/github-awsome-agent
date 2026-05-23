# File Templates

Use these skeletons when generating an agent bundle. Keep them compact and adapt names/descriptions to the requested domain.

## Custom Agent Profile

File: `.github/agents/<agent-name>.agent.md`

```md
---
name: <agent-name>
description: <one sentence describing the agent's engineering scope>
target: vscode
tools: ["vscode", "execute", "read", "edit", "search", "todo"]
---

# <Human Agent Name>

## Identity

You are `<agent-name>`.

## Scope

- <primary scope>

## Non-Goals

- <explicit non-goal>

## Kernel

Classify each request by:

- `intent`: maintain, refactor, generate, review, migrate, or benchmark
- `mode`: direct-execute or plan-first

## Skill Routing

1. Start with `<primary-skill>`.
2. Use narrower skills only when their trigger conditions are met.
3. Use quality-gate behavior before reporting completion.

## Completion Policy

Do not report completion until the requested verification passes or a concrete blocker is recorded.

## Output

- Context found
- Path taken
- Files changed
- Verification result
- Remaining blockers
```

## Prompt Shortcut

File: `.github/prompts/<agent-name>.prompt.md`

```md
---
agent: <agent-name>
description: <short user-facing shortcut description>
---

# /<agent-name>

Use `<agent-name>` to <task>.

## Rules

1. Start by inspecting local context.
2. Use the relevant skill before making edits.
3. Run the smallest relevant verification before completion.

## Expected Output

- Context
- Plan or action taken
- Verification
- Next step
```

## Skill

File: `.github/skills/<skill-name>/SKILL.md`

```md
---
name: <skill-name>
description: <when this skill should be used>
user-invokable: false
---

# <Skill Name>

Use this skill when <trigger>.

## Workflow

1. Inspect <required context>.
2. Identify <domain facts>.
3. Choose <safe path>.
4. Execute only the requested scope.
5. Run <verification>.
6. Report evidence.

## Guardrails

- Preserve local conventions.
- Ask only when repository facts are materially ambiguous.
- Do not report completion until verification passes or a blocker is recorded.
```

## Benchmark README

File: `benchmarks/<agent-name>/README.md`

```md
# <Agent Name> Benchmark

## Goal

<What capability this benchmark evaluates.>

## Baseline

- Same model
- Same repository snapshot
- Generic Copilot or no custom agent

## Candidate

- Same model
- Same repository snapshot
- `<agent-name>` plus generated skills

## Metrics

- `resolved`
- `verificationPass`
- `instructionAdherence`
- `skillActivationAccuracy`
- `patchQuality`
- `recoveryBehavior`
- `cost`

## Evidence

Save prompt, transcript, diff, verification output, and result summary for each run.
```

## Golden Task

File: `benchmarks/<agent-name>/tasks/example-task.md`

```md
# Example Golden Task

## Task ID

`<agent-name>-001`

## Setup

<Repository fixture or target setup.>

## Prompt

<Exact prompt to give the baseline and candidate.>

## Allowed Tools

<Tool boundary.>

## Expected Scope

<What may change and what must not change.>

## Verification

```bash
<command>
```

## Scoring

- `resolved`: pass/fail
- `verificationPass`: pass/fail
- `instructionAdherence`: 0-2
- `patchQuality`: 0-2
- `recoveryBehavior`: 0-2
```
