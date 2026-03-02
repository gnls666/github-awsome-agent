# Skill-First Architecture README

## Overview

This repository is a VS Code Copilot skill-first system for generating and customizing React + MUI projects.

- Platform: VS Code Copilot Agent Mode (`1.109+`)
- Agent model: single orchestrator agent
- Capability model: automatic skill routing
- Runtime language: default English, follow user language at runtime

## Repository Layout

```text
.github/
├── agents/
│   └── ux-standard.agent.md
├── copilot-instructions.md
├── instructions/
│   ├── generated.instructions.md
│   ├── react-tsx.instructions.md
│   └── templates.instructions.md
├── prompts/
│   ├── component.prompt.md
│   └── plan.prompt.md
└── skills/
    ├── requirement-intake/
    ├── template-selection/
    ├── project-generation/
    ├── customize-list-page/
    ├── customize-detail-page/
    ├── customize-multi-page/
    ├── component-standards/
    ├── quality-gate/
    ├── troubleshooting/
    └── _shared/
        ├── components/
        ├── templates/
        ├── scripts/
        │   ├── generate.js
        │   └── generate.test.mjs
        ├── TROUBLESHOOTING.md
        └── instructions/
            └── generated.instructions.md

generated/
└── .gitkeep
```

## Agent and Skill Roles

## `ux-standard` Agent (orchestrator only)

Responsibilities:

1. Interpret user intent.
2. Route to the right skills in order.
3. Decide plan-first vs execute-now behavior.
4. Keep outputs concise and actionable.

## Skill Routing Priority

Standard routing order:

1. `requirement-intake`
2. `template-selection`
3. `project-generation`
4. customization skills (`customize-*`, `component-standards`)
5. `quality-gate`
6. `troubleshooting` (when errors occur)

## Canonical Paths

All core capabilities are expected to come from:

1. Generator:
   `.github/skills/_shared/scripts/generate.js`
2. Templates:
   `.github/skills/_shared/templates/`
3. Component standards:
   `.github/skills/_shared/components/`
4. Troubleshooting knowledge:
   `.github/skills/_shared/TROUBLESHOOTING.md`

## Project Generation

## Command

```bash
node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
```

## Supported templates

1. `list-page`
2. `detail-page`
3. `multi-page`

## Common options

1. `--entity <PascalCase>`
2. `--title <text>`
3. `--pages <CommaSeparatedPages>`
4. `--dry-run`

## Example

```bash
node .github/skills/_shared/scripts/generate.js multi-page ops-admin --title "Ops Admin" --pages "Dashboard,Users,Reports" --dry-run
```

Generated outputs are written to:

```text
generated/<project-name>/
```

## Validation and Regression

## Syntax check

```bash
node --check .github/skills/_shared/scripts/generate.js
```

## Regression tests

```bash
node --test .github/skills/_shared/scripts/generate.test.mjs
```

Current regression scope:

1. dynamic multi-page route/nav/page generation
2. detail-page form import and icons dependency integrity

## Usage in VS Code Copilot

## Recommended chat flow

1. Open Copilot Chat in Agent Mode.
2. Use `@ux-standard`.
3. Describe intent in natural language.
4. Let skills auto-trigger.
5. Approve plan with `go` for complex requests.

## Optional explicit prompts

1. `/plan`: plan-only output
2. `/component <name>`: component guidance lookup

These prompts are optional and not required for core workflow.

## Portability Notes

This architecture is designed for cross-repository reuse:

1. skills contain behavior contracts (`SKILL.md`)
2. `_shared` contains reusable assets and scripts
3. top-level project no longer depends on root `components/`, `templates/`, or `scripts/` directories

## Migration Docs Index

Use these documents together when migrating from legacy branch layout:

1. Methodology + exact branch-to-branch flow:
   `docs/01-skill-refactor-methodology.md`
2. Execution checklist with hard validation gates:
   `docs/MIGRATION-CHECKLIST.md`
3. Generic playbook for another similar repository:
   `docs/02-cross-project-migration-playbook.md`

## Maintenance Checklist

When changing generator or templates:

1. update files under `.github/skills/_shared/`
2. run `--dry-run` for affected templates
3. run `generate.test.mjs`
4. update related references if command/path contracts changed
