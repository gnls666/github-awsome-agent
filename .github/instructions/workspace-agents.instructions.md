---
applyTo: "AGENTS.md,**/AGENTS.md"
---

# Workspace AGENTS Files

Use project-workspace `AGENTS.md` files to describe local target-project facts and working boundaries.

- Root `AGENTS.md` should describe workspace-wide identity, stack facts, directory structure, validation, and risk boundaries for the target project.
- In a multi-project repository, the applicable `AGENTS.md` may live below the repository root.
- Nested `AGENTS.md` files should exist only when a sub-app, package, or legacy area has materially different rules.
- Keep workspace `AGENTS.md` concise and project-specific.
- Do not duplicate `.github/agents/*`, `.github/skills/*`, `.github/prompts/*`, or long global instruction bodies inside workspace `AGENTS.md`.
- If nested `AGENTS.md` files are added, they should narrow or refine the root rules rather than restate them verbatim.
- Do not treat the distribution workspace's own `AGENTS.md` as the target project's manual.
