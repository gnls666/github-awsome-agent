---
name: detail-page
description: Generate a detail/form page with data display and edit capabilities
agent: agent
argument-hint: "projectName=my-app entityName=Product title=Product Details"
---

# Generate Detail Page

Generate a detail/form page based on the [detail-page template](../../templates/detail-page/README.md).

## User Parameters

- **projectName**: ${input:projectName:Project name for package.json}
- **entityName**: ${input:entityName:Entity name (e.g., User, Product)}
- **title**: ${input:title:Page title}

## Reference Templates

Use these template files as the base for generation:

- [package.json template](../../templates/detail-page/package.json.template)
- [DetailPage component](../../templates/detail-page/src/DetailPage.tsx.template)
- [Type definitions](../../templates/detail-page/src/types.ts.template)
- [API service](../../templates/detail-page/src/api.ts.template)

## Component Guidelines

Follow the [Form Guide](../../components/form.md) for best practices.

## Requirements

1. Use MUI form components (TextField, Select, Checkbox, etc.)
2. Include both view mode and edit mode
3. Include form validation
4. Generate complete TypeScript types for the entity
5. Include loading states and error handling
6. Include save/cancel actions
7. Replace template placeholders with user-provided parameters

## Output Directory

Generate files in the `generated/{{projectName}}/` folder.

## File Structure to Generate

```
generated/{{projectName}}/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── {{EntityName}}DetailPage.tsx
│   ├── {{EntityName}}Form.tsx
│   ├── api.ts
│   ├── types.ts
│   ├── vite-env.d.ts
│   └── __tests__/
│       ├── setup.ts
│       └── {{EntityName}}Form.test.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── index.html
```

## Form Fields

Generate appropriate form fields based on common entity patterns:

- **id**: Read-only display
- **name/title**: TextField (required)
- **description**: TextField multiline
- **status**: Select with options
- **email**: TextField with email validation
- **date fields**: DatePicker
- **boolean fields**: Switch or Checkbox

## Example Output

For `projectName=product-admin, entityName=Product, title=Product Details`:

- Component: `ProductDetailPage.tsx`
- Form: `ProductForm.tsx` with validation
- Types: `Product` interface with id, name, description, price, status
