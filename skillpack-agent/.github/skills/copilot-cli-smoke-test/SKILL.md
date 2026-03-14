---
name: copilot-cli-smoke-test
description: Validate this repository's GitHub Copilot customization stack with the GitHub Copilot CLI. Use when you need a fast smoke test of AGENTS.md, .github/copilot-instructions.md, .github/instructions, skills, and custom agents against a target workspace before doing fuller VS Code validation.
---

# Copilot CLI Smoke Test

Use this skill to run a fast, read-only smoke test against a workspace with the GitHub Copilot CLI.

This skill is for authoring and QA. It does not prove perfect parity with VS Code, but it catches obvious conflicts in:

- `.github/copilot-instructions.md`
- `.github/instructions/*.instructions.md`
- `AGENTS.md`
- `.github/skills/*`
- `.github/agents/*`

## Workflow

1. Read [references/official-scope.md](references/official-scope.md).
2. Read [references/scenarios.md](references/scenarios.md).
3. Pick the right scenario for the target workspace.
4. Run `scripts/run_smoke_test.py` against the target workspace.
5. Report:
   - which workspace was tested
   - which scenario was used
   - transcript location
   - pass/fail by check
   - any mismatch between expected behavior and Copilot CLI output

## Default Usage

For an empty portable bootstrap smoke test in this repository:

```bash
python3 scripts/run_smoke_test.py \
  --scenario portable-empty \
  --portable-source /Users/baizijun/projects/claude-vscode/portable-agent
```

## Rules

- Keep the smoke prompt read-only. Do not ask Copilot CLI to modify files.
- Treat this as a fast coherence check, not final product validation.
- If a check fails, quote the exact relevant output and explain the likely rule mismatch.
- If the workspace uses a custom agent, pass `--agent ux-standard` unless there is a clear reason not to.
