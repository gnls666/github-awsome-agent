# Skill-First Architecture README

## Overview

This workspace contains two sibling VS Code Copilot workspaces: a skillpack-oriented authoring workspace and a portable distribution workspace.

- Platform: VS Code Copilot Agent Mode (`1.109+`)
- Agent model: single orchestrator agent
- Capability model: automatic skill routing with small always-on context
- Runtime language: follow the user's language
- Distribution model: authoring skillpack under `skillpack-agent/`, plus a portable workspace at `portable-agent/`

## Repository Layout

```text
skillpack-agent/
├── .github/
├── generated/
├── plans/
└── AGENTS.md

portable-agent/
├── .github/
└── AGENTS.md
```

## Autonomous Workflow

Default routing order:

1. `plan-to-spec`
2. `build-from-spec`
3. `post-generation` only when `spec.postGeneration.tasks` is non-empty
4. `code-review` only for complex or risky follow-up work
5. `quality-gate` when validation is requested
6. `troubleshooting` on failure

Inside `skillpack-agent/`, the agent should keep `plans/<project-name>/plan.md` as the durable human-readable plan, `plans/<project-name>/spec.json` as the machine contract, and `plans/<project-name>/spec.md` as the readable spec summary.
For in-scope work, the agent is expected to use this workflow rather than fall back to plain freeform behavior.

## Canonical Assets

Core reusable assets live under `skillpack-agent/.github/skills/_shared/`:

1. Generator script: `skillpack-agent/.github/skills/_shared/scripts/generate.js`
2. Templates: `skillpack-agent/.github/skills/_shared/templates/`
3. Component guidance: `skillpack-agent/.github/skills/_shared/components/`
4. Troubleshooting notes: `skillpack-agent/.github/skills/_shared/TROUBLESHOOTING.md`

Portable-specific rules live directly under `portable-agent/`.

## Generator

```bash
cd skillpack-agent
node .github/skills/_shared/scripts/generate.js --spec-file plans/<project-name>/spec.json
```

Legacy positional CLI generation is still supported:

```bash
cd skillpack-agent
node .github/skills/_shared/scripts/generate.js list-page user-admin --entity User --title "用户管理"
node .github/skills/_shared/scripts/generate.js list-page user-admin --output standalone/user-admin
```

## Validation

```bash
cd skillpack-agent
node --test .github/skills/_shared/scripts/generate.test.mjs
```

Current regression scope:

1. dynamic multi-page route, nav, and page generation
2. detail-page form import and icons dependency integrity
3. spec-file generation and spec artifact output
4. custom output directory generation for portable usage
