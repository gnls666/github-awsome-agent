# Copilot CLI Validation

Use this reference when validating generated engineering-agent-builder behavior with real GitHub Copilot CLI.

## Goal

Test whether Copilot can use the generated bundle in a clean target workspace.

## Isolated Workspace

Create a temporary workspace and copy only `.github/` from the authoring repository:

```bash
python3 /path/to/bootstrap_portable_workspace.py --source /path/to/source
```

Do not test by manually editing the target after Copilot runs. Codex may inspect and score, but Copilot should be the actor.

## Prompt Shape

Use one narrow prompt:

```text
Create a benchmarked GitHub Copilot custom engineering agent bundle for Java service maintenance.
The agent should help maintain existing Maven or Gradle Java services, default to inspecting the repository before edits,
keep Java build and test details in a focused skill, and include a minimal benchmark scaffold with one golden task.
Work only in this current target workspace. Do not create product application code.
```

## Command Shape

Prefer a model available to the current Copilot account. If a named model fails with "not available", rerun without `--model` so the CLI uses the account default.

```bash
copilot \
  --agent engineering-agent-builder \
  -p "$PROMPT" \
  --allow-all-tools \
  --no-ask-user \
  --silent \
  --share /path/to/transcript.md
```

## Required Inspection

After the run, inspect:

- transcript path
- exit code
- files created in target workspace
- whether `.github/agents/*.agent.md` exists when expected
- whether `.github/skills/*/SKILL.md` exists
- whether benchmark scaffold exists
- whether generated files keep policy, method, prompt, and benchmark separate
- whether generated `.agent.md`, `.prompt.md`, and `SKILL.md` files have valid YAML frontmatter

For new bundles, the CLI should run `scripts/scaffold-agent-bundle.mjs` for deterministic initial file creation before model-authored refinement.

If the CLI generates partial files, missing frontmatter, or no benchmark scaffold, treat that as a validation failure and tighten the skill or prompt so the scaffold script is mandatory.

## Scoring

Use a simple first-pass score:

| Check | Pass condition |
| --- | --- |
| `agentProfile` | generated or intentionally omitted with explanation |
| `skillPrimary` | focused skill exists and contains workflow/guardrails |
| `promptShortcut` | prompt exists or direct invocation path is documented |
| `benchmark` | benchmark README and task exist |
| `layering` | agent does not contain long skill or benchmark bodies |
| `verification` | Copilot or Codex ran a relevant structural check |

## Reporting

Report separately:

- source workspace edits
- target workspace files made by Copilot
- transcript path
- verification command and result
- mismatches between intended and actual behavior
