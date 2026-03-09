# Post-Generation Checklist

Use this skill only when `plans/<project-name>/spec.json` contains non-empty `postGeneration.tasks`.

## Do

- Work from the spec and the generated project together.
- Update types, mock data, routes, and UI consistently.
- Reuse MUI patterns from `.github/skills/_shared/components/` when a design choice is needed.
- Keep a short mapping from each completed task back to the originating spec item.

## Avoid

- Re-running the generator for minor edits
- Introducing generic utility layers for one-off template tweaks
- Leaving half-applied tasks without calling that out
