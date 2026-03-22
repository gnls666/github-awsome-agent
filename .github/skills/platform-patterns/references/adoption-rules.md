# Adoption Rules

Use these rules when applying patterns to an existing project.

## Choose the Smallest Useful Unit

- If the task is local, adopt only one pattern.
- If the task spans one page, adopt the minimum set of patterns that makes the page coherent.
- Avoid broad restructuring when the request is only asking for one surface.

## Preserve Local Project Reality

- Keep existing route structure unless the task explicitly changes it.
- Keep existing data flow and query shape unless the current pattern cannot work without a change.
- Adapt the pattern to local naming instead of renaming the project around the pattern.
- For table-operation errors, keep the main table as the primary work surface and attach the panel below it instead of replacing the whole page structure.

## Prefer Composition Over Reinvention

- Reuse the pattern asset as a starting point.
- Extract only the parts the target page actually needs.
- If the target already has a partial implementation, refactor toward the pattern instead of replacing the whole file blindly.
- For persistent error panels, prefer an embedded bottom panel over introducing a separate route or modal when the user needs ongoing inspection during the same workflow.

## Layering

- `.github/skills/_shared/components/` is the default building-block layer for routine additions and edits.
- `platform-patterns` provides preferred references for recurring composed outcomes built from that component layer.
- `mui-v6-design` owns design and layout guardrails.
- `material-react-table` owns MRT-specific rules and advanced table configuration.
- `build-from-spec`, `post-generation`, and `migration-to-platform-mui` should use this skill when the desired result is a known composed structure instead of inventing a new composition from scratch.
