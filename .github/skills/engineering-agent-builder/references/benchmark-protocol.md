# Benchmark Protocol

Use this reference whenever an engineering agent claims quality.

## Purpose

The benchmark proves whether the custom agent and its skills improve real engineering outcomes compared with a baseline.

Do not benchmark only the final answer text. Benchmark repository behavior.

## Required Benchmark Scaffold

```text
benchmarks/<agent-name>/
  README.md
  scoring.json
  report-template.md
  scripts/score-run.mjs
  tasks/example-task.md
  runs/.gitkeep
```

Keep `runs/` ignored unless the repository explicitly wants to commit evidence.

## README Content

`benchmarks/<agent-name>/README.md` must define:

- benchmark goal
- supported task types
- baseline setup
- candidate setup
- scoring dimensions
- weighted scoring model
- required evidence
- pass/fail rules
- how to add new tasks

## Golden Task Content

`benchmarks/<agent-name>/tasks/example-task.md` must define:

- task id
- target fixture or repository setup
- user prompt
- allowed tools
- expected scope
- expected verification commands
- scoring rubric
- known failure modes

## Baseline vs Candidate

Every serious benchmark should compare:

```text
Baseline:
  same model
  same repository snapshot
  generic Copilot or no custom agent

Candidate:
  same model
  same repository snapshot
  generated custom agent + generated skills
```

When evaluating an individual skill, add an ablation:

```text
Candidate without the focused skill
Candidate with the focused skill
```

## Metrics

Use these default weighted metrics. The first two are hard gates and also contribute points.

| Metric | Weight | Scale | Meaning |
| --- | ---: | --- | --- |
| `resolved` | 30 | boolean | task outcome is correct |
| `verificationPass` | 25 | boolean | declared commands pass |
| `instructionAdherence` | 15 | 0-5 | agent follows scope, plan-first, local rules |
| `skillActivationAccuracy` | 10 | 0-5 | correct skills are used at the right time |
| `patchQuality` | 15 | 0-5 | diff is focused and maintainable |
| `recoveryBehavior` | 5 | 0-5 | failed verification leads to fix or concrete blocker |
| `cost` | 0 | recorded only | wall time, tool calls, token cost when available |

Default pass threshold: total score >= 80 and both `resolved` and `verificationPass` are true.

Use `scoring.json` as the machine-readable contract and `scripts/score-run.mjs` to produce a score/report from run evidence.

## Evidence

Each run should save:

- prompt
- model
- agent name
- repository snapshot id or fixture version
- transcript
- diff
- verification output
- result JSON
- score report
- human review notes when relevant

## Public Benchmark Alignment

Use public benchmarks for external comparison, not as a substitute for internal golden tasks.

Useful references:

- SWE-bench: real GitHub issue resolution, especially Python ecosystem tasks
- Multi-SWE-bench: multi-language issue resolution, useful for Java/Python coverage
- Terminal-Bench: terminal-based engineering task execution
- SWE-Skills-Bench / SkillsBench: skill-use and skill-ablation evaluation

## Pass Criteria

For a first internal custom agent, use this minimum bar:

- at least one golden task runs baseline and candidate
- candidate produces the required artifact structure
- candidate runs the declared verification command or explains a concrete blocker
- no broad rewrite outside the task scope
- benchmark result records enough evidence for another engineer to audit it
