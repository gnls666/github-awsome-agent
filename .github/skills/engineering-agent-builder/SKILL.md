---
name: engineering-agent-builder
description: Create or update GitHub Copilot custom engineering agents for development, QA, review, migration, testing, or maintenance, including prompts, focused skills, and benchmark scaffolds.
user-invokable: true
---

# Engineering Agent Builder

Use this skill to produce a complete runnable engineering-agent bundle in one pass, not a standalone strategy document.

## Core Workflow

1. Inspect existing `.github/agents`, `.github/prompts`, `.github/skills`, and `benchmarks` if present.
2. Read references in this order:
   - [references/layered-agent-structure.md](references/layered-agent-structure.md)
   - [references/file-templates.md](references/file-templates.md)
   - [references/workflow-chains.md](references/workflow-chains.md)
   - [references/benchmark-protocol.md](references/benchmark-protocol.md)
   - [references/research-notes.md](references/research-notes.md) when grounding the design in external references
   - [references/copilot-cli-validation.md](references/copilot-cli-validation.md) when a runtime check is requested or feasible
3. Convert the user's idea into a compact agent contract:
   - `agentName`
   - target domain
   - primary users
   - non-goals
   - default intent and mode
   - required skills
   - optional skills or tools
   - completion gates
   - benchmark track
4. Create or update `.github/agents/<agent-name>.agent.md` only when the user needs a selectable persona or tool boundary.
5. Create or update `.github/prompts/<agent-name>.prompt.md` when the agent needs a discoverable shortcut.
6. Create the focused skill directories first. Skills are the primary reusable product.
7. Create or update `benchmarks/<agent-name>/README.md` and `benchmarks/<agent-name>/tasks/example-task.md` unless the user explicitly asks for prompt-only output.
8. For new bundles, run the deterministic scaffold script for initial file creation, then edit the generated files for domain-specific detail. Do not hand-write the initial `.agent.md`, `.prompt.md`, or `SKILL.md` files from scratch:

   ```bash
   node .github/skills/engineering-agent-builder/scripts/scaffold-agent-bundle.mjs \
     --agent-name <agent-name> \
     --skill-name <skill-name> \
     --domain "<domain>" \
     --verification "<verification command>"
   ```

9. Run the smallest relevant verification for the authoring workspace.
10. If feasible, run GitHub Copilot CLI against an isolated copied workspace and inspect whether the generated agent bundle has the required layers.
11. Summarize artifacts, required/optional layers, benchmark scoring, and validation.

## Agent Profile Requirements

Generated `.agent.md` files should be short and authoritative.

They must define:

- valid YAML frontmatter exactly at the top of the file
- identity and scope
- non-goals
- intent classification
- direct-execute vs plan-first policy
- skill routing priority
- tool boundary
- completion policy
- concise output contract

They should not contain:

- full language manuals
- long benchmark explanations
- copied checklist bodies that belong in skills
- product-code implementation details

Use an agent profile only when the workflow needs a persistent persona, tool restrictions, model preferences, handoffs, or subagent boundaries. If the user only needs a reusable method, generate a skill and a prompt shortcut instead.

## Skill Requirements

Create a skill when the generated agent needs reusable method or domain knowledge that should not live in the agent profile.

Generated `SKILL.md` files must include valid YAML frontmatter exactly at the top of the file.

Good skill boundaries:

- `java-project-context`: Maven/Gradle/JDK/test-command discovery
- `python-project-context`: uv/poetry/pip/pytest/typing discovery
- `spring-service-maintenance`: controller/service/repository conventions and safe validation
- `pytest-repair`: reproduce, isolate, patch, rerun
- `benchmark-evaluator`: result schema, scoring, and evidence collection

Avoid creating a skill when:

- the rule is only one sentence
- the content is agent identity rather than method
- a nearby existing skill already covers the behavior

## Benchmark Requirements

Every generated engineering agent should ship with a minimal benchmark scaffold.

`benchmarks/<agent-name>/README.md` should define:

- benchmark goal
- baseline vs candidate comparison
- task types
- scoring dimensions
- required evidence
- pass/fail criteria

`benchmarks/<agent-name>/scoring.json` should define the weighted scoring contract.

`benchmarks/<agent-name>/scripts/score-run.mjs` should score a run JSON and write a Markdown report.

`benchmarks/<agent-name>/tasks/example-task.md` should define:

- target repository fixture or expected setup
- user prompt
- allowed tools
- expected files or behavior
- verification commands
- scoring rubric

Use these default metrics unless the user gives a better domain-specific rubric:

- `resolved`: boolean, 30 points
- `verificationPass`: boolean, 25 points
- `instructionAdherence`: 0-5, 15 points
- `skillActivationAccuracy`: 0-5, 10 points
- `patchQuality`: 0-5, 15 points
- `recoveryBehavior`: 0-5, 5 points
- `cost`: recorded, 0 points

Default pass threshold: score >= 80 and both hard gates (`resolved`, `verificationPass`) are true.

## Layering Rules

Keep these layers separate:

```text
Agent profile: policy and routing
Prompt file: user-facing shortcut
Skill: reusable method and references
MCP/API: real external actions or system state
Benchmark: evidence that the agent works
```

For Java or Python agents:

- shared engineering policy stays in the agent profile
- build/test/package-manager detection goes into language-context skills
- framework rules go into narrower skills only when the requested domain needs them
- benchmark tasks must include at least one language-specific verification command

## Working Chain Pattern

Use the existing bundle as a local example of a working chain, not as a UX-specific template:

```text
project-context -> plan-to-spec -> build-from-spec -> post-generation -> quality-gate
```

When generating a new engineering agent, translate that chain instead of copying it literally:

- `project-context`: always needed before touching a real target repository.
- planning/spec conversion: needed when free-form intent must become an executable contract.
- build/implementation skill: needed only when there is a repeatable generation or migration action.
- post-processing skill: needed when the base action cannot express all requested customization.
- quality gate: always needed before reporting completion.

For Java service maintenance, the analogous chain might be:

```text
project-context -> java-project-context -> maintenance-plan -> implementation -> java-quality-gate -> benchmark-evidence
```

For Python maintenance:

```text
project-context -> python-project-context -> test-strategy -> implementation -> python-quality-gate -> benchmark-evidence
```

## Guardrails

- Do not create broad architectures before inspecting existing `.github` conventions.
- Do not create multiple specialist agents by default.
- Do not put benchmark protocol only in prose outside the generated bundle.
- Do not invent MCP tools unless the requested agent needs real external system actions.
- Do not use VS Code built-in creation command names for workspace prompt files: `create-agent`, `create-skill`, `create-instruction`, or `create-prompt`.
- Do not hand-write initial bundle files for a new agent; run `scripts/scaffold-agent-bundle.mjs` first.
- Do not generate `.agent.md`, `.prompt.md`, or `SKILL.md` files without the required frontmatter.
- Do not report completion until files exist and verification has run or a concrete blocker is recorded.
