# Layered Agent Structure

Use this reference when generating a custom engineering agent bundle for development, QA, review, migration, testing, or maintenance workflows.

## Goal

The generated result should help another engineer create a working Copilot custom agent without needing to understand this bundle's internals.

It must separate what is required from what is optional.

## Minimal File Shape

```text
.github/
  agents/<agent-name>.agent.md
  prompts/<agent-name>.prompt.md
  skills/<primary-skill>/SKILL.md
benchmarks/<agent-name>/
  README.md
  tasks/example-task.md
```

Create fewer files when the target repository already has shared skills or benchmark infrastructure.
Create more files only when the new agent has real reusable methods, templates, scripts, or external-tool workflows.

## Required Layers

### 1. Agent Profile

Required when the user needs a selectable agent persona or tool boundary.

Must include:

- frontmatter with `name`, `description`, `target`, and `tools`
- identity
- scope
- non-goals
- intent classification
- direct-execute vs plan-first policy
- skill routing priority
- tool and edit boundary
- completion policy
- output contract

Keep it short. The agent profile is policy and routing, not a technical manual.

### 2. Skill

Required for reusable methods.

Must include:

- frontmatter with `name` and `description`
- trigger/use conditions
- workflow
- required context to inspect
- references to load
- guardrails
- completion and verification rules

Put Java, Python, framework, test, benchmark, or migration details here instead of overloading the agent profile.

### 3. Prompt Shortcut

Recommended when users should not remember the exact agent invocation.

Must include:

- frontmatter with `agent` and `description`
- concise task instruction
- rules for asking questions
- expected output

Prompt files are shortcuts, not the primary policy source.

Do not use prompt filenames that collide with VS Code built-in creation commands:

- `create-agent.prompt.md`
- `create-skill.prompt.md`
- `create-instruction.prompt.md`
- `create-prompt.prompt.md`

For this bundle, the intended one-pass entry is `build-engineering-agent.prompt.md`.

### 4. Benchmark Scaffold

Required for engineering agents unless the user explicitly requests prompt-only output.

Must include:

- benchmark goal
- baseline vs candidate setup
- task types
- scoring metrics
- required evidence
- at least one golden task

## Optional Layers

### Instructions

Use `.github/instructions/*.instructions.md` only for broad code-editing constraints that apply to file patterns.

### MCP Tools

Use MCP only for real external actions or system state:

- Jira
- GitHub PR/CI
- artifact store
- scanner
- benchmark runner

Do not invent MCP tools for checklist text.

### Specialist Agents

Add a second agent only when the boundary is real:

- different permissions
- different tool access
- different domain ownership
- independent review lane

Otherwise prefer one agent plus focused skills.

## Required vs Optional Summary

| Layer | Required? | Purpose |
| --- | --- | --- |
| `.agent.md` | Required for selectable persona | routing, policy, tool boundary |
| skill | Required for reusable method | execution method and domain knowledge |
| prompt | Recommended | discoverable user shortcut |
| benchmark | Required for engineering quality claims | evidence |
| instructions | Optional | file-pattern rules |
| MCP/API | Optional | real external state/action |
| subagent | Optional | isolated review or parallel analysis |
