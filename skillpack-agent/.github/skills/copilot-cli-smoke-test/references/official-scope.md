# Official Scope

This skill treats GitHub Copilot CLI as a close rehearsal environment for repository customizations, not as a perfect substitute for VS Code.

## What It Is Good For

- Quick validation that Copilot CLI sees the repository's custom instructions.
- Fast checks for obvious conflicts between:
  - `AGENTS.md`
  - `.github/copilot-instructions.md`
  - `.github/instructions/*.instructions.md`
  - `.github/skills/*`
  - `.github/agents/*`
- Fast sanity checks before opening VS Code.

## What It Does Not Prove

- The exact VS Code prompt-file UX.
- The exact VS Code diagnostics or routing experience.
- Perfect parity for nested `AGENTS.md` behavior.
- That a complex interactive agent flow will look identical in VS Code.

## Practical Interpretation

- Use Copilot CLI to catch obvious contradictions, path issues, and broken assumptions.
- Use VS Code as the final runtime truth when behavior depends on IDE-specific UX.
