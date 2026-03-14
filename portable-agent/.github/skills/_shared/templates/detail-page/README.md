# Detail Page Template

A runnable detail-page template for read and edit flows, with Grid2-based layout, save/cancel actions, and a Vite/Vitest scaffold.

## Features

- Read mode and edit mode in a single detail surface
- Grid2 layout for responsive field presentation
- Loading, not-found, save, and error states
- Typed form props and mock API helpers
- Material UI v6 patterns and strict TypeScript defaults
- Vite app scaffold with a baseline Vitest smoke test

## Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name (kebab-case) | `product-admin` |
| `{{ENTITY_NAME}}` | Entity name (PascalCase) | `Product` |
| `{{ENTITY_NAME_LOWER}}` | Entity name (lowercase) | `product` |
| `{{TITLE}}` | Page title | `Product Details` |

## Parameter Contract

- `{{PROJECT_NAME}}` controls package metadata and the default output directory name.
- `{{ENTITY_NAME}}` controls exported type names, component names, and API helper names.
- `{{ENTITY_NAME_LOWER}}` controls lowercase resource identifiers where needed.
- `{{TITLE}}` controls visible page copy and the baseline smoke test assertion.
- File names stay stable, while exported symbols and text are parameterized.

## Files

- `index.html.template` - HTML entry
- `package.json.template` - Dependencies and scripts
- `AGENTS.md.template` - Workspace-level project guidance for the generated app
- `tsconfig.json.template` - TypeScript config
- `tsconfig.node.json.template` - Node-side TypeScript config
- `vite.config.ts.template` - Vite config
- `vitest.config.ts.template` - Vitest config
- `src/App.tsx.template` - App shell entry
- `src/App.test.tsx.template` - Baseline smoke test
- `src/DetailPage.tsx.template` - Main detail page component
- `src/Form.tsx.template` - Edit form component
- `src/api.ts.template` - Mock API functions
- `src/main.tsx.template` - React bootstrap
- `src/test/setup.ts.template` - Test setup
- `src/types.ts.template` - Entity types
- `src/vite-env.d.ts.template` - Vite type declarations

## Usage

Generate from the embedded generator:

```bash
node .github/skills/_shared/scripts/generate.js detail-page product-admin --entity Product --title "商品详情"
```

Use `--output <dir>` when you need a non-default destination.

## Example Output

For `--entity Product --title "Product Details"` the template generates:

- `AGENTS.md` describing the generated workspace, local rules, and validation expectations
- `src/DetailPage.tsx` exporting `ProductDetailPage`
- `src/Form.tsx` exporting `ProductForm`
- `src/api.ts` with `fetchProductById()`, `updateProduct()`, and related helpers
