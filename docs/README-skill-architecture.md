# Skill-First Architecture README

See also: `docs/skillpack-agent-vs-portable-agent.md`

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
4. `mui-v6-design` for component, theme, and layout guidance
5. `design-critique` for visual review and anti-pattern detection
6. `design-polish` for final UI refinement
7. `code-review` only for complex or risky follow-up work
8. `quality-gate` when validation is requested
9. `troubleshooting` on failure

Inside `skillpack-agent/`, the agent should keep `plans/<project-name>/plan.md` as the durable human-readable plan, `plans/<project-name>/spec.json` as the machine contract, and `plans/<project-name>/spec.md` as the readable spec summary.
These `plans/` artifacts are local workspace state and are gitignored by default unless a user explicitly wants to preserve them as repository documentation.
For in-scope work, the agent is expected to use this workflow rather than fall back to plain freeform behavior.

## Canonical Assets

Core reusable assets live under `skillpack-agent/.github/skills/_shared/`:

1. Generator script: `skillpack-agent/.github/skills/_shared/scripts/generate.js`
2. Templates: `skillpack-agent/.github/skills/_shared/templates/`
3. Material UI v6 component guidance: `skillpack-agent/.github/skills/_shared/components/`
4. Material React Table guidance: `skillpack-agent/.github/skills/material-react-table/`
5. Troubleshooting notes: `skillpack-agent/.github/skills/_shared/TROUBLESHOOTING.md`

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

1. list-page rich admin tables default to Material React Table
2. generated list-page, detail-page, and multi-page projects include runnable Vite and Vitest scaffolding
3. dynamic multi-page route, nav, and page generation
4. spec-file generation and spec artifact output
5. custom output directory generation for portable usage
