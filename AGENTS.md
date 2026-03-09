# AGENTS.md

This repository is a small-context skillpack for generating and customizing React + MUI projects in VS Code GitHub Copilot.

## Repository Purpose

- This repository is not the generated app itself.
- It defines one custom agent, on-demand skills, prompt files, and templates.
- Generated output goes under `generated/`.
- The main agent is `ux-standard`: the agent this repository provides to users, built to use this repository's workflow rather than generic chat behavior.

## Keep Always-On Context Small

- Put only short, global rules in `AGENTS.md` and `.github/copilot-instructions.md`.
- Put file-specific coding rules in `.github/instructions/*.instructions.md`.
- Put multi-step workflows in `.github/skills/*`.
- Put deterministic entry points in `.github/prompts/*.prompt.md`.
- Do not duplicate long skill bodies, template docs, or examples in always-on files.

## Operating Rules

- For in-scope work, use this repository's skills and workflow by default.
- Use plain agent behavior only for out-of-scope conversation, tiny clarifications, or final summaries.
- Read only the files referenced by the active `SKILL.md`.
- Prompt files are a fast path, not a requirement: `/generate`, `/plan`, `/component`.
- Respond in the same language as the user.

## Autonomous Flow

- Default generation flow is plan-and-spec driven: create or update `plans/<project-name>/plan.md` and `plans/<project-name>/spec.json`, then build from that spec.
- Keep `plan.md` as the durable human-readable memory of the work.
- Keep `spec.json` as the machine source of truth and `spec.md` as the readable summary.
- Run `post-generation` only when the spec explicitly declares follow-up tasks.
- Run `code-review` only for complex, risky, or explicitly requested review work.

## Core Generator

```bash
node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]
```

Examples:

```bash
node .github/skills/_shared/scripts/generate.js list-page user-admin --entity User --title "用户管理"
node .github/skills/_shared/scripts/generate.js multi-page my-dashboard --title "Dashboard" --pages "Dashboard,Users,Settings"
```
