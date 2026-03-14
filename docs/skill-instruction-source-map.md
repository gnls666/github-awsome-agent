# Skills / Instructions / Sources Map

This document is the central attribution map for the repository's `skills`, `instructions`, and rule sources.

It answers three questions:

1. Which `skills` exist in this repository
2. Which `instructions` exist in this repository
3. Which sources they rely on, and which parts of those sources were actually used

## How To Read This Document

Read it in this order:

1. **Source Catalog**  
   This explains what each source contributed. It is not just a link list.
2. **Skills Map**  
   This shows which sources each skill relies on.
3. **Instructions Map**  
   This shows which sources each instruction relies on.

If a rule does not have a stable, precise first-party source, it is grouped under:

- `UX Standards`

That means it is an internal standard we derived from product and implementation practice.

## Source Catalog

Each source below is described with four fields:

- what it is
- which specific part of it we used
- a short summary of that part
- which files it mainly influenced

### `S1` VS Code Copilot Agent Skills

Link: <https://code.visualstudio.com/docs/copilot/customization/agent-skills>

What it is:
- The official VS Code Copilot documentation for `skills`

Which part we used:
- `skills` are defined by `SKILL.md`
- `name` and `description` are used for relevance matching
- a skill can include `references/`, `scripts/`, and `assets/`
- skills are the right place for specialized, multi-step workflows

Short summary:
- This source tells us what should be a `skill` and what a well-formed skill should look like

Main impact:
- Almost every `.github/skills/*/SKILL.md`
- Especially:
  - `plan-to-spec`
  - `build-from-spec`
  - `post-generation`
  - `project-context`
  - `migration-to-platform-mui`
  - `mui-v6-design`
  - `material-react-table`
  - `code-review`
  - `quality-gate`
  - `troubleshooting`

### `S2` VS Code Custom Instructions

Link: <https://code.visualstudio.com/docs/copilot/customization/custom-instructions>

What it is:
- The official VS Code Copilot documentation for global instructions, path-specific instructions, and `AGENTS.md`

Which part we used:
- repository-level guidance belongs in `.github/copilot-instructions.md`
- narrow file- or path-scoped rules belong in `*.instructions.md`
- always-on context should stay short
- detailed behavior should be pushed into narrower instruction files or skills

Short summary:
- This source tells us what should stay in always-on context and what should not

