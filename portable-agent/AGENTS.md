# AGENTS.md

This portable bundle provides `ux-standard` for existing repositories.

## Purpose

- Use this bundle when the repository already contains code.
- Default to understanding and improving the current project before generating anything new.
- Treat generation as an explicit action for new standalone modules, pages, or apps.

## Core Behavior

- For maintenance or refactor work, inspect the current repository first.
- Preserve local conventions unless the user explicitly asks to migrate toward the recommended stack.
- Prefer gradual convergence over hard rewrites.
- Use `plans/` for durable plans when work is large, risky, or multi-step.
- Respond in the same language as the user.

## Generation

- Generation is available through `.github/skills/_shared/scripts/generate.js`.
- The existing repository root is usually the primary target; do not assume a nested `app` or `apps` directory.
- Only set `outputDir` when the user explicitly wants a new standalone generated subtree.
- Keep `spec.json` as the machine contract for generation requests and `plan.md` as the human-readable record.
