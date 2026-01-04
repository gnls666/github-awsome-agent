# Template Variables

**IMPORTANT**: Use these exact variable names when generating code from templates.

## Variable Reference

| Variable | Format | Description | Example |
|----------|--------|-------------|---------|
| `{{PROJECT_NAME}}` | kebab-case | Project name for package.json | `user-admin` |
| `{{ENTITY_NAME}}` | PascalCase | Entity/model name | `User`, `Product` |
| `{{ENTITY_NAME_LOWER}}` | lowercase | Lowercase entity name | `user`, `product` |
| `{{TITLE}}` | Free text | Page title (can be Chinese/English) | `用户管理`, `User Management` |
| `{{PAGES}}` | PascalCase, comma-separated | Page names for multi-page | `Dashboard,Users,Products` |

## Variable Derivation Rules

When user provides `entityName=User`:
- `{{ENTITY_NAME}}` = `User`
- `{{ENTITY_NAME_LOWER}}` = `user`

When user provides `pages=Dashboard,Users,Products`:
- Generate route: `/dashboard`, `/users`, `/products`
- Generate component: `DashboardPage.tsx`, `UsersPage.tsx`, `ProductsPage.tsx`

## Usage in Templates

### In package.json.template
```json
{
  "name": "{{PROJECT_NAME}}"
}
```

### In component files
```tsx
interface {{ENTITY_NAME}}Props {
  // ...
}

export function {{ENTITY_NAME}}ListPage() {
  // ...
}
```

### In API files
```tsx
export async function fetch{{ENTITY_NAME}}List() {
  return apiClient.get('/{{ENTITY_NAME_LOWER}}s');
}
```

## Notes

- Variables are case-sensitive: `{{ENTITY_NAME}}` ≠ `{{entity_name}}`
- Always use double curly braces: `{{VAR}}`
- Some template files have no variables (static files) - copy them as-is
