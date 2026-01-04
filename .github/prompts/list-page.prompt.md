---
name: list-page
description: Generate a MUI DataGrid list page with search, filter, and pagination
agent: ux-standard
argument-hint: "projectName=my-app entityName=User title=User List"
---

# Generate List Page

Generate a data list page based on the [list-page template](../../templates/list-page/README.md).

## User Parameters

- **projectName**: ${input:projectName:Project name for package.json}
- **entityName**: ${input:entityName:Entity name (e.g., User, Product)}
- **title**: ${input:title:Page title}

## Reference Templates

Use these template files as the base for generation:

- [package.json template](../../templates/list-page/package.json.template)
- [ListPage component](../../templates/list-page/src/ListPage.tsx.template)
- [Type definitions](../../templates/list-page/src/types.ts.template)
- [API service](../../templates/list-page/src/api.ts.template)

## Component Guidelines

Follow the [Table/DataGrid Guide](../../components/table.md) for best practices.

## Requirements

1. Use MUI DataGrid (`@mui/x-data-grid`) for data display
2. Include search/filter functionality with TextField
3. Include pagination with configurable page sizes (10, 25, 50)
4. Generate complete TypeScript types for the entity
5. Include loading states and error handling
6. Replace template placeholders with user-provided parameters:
   - `{{PROJECT_NAME}}` → projectName
   - `{{ENTITY_NAME}}` → entityName (PascalCase)
   - `{{TITLE}}` → title

## Output Directory

Generate files in the `generated/{{projectName}}/` folder.

## File Structure to Generate

```
generated/{{projectName}}/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── {{EntityName}}ListPage.tsx
│   ├── api.ts
│   ├── types.ts
│   ├── vite-env.d.ts
│   └── __tests__/
│       ├── setup.ts
│       └── {{EntityName}}ListPage.test.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── index.html
```

## Example Output

For `projectName=user-admin, entityName=User, title=User Management`:

- Component: `UserListPage.tsx`
- Types: `User` interface with id, name, email, status, createdAt
- API: `fetchUserList()` function with pagination support
