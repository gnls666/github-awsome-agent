# Generator CLI Reference

## Command

`node .github/skills/_shared/scripts/generate.js <template> <project-name> [options]`

## Options

- `--entity <PascalCase>`
- `--title <text>`
- `--pages <CommaSeparatedPages>`
- `--dry-run`

## Examples

- `node .github/skills/_shared/scripts/generate.js list-page user-admin --entity User --title "User Management" --dry-run`
- `node .github/skills/_shared/scripts/generate.js detail-page product-detail --entity Product --title "Product Detail"`
- `node .github/skills/_shared/scripts/generate.js multi-page ops-admin --title "Ops Admin" --pages "Dashboard,Users,Settings"`

## Follow-up commands

- `cd generated/<project-name>`
- `pnpm install`
- `pnpm dev`
