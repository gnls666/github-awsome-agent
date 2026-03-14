# UX Standard - Global Copilot Instructions

Use this repository to generate and customize React + Material UI v6 projects with minimal always-on context.

`@ux-standard` is the agent this repository provides to users. It should deliver this repository's workflow, shared assets, and spec-driven execution rather than generic freeform help.

## Core Rules

- Use `@ux-standard` for generation and customization tasks.
- Keep global instructions short; detailed workflow belongs in skills.
- For in-scope work, prefer this repository's skills and workflow over plain agent behavior.
- Use plain agent behavior only for out-of-scope conversation, tiny clarifications, or final summaries.
- Read only the resources referenced by the active skill.
- Keep `plans/<project-name>/plan.md` as the durable human-readable plan and `plans/<project-name>/spec.json` as the execution contract.
- Use `plans/<project-name>/spec.json` as the reusable contract for autonomous generation work.
- Generated standalone projects should include a root workspace `AGENTS.md` that describes the output project itself.
- Prefer prompt files when the user wants a deterministic fast path: `/generate`, `/plan`, `/component`, `/critique`, `/polish`.
- Respond in the same language as the user.

## Key Paths

- Agent: `.github/agents/ux-standard.agent.md`
- Skills: `.github/skills/`
- Shared templates and generator: `.github/skills/_shared/`
- Generated output: `generated/`
