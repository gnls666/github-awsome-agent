---
applyTo: "templates/**"
---

# Template Files Instructions

These are code generation templates with placeholder variables.

## Rules

- Variables use `{{VARIABLE_NAME}}` syntax (double curly braces)
- Do NOT replace or remove variable placeholders - they are processed by `scripts/generate.js`
- Common variables:
  - `{{PROJECT_NAME}}` - Project name in kebab-case
  - `{{ENTITY_NAME}}` - Entity name in PascalCase (e.g., User, Product)
  - `{{ENTITY_NAME_LOWER}}` - Entity name in lowercase
  - `{{TITLE}}` - Page or system title
  - `{{PAGES}}` - Comma-separated page names (multi-page only)
- Files with `.template` extension are copied and processed during generation
- Keep template code generic and reusable

## File Naming

- Template files: `filename.ext.template` (e.g., `App.tsx.template`)
- Output files: `filename.ext` (e.g., `App.tsx`)

## Example

```tsx
// Good - keep variables intact
export function {{ENTITY_NAME}}ListPage(): React.ReactElement {
  return <Typography>{{TITLE}}</Typography>;
}

// Bad - do not replace variables
export function UserListPage(): React.ReactElement {
  return <Typography>User Management</Typography>;
}
```
