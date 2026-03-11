# Migration Phases

Use the same phase order for every non-trivial migration.

## 1. Inventory

- confirm framework, language, UI library, icon library, table library, and entrypoints
- identify the migration scope and the pilot target
- record validation commands and local constraints

## 2. Foundation

- align required dependencies
- wire the shared provider layer
- prepare icon entrypoints, theme imports, and minimal config changes
- make the repository ready for scope-limited migration

## 3. Pilot

- migrate one representative page or module first
- prefer a page with layout, filters, status presentation, and at least one meaningful table when possible
- use this phase to validate the replacement approach before broad rollout

## 4. Expand

- replicate the proven pattern into adjacent files and modules
- stay within the declared migration scope
- avoid surprise abstractions or broad architecture rewrites

## 5. Cleanup

- remove old imports, wrappers, or dead code only inside the migrated scope
- prune old UI-library usage only where replacement is complete
- keep cleanup last so it does not block iterative validation

## Phase Rules

- Do not skip `inventory`.
- Do not start large component replacement before provider/theme adoption is clear.
- Do not remove the old UI library globally until the touched scope is stable.
- Do not treat cleanup as a license for unrelated refactors.
