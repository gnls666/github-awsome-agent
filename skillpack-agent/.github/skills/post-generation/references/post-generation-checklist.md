# Post-Generation Checklist

Use this skill only when `plans/<project-name>/spec.json` contains non-empty `postGeneration.tasks`.

## Do

- Work from the spec and the generated project together.
- Update types, mock data, routes, and UI consistently.
- Start from `.github/skills/_shared/components/` for routine building blocks.
- Reuse `.github/skills/platform-patterns/` when the target result is a known composed structure.
- Keep a short mapping from each completed task back to the originating spec item.

## Avoid

- Re-running the generator for minor edits
- Introducing generic utility layers for one-off template tweaks
- Leaving half-applied tasks without calling that out
