# MRT Migration

For the platform target, data-heavy admin tables should converge on Material React Table.

## When To Migrate

Migrate to MRT when the table is part of an operational/admin flow and needs one or more of:

- filtering
- sorting
- pagination
- row actions
- sticky headers
- toolbar actions
- selection-aware actions

## When Not To Force MRT

- simple static comparison tables
- small read-only tables embedded inside content pages
- untouched legacy scope outside the migration boundary

## Migration Rules

- Replace the whole table interaction model inside the migrated scope instead of leaving a partial hybrid between two admin table systems.
- Keep page-level actions outside the table when they affect the entire page.
- Use MRT for the admin grid, then let `mui-v6-design` handle surrounding layout and rhythm.
- If the existing table behavior is highly customized, migrate a representative slice in the pilot phase before broad rollout.
