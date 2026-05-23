# Research Notes

Use these notes to keep generated engineering-agent bundles aligned with external conventions.

## GitHub Copilot Custom Agents

GitHub Copilot custom agents use `.github/agents/*.agent.md` files with frontmatter and instructions. Treat that file as a selectable persona and policy boundary.

Design implication:

- Keep the agent profile short.
- Put detailed method in skills.
- Use prompts as shortcuts.
- Use MCP/tools only for real external actions or system state.

Reference: https://docs.github.com/en/copilot/reference/custom-agents-configuration

## VS Code Copilot Customization

VS Code supports custom instructions, prompt files, and custom agents as separate customization layers.

Design implication:

- Instructions are broad constraints.
- Prompt files are reusable task shortcuts.
- Custom agents are role/tool/context boundaries.
- Skills should carry deeper reusable workflows and references.

Reference: https://code.visualstudio.com/docs/copilot/customization/overview

## AGENTS.md

`AGENTS.md` is an open format for repository-local instructions for engineering agents.

Design implication:

- A generated engineering agent should read target-project `AGENTS.md` files before broad edits.
- Do not copy portable bundle policy into a target project's `AGENTS.md`.
- Runtime project facts belong in the target project, not in the agent profile.

Reference: https://agents.md/

## Public Benchmarks

Public benchmarks are useful for alignment, but internal golden tasks are still required.

- SWE-bench evaluates real GitHub issue resolution.
- Multi-SWE-bench extends issue-resolution evaluation across multiple programming languages.
- Terminal-Bench evaluates terminal-based agent task execution.
- SWE-Skills-Bench / SkillsBench studies whether skills improve engineering-agent behavior.

Design implication:

- Generate internal golden tasks first.
- Compare baseline vs candidate on the same repo snapshot.
- Add public benchmark alignment only after local behavior is measurable.

References:

- https://www.swebench.com/
- https://github.com/multi-swe-bench/multi-swe-bench
- https://www.tbench.ai/
- https://arxiv.org/abs/2603.15401
