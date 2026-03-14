# Agent Change Rounds

This document summarizes the major rounds of change to the agent system in this repository.

It is intended for:

- other repositories that want to adopt the same model
- team members who need a compact architecture history
- projects that have not yet updated their real `AGENTS.md` usage

Unless noted otherwise, the mainline described here is:

- `codex/skillpack-portable-split`

This document intentionally separates:

- **committed rounds**: already recorded in git history
- **working-tree rounds**: important local changes that are not yet committed

## Current Model

The current architecture is built around three parallel layers inside the **target project workspace**:

```text
target-project/
  .github/   # agent capability layer
  AGENTS.md  # project manual layer
  plans/     # task memory layer
```

These three layers have different responsibilities:

- `.github/*` defines the agent system:
  - custom agent
  - skills
  - prompts
  - instructions
- `AGENTS.md` describes the target project itself:
  - current state
  - structure
  - validation
  - boundaries
  - migration status
- `plans/*` stores task-level temporary artifacts:
  - `plan.md`
  - `spec.json`
  - `spec.md`
  - `migration.json`

Important clarification:

- `portable-agent/` is a **distribution workspace**
- it is **not** the final target project
- target-project `AGENTS.md` should live where the agent actually generates, maintains, or migrates code

## Round 1: Split the Workspace into Two Siblings

Status: committed  
Commit: `361bdf0`

### What changed

- The repository was restructured into two sibling workspaces:
  - `skillpack-agent/`
  - `portable-agent/`
- The repository root became a meta-repository rather than a directly runnable single agent workspace.

### Why it matters

- `skillpack-agent/` now acts as the authoring and test workspace
- `portable-agent/` acts as the portable distribution to be copied into another repository
- This separation made it easier to reason about authoring-time behavior versus runtime behavior

## Round 2: Upgrade the UI Stack and Design Skills

Status: committed  
Commit: `afadd35`

### What changed

- Standardized the generated UI stack around:
  - React
  - Material UI v6
  - Material React Table
- Reworked the old component standards into explicit design skills:
  - `mui-v6-design`
  - `design-critique`
  - `design-polish`

### Why it matters

- The skillpack stopped being generic UI scaffolding
- It began to encode a clear UI stack and a real design-polish loop

## Round 3: Replace "Cold Review" with "Code Review"

Status: committed  
Commit on mainline history: `91ed62d` on the older branch, terminology carried forward into current work

### What changed

- The review skill and related wording were normalized from `cold-review` to `code-review`

### Why it matters

- The name now matches the actual purpose
- User-facing and internal language became more coherent

## Round 4: Tighten Design Rules for Content Width

Status: committed  
Commit: `1db75f0`

### What changed

- Added explicit guidance that data-heavy admin pages should not collapse into a narrow center column
- This rule was reflected in:
  - design references
  - critique checklists
  - polish checklists

### Why it matters

- This addressed a common generated-admin failure mode:
  - sidebar exists
  - main content still gets artificially squeezed

## Round 5: Adopt Material React Table Across Templates

Status: committed  
Commit: `f7d0f6a`

### What changed

- Standardized rich admin tables on Material React Table
- Updated templates, skills, and supporting docs accordingly

### Why it matters

- Tables became part of the platform standard instead of an implementation detail
- This gave the agent a clearer default for internal admin UIs

## Round 6: Ignore Local `plans/` by Default

Status: committed  
Commit: `c8d0e5f`

### What changed

- `plans/` was explicitly treated as local task memory
- `plans/` was gitignored by default

### Why it matters

- This clarified that task artifacts are not the same thing as project documentation
- It reduced noise in repositories using the agent

## Round 7: Document the Difference Between Skillpack and Portable

Status: committed  
Commit: `4c901f0`

### What changed

- Added a dedicated explanation of the difference between:
  - `skillpack-agent`
  - `portable-agent`

### Why it matters

- This made it easier for other projects to understand which workspace they should actually copy or edit

## Round 8: Introduce a Portable Migration Workflow

Status: committed  
Commits:

- `3c5e15a`
- `543073e`
- `b660d12`

### What changed

- Added a dedicated migration skill:
  - `migration-to-platform-mui`
- Refined `project-context`
- Reframed portable behavior around:
  - `empty-workspace`
  - `single-project`
  - `multi-project`
- Clarified that portable generation already existed, but needed cleaner routing and target-project semantics
- Fixed migration skill YAML frontmatter so it can be parsed reliably

### Why it matters

- Portable is no longer modeled as "existing repositories only"
- The system now distinguishes:
  - repository root
  - target project root
- Migration is framed as:
  - provider adoption
  - icon alignment
  - MUI v6 alignment
  - MRT standardization
  - optional incremental TypeScript

