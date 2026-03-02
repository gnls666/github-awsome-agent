# Legacy-to-Skill Refactor Methodology (Branch-to-Branch, Step by Step)

## Purpose

This document explains exactly how we migrated this repository from the legacy layout on `main` to the current skill-only architecture on `feat/copilot-agent-skills-vscode-1109`.

It is written as an execution record + reusable method.

## Baseline (what `main` looked like)

Verified legacy root layout:

```text
.github/
components/
templates/
scripts/
generated/
```

Key legacy characteristics:

1. Knowledge docs lived at root (`components/`).
2. Template assets lived at root (`templates/`).
3. Generator and troubleshooting lived at root (`scripts/`).
4. Agent/prompt/instructions referenced those root paths directly.

## Target (what we moved to)

```text
.github/
  agents/
  prompts/
  instructions/
  skills/
    <skill folders>/
    _shared/
      components/
      templates/
      scripts/
      TROUBLESHOOTING.md
      instructions/

generated/
```

Target properties:

1. Runtime capability is self-contained under `.github/skills`.
2. Root `components/templates/scripts` are removed.
3. Generator entrypoint is skillpack-local.

## Architectural decisions

## Decision 1: single-agent orchestrator

We kept one agent (`ux-standard`) and moved heavy logic into skills.

Why:

1. Better auto-routing stability.
2. Less context duplication.
3. Easier governance for VS Code-only usage.

## Decision 2: `_shared` as the portability anchor

All reusable assets moved into `.github/skills/_shared`.

Why:

1. Skills become portable across repositories.
2. References no longer break when root layout differs.
3. One canonical path model for docs, prompts, and execution.

## Decision 3: non-destructive migration order

Order used:

1. Create new skillpack structure.
2. Copy assets into `_shared`.
3. Switch all references to `_shared`.
4. Validate.
5. Delete legacy root directories.

Why:

1. Avoids downtime.
2. Allows incremental verification.
3. Simplifies rollback.

## File mapping used in migration

| Legacy path | New canonical path |
| --- | --- |
| `components/*` | `.github/skills/_shared/components/*` |
| `templates/*` | `.github/skills/_shared/templates/*` |
| `scripts/generate.js` | `.github/skills/_shared/scripts/generate.js` |
| `scripts/generate.test.mjs` | `.github/skills/_shared/scripts/generate.test.mjs` |
| `scripts/TROUBLESHOOTING.md` | `.github/skills/_shared/TROUBLESHOOTING.md` |

## Exact branch-to-branch execution flow

## Step 0: isolate work in a migration branch

```bash
git switch main
git switch -c feat/copilot-agent-skills-vscode-1109
```

## Step 1: introduce skill skeleton

Created skill folders and `SKILL.md` contracts for:

1. requirement-intake
2. template-selection
3. project-generation
4. customize-list-page
5. customize-detail-page
6. customize-multi-page
7. component-standards
8. quality-gate
9. troubleshooting

Each skill defines:

1. trigger signals
2. workflow
3. output contract
4. references

## Step 2: copy legacy assets into `_shared`

Copied legacy `components/templates/scripts` and troubleshooting/instruction resources into `.github/skills/_shared`.

## Step 3: make generator portable

Updated the new generator to:

1. load templates from `_shared/templates`.
2. write output to `process.cwd()/generated`.
3. keep dynamic multi-page behavior (`--pages`) intact.

Canonical command after this step:

```bash
node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
```

## Step 4: route all references to `_shared`

Updated the following entrypoints:

1. `.github/agents/ux-standard.agent.md`
2. `.github/copilot-instructions.md`
3. `.github/prompts/component.prompt.md`
4. `.github/prompts/plan.prompt.md`
5. `.github/instructions/generated.instructions.md`
6. `.github/instructions/templates.instructions.md`
7. all skill reference files under `.github/skills/*/references`

## Step 5: migrate tests

Moved generator regression test to `_shared/scripts` and switched it to run the `_shared` generator.

## Step 6: pre-delete validation

Executed:

```bash
node --check .github/skills/_shared/scripts/generate.js
node .github/skills/_shared/scripts/generate.js list-page verify-list --entity User --title "User Management" --dry-run
node .github/skills/_shared/scripts/generate.js detail-page verify-detail --entity Product --title "Product Detail" --dry-run
node .github/skills/_shared/scripts/generate.js multi-page verify-multi --title "Admin" --pages "Home,Orders,Reports" --dry-run
node --test .github/skills/_shared/scripts/generate.test.mjs
```

## Step 7: cutover delete

After validation succeeded:

```bash
git rm -r -f components templates scripts
```

## Step 8: post-delete link scan

Executed:

```bash
rg --hidden -n "\bcomponents/|\btemplates/|scripts/generate.js|scripts/TROUBLESHOOTING.md" . -g '!node_modules' -g '!.git'
```

Pass condition:

1. references may mention `.github/skills/_shared/...`.
2. no active dependency should remain on deleted root paths.

## Step 9: documentation closure

Updated docs and operational guidance to reflect skill-only canonical paths.

## Operational heuristics that mattered

1. Rewrite full files when old content is long and structured.
2. Keep `SKILL.md` concise; push detail into `references`.
3. Treat path migration as a contract change, not just copy/move.
4. Run validation both before and after deletion.

## Reuse guidance for another similar repository

Use this same sequence unchanged if the other repo has the same legacy pattern:

1. root `components/`
2. root `templates/`
3. root `scripts/generate.js`
4. Copilot agent/prompt/instruction files under `.github/`

For full reusable runbook, see:

- `docs/MIGRATION-CHECKLIST.md` (execution checklist)
- `docs/README-skill-architecture.md` (target architecture contract)
