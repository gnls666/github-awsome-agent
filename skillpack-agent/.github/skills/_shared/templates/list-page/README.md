# List Page Template

A data list page template using MUI DataGrid with search, filter, and pagination.

## Features

- MUI DataGrid for data display
- Search/filter functionality
- Pagination with configurable page sizes
- Loading states
- Error handling
- TypeScript types

## Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name (kebab-case) | `user-admin` |
| `{{ENTITY_NAME}}` | Entity name (PascalCase) | `User` |
| `{{ENTITY_NAME_LOWER}}` | Entity name (camelCase) | `user` |
| `{{TITLE}}` | Page title | `User Management` |

## Files

- `package.json.template` - Project dependencies
- `src/ListPage.tsx.template` - Main list page component
- `src/types.ts.template` - TypeScript type definitions
- `src/api.ts.template` - API service functions
- `src/App.tsx.template` - App entry component
- `src/main.tsx.template` - React entry point

## Usage

1. Copy template files to your project
2. Replace all `{{VARIABLE}}` placeholders with actual values
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server

## Example

For a User list page:

```bash
# Variables
PROJECT_NAME=user-admin
ENTITY_NAME=User
TITLE=User Management
```

This generates:
- `UserListPage.tsx` component
- `User` interface in types.ts
- `fetchUserList()` API function
