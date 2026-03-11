---
name: maintain
description: Maintain or extend the current repository in place
agent: ux-standard
argument-hint: "<feature-or-bugfix-request>"
---

# /maintain - Existing Project Maintenance

Use this path for feature work and bug fixes inside the current repository.

1. Start with `project-context` to understand the stack, entrypoints, and local conventions around the target area.
2. If the task is complex or risky, write a concise plan under `plans/` before editing.
3. Prefer local, incremental changes over broad rewrites.
4. Use `mui-v6-design` only when UI, layout, or interaction guidance is needed.
5. Use `design-polish` when UI work is functionally complete but still feels rough.
6. Use `design-critique` when the user asks for a design review or the interface still feels generic after changes.
7. Use `quality-gate` for the smallest relevant verification.
8. Use `code-review` for risky multi-file changes or when the user asks for a review.

Always end with:

- the touched area or files
- key assumptions
- what changed
- what was verified
