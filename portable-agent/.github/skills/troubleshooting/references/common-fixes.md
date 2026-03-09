# Common Fixes

## Canonical source

- `.github/skills/_shared/TROUBLESHOOTING.md`

## Fast mappings

- "Template not found" -> verify template name (`list-page`, `detail-page`, `multi-page`)
- "Output directory already exists" -> remove or use another project name
- "Cannot find module ..." -> run `pnpm install`
- Blank page -> inspect router imports and console errors
- Type mismatch -> align `types.ts` with usage and API data shape
