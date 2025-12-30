# Detail Page Template

A detail/form page template with view mode, edit mode, and form validation.

## Features

- View mode for displaying data
- Edit mode with form inputs
- Form validation
- Loading and error states
- Save/Cancel actions
- TypeScript types

## Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name (kebab-case) | `product-admin` |
| `{{ENTITY_NAME}}` | Entity name (PascalCase) | `Product` |
| `{{ENTITY_NAME_LOWER}}` | Entity name (camelCase) | `product` |
| `{{TITLE}}` | Page title | `Product Details` |

## Files

- `package.json.template` - Project dependencies
- `src/DetailPage.tsx.template` - Main detail page component
- `src/Form.tsx.template` - Edit form component
- `src/types.ts.template` - TypeScript type definitions
- `src/api.ts.template` - API service functions

## Usage

1. Copy template files to your project
2. Replace all `{{VARIABLE}}` placeholders with actual values
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server
