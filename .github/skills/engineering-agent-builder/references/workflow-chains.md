# Workflow Chains

Use this reference to make a generated agent actually useful instead of just named.

## First Principle

An engineering agent must convert a vague request into a verified repository change.

The reliable chain is:

```text
context -> contract -> action -> follow-up -> verification -> evidence
```

Do not skip context or verification.

## Local Reference: Existing Bundle Chain

This repository already has a working agent chain. Treat it as an architectural pattern, not as a UX-specific template.

Its main generation chain is:

```text
project-context
  -> plan-to-spec
  -> build-from-spec
  -> post-generation
  -> quality-gate
```

The responsibilities are:

| Skill | Responsibility |
| --- | --- |
| `project-context` | classify workspace, target root, stack, local rules |
| `plan-to-spec` | turn free-form user intent into `plan.md` and `spec.json` |
| `build-from-spec` | execute the machine-readable generation contract |
| `post-generation` | apply only declared follow-up tasks |
| `quality-gate` | run verification before completion |

This is the pattern to reuse.

## General Engineering Agent Chain

For an existing repository:

```text
project-context
  -> domain-context
  -> plan-or-direct
  -> implementation
  -> quality-gate
  -> code-review when risk is meaningful
  -> benchmark-evidence when evaluating the agent
```

## Java Engineering Chain

```text
project-context
  -> java-project-context
  -> java-maintenance-plan
  -> implementation
  -> java-quality-gate
  -> benchmark-evidence
```

`java-project-context` should discover:

- Maven vs Gradle
- module boundaries
- JDK version
- test framework
- main package layout
- validation commands
- Spring/Quarkus/Micronaut conventions when visible

`java-quality-gate` should prefer:

- smallest relevant module test first
- then broader `mvn test`, `./gradlew test`, or project-specific command
- build/package only when the task requires it

## Python Engineering Chain

```text
project-context
  -> python-project-context
  -> test-strategy
  -> implementation
  -> python-quality-gate
  -> benchmark-evidence
```

`python-project-context` should discover:

- uv, poetry, pip, or conda
- package layout
- pytest vs unittest
- Python version
- typing and linting tools
- validation commands

## Generation Agent Chain

When the generated agent itself creates project code, use a spec-bounded path:

```text
project-context
  -> plan-to-spec equivalent
  -> generation/build skill
  -> post-generation equivalent
  -> quality-gate
```

Do not let generation become open-ended. The machine contract should define the first phase only.

## Review Agent Chain

For review-only agents:

```text
project-context
  -> diff/context inspection
  -> focused review checklist
  -> findings with file references
  -> optional benchmark-evidence
```

Review agents should not edit files unless explicitly asked.

## Quality Bar

A generated agent is "okay" only when it can:

- inspect before acting
- choose direct-execute vs plan-first
- keep domain details in skills
- run appropriate verification
- recover from failed verification or report a concrete blocker
- produce benchmark evidence