Main impact:
- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`
- workspace `AGENTS.md` handling guidance

### `S3` GitHub Copilot Agent Skills

Link: <https://docs.github.com/en/copilot/concepts/agents/about-agent-skills>

What it is:
- The official GitHub Copilot description of agent skills

Which part we used:
- skills should package reusable domain capability
- skills should be focused, not overly broad
- skills are a better fit than a large monolithic agent body for complex workflows

Short summary:
- This reinforces the same design direction as `S1`: complex workflows belong in skills, not in a giant always-on prompt

Main impact:
- Skill boundaries across the repository
- Especially:
  - `build-from-spec`
  - `post-generation`
  - `project-context`
  - `migration-to-platform-mui`
  - `code-review`
  - `quality-gate`

### `S4` GitHub Copilot Prompt Files

Link: <https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files>

What it is:
- The official GitHub Copilot documentation for prompt files such as `/generate`, `/plan`, or `/migrate`

Which part we used:
- prompt files are explicit user entrypoints
- prompt files should complement skills, not replace them
- prompt files are good overrides or fast paths for clear intents

Short summary:
- This source helped separate slash-style entrypoints from the skill system itself

Main impact:
- `.github/prompts/*.prompt.md`
- Especially:
  - `generate.prompt.md`
  - `plan.prompt.md`
  - `maintain.prompt.md`
  - `refactor.prompt.md`
  - `migrate.prompt.md`

### `S5` Claude Code Skills / Slash Commands

Link: <https://code.claude.com/docs/en/slash-commands>

What it is:
- Claude Code guidance for `skills`, slash commands, and explicit high-intent task entrypoints

Which part we used:
- high-intent work benefits from explicit entrypoints
- a skill can hold a multi-step but still focused workflow
- plan, execute, and review can form one coherent flow

Short summary:
- This mainly influenced how we modeled planning, migration, and other high-risk workflows

Main impact:
- `migration-to-platform-mui`
- `plan-to-spec`
- the role of prompt files as explicit entrypoints

### `S6` Claude Code Subagents

Link: <https://code.claude.com/docs/en/sub-agents>

What it is:
- Claude Code guidance on when and how to split work across focused subagents

Which part we used:
- high-risk, high-context work should not be fragmented into too many parallel top-level entrypoints
- one main orchestrator should reuse specialized focused capabilities
- complex work should go through inventory, planning, pilot execution, and controlled expansion instead of a full immediate rewrite

Short summary:
- We did not adopt subagents as a runtime feature here
- We used the design principle behind them: keep the migration flow centralized and keep specialized capabilities focused

Main impact:
- `migration-to-platform-mui`

Concrete influence:
- one main migration skill instead of many sibling migration skills
- fixed phase order: `inventory -> foundation -> pilot -> expand -> cleanup`
- reuse of `project-context`, `mui-v6-design`, `material-react-table`, `quality-gate`, and `code-review`

### `S7` Material UI v6 Upgrade Guide

Link: <https://mui.com/material-ui/migration/upgrade-to-v6/>

What it is:
- The official Material UI v6 upgrade and API transition guide

Which part we used:
- MUI v6 as the target version
- `Grid2`
- v6-specific component and layout guardrails
- the migration boundary between older MUI patterns and v6 patterns

Short summary:
- This is the base technical source for all repository rules that say "MUI v6"

Main impact:
- `mui-v6-design`
- `material-react-table`
- `migration-to-platform-mui`
- MUI-facing React/TS instructions

### `S8` Material UI Themed Components

Link: <https://mui.com/material-ui/customization/theme-components/>

What it is:
- The official MUI guidance on `defaultProps`, `styleOverrides`, and `variants`

Which part we used:
- centralizing component visual behavior inside the theme
- preferring theme-level control over scattered page-local overrides

Short summary:
- This source supports the idea that provider/theme adoption should come before broad page-level replacement

Main impact:
- `mui-v6-design`
- `migration-to-platform-mui`
- theme and design-polish guidance

### `S9` Material UI CSS Theme Variables

Link: <https://mui.com/material-ui/customization/css-theme-variables/usage/>

What it is:
- The official MUI guidance for CSS theme variables, color schemes, and `theme.vars`

Which part we used:
- theme variables
- color schemes / dark mode strategy
- using theme variables to unify surface, color, and state presentation

Short summary:
- This source influences theme-system thinking more than workflow design

Main impact:
- `mui-v6-design`
- visual and theme references

### `S10` Material React Table Guides

Link: <https://www.material-react-table.com/docs/guides>

What it is:
- The official Material React Table documentation

Which part we used:
- `useMaterialReactTable`
- `MRT_ColumnDef<T>`
- toolbar, row actions, and sticky header patterns
- server-side sorting, filtering, and pagination

Short summary:
- This is the main technical basis for treating MRT as the repository's rich admin table layer

Main impact:
- `material-react-table`
- `migration-to-platform-mui`
- shared table guidance and table defaults in generated projects

### `S11` impeccable.style

Link: <https://impeccable.style/>

What it is:
- A public frontend design methodology focused on avoiding generic-looking AI UI output

Which part we used:
- design critique
- design polish
- anti-pattern thinking
- the idea that "generic AI UI" should be actively detected and corrected

Short summary:
- This is a design methodology reference, not a React or MUI API source

Main impact:
- `design-critique`
- `design-polish`
- the anti-pattern layer inside `mui-v6-design`

### `S12` impeccable GitHub

Link: <https://github.com/pbakaus/impeccable>

What it is:
- The public impeccable repository, used for how its design ideas are organized and expressed

Which part we used:
- splitting design support into critique/polish-style actions
- using explicit checklists and anti-patterns instead of vague taste statements

Short summary:
- `S11` is more about design stance; `S12` is more about packaging and operationalizing that stance

Main impact:
- `design-critique`
- `design-polish`
- how references are organized inside `mui-v6-design`

### `UX` Our UX Standards

What it is:
- Our internal standards, not an external document

What it includes:
- the repository's `plan.md / spec.json / spec.md / migration.json` formats
- `plans/` being gitignored by default
- the generation workflow
- the portable migration workflow
- "ask only a small number of blocking questions and discover facts from the repo first"
- "do not squeeze the main admin content into a narrow center column"
- "list pages, dashboards, and management views should use the working width well"
- the repository's default pairing of `MUI v6 + Material React Table`
- output conventions for design critique, design polish, and code review

Short summary:
- Anything we use consistently but cannot map cleanly to a precise external source lives here

## Skills Map

This section answers:

- what each skill does
- which sources it mainly draws from
- which parts come from external references versus internal standards

### Shared Skills

These skills exist in both `skillpack-agent/` and `portable-agent/`.

#### `plan-to-spec`

Role:
- turns a free-form request into `plan.md + spec.json + spec.md`

Main sources:
- `S1`, `S2`, `S3`, `S4`, `UX`

What it borrows:
- from `S1/S3`: the idea that a skill should hold the workflow
- from `S2`: keep always-on rules short and move process detail into the skill
- from `S4`: `/plan`-style explicit entrypoint thinking
- from `UX`: the actual plan/spec file structure

#### `build-from-spec`

Role:
- executes generation from `spec.json`

Main sources:
- `S1`, `S3`, `UX`

What it borrows:
- from `S1/S3`: skill-based execution packaging
- from `UX`: generation order, field contract, and output expectations

#### `post-generation`

Role:
- performs follow-up customization after base generation

Main sources:
- `S1`, `S3`, `UX`

What it borrows:
- from `S1/S3`: workflow packaging in a focused skill
- from `UX`: what counts as post-generation work and when it should run

#### `mui-v6-design`

Role:
- provides MUI v6 component, theme, layout, and visual design guidance

Main sources:
- `S7`, `S8`, `S9`, `S11`, `S12`, `UX`

What it borrows:
- from `S7`: MUI v6 APIs and upgrade guardrails
- from `S8`: theme-component structure
- from `S9`: CSS theme variables and color schemes
- from `S11/S12`: anti-pattern thinking and critique/polish methodology
- from `UX`: the final enterprise-admin visual rules we actually enforce

#### `material-react-table`

Role:
- defines the repository's rich admin table layer

Main sources:
- `S7`, `S10`, `UX`

What it borrows:
- from `S10`: MRT API and usage patterns
- from `S7`: MUI v6 compatibility context
- from `UX`: when MRT should be the default and when it should not be overused

#### `design-critique`

Role:
- performs a design review pass on UI output

Main sources:
- `S11`, `S12`, `S7`, `UX`

What it borrows:
- from `S11/S12`: critique, anti-patterns, and anti-generic-UI methodology
- from `S7`: keeps the critique grounded in the MUI v6 environment
- from `UX`: the exact review focus and reporting format used in this repository

#### `design-polish`

Role:
- performs the final UI refinement pass after the interface already works

Main sources:
- `S11`, `S12`, `S7`, `UX`

What it borrows:
- from `S11/S12`: polish methodology and checklist framing
- from `S7`: MUI v6 component and layout assumptions
- from `UX`: local spacing, header, surface, and density standards

#### `code-review`

Role:
- performs a second-pass review for risky or broad changes

Main sources:
- `S1`, `S3`, `UX`

What it borrows:
- from `S1/S3`: a skill as a reusable review entrypoint
- from `UX`: findings-first ordering, risk sorting, and residual-risk reporting

#### `quality-gate`

Role:
- runs the smallest relevant validation instead of reflexively running everything

Main sources:
- `S1`, `S3`, `UX`

What it borrows:
- from `S1/S3`: skill-based validation stage
- from `UX`: change-scoped validation strategy

#### `troubleshooting`

Role:
- handles build, runtime, and command failures

Main sources:
- `S1`, `S3`, `UX`

What it borrows:
- from `S1/S3`: a reusable troubleshooting skill
- from `UX`: prioritization and common-fix organization

### Portable-Only Skills

These skills exist only in `portable-agent/`.

#### `project-context`

Role:
- understands the existing repository before maintenance, refactor, or migration

Main sources:
- `S1`, `S2`, `S3`, `UX`

What it borrows:
- from `S1/S3`: make repository inspection a focused skill
- from `S2`: keep this out of large always-on instructions
- from `UX`: inspect manifests, entrypoints, validation commands, local conventions, and applicable workspace `AGENTS.md` boundaries first

#### `migration-to-platform-mui`

Role:
- incrementally migrates an existing project toward the platform MUI base:
  - shared `ThemeProvider`
  - platform icons
  - Material UI v6
  - Material React Table

Main sources:
- `S1`, `S3`, `S5`, `S6`, `S7`, `S10`, `UX`

What it borrows:
- from `S1/S3`: make migration a focused high-intent skill
- from `S5`: explicit entrypoint and stable multi-step flow for high-intent work
- from `S6`: keep migration centralized, phase it, and avoid over-fragmenting the flow
- from `S7`: MUI v6 as the target base stack
- from `S10`: MRT as the target rich-table layer
- from `UX`: ask less, discover more, respect workspace `AGENTS.md`, migrate incrementally, and keep TypeScript optional by default

### Skillpack-Only Notes

`skillpack-agent/` does not include:

- `project-context`
- `migration-to-platform-mui`

Reason:
- `skillpack-agent` is the generation workbench
- `portable-agent` is the existing-project maintenance and migration workbench

## Instructions Map

### Global / Workspace-Level Instructions

#### `AGENTS.md`

Role:
- defines repository- or workspace-level behavioral boundaries

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: repository-level instruction mechanics
- from `UX`: the actual task boundaries, defaults, and language policy used here

#### `.github/copilot-instructions.md`

Role:
- provides short always-on global rules

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: keep always-on guidance short and high-signal
- from `UX`: project-specific defaults and priorities

### Portable Instructions

#### `portable-agent/.github/instructions/project.instructions.md`

Role:
- defines how code should be edited inside a target workspace, especially when that workspace already contains code

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: path-scoped instruction mechanics
- from `UX`: inspect local patterns first, edit incrementally, validate narrowly

#### `portable-agent/.github/instructions/react-tsx.instructions.md`

Role:
- defines React + TS / TSX code style and MUI v6 direction

Main sources:
- `S2`, `S7`, `UX`

What it borrows:
- from `S2`: file-type scoped instruction usage
- from `S7`: MUI v6 direction and API preference
- from `UX`: local React/TypeScript coding style

#### `portable-agent/.github/instructions/spec.instructions.md`

Role:
- defines the structure and location of `plans/`, `spec.json`, and `spec.md`

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: instruction targeting for file classes
- from `UX`: the actual file contract

#### `portable-agent/.github/instructions/workspace-agents.instructions.md`

Role:
- defines how project-workspace `AGENTS.md` files should be written and layered inside a target project

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: path-scoped instruction mechanics for `AGENTS.md`
- from `UX`: root-vs-nested workspace `AGENTS.md` rules and the rule that project `AGENTS.md` should not duplicate `.github/*`

### Skillpack Instructions

#### `skillpack-agent/.github/instructions/generated.instructions.md`

Role:
- defines how generated projects under `generated/**` should be edited later

Main sources:
- `S2`, `S7`, `UX`

What it borrows:
- from `S2`: path instruction mechanics
- from `S7`: MUI v6 / TS direction
- from `UX`: generated-project maintenance expectations

#### `skillpack-agent/.github/instructions/react-tsx.instructions.md`

Role:
- defines React + MUI v6 style for generated projects and TSX templates

Main sources:
- `S2`, `S7`, `UX`

What it borrows:
- from `S2`: file-type scoped instruction mechanics
- from `S7`: MUI v6 API direction
- from `UX`: repository-specific template code style

#### `skillpack-agent/.github/instructions/spec.instructions.md`

Role:
- defines the `plans/`, `spec.json`, and `spec.md` contract

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: instruction mechanics
- from `UX`: plan/spec file contract

#### `skillpack-agent/.github/instructions/workspace-agents.instructions.md`

Role:
- defines how generated or maintained project-workspace `AGENTS.md` files should be written and layered

Main sources:
- `S2`, `UX`

What it borrows:
- from `S2`: path-scoped instruction mechanics for `AGENTS.md`
- from `UX`: root-vs-nested workspace `AGENTS.md` rules and the rule that project `AGENTS.md` should not duplicate `.github/*`

## What Clearly Belongs To UX Standards

The following items are grouped under `UX Standards` even when external references exist nearby:

- the exact `plan.md / spec.json / spec.md / migration.json` formats
- `plans/` being gitignored and not committed by default
- the generation workflow: `plan-to-spec -> build-from-spec -> post-generation`
- the portable migration workflow: `project-context -> migration-to-platform-mui -> ...`
- root and nested workspace `AGENTS.md` layering rules for generated and maintained projects
- "ask only a small number of blocking questions and discover repository facts first"
- "do not squeeze the main admin content into a narrow center column"
- "list pages, dashboards, and management views should use working width well"
- the repository's default pairing of `MUI v6 + MRT`
- the output format and severity ordering for design critique, design polish, and code review
- the product boundary between generate / maintain / migrate / plan-only work

## Maintenance Rule

Whenever a `skill` or `instruction` is added or changed, this file should be updated too:

1. add the file to the map
2. list its main sources
3. explain which part of each source was actually used
4. if there is no stable enough source, mark it as `UX Standards`

That keeps future reviews, external explanations, and source-tracing discussions anchored in one place.