## Round 9: Add a Source Map for Skills and Instructions

Status: committed  
Commit: `24eb5d3`

### What changed

- Added a central map of:
  - skills
  - instructions
  - their primary sources and references

### Why it matters

- This gave the stack better traceability
- It distinguished:
  - official docs
  - public references
  - internal `UX Standards`

## Round 10: Make Quality Gate Typecheck-First

Status: committed on test branch, not yet merged into `codex/skillpack-portable-split`  
Commit on branch `codex/portable-empty-workspace-test`: `a77e44b`

### What changed

- Strengthened `quality-gate` so validation order is:
  - `typecheck`
  - then `test` if needed
  - then `build` only if needed

### Why it matters

- Faster validation loops
- Better fit for agent-driven iteration
- Avoids using `build` as the first line of type validation

## Working-Tree Round A: Move Generator Scripts and Templates into `build-from-spec`

Status: local working tree only, not yet committed

### What changed

- Generator scripts were moved out of:
  - `.github/skills/_shared/scripts/`
- Templates were moved out of:
  - `.github/skills/_shared/templates/`
- New canonical locations are now:
  - `.../.github/skills/build-from-spec/scripts/generate.js`
  - `.../.github/skills/build-from-spec/assets/templates/`

This change is being applied in both:

- `skillpack-agent/`
- `portable-agent/`

### Why it matters

- `build-from-spec` now owns its execution assets directly
- This reduces path ambiguity for Copilot
- It makes the generator and templates part of the skill that actually uses them

### Secondary updates in the same round

- Updated related references and instructions so Copilot stops pointing at the old `_shared` path
- Adjusted troubleshooting and architecture docs accordingly

## Working-Tree Round B: Fix the Multi-Page Template Title Placeholder

Status: local working tree only, not yet committed

### What changed

- Replaced the hardcoded `UX template` label in the multi-page template with `{{TITLE}}`

### Why it matters

- Generated apps now show the actual project title in the header
- This fixed a real template bug rather than a runtime prompt issue

## Working-Tree Round C: Add a Repo-Local Copilot CLI Smoke Skill

Status: local working tree only, not yet committed

### What changed

- Added:
  - `skillpack-agent/.github/skills/copilot-cli-smoke-test/`

### Why it matters

- This gives the repository a local authoring-time CLI smoke workflow in addition to manual VS Code validation

## Codex-Level Addition: Global Iteration Skill

Status: added outside the repository in Codex global skills

### Location

- `/Users/baizijun/.codex/skills/copilot-agent-iteration/`

### What changed

- Added a reusable Codex-level skill for the full loop:
  1. modify the agent workspace
  2. bootstrap or point at a target workspace
  3. run GitHub Copilot CLI with a realistic prompt
  4. inspect transcripts and outputs
  5. evaluate the result

### Why it matters

- This captures the exact workflow used during this repository's recent iteration
- It helps repeat the same loop consistently across other projects

## Real `AGENTS.md` Application Model

This repository's most important conceptual update is the practical role of `AGENTS.md`.

### Correct role

`AGENTS.md` is the **project manual** for the target project.

It should describe:

- project identity
- current state
- target state
- structure
- validation
- boundaries
- migration status

### Incorrect role

`AGENTS.md` should **not** be treated as:

- a copy of `.github/agents/*`
- a copy of `.github/skills/*`
- a replacement for `.github/prompts/*`
- a general framework tutorial

### Placement rules

For a single-project workspace:

```text
project-root/
  .github/
  AGENTS.md
  plans/
```

For a multi-project workspace:

```text
repo-root/
  .github/
  AGENTS.md              # repo-level manual
  apps/admin/AGENTS.md   # target-project manual
  plans/
```

### Default logic

Do not assume the repository root is always the project root.

Instead:

1. detect workspace mode
2. identify `targetProjectRoot`
3. read or create the correct target-project `AGENTS.md`
4. then proceed with generate, maintain, refactor, or migrate

## What Another Project Should Adopt First

If another project wants to adopt this model without taking everything at once, the most important parts are:

1. separate `.github/*`, `AGENTS.md`, and `plans/*`
2. treat `AGENTS.md` as a real project manual
3. treat `plans/*` as local task memory
4. detect `targetProjectRoot` before assuming the repository root
5. if using a portable stack, let the portable bundle provide `.github/*`, but let the target project own `AGENTS.md`

## Current Summary

At this point, the stack has evolved from "a set of Copilot files" into:

- a split authoring/runtime model
- a clearer target-project model
- a stronger MUI + MRT + design-polish opinion
- a more disciplined validation workflow
- and a repeatable Copilot CLI evaluation loop

The main remaining work is to finish committing the current working-tree changes so that the generator path and template ownership are fully aligned with the newer architecture.
